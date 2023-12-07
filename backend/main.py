from fastapi import FastAPI, Response
import numpy as np
from PIL import Image
import pydicom
import io
import uvicorn
from dotenv import load_dotenv
import os
from services.MPR import get_MPR_instance

app = FastAPI()
load_dotenv()
PORT = int(os.getenv("PORT"))

@app.get("/")
def hello_world():
    return "Hello World"

@app.get("/test_image")
async def get_image_test():
    file_path = os.path.join("data", "PAT034", "D0001.dcm")
    img_array  = pydicom.dcmread(f"{file_path}").pixel_array.astype(float)
    rescaled_image = (np.maximum(img_array, 0)/img_array.max()) * 255
    img = Image.fromarray(np.uint8(rescaled_image))

    with io.BytesIO() as buf:
        img.save(buf, format="PNG")
        img_bytes = buf.getvalue()
        # print(img_bytes)

    return Response(img_bytes)

async def get_image(data):
    
    img_array  = data.astype(float)
    rescaled_image = (np.maximum(img_array, 0)/img_array.max()) * 255
    img = Image.fromarray(np.uint8(rescaled_image))

    with io.BytesIO() as buf:
        img.save(buf, format="PNG")
        img_bytes = buf.getvalue()
        # print(img_bytes)

    return Response(img_bytes)


@app.get("/axial/{z}")
async def get_axial_img(z):
    mpr = get_MPR_instance()
    return await get_image(mpr.get_axial(int(z)))

@app.get("/sagittal/{y}")
async def get_sagittal_img(y):
    mpr = get_MPR_instance()
    return await get_image(mpr.get_sagittal(int(y)))

@app.get("/coronal/{x}")
async def get_coronal_img(x):
    mpr = get_MPR_instance()
    return await get_image(mpr.get_coronal(int(x)))
    


def main():
    uvicorn.run(app, port=PORT)

if __name__ == "__main__":
    main()