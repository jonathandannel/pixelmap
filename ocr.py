from PIL import Image
from pytesseract import image_to_string
from io import BytesIO
import requests

class ScanRemoteImage:
    def __init__(self, url):
        self.image_data = requests.get(url).content
    
    def get_text(self):
        image = Image.open(BytesIO(self.image_data))
        return image_to_string(image)