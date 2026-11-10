import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Printer,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Shield,
  Layers,
  BookOpen,
} from "lucide-react";
import { getBanGhiByMa } from "@/lib/data.ts";
import BoiCanhBadge from "@/components/BoiCanhBadge.tsx";
import type { NguonTuLieu } from "@/lib/types.ts";

interface BanGhiDetailPageProps {
  ma: string;
  onNavigate: (path: string) => void;
}

export const BanGhiDetailPage: React.FC<BanGhiDetailPageProps> = ({
  ma,
  onNavigate,
}) => {
  const banGhi = getBanGhiByMa(ma);
  const [copied, setCopied] = useState(false);
  // State quản lý accordion cho từng bước nghi lễ (mặc định mở tất cả các bước)
  const [openSteps, setOpenSteps] = useState<{ [index: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const toggleStep = (idx: number) => {
    setOpenSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // 404 State
  if (!banGhi) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="p-8 bg-white rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="text-4xl">🔍</div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Không tìm thấy bản ghi
          </h2>
          <p className="text-stone-600 text-sm">
            Không tìm thấy bản ghi với mã <strong className="font-mono text-stone-800">{ma}</strong> trong hệ thống hồ sơ số.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate("/ban-ghi")}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-900 hover:bg-amber-800 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về danh sách bản ghi</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tách chú giải vật phẩm thành các dòng bullet
  const vatPhamLines = (banGhi.vat_pham_tuong_nha_mo || "")
    .split(/\r?\n|;/)
    .map((l: string) => l.trim())
    .filter((l: string) => l.length > 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Breadcrumb (a) */}
      <nav aria-label="Đường dẫn trang" className="no-print">
        <ol className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <li>
            <button
              onClick={() => onNavigate("/")}
              className="hover:text-stone-900 cursor-pointer"
            >
              Trang chủ
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <button
              onClick={() => onNavigate("/ban-ghi")}
              className="hover:text-stone-900 cursor-pointer"
            >
              Danh sách bản ghi
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-mono text-stone-800 font-semibold">{banGhi.ma_ban_ghi}</li>
        </ol>
      </nav>

      {/* Header (b) */}
      <header className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200">
              {banGhi.ma_ban_ghi}
            </span>
            <BoiCanhBadge boiCanh={banGhi.boi_canh_thu_thap} showFullLabel />
          </div>

          {/* Action buttons (d) */}
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Sao chép liên kết bản ghi"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Đã sao chép!" : "Sao chép liên kết"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer print-include"
              title="In hoặc xuất PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In / Lưu PDF</span>
            </button>

            <button
              onClick={() => onNavigate("/ban-ghi")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
            {banGhi.ten_theo_danh_muc}
          </h1>
          <h2 className="text-lg sm:text-xl font-serif italic text-stone-500 mt-1.5">
            {banGhi.ten_goi_ban_dia || "Chưa có tên bản địa ghi nhận"}
          </h2>
        </div>

        {/* Badges loại hình */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
          {banGhi.loai_hinh?.map((lh: string, i: number) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium"
            >
              {lh}
            </span>
          ))}
          <span className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-medium border border-amber-200">
            {banGhi.vung_van_hoa || "Tây Nguyên"}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium">
            {banGhi.dan_toc_cong_dong}
          </span>
        </div>
      </header>

      {/* Body: Đầy đủ 17 trường với nhãn rõ ràng (c) */}
      <div className="space-y-6">
        {/* Trường 7 & 8: Địa danh hiện nay vs Địa danh thời điểm tư liệu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sky-900 font-semibold text-xs uppercase tracking-wider mb-1.5">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
              <span>7. Địa danh hiện nay (sau 01/7/2025)</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-sky-950">
              {banGhi.dia_danh_hien_nay || "Chưa ghi nhận"}
            </p>
            <p className="text-xs text-sky-800/80 mt-1">
              Địa danh hành chính theo quy định mới, không ghi cấp huyện.
            </p>
          </div>

          <div className="bg-stone-100/90 border border-stone-300 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-stone-700 font-semibold text-xs uppercase tracking-wider mb-1.5">
              <Clock className="w-4 h-4 text-stone-500 shrink-0" />
              <span>8. Địa danh tại thời điểm tư liệu</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-stone-900">
              {banGhi.dia_danh_tai_thoi_diem || "Chưa ghi nhận"}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Giữ nguyên tên gốc lịch sử và năm công bố tài liệu.
            </p>
          </div>
        </div>

        {/* Trường 9: Mô tả */}
        <section className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200 shadow-xs space-y-3">
          <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-800" />
            <span>9. Mô tả nghi lễ</span>
          </h3>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {banGhi.mo_ta || "Chưa có mô tả chi tiết."}
          </p>
        </section>

        {/* Trường 10: Trình tự nghi lễ */}
        <section className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-800" />
              <span>10. Trình tự thực hành nghi lễ</span>
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              {banGhi.trinh_tu_nghi_le?.length || 0} bước thực hiện
            </span>
          </div>

          {banGhi.trinh_tu_nghi_le && banGhi.trinh_tu_nghi_le.length > 0 ? (
            <div className="space-y-3">
              {banGhi.trinh_tu_nghi_le.map((step: string, idx: number) => {
                const isOpen = openSteps[idx] ?? true;
                return (
                  <div
                    key={idx}
                    className="border border-stone-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleStep(idx)}
                      className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left bg-stone-50/60 hover:bg-stone-100/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-sky-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-sm text-stone-900">
                          Bước {idx + 1}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-stone-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white border-t border-stone-100 text-sm text-stone-700 leading-relaxed">
                        {step}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-stone-500 italic">
              Chưa có danh sách các bước trình tự nghi lễ.
            </p>
          )}
        </section>

        {/* Trường 11: Chú giải vật phẩm và tượng nhà mồ */}
        <section className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200 shadow-xs space-y-3">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            11. Chú giải vật phẩm và tượng nhà mồ
          </h3>
          {vatPhamLines.length > 0 ? (
            <ul className="space-y-2 text-stone-700 text-sm sm:text-base leading-relaxed list-disc list-inside">
              {vatPhamLines.map((line: string, idx: number) => (
                <li key={idx} className="pl-1">
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500 italic">
              Chưa có thông tin chú giải vật phẩm.
            </p>
          )}
        </section>

        {/* Trường 12: Phần thiêng KHÔNG được ghi hình */}
        <section className="bg-rose-50 border-2 border-rose-400 rounded-xl p-5 sm:p-6 text-rose-950 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-200 rounded-xl text-rose-900 shrink-0 mt-0.5">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  Trường 12
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-rose-950">
                  Phần thiêng KHÔNG được ghi hình, ghi âm
                </h3>
              </div>
              <p className="text-sm sm:text-base text-rose-900 leading-relaxed font-medium">
                {banGhi.phan_thieng_khong_ghi_hinh ||
                  "Khu nhà mồ và các nghi thức khấn tế đêm là phần thiêng của cộng đồng Ba Na. Hồ sơ nghiêm cấm mọi hình thức ghi hình, ghi âm hoặc suy đoán sai lệch bản chất văn hoá."}
              </p>
            </div>
          </div>
        </section>

        {/* Trường 13, 14, 15: Bối cảnh, Người cung cấp, Phạm vi được phép sử dụng */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              13. Bối cảnh thu thập
            </span>
            <div>
              <BoiCanhBadge boiCanh={banGhi.boi_canh_thu_thap} showFullLabel />
            </div>
            <p className="text-xs text-stone-500">
              Phân định rõ tư liệu điền dã thật hay mô phỏng.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              14. Người cung cấp tư liệu
            </span>
            <p className="text-sm font-semibold text-stone-900">
              {banGhi.nguoi_cung_cap || "Ẩn danh theo Luật 91/2025/QH15"}
            </p>
            <p className="text-xs text-stone-500">
              Ghi công đúng mức, không công bố SĐT/địa chỉ riêng.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>15. Phạm vi được phép sử dụng</span>
            </span>
            <p className="text-xs sm:text-sm text-stone-800 leading-snug">
              {banGhi.pham_vi_duoc_phep || "Nghiên cứu học thuật, giáo dục phi thương mại."}
            </p>
          </div>
        </div>

        {/* Trường 16: Nguồn tư liệu */}
        <section className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-800" />
              <span>16. Nguồn tư liệu tham khảo ({banGhi.nguon_tu_lieu?.length || 0} nguồn)</span>
            </h3>
            <span className="text-xs text-stone-500">
              Tối thiểu 3 nguồn, có nguồn chính thống
            </span>
          </div>

          {banGhi.nguon_tu_lieu && banGhi.nguon_tu_lieu.length > 0 ? (
            <div className="space-y-3">
              {banGhi.nguon_tu_lieu.map((nguon: NguonTuLieu, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg bg-stone-50 border border-stone-200"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-sm text-stone-900 font-semibold">
                        {nguon.ten}
                      </strong>
                      {nguon.chinh_thong && (
                        <span className="inline-flex items-center text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-medium border border-sky-300">
                          Chính thống
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500">
                      {nguon.tac_gia && <span>Tác giả: {nguon.tac_gia} · </span>}
                      {nguon.nam && <span>Năm: {nguon.nam}</span>}
                    </div>
                  </div>

                  {nguon.url && (
                    <a
                      href={nguon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-700 self-start sm:self-auto shrink-0"
                    >
                      <span>Mở nguồn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500 italic">
              Chưa có danh mục nguồn tư liệu cụ thể cho bản ghi này.
            </p>
          )}
        </section>

        {/* Trường 17: Điểm chưa rõ */}
        <section className="bg-amber-50/90 border border-amber-300 rounded-xl p-5 sm:p-6 text-amber-950 shadow-xs">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-amber-950 flex items-center gap-2">
                <span>17. Điểm chưa rõ (ghi chú trung thực)</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                {banGhi.diem_chua_ro ||
                  "Cần tiếp tục điền dã và đối chiếu trực tiếp với già làng Làng Pyang để thống nhất một số chi tiết về thời lượng nghi lễ và bài khấn."}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Chân trang điều hướng */}
      <div className="pt-4 border-t border-stone-200 flex items-center justify-between no-print">
        <button
          onClick={() => onNavigate("/ban-ghi")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh sách tất cả bản ghi</span>
        </button>

        <button
          onClick={() => onNavigate("/hoi-dap")}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
        >
          <span>Hỏi đáp thêm về bản ghi này</span>
        </button>
      </div>
    </div>
  );
};

export default BanGhiDetailPage;
