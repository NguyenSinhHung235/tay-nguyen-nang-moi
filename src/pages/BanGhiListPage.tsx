import React, { useState, useMemo, useEffect } from "react";
import {
  getAllBanGhi,
  getDanhSachLoaiHinh,
  getDanhSachBoiCanh,
  getDanhSachDiaDanh,
} from "@/lib/data.ts";
import type { BanGhi, LoaiHinhDiSan } from "@/lib/types.ts";
import BanGhiCard from "@/components/BanGhiCard.tsx";
import FilterBar from "@/components/FilterBar.tsx";
import EmptyState from "@/components/EmptyState.tsx";
import { ArrowUpDown } from "lucide-react";

interface BanGhiListPageProps {
  initialSearch?: string;
  onNavigate: (path: string) => void;
}

type SortOption = "ma" | "dia_danh" | "loai_hinh";

export const BanGhiListPage: React.FC<BanGhiListPageProps> = ({
  initialSearch = "",
  onNavigate,
}) => {
  const allRecords = getAllBanGhi();

  const [keyword, setKeyword] = useState(initialSearch);
  const [selectedLoaiHinh, setSelectedLoaiHinh] = useState("");
  const [selectedBoiCanh, setSelectedBoiCanh] = useState("");
  const [selectedDiaDanh, setSelectedDiaDanh] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("ma");

  useEffect(() => {
    if (initialSearch !== undefined) {
      setKeyword(initialSearch);
    }
  }, [initialSearch]);

  const danhSachLoaiHinh = useMemo(() => getDanhSachLoaiHinh(), []);
  const danhSachBoiCanh = useMemo(() => getDanhSachBoiCanh(), []);
  const danhSachDiaDanh = useMemo(() => getDanhSachDiaDanh(), []);

  const handleResetFilters = () => {
    setKeyword("");
    setSelectedLoaiHinh("");
    setSelectedBoiCanh("");
    setSelectedDiaDanh("");
  };

  // Filter & Search logic
  const filteredRecords = useMemo(() => {
    return allRecords.filter((b: BanGhi) => {
      // Keyword
      if (keyword.trim()) {
        const k = keyword.toLowerCase().trim();
        const matchesKeyword =
          b.ma_ban_ghi.toLowerCase().includes(k) ||
          b.ten_theo_danh_muc.toLowerCase().includes(k) ||
          b.ten_goi_ban_dia.toLowerCase().includes(k) ||
          b.mo_ta.toLowerCase().includes(k) ||
          b.vat_pham_tuong_nha_mo.toLowerCase().includes(k) ||
          b.nguoi_cung_cap.toLowerCase().includes(k) ||
          b.dia_danh_hien_nay.toLowerCase().includes(k) ||
          b.dia_danh_tai_thoi_diem.toLowerCase().includes(k);

        if (!matchesKeyword) return false;
      }

      // Loại hình
      if (selectedLoaiHinh) {
        if (!b.loai_hinh || !b.loai_hinh.includes(selectedLoaiHinh as LoaiHinhDiSan)) {
          return false;
        }
      }

      // Bối cảnh
      if (selectedBoiCanh) {
        if (b.boi_canh_thu_thap !== selectedBoiCanh) return false;
      }

      // Địa danh
      if (selectedDiaDanh) {
        if (!b.dia_danh_hien_nay.toLowerCase().includes(selectedDiaDanh.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [allRecords, keyword, selectedLoaiHinh, selectedBoiCanh, selectedDiaDanh]);

  // Sort logic
  const sortedRecords = useMemo(() => {
    const list = [...filteredRecords];
    if (sortBy === "ma") {
      list.sort((a, b) => a.ma_ban_ghi.localeCompare(b.ma_ban_ghi));
    } else if (sortBy === "dia_danh") {
      list.sort((a, b) => a.dia_danh_hien_nay.localeCompare(b.dia_danh_hien_nay));
    } else if (sortBy === "loai_hinh") {
      const getLh = (r: BanGhi) => r.loai_hinh?.[0] || "";
      list.sort((a, b) => getLh(a).localeCompare(getLh(b)));
    }
    return list;
  }, [filteredRecords, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header trang */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Danh sách bản ghi ({allRecords.length} bản ghi)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Hồ sơ số 17 trường dữ liệu về nghi lễ vòng đời và lễ bỏ mả của người Ba Na tại Kông Chro.
          </p>
        </div>

        {/* Dropdown sắp xếp */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-stone-500" />
          <label htmlFor="sort-select" className="text-xs font-semibold text-stone-600">
            Sắp xếp:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs bg-white border border-stone-300 text-stone-800 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-amber-800"
          >
            <option value="ma">Mã bản ghi</option>
            <option value="dia_danh">Địa danh</option>
            <option value="loai_hinh">Loại hình</option>
          </select>
        </div>
      </div>

      {/* FilterBar */}
      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        selectedLoaiHinh={selectedLoaiHinh}
        onLoaiHinhChange={setSelectedLoaiHinh}
        selectedBoiCanh={selectedBoiCanh}
        onBoiCanhChange={setSelectedBoiCanh}
        selectedDiaDanh={selectedDiaDanh}
        onDiaDanhChange={setSelectedDiaDanh}
        onReset={handleResetFilters}
        danhSachLoaiHinh={danhSachLoaiHinh}
        danhSachBoiCanh={danhSachBoiCanh}
        danhSachDiaDanh={danhSachDiaDanh}
      />

      {/* Thông tin số lượng sau lọc */}
      {allRecords.length > 0 && (
        <div className="text-xs text-stone-500 px-1 flex items-center justify-between">
          <span>
            Tìm thấy <strong>{sortedRecords.length}</strong> bản ghi phù hợp
          </span>
          {sortedRecords.length !== allRecords.length && (
            <span>(trên tổng số {allRecords.length} bản ghi trong hồ sơ)</span>
          )}
        </div>
      )}

      {/* Danh sách bản ghi hoặc Empty State */}
      {sortedRecords.length === 0 ? (
        <EmptyState
          title={allRecords.length === 0 ? "Chưa có bản ghi nào trong hồ sơ" : "Không tìm thấy bản ghi"}
          message={
            allRecords.length === 0
              ? "Tệp /data/disan.json hiện đang để trống (mảng []). Vui lòng nạp 15 bản ghi thật vào disan.json để hiển thị tại đây."
              : "Không tìm thấy bản ghi nào khớp với bộ lọc hiện tại. Bạn có thể thử xoá bớt từ khoá hoặc chọn tiêu chí lọc khác."
          }
          actionLabel={allRecords.length === 0 ? undefined : "Xoá bộ lọc"}
          onAction={allRecords.length === 0 ? undefined : handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecords.map((item: BanGhi) => (
            <BanGhiCard
              key={item.ma_ban_ghi}
              banGhi={item}
              onNavigate={(ma: string) => onNavigate(`/ban-ghi/${encodeURIComponent(ma)}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BanGhiListPage;
