from flask import Flask, request, jsonify
from scan import ScanImage
from pprint import pprint

app = Flask(__name__)
app.debug=True

@app.route('/scan', methods=['POST'])
def scan():
    image = None
    data = request.get_json()

    if "base64" in data and not "url" in data":
      image = ScanImage(base64string=data["base64"])
    if "url" in data and not "base64" in data:
      image = ScanImage(image_url=data["url"])

    image_text = image.get_text()

    if image_text:
      return jsonify({
      "message": "Success",
      "imageText": image_text
    }), 200
    
    else:
      return jsonify({
        "message": "Failure",
        "imageText": None
      }), 400


    


