from flask import Flask, request, jsonify
from ocr import ScanRemoteImage

app = Flask(__name__)
app.debug=True

@app.route('/scan', methods=['POST'])
def scan():
    image_url = request.json
    print(image_url)
    # image = ScanRemoteImage(image_url)

    return_object = {
      "message": "Success",
      # "imageText": image.get_text()
    }
    
    return jsonify(return_object)


