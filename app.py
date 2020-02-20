from flask import Flask, request, jsonify
from ocr import ScanRemoteImage

app = Flask(__name__)
app.debug=True

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    print(data)
    # with open('somefile.txt', 'w') as the_file:
    #     the_file.write(type(data))
    # image = ScanRemoteImage(image_url)

    return_object = {
      "message": "Success",
      # "imageText": image.get_text()
    }
    
    return jsonify(return_object)


