import React from "react";
import type { BoiCanhThuThap } from "@/lib/types.ts";

interface BoiCanhBadgeProps {
  boiCanh: BoiCanhThuThap | string;
  showFullLabel?: boolean;
}

export const BoiCanhBadge: React.FC<BoiCanhBadgeProps> = ({
  boiCanh,
  showFullLabel = false,
}) => {
  const isRealRitual = boiCanh === "Nghi lễ thật của cộng đồng";
  const isTourism = boiCanh === "Chương trình biểu diễn phục vụ du lịch";

  let colorClasses = "bg-stone-100 text-stone-700 border-stone-200";
  let label = boiCanh;

  if (isRealRitual) {
    colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-300";
    label = showFullLabel ? "Nghi lễ thật của cộng đồng" : "Nghi lễ thật";
  } else if (isTourism) {
    colorClasses = "bg-amber-50 text-amber-900 border-amber-300";
    label = showFullLabel ? "Chương trình biểu diễn phục vụ du lịch" : "Mô phỏng du lịch";
  } else if (boiCanh === "Buổi tập của câu lạc bộ") {
    colorClasses = "bg-sky-50 text-sky-800 border-sky-300";
    label = showFullLabel ? "Buổi tập câu lạc bộ" : "Buổi tập";
  } else if (boiCanh === "Phỏng vấn nghệ nhân") {
    colorClasses = "bg-purple-50 text-purple-800 border-purple-300";
    label = showFullLabel ? "Phỏng vấn nghệ nhân" : "Phỏng vấn";
  } else if (boiCanh === "Tư liệu lưu trữ") {
    colorClasses = "bg-neutral-100 text-neutral-800 border-neutral-300";
    label = showFullLabel ? "Tư liệu lưu trữ" : "Lưu trữ";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}
      title={`Bối cảnh thu thập: ${boiCanh}`}
    >
      {label}
    </span>
  );
};

export default BoiCanhBadge;
