from django.urls import path
from . import views

urlpatterns = [
    path("documents/", views.DocumentListCreateAPIView.as_view(), name="documents"),
    path("documents/<int:pk>/", views.DocumentRetrieveAPIView.as_view(), name="document-detail"),
    path("documents/<int:pk>/process/", views.process_document_view, name="document-process"),
    path("api/text/", views.TextDocumentCreateAPIView.as_view(), name = "api-text"),
    path("documents/<int:pk>/chat/", views.DocumentChatAPIView.as_view(), name="document-chat"),
]
