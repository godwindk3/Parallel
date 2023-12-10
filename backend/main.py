from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
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

mpr = get_MPR_instance()
original_img = mpr.images

@app.get("/")
def hello_world():
    return "Hello World"

@app.get("/image")
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
    # mpr = get_MPR_instance()
    return await get_image(mpr.get_axial(int(z)))

@app.get("/sagittal/{y}")
async def get_sagittal_img(y):
    # mpr = get_MPR_instance()
    return await get_image(mpr.get_sagittal(int(y)))

@app.get("/coronal/{x}")
async def get_coronal_img(x):
    # mpr = get_MPR_instance()
    return await get_image(mpr.get_coronal(int(x)))

@app.get("/rotate_z/{degree}")
async def rotate_img(degree=0):
    # mpr = get_MPR_instance()
    mpr.images = original_img
    if (degree == 0):
        return "Rotated!"
    mpr.rotate_z_parallel(int(degree))

    return "Rotated!"

@app.get("/size")
async def get_mpr_size():
    # mpr = get_MPR_instance()
    size = mpr.get_mpr_size()
    return {
        "x" : size[0],
        "y" : size[1],
        "z" : size[2]
    }

@app.get("/get_info")
async def get_pat_data():
    # mpr = get_MPR_instance()
    return JSONResponse(mpr.get_info())


def main():
    uvicorn.run(app, port=PORT)

if __name__ == "__main__":
    main()