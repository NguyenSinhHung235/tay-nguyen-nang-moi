import React from "react";
import { MapPin, ChevronRight } from "lucide-react";
import type { BanGhi } from "@/lib/types.ts";
import BoiCanhBadge from "./BoiCanhBadge.tsx";

interface BanGhiCardProps {
  banGhi: BanGhi;
  onNavigate?: (ma: string) => void;
}

export const BanGhiCard: React.FC<BanGhiCardProps> = ({ banGhi, onNavigate }) => {
  const href = `/ban-ghi/${encodeURIComponent(banGhi.ma_ban_ghi)}`;

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(banGhi.ma_ban_ghi);
    }
  };

  return (
    <article className="flex flex-col justify-between bg-white rounded-xl border border-stone-200 hover:border-amber-800/40 p-5 transition-all duration-200 hover:shadow-md group">
      <div>
        {/* Hàng trên: Bối cảnh badge + Mã bản ghi monospace */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <BoiCanhBadge boiCanh={banGhi.boi_canh_thu_thap} />
          <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded tracking-wide font-medium">
            {banGhi.ma_ban_ghi}
          </span>
        </div>

        {/* Tên theo danh mục (H3 / H4 đậm) */}
        <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-950 transition-colors mb-1 leading-snug">
          <a href={href} onClick={handleClick}>
            {banGhi.ten_theo_danh_muc}
          </a>
        </h3>

        {/* Tên gọi bản địa (in nghiêng) */}
        <p className="text-sm italic text-stone-600 mb-2 font-serif">
          {banGhi.ten_goi_ban_dia || "Chưa có tên bản địa ghi nhận"}
        </p>

        {/* Dân tộc + Địa danh hiện nay */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
          <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span className="font-medium text-stone-700">{banGhi.dan_toc_cong_dong}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{banGhi.dia_danh_hien_nay}</span>
        </div>

        {/* Trích đoạn mo_ta (max 3 dòng) */}
        <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
          {banGhi.mo_ta || "Chưa có mô tả chi tiết."}
        </p>
      </div>

      {/* Chân thẻ: Nút Xem chi tiết */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-xs text-stone-400">
          {banGhi.loai_hinh?.[0] || "Di sản phi vật thể"}
        </span>

        <a
          href={href}
          onClick={handleClick}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-700 transition-colors"
        >
          <span>Xem chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};

export default BanGhiCard;
