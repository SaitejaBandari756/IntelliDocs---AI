import os
from pdf2image import convert_from_path
import pytesseract
from pytesseract import Output
from django.conf import settings

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
def pdf_to_images(pdf_path):
    POPPLER_PATH = r"C:\Users\Komali Bandari\Downloads\Release-25.11.0-0\poppler-25.11.0\Library\bin"  

    pages = convert_from_path(pdf_path, dpi=300, poppler_path=POPPLER_PATH)
    return pages 
def ocr_image(image):
    """
    returns dict with text and boxes per line/word
    """
    data = pytesseract.image_to_data(image, output_type=Output.DICT)
    lines = {}
    for i, text in enumerate(data['text']):
        if text.strip():
            line_num = data['line_num'][i]
            lines.setdefault(line_num, []).append(text)
    return {"full_text": " ".join([w for w in data['text'] if w.strip()]), "raw_data": data}
