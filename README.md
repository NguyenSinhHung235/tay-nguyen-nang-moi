# Taynguyennangmoi – Hồ Sơ Số Di Sản Văn Hoá Tây Nguyên
Nghi lễ vòng đời và lễ bỏ mả (Pơ thi) – Đề tài F04

## 1. Giới thiệu dự án
Ứng dụng web phục vụ việc lưu trữ, tra cứu và số hoá thông tin về thực hành nghi lễ vòng đời và lễ bỏ mả của cộng đồng người Ba Na tại Làng Pyang, thị trấn Kông Chro, tỉnh Gia Lai. Đây là sản phẩm thực tập phi lợi nhuận thuộc Chương trình Thực tập sinh Đợt 15 (FPT Polytechnic và IMTA TECH) do sinh viên Nguyễn Sinh Hùng (MSV: PH70147, Nhóm 2) thực hiện.

## 2. Yêu cầu hệ thống
- Node.js 18.0 trở lên
- Trình quản lý gói npm (hoặc yarn / pnpm)
- Tài khoản Vercel (nếu muốn deploy lên đám mây)
- Khoá Google Gemini API

## 3. Cài đặt và chạy trên máy cục bộ (Local)
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Tạo tệp cấu hình biến môi trường
cp .env.local.example .env.local

# 3. Mở .env.local và điền giá trị GEMINI_API_KEY
# GEMINI_API_KEY="khoa_api_cua_ban"

# 4. Khởi chạy máy chủ phát triển
npm run dev
```
Ứng dụng sẽ hoạt động tại địa chỉ: `http://localhost:3000`.

## 4. Hướng dẫn nạp dữ liệu di sản (disan.json)
Tệp dữ liệu lưu trữ tại `/data/disan.json`. Mặc định tệp là một mảng rỗng `[]`.
Để nạp các bản ghi thật vào hồ sơ:
1. Mở tệp `/data/disan.json`.
2. Dán mảng JSON gồm tối thiểu 15 bản ghi theo đúng định dạng 17 trường được định nghĩa trong `/lib/types.ts`.
3. Lưu tệp và chạy lại ứng dụng (hoặc redeploy trên Vercel). Toàn bộ danh sách, bộ lọc, thẻ chi tiết và trợ lý Gemini sẽ tự động nhận diện dữ liệu mới.

### Tóm tắt cấu trúc 17 trường dữ liệu
1. `ma_ban_ghi`: Mã định danh (ví dụ: "F04-00001")
2. `ten_theo_danh_muc`: Tên gọi theo danh mục di sản quốc gia
3. `ten_goi_ban_dia`: Tên gọi bằng tiếng dân tộc bản địa (ví dụ: "Pơ thi / Bỏ mả")
4. `loai_hinh`: Mảng phân loại di sản phi vật thể
5. `vung_van_hoa`: Vùng văn hoá (Tây Nguyên)
6. `dan_toc_cong_dong`: Dân tộc và cộng đồng cụ thể (Ba Na, Làng Pyang)
7. `dia_danh_hien_nay`: Địa danh hành chính mới (sau 01/7/2025, không ghi cấp huyện)
8. `dia_danh_tai_thoi_diem`: Địa danh tại thời điểm thu thập tư liệu (tên gốc + năm)
9. `mo_ta`: Mô tả chi tiết trình tự nghi lễ bằng thuật ngữ cộng đồng
10. `trinh_tu_nghi_le`: Danh sách các bước nghi lễ theo thứ tự thời gian
11. `vat_pham_tuong_nha_mo`: Chú giải hiện vật, tượng gỗ và kiến trúc nhà mồ
12. `phan_thieng_khong_ghi_hinh`: Giới hạn bảo mật về phần nghi thức thiêng
13. `boi_canh_thu_thap`: Nghi lễ thật cộng đồng / Diễn xướng du lịch / Tập luyện / Phỏng vấn
14. `nguoi_cung_cap`: Tên người cung cấp (ẩn danh nhân thân theo Luật 91/2025/QH15)
15. `pham_vi_duoc_phep`: Quy định phạm vi sử dụng tư liệu phi thương mại
16. `nguon_tu_lieu`: Mảng danh sách tối thiểu 3 nguồn trích dẫn
17. `diem_chua_ro`: Các điểm cần tiếp tục nghiên cứu điền dã xác minh

## 5. Hướng dẫn triển khai lên Vercel
1. Đẩy mã nguồn lên kho lưu trữ GitHub của bạn.
2. Đăng nhập Vercel và chọn **Add New Project** -> **Import Git Repository**.
3. Tại phần **Environment Variables**, cấu hình biến môi trường:
   - Key: `GEMINI_API_KEY`
   - Value: Khoá API Gemini của bạn
   - Chọn áp dụng cho cả 3 môi trường: Production, Preview, Development.
4. Nhấn **Deploy** để hoàn tất triển khai.
