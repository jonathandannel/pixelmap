from PIL import Image
from pytesseract import image_to_string
from io import BytesIO
import requests
import cv2
import base64
import numpy as np

class ScanBase64Image:
    def __init__(self, base64string, filetype=None):
        self.raw_data = BytesIO(base64.b64decode(base64string))

    def preprocess(self):
        image = Image.open(self.raw_data)
        image_array = np.array(image)
        (height, width) = self.get_dimensions(image_array)
        resized = cv2.resize(image_array, (width * 2, height * 2), fx=4, fy=4, interpolation=cv2.INTER_CUBIC)
        greyscale = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(greyscale, 0, 255,cv2.THRESH_OTSU)[1]
        return thresh

    def get_text(self):
        preprocessed_image = self.preprocess()
        # Testing
        # self.save_local(preprocessed_image)
        return image_to_string(preprocessed_image)

    @staticmethod
    def save_local(cv2_data):
        cv2.imwrite('test.png', cv2_data)

    @staticmethod 
    def get_dimensions(nparray):
        dimensions = nparray.shape
        return (dimensions[0], dimensions[1])

class ScanRemoteImage:
    def __init__(self, url):
        self.image_data = requests.get(url).content
    
    def get_text(self):
        image = Image.open(BytesIO(self.image_data))
        return image_to_string(image)
