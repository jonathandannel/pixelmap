from flask import Flask, request, jsonify
from ocr import ScanBase64Image, ScanRemoteImage

app = Flask(__name__)
app.debug=True

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    image = ScanBase64Image(data["base64"])
    return jsonify({
      "message": "Success",
      "imageText": image.get_text()
    })


