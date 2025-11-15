from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Document
from groq import Groq
from django.conf import settings
from .serializers import DocumentSerializer
from .tasks import process_document 
from rest_framework.parsers import MultiPartParser, FormParser , JSONParser
import os
class DocumentChatAPIView(APIView):
    """
    POST /api/documents/<pk>/chat/
    Body: {"message":"your question here"}
    Response: {"reply":"assistant reply"}
    """
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def post(self, request, pk):
        try:
            doc = Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            return Response({"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND)

        user_message = request.data.get("message", "").strip()
        if not user_message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        parts = []
        if doc.summary:
            parts.append(f"Document summary:\n{doc.summary}\n")
        if doc.extracted_text:
            pages = list(doc.extracted_text.items())
            char_count = 0
            included = []
            for page_name, page in pages[:8]:
                text = (page.get("text") if isinstance(page, dict) else str(page)) or ""
                if not text.strip():
                    continue
                included.append(f"{page_name}:\n{text}\n")
                char_count += len(text)
                if char_count > 3000:
                    break
            if included:
                parts.append("Document pages (partial):\n" + "\n".join(included))

        context_text = "\n\n".join(parts) if parts else "No document content available."

        prompt = (
            "You are an assistant that answers questions using the provided document context. "
            "When answering, rely only on the provided context; if the answer isn't present, say you don't know "
            "and offer to search the document. Keep answers concise and include short citations of pages if possible.\n\n"
            f"CONTEXT:\n{context_text}\n\n"
            f"USER QUESTION:\n{user_message}\n\n"
            "Provide a short, helpful answer referencing the context when applicable."
        )

        api_key = "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"

        try:
            client = Groq(api_key=api_key)
            response = client.chat.completions.create(
                model="openai/gpt-oss-20b",
                messages=[
                    {"role": "system", "content": "You are a concise document assistant."},
                    {"role": "user", "content": prompt}
                ],
            )
            assistant_text = response.choices[0].message.content
            return Response({"reply": assistant_text})
        except Exception as e:
            print("LLM chat error:", e)
            return Response({"error": "LLM call failed", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TextDocumentCreateAPIView(APIView):
    def post(self, request):
        text = request.data.get("text")
        if not text:
            return Response({"error": "Text required"}, status=400)

        doc = Document.objects.create(
            title="Text Input Document",
            is_text_input=True,
            raw_text=text,
            status="processing"
        )

        process_document(doc.id, is_text=True)
        return Response(DocumentSerializer(doc).data, status=201)

class DocumentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Document.objects.all().order_by("-id")
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        doc = serializer.save(status="uploaded")
        try:
            process_document(doc.id)
        except Exception as e:
            doc.status = "failed"
            doc.errors = str(e)
            doc.save()

class DocumentRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

@api_view(['POST'])
def process_document_view(request, pk):
    try:
        process_document(pk)
        return Response({"status":"processing started"})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
