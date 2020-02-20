from flask import Flask, request, jsonify
from ocr import ScanRemoteImage

app = Flask(__name__)
app.debug=True

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    base64_string = data["base64"]

    print(base64_string)

    # image = ScanRemoteImage(image_url)
    # image_text = image.get_text()
    
    return jsonify({
      "message": "Success",
      "imageText": "Coming soon!"
    })


