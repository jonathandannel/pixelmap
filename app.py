from flask import Flask, request, jsonify
from scan import ScanImage
from pprint import pprint

app = Flask(__name__)
app.debug=True

@app.route('/scan', methods=['POST'])
def scan():
    image = None
    req = request.get_json()
    lang = req['language']
    
    if "base64" in req:
      image = ScanImage(base64string=req["base64"])
    if "url" in req:
      image = ScanImage(image_url=req["url"])

    image_text = image.get_text(lang)

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


    


