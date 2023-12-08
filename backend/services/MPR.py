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
        self.size = self.images.shape

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

    def rotate_z(self, degree):
        result = []

        for i in range(self.size[2]):
            rotate_tool = RotateTool(self.images[:, :, i])
            # self.images[:, :, i] = rotate_tool.set_degree(degree).rotate_img()
            result.append(rotate_tool.set_degree(degree).rotate_img())
  
        
        self.images = np.stack(result, axis=-1)


class RotateTool:
    def __init__(self, img, degree=0):
        self.img = img
        self.degree = int(degree)
        self.r_height, self.r_width = self.__get_rotated_shape()

    def __rotation_mat(self, degree):
        theta = degree * (np.pi / 180)

        sin_theta = np.sin(theta)
        cos_theta = np.cos(theta)

        return np.array([[cos_theta, -sin_theta], [sin_theta, cos_theta]])
    
    def set_degree(self, deg):
        self.degree = deg
        return self
    
    def __get_rotated_shape(self):
        h_height = self.img.shape[0]//2
        h_width = self.img.shape[1]//2

        new_corners = self.__rotation_mat(self.degree) @ np.array([[-h_width, h_width, h_width],
                                                                   [h_height, h_height, -h_height]])
        r_height = int(max(abs(new_corners[0]))) * 2
        r_width = int(max(abs(new_corners[1]))) * 2

        return (r_height, r_width)
    
    def rotate_img(self):
        h_width = self.img.shape[1]//2
        h_height = self.img.shape[0]//2
        hr_height = self.r_height//2
        hr_width = self.r_width//2        

        r_img = np.zeros((self.r_height, self.r_width))
        ids = np.indices(r_img.shape)

        yr_ids = ids[0].flatten()
        xr_ids = ids[1].flatten()

        yr_c_ids = yr_ids - hr_height
        xr_c_ids = xr_ids - hr_width

        xc, yc = (self.__rotation_mat(-self.degree)@np.row_stack((xr_c_ids, yr_c_ids))).astype(np.int32)
        
        x = xc + h_width
        y = yc + h_height

        bool_arr = np.logical_and(np.abs(xc) < h_width, np.abs(yc) < h_height)

        r_img[yr_ids[bool_arr], xr_ids[bool_arr]] = self.img[y[bool_arr], x[bool_arr]]

        return r_img
    

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


# def main():
#     import matplotlib.pyplot as plt

#     dicom = get_MPR_instance()
#     # dicom.rotate_z(30)
#     axial = plt.subplot(1, 3, 1)

#     r_tool1 = get_rotate_tool(dicom.get_axial(150), 30)

#     plt.imshow(r_tool1.rotate_img())
#     sagittal = plt.subplot(1, 3, 2)

#     r_tool2 = get_rotate_tool(dicom.get_axial(1), 30)
#     plt.imshow(r_tool2.rotate_img())
#     plt.show()


# if __name__ == "__main__":
#     main()