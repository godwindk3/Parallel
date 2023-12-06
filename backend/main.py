from fastapi import FastAPI, Response
import numpy as np
from PIL import Image
import pydicom
import io
import uvicorn
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()
PORT = int(os.getenv("PORT"))

@app.get("/")
def hello_world():
    return "Hello World"

@app.get("/image")
def get_image():
    file_path = os.path.join("data", "PAT034", "D0001.dcm")
    img_array  = pydicom.dcmread(file_path).pixel_array.astype(float)
    rescaled_image = (np.maximum(img_array, 0)/img_array.max()) * 255
    img = Image.fromarray(np.uint8(rescaled_image))

    with io.BytesIO() as buf:
        img.save(buf, format="PNG")
        img_bytes = buf.getvalue()
        # print(img_bytes)

    return Response(img_bytes)


def main():
    uvicorn.run(app, port=PORT)

if __name__ == "__main__":
    main()