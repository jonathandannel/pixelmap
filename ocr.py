from PIL import Image
from pytesseract import image_to_string
from io import BytesIO
import requests
import base64

class ScanBase64Image:
    def __init__(self, base64string):
        self.base64string = base64string
    
    def decode(self):
        decoded = base64.decode(self.base64string)
        print(type(decoded))


class ScanRemoteImage:
    def __init__(self, url):
        self.image_data = requests.get(url).content
    
    def get_text(self):
        image = Image.open(BytesIO(self.image_data))
        return image_to_string(image)