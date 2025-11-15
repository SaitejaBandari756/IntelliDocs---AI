from django.db import models

class Document(models.Model):
    title = models.CharField(max_length=255, blank=True)
    file = models.FileField(max_length=500, upload_to="docs/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="uploaded")  
    extracted_text = models.JSONField(null=True, blank=True)      
    key_values = models.JSONField(null=True, blank=True)          
    tables = models.JSONField(null=True, blank=True)  
    summary = models.TextField(null=True, blank=True) 
    errors = models.TextField(blank=True)
    is_text_input = models.BooleanField(default=False)
    raw_text = models.TextField(null=True, blank=True)


    def __str__(self):
        return f"{self.title or self.file.name} ({self.status})"
