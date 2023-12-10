# Simple MPR
 ![image](https://github.com/hausura/show_read_me/blob/main/Dicom.png)

## Introduction
- Môn: **Parallel Computing** 
- Khoa: [Khoa Toán Cơ Tin học](http://mim.hus.vnu.edu.vn/en)
- Trường: [Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội](http://hus.vnu.edu.vn/)


## I. How to set up
### 1. Clone master brand

```
git clone https://github.com/godwindk3/Parallel.git
```

### 2.Install packages
#### Back-End:
- Truy cập vào thư mục: “..\dicom_loader\Parallel\backend”
- Dùng lệnh
```
pip install -r requirement.txt
```
###### (file requirement.txt chứa các thư viện cần thiết bao gồm: fastapi, numpy, Pillow, pydicom, uvicorn, python, pyton.dotenv)

#### Front-End:
- Truy cập vào thư mục: “..\dicom_loader\Parallel\front-end”
- Dùng lệnh
```
npm install
```
### 3.Cài đặt biến môi trường 
- Chỉnh sửa file user.env


 ![image](https://github.com/hausura/show_read_me/blob/main/4.png)
- Lựa chọn port trống để chạy sever
- Dán đường dẫn của 1 trong các folder chứa các file DICOM(ở trong backend/data) hoặc data tự chọn
- Đổi tên user.env thành .env

## II. How to use 
### 1.Cách chạy
###### Đồng thời tạo 2 terminal trong VsCode:
- Terminal đầu tiên chạy front-end:
```
cd “./front-end”
```
- Chạy front-end bằng lệnh:
```
npm start
```
- Terminal thứ hai chạy sever back-end:
```
cd “./backend”
```
- Chạy sever back-end bằng lệnh:
```
uvicorn main:app –reload
```
### 2.Hiển thị ảnh MPR
- Trang sẽ hiển thị ảnh theo 3 hướng Coronal,Axial,Sagital
- Thanh kéo Adjust để xem các lớp ảnh theo từng hướng nhìn:

 ![image](https://github.com/hausura/show_read_me/blob/main/1.png)

 ### 3.Xoay ảnh
- Nhập số độ muốn xoay vào và ấn Fetch Data để hiển thị ảnh sau khi xoay:

 ![image](https://github.com/hausura/show_read_me/blob/main/5.png)

 - Kết quả sau khi xoay 3 ảnh sẽ được hiển thị thay thế các ảnh MPR cũ:
 
 ![image](https://github.com/hausura/show_read_me/blob/main/3.png)

 ### 4.Hiển thị thông tin bệnh nhân
 - Thông tin bệnh nhân bao gồm:

 ![image](https://github.com/hausura/show_read_me/blob/main/6.png)






     
