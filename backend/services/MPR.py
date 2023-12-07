from dotenv import load_dotenv
import pydicom as dicom
import numpy as np
import os

load_dotenv()
PATH = os.getenv("DICOMS_PATH")

mpr_instance = None

# singleton pattern


class MPR:
    def __init__(self, path):
        self.data = load_dicoms(path)
        self.images = self.load_images(self.data)

    def load_images(self, dicoms):
        volume_data = np.stack(
            [slice.pixel_array for slice in dicoms], axis=-1)
        return volume_data

    def get_axial(self, z):
        if (z < 0 or z >= self.images.shape[2]):
            raise Exception("Invalid index!")
        return self.images[:, :, z]

    def get_sagittal(self, y):
        if (y < 0 or y >= self.images.shape[1]):
            raise Exception("Invalid index!")
        return self.images[:, y, :]

    def get_coronal(self, x):
        if (x < 0 or x >= self.images.shape[0]):
            raise Exception("Invalid index!")
        return self.images[x, :, :]


def get_MPR_instance(path_to_dicom_file=PATH):
    global mpr_instance
    if mpr_instance is None:
        mpr_instance = MPR(path_to_dicom_file)

    return mpr_instance


def load_dicoms(path):
    dcm_name_paths = os.listdir(path)
    dcm_files = []
    for file_name in dcm_name_paths:
        full_path = os.path.join(path, file_name)
        temp_dicom = dicom.dcmread(full_path)
        dcm_files.append(temp_dicom)

    dcm_files = sorted(
        dcm_files, key=lambda file: file.ImagePositionPatient[2])
    return dcm_files
