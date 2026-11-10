import rawData from "@/data/disan.json";
import type { BanGhi, LoaiHinhDiSan } from "./types.ts";

// Ép kiểu an toàn từ dữ liệu JSON
const banGhiList: BanGhi[] = Array.isArray(rawData) ? (rawData as BanGhi[]) : [];

export function getAllBanGhi(): BanGhi[] {
  return banGhiList;
}

export function getBanGhiByMa(ma: string): BanGhi | undefined {
  if (!ma) return undefined;
  const decodedMa = decodeURIComponent(ma).trim().toLowerCase();
  return banGhiList.find(
    (b) => b.ma_ban_ghi.toLowerCase().trim() === decodedMa
  );
}

export function searchBanGhi(keyword: string): BanGhi[] {
  const k = keyword.toLowerCase().trim();
  if (!k) return banGhiList;
  return banGhiList.filter(
    (b) =>
      b.ma_ban_ghi.toLowerCase().includes(k) ||
      b.ten_theo_danh_muc.toLowerCase().includes(k) ||
      b.ten_goi_ban_dia.toLowerCase().includes(k) ||
      b.mo_ta.toLowerCase().includes(k) ||
      b.vat_pham_tuong_nha_mo.toLowerCase().includes(k) ||
      b.nguoi_cung_cap.toLowerCase().includes(k) ||
      b.dia_danh_hien_nay.toLowerCase().includes(k) ||
      b.dia_danh_tai_thoi_diem.toLowerCase().includes(k)
  );
}

export function filterBanGhi(filters: {
  loai_hinh?: string;
  boi_canh?: string;
  dia_danh?: string;
}): BanGhi[] {
  return banGhiList.filter((b) => {
    if (filters.loai_hinh && !b.loai_hinh.includes(filters.loai_hinh as LoaiHinhDiSan))
      return false;
    if (filters.boi_canh && b.boi_canh_thu_thap !== filters.boi_canh)
      return false;
    if (filters.dia_danh && !b.dia_danh_hien_nay.toLowerCase().includes(filters.dia_danh.toLowerCase()))
      return false;
    return true;
  });
}

export function getDanhSachLoaiHinh(): string[] {
  const set = new Set<string>();
  banGhiList.forEach((b) => b.loai_hinh?.forEach((l) => set.add(l)));
  return Array.from(set);
}

export function getDanhSachBoiCanh(): string[] {
  const set = new Set<string>();
  banGhiList.forEach((b) => {
    if (b.boi_canh_thu_thap) set.add(b.boi_canh_thu_thap);
  });
  return Array.from(set);
}

export function getDanhSachDiaDanh(): string[] {
  const set = new Set<string>();
  banGhiList.forEach((b) => {
    if (b.dia_danh_hien_nay) set.add(b.dia_danh_hien_nay.trim());
  });
  return Array.from(set);
}
