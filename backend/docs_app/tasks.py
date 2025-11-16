import os
from .models import Document
from .ocr_utils import pdf_to_images, ocr_image
from groq import Groq
from .models import Document

api_key = "YOUR_GROQ_API_KEY"
def summarize_text(text):
    client = Groq(api_key=api_key)
    try:
        response = client.chat.completions.create(
            # model="llama-3.1-70b-versatile",
            model ="openai/gpt-oss-20b",
            messages=[
                {"role": "system", "content": "Summarize the document in clean plain text. Do NOT use Markdown, tables, bullets, pipes, asterisks, or formatting symbols."},
                {"role": "user", "content": f"Summarize:\n{text}"}
            ]
        )
        summary = response.choices[0].message.content
        return summary

    except Exception as e:
        return "SUMMARY FAILED: " + str(e)

def process_document(doc_id):
    doc = Document.objects.get(pk=doc_id)
    doc.status = "processing"
    doc.save()
    print("Here it is")
    path = doc.file.path
    try:
        pages = pdf_to_images(path)  
        extracted = {}
        for i, page in enumerate(pages, start=1):
            ocr_result = ocr_image(page)
            extracted[f"page_{i}"] = {
                "text": ocr_result["full_text"],
                "raw": ocr_result["raw_data"]
         
            }

        full_text = "\n\n".join([extracted[f"page_{i}"]["text"] for i in range(1, len(pages)+1)])
        print("Full extracted text:", full_text)

        if len(full_text) > 5000:
            full_text = full_text[:5000]
        summary_output = summarize_text(full_text)
        key_values = {}  
        tables = []      

        doc.extracted_text = extracted
        doc.key_values = key_values
        doc.summary = summary_output
        doc.tables = tables
        doc.status = "done"
        doc.save()
    except Exception as e:
        doc.status = "failed"
        doc.errors = str(e)
        doc.save()
        raise
