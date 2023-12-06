import os
import pydicom as dicom
from dotenv import load_dotenv
load_dotenv()
PATH=os.getenv("DICOMS_PATH")


def load_dicoms(path):
    dcm_name_paths = os.listdir(path)
    dcm_files = []
    for file_name in dcm_name_paths:
        full_path = os.path.join(path, file_name)
        temp_dicom = dicom.dcmread(full_path)
        dcm_files.append(temp_dicom)

    dcm_files = sorted(dcm_files, key = lambda file: file.ImagePositionPatient[2])
    return dcm_files
 
def main():
    dicoms=load_dicoms(PATH)
    print(dicoms[0])
if __name__ == "__main__":
    main()
