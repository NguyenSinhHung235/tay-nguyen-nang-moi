export type LoaiHinhDiSan =
  | "Tập quán xã hội và tín ngưỡng"
  | "Nghệ thuật trình diễn dân gian"
  | "Tri thức dân gian"
  | "Ngôn ngữ, chữ viết"
  | "Văn học dân gian"
  | "Lễ hội truyền thống"
  | "Nghề thủ công truyền thống";

export type BoiCanhThuThap =
  | "Nghi lễ thật của cộng đồng"
  | "Buổi tập của câu lạc bộ"
  | "Chương trình biểu diễn phục vụ du lịch"
  | "Phỏng vấn nghệ nhân"
  | "Tư liệu lưu trữ";

export interface NguonTuLieu {
  ten: string; // Tên nguồn, ví dụ "Báo Gia Lai"
  tac_gia?: string; // Tác giả (nếu có)
  nam?: string; // Năm công bố
  url?: string; // URL mở được (nếu có)
  chinh_thong: boolean; // true nếu là nguồn chính thống (Phụ lục 07)
}

export interface BanGhi {
  // 1. Mã bản ghi, ví dụ "F04-00001"
  ma_ban_ghi: string;

  // 2. Tên theo danh mục, ví dụ "Lễ bỏ mả (Pơ thi) của người Ba Na"
  ten_theo_danh_muc: string;

  // 3. Tên gọi bản địa, ví dụ "Pơ thi / Bỏ mả"
  ten_goi_ban_dia: string;

  // 4. Loại hình (có thể nhiều loại)
  loai_hinh: Array<LoaiHinhDiSan>;

  // 5. Vùng văn hoá, ví dụ "Tây Nguyên"
  vung_van_hoa: string;

  // 6. Dân tộc và cộng đồng cụ thể
  dan_toc_cong_dong: string;

  // 7. Địa danh HIỆN NAY (sau 01/7/2025, KHÔNG ghi cấp huyện)
  dia_danh_hien_nay: string;

  // 8. Địa danh TẠI THỜI ĐIỂM TƯ LIỆU (giữ nguyên tên gốc + năm)
  dia_danh_tai_thoi_diem: string;

  // 9. Mô tả (theo trình tự, dùng từ của cộng đồng)
  mo_ta: string;

  // 10. Trình tự nghi lễ (mảng các bước có thứ tự)
  trinh_tu_nghi_le: string[];

  // 11. Chú giải vật phẩm và tượng nhà mồ
  vat_pham_tuong_nha_mo: string;

  // 12. Phần thiêng KHÔNG được ghi hình
  phan_thieng_khong_ghi_hinh: string;

  // 13. Bối cảnh thu thập: nghi lễ thật / buổi tập / chương trình biểu diễn
  boi_canh_thu_thap: BoiCanhThuThap;

  // 14. Người cung cấp (đủ để ghi công, không ghi SĐT/địa chỉ nhà)
  nguoi_cung_cap: string;

  // 15. Phạm vi được phép sử dụng
  pham_vi_duoc_phep: string;

  // 16. Nguồn tư liệu (mảng, tối thiểu 3 nguồn, ≥ 1 nguồn chính thống)
  nguon_tu_lieu: Array<NguonTuLieu>;

  // 17. Điểm chưa rõ (ghi thật phần chưa chắc)
  diem_chua_ro: string;
}

export interface ChatSourceItem {
  ma_ban_ghi: string;
  cong_dong: string;
  dia_danh: string;
  nguon: string;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSourceItem[];
}
