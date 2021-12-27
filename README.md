# MNM-Project-Shop-Fashion
## Bài tập lớn môn Mã nguồn mở của nhóm 12
##### _Link deploy trên heroku: https://avnendv.herokuapp.com/_
Đọc hướng dẫn trong docs trước khi thực hiện dự án

## Cấu trúc repo
- docs: Chứa các tài liệu khi làm bài tập lớn, và hướng dẫn khi thực hiện bài tập lớn
- schedules: Chứa phân công công việc
- src: Source code bài tập lớn
    - src/BE: source code để build của BTL
    - src/FE: chứa source code gao diện của fontend và backend
    - src/Báo cáo: chứa các file báo cáo BTL
    - src/PTTK: chứa các file thiết kế
    - src/Slide: file slide thuyết trình

---

## Cài đặt project trên local
1. Tải repo về máy
Mở git base ở vị trí muốn tải repo về. Sau đó gõ lệnh bên dưới:
    ```
        git clone https://github.com/a2xvodoi/MNM-Project-Shop-Fashion.git
    ```
2. Di chuyển vào thư mục source code chính của BTL:
    ```
        cd MNM-Project-Shop-Fashion/src/BE/
    ```
3. Cấu hình cần thiết
    - Cài đặt các thư viện cho BTL
    ```
        npm install
    ```
    - Cấu hình env
    Tạo 1 file .env có các giá trị giống như trong file .env.example
        _Cấu hình connect với mongodb cloud_
        DB_CONNECTION = 
        DB_DATABASENAME = 
        DB_USERNAME = 
        DB_PASSWORD = 
        
        _Cấu hình secret_
        SECRET = AVNENDV_SECRET
        - secret là một chuỗi bất kì
        
        _Cấu hình mail_
        MAIL_STMP = 
        MAIL_POST = 
        MAIL_USER = 
        MAIL_PASSWORD = 

4. Chạy chương trình
    ```
        npm start
        sau đó truy cập với localhost
        http://localhost:3000
    ```
