# pixelmap

### An easy way to extract text data from images on your phone

## Features

- Image processing is done server side on a remote Python microservice, so the app loads quickly and is small in size
- Multiple language support
- Users can pick images from their camera roll, take a photo with their camera, or paste in a remote link to an image

## Screenshots

### Home

<img src="https://github.com/jonathandannel/pixelmap/blob/master/doc/home_view.jpg" width="350px">

### Picking from gallery

<img src="https://github.com/jonathandannel/pixelmap/blob/master/doc/pick_and_crop.jpg" width="350px">

### Processing

<img src="https://github.com/jonathandannel/pixelmap/blob/master/doc/process_photo.jpg" width="350px">

### Result

<img src="https://github.com/jonathandannel/pixelmap/blob/master/doc/processed_text.jpg" width="350px">

### Multiple languages supported

<img src="https://github.com/jonathandannel/pixelmap/blob/master/doc/process_chinese.jpg" width="350px">

<img src="https://github.com/jonathandannel/pixelmap/blob/master/doc/chinese_text.jpg" width="350px">

## TODO:

This is a work in progress, and is currently being developed!

- Create docker container for building client APKs/deploying API
- Add multiple language `tessdata` to pytesseract path in API container
- Add some interaction to text data
- Add some nice loading states
- Work on the actual OCR and preprocessing to fix common text read errors
- Upload to Google Play/App Store
