from flask import Flask, request, jsonify
app = Flask(__name__)
app.debug=True

@app.route('/scan', methods=['POST'])
def scan():
    image_url = request.json["image"]
    request_options = request.json["options"]

    return_object = {
      "message": f"Received request for {image_url}",
      "imageText": "lorem ipsum"
    }
    return jsonify(return_object)


