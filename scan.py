from PIL import Image
from pytesseract import image_to_string
from io import BytesIO
import requests
import cv2
import base64
import numpy as np

class ScanImage:
    def __init__(self, base64string=None, image_url=None):
        if base64string is not None:
            self.raw_data = BytesIO(base64.b64decode(base64string))
        else: 
            self.raw_data = BytesIO(requests.get(image_url).content)

    def preprocess(self):
        image = Image.open(self.raw_data)
        image_array = np.array(image)
        (height, width) = self.get_dimensions(image_array)
        resized = cv2.resize(image_array, (width * 2, height * 2), fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
        greyscale = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(greyscale, 127, 255,cv2.THRESH_OTSU)[1]
        return self.unsharp_mask(thresh)

    def get_text(self, lang):
        preprocessed_image = self.preprocess()
        language_map = {
            "English": "eng",
            "Spanish": "spa",
            "German": "deu",
            "French": "fra",
            "Italian": "ita",
            "Simplified Chinese": "chi_sim",
            "Traditional Chinese": "chi_tra",
            "Russian": "rus",
        }
        return image_to_string(preprocessed_image, lang=language_map[lang])

    @staticmethod
    def unsharp_mask(image, kernel_size=(5, 5), sigma=1.0, amount=1.0, threshold=0):
        blurred = cv2.GaussianBlur(image, kernel_size, sigma)
        sharpened = float(amount + 1) * image - float(amount) * blurred
        sharpened = np.maximum(sharpened, np.zeros(sharpened.shape))
        sharpened = np.minimum(sharpened, 255 * np.ones(sharpened.shape))
        sharpened = sharpened.round().astype(np.uint8)
        if threshold > 0:
            low_contrast_mask = np.absolute(image - blurred) < threshold
            np.copyto(sharpened, image, where=low_contrast_mask)
        return sharpened

    @staticmethod
    def save_local(cv2_data):
        cv2.imwrite('test.png', cv2_data)

    @staticmethod 
    def get_dimensions(nparray):
        dimensions = nparray.shape
        return (dimensions[0], dimensions[1])
