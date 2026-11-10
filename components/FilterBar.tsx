import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import SearchBar from "./SearchBar.tsx";

interface FilterBarProps {
  keyword: string;
  onKeywordChange: (kw: string) => void;
  selectedLoaiHinh: string;
  onLoaiHinhChange: (val: string) => void;
  selectedBoiCanh: string;
  onBoiCanhChange: (val: string) => void;
  selectedDiaDanh: string;
  onDiaDanhChange: (val: string) => void;
  onReset: () => void;
  danhSachLoaiHinh: string[];
  danhSachBoiCanh: string[];
  danhSachDiaDanh: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  keyword,
  onKeywordChange,
  selectedLoaiHinh,
  onLoaiHinhChange,
  selectedBoiCanh,
  onBoiCanhChange,
  selectedDiaDanh,
  onDiaDanhChange,
  onReset,
  danhSachLoaiHinh,
  danhSachBoiCanh,
  danhSachDiaDanh,
}) => {
  const hasActiveFilters =
    Boolean(keyword) ||
    Boolean(selectedLoaiHinh) ||
    Boolean(selectedBoiCanh) ||
    Boolean(selectedDiaDanh);

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
      {/* Ô tìm kiếm */}
      <div>
        <SearchBar
          defaultValue={keyword}
          onSearch={onKeywordChange}
          placeholder="Tìm theo mã (F04-...), tên nghi lễ, tên bản địa, vật phẩm, người cung cấp..."
        />
      </div>

      {/* Các dropdown lọc */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Dropdown Loại hình */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">
            Loại hình di sản
          </label>
          <select
            value={selectedLoaiHinh}
            onChange={(e) => onLoaiHinhChange(e.target.value)}
            className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 text-stone-800 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800"
          >
            <option value="">Tất cả loại hình</option>
            {danhSachLoaiHinh.map((lh) => (
              <option key={lh} value={lh}>
                {lh}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Bối cảnh thu thập */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">
            Bối cảnh thu thập
          </label>
          <select
            value={selectedBoiCanh}
            onChange={(e) => onBoiCanhChange(e.target.value)}
            className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 text-stone-800 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800"
          >
            <option value="">Tất cả bối cảnh</option>
            {danhSachBoiCanh.map((bc) => (
              <option key={bc} value={bc}>
                {bc}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Địa danh hiện nay */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">
            Địa danh hiện nay
          </label>
          <select
            value={selectedDiaDanh}
            onChange={(e) => onDiaDanhChange(e.target.value)}
            className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-300 text-stone-800 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800"
          >
            <option value="">Tất cả địa danh</option>
            {danhSachDiaDanh.map((dd) => (
              <option key={dd} value={dd}>
                {dd}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Thanh trạng thái bộ lọc & nút Xoá bộ lọc */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <span>
            {hasActiveFilters
              ? "Đang áp dụng bộ lọc tùy biến"
              : "Hiển thị toàn bộ bản ghi"}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Xoá bộ lọc</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
