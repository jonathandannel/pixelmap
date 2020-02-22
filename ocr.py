from PIL import Image
from pytesseract import image_to_string
from io import BytesIO
import requests
import base64
import cv2
import numpy as np
from b64 import base


class ScanBase64Image:
    def __init__(self, base64string):
        self.raw_data = BytesIO(base64.b64decode(base64string))

    def preprocess(self):
        image = Image.open(self.raw_data)
        resized = cv2.resize(np.array(image), None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
        thresh = cv2.adaptiveThreshold(resized, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)
        return thresh

    def get_text(self):
        preprocessed_image = self.preprocess()
        return image_to_string(preprocessed_image)

class ScanRemoteImage:
    def __init__(self, url):
        self.image_data = requests.get(url).content
    
    def get_text(self):
        image = Image.open(BytesIO(self.image_data))
        return image_to_string(image)
