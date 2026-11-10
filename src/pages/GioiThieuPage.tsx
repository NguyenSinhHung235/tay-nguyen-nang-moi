import React from "react";
import {
  UserCheck,
  MapPin,
  AlertOctagon,
  Scale,
  KeyRound,
  Mail,
  FileCheck2,
  Database,
} from "lucide-react";
import { getAllBanGhi } from "@/lib/data.ts";

interface GioiThieuPageProps {
  onNavigate?: (path: string) => void;
}

export const GioiThieuPage: React.FC<GioiThieuPageProps> = () => {
  const banGhiList = getAllBanGhi();
  const count = banGhiList.length;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Tiêu đề trang */}
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 font-sans">
          Báo cáo học thuật & Tổng quan
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Giới thiệu Taynguyennangmoi & Khung hồ sơ số
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Taynguyennangmoi: Hồ sơ số thực hành nghi lễ vòng đời và lễ bỏ mả của các dân tộc Tây Nguyên – Sản phẩm thực tập phi lợi nhuận.
        </p>
      </div>

      {/* a) Khối "Thông tin sinh viên" */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Thông tin sinh viên thực hiện
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-medium">Họ và tên:</span>
            <p className="font-semibold text-stone-900 text-base">Nguyễn Sinh Hùng</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-medium">Mã sinh viên:</span>
            <p className="font-mono font-bold text-stone-900 text-base">PH70147</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-medium">Nhóm thực hiện:</span>
            <p className="font-semibold text-stone-900">Nhóm 2</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-medium">Chương trình:</span>
            <p className="font-semibold text-stone-900">
              Thực tập sinh Đợt 15 (FPT Polytechnic và IMTA TECH)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 sm:col-span-2">
            <span className="text-amber-900 font-medium">Loại hình dự án:</span>
            <p className="font-semibold text-amber-950">
              Xã hội phi lợi nhuận (Phục vụ cộng đồng, bảo tồn văn hoá phi vật thể)
            </p>
          </div>
        </div>
      </section>

      {/* b) Khối "Phạm vi đã chọn" */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Phạm vi nghiên cứu & Dữ liệu
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50">
            <span className="text-stone-500 block">Vùng văn hoá:</span>
            <strong className="text-stone-900">Tây Nguyên</strong>
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50">
            <span className="text-stone-500 block">Dân tộc:</span>
            <strong className="text-stone-900">Ba Na, Ê Đê, Gia Rai, Mnông, Xơ Đăng, Rơ Măm</strong>
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50">
            <span className="text-stone-500 block">Cộng đồng cụ thể:</span>
            <strong className="text-stone-900">Làng buôn tại Gia Lai, Đắk Lắk, Kon Tum, Phú Yên</strong>
          </div>

          <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50">
            <span className="text-stone-500 block">Nội dung thực hành:</span>
            <strong className="text-stone-900">Nghi lễ vòng đời và lễ bỏ mả (Pơ thi)</strong>
          </div>

          <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50 sm:col-span-2 flex items-center justify-between">
            <div>
              <span className="text-amber-900 block font-medium">Số bản ghi hiện có trong hệ thống:</span>
              <strong className="text-base text-amber-950 font-mono">
                {count > 0 ? `${count} bản ghi đã nạp` : "0 bản ghi (Đang chờ nạp vào /data/disan.json)"}
              </strong>
            </div>
            <Database className="w-6 h-6 text-amber-800" />
          </div>
        </div>
      </section>

      {/* c) Khối "Những gì chưa làm được" */}
      <section className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 text-amber-950 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-200 text-amber-900">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-950">
              Những gì chưa làm được (Báo cáo trung thực)
            </h2>
            <p className="text-xs text-amber-900/80 mt-0.5">
              Cam kết liêm chính học thuật, xác định rõ các ranh giới tư liệu chưa thể hoàn thiện trong phạm vi thực tập.
            </p>
          </div>
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-amber-900 leading-relaxed list-disc list-inside">
          <li className="pl-1">
            <strong>Chưa có ảnh tư liệu được phép cho một số bước nghi lễ:</strong> Sẽ bổ sung sau khi có đồng thuận bằng văn bản của cộng đồng chủ thể.
          </li>
          <li className="pl-1">
            <strong>Chưa xác nhận lại thời gian lễ với già làng:</strong> Một số nguồn tài liệu ghi 3 ngày, một số nguồn ghi 5 ngày tùy theo điều kiện kinh tế từng gia đình và thời điểm tổ chức.
          </li>
          <li className="pl-1">
            <strong>Chưa có bản ghi âm lời khấn:</strong> Vì thuộc phần thiêng, tập quán cộng đồng Ba Na tuyệt đối không cho phép người ngoài ghi âm hay công bố.
          </li>
          <li className="pl-1">
            <strong>Chưa có bản dịch đầy đủ các bài khấn tiếng Ba Na:</strong> Việc chuyển ngữ đòi hỏi sự tham gia trực tiếp của các nhà nghiên cứu ngôn ngữ học bản địa và già làng uy tín.
          </li>
          <li className="pl-1">
            <strong>Chưa kiểm chứng được toàn bộ thông tin trong disan.json với cộng đồng:</strong> Cần một buổi làm việc và hội thảo tham vấn trực tiếp tại nhà rông Làng Pyang với các nghệ nhân.
          </li>
          <li className="pl-1">
            <strong>Nguồn gốc một số bản ghi:</strong> Dựa trên nguồn báo chí và truyền thông, chưa được đối chiếu toàn diện với các bản ghi chép điền dã gốc của các nhà dân tộc học thực địa.
          </li>
        </ul>
      </section>

      {/* d) Khối "Văn bản pháp lý và chuẩn mực đã dựa vào" */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
            <Scale className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Văn bản pháp lý & Chuẩn mực áp dụng
          </h2>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-stone-700">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span><strong>Luật Di sản văn hoá số 45/2024/QH15:</strong> Bảo vệ và quản lý di sản phi vật thể.</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span><strong>Nghị định số 308/2025/NĐ-CP:</strong> Hướng dẫn bảo tồn di sản trong kỷ nguyên số.</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span><strong>Nghị định số 93/2023/NĐ-CP:</strong> Quy định chế độ và tôn vinh nghệ nhân cộng đồng.</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span><strong>Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15:</strong> Bảo mật nhân thân người cung cấp tin.</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span><strong>Công ước UNESCO 2003 & Bộ nguyên tắc đạo đức UNESCO 2015:</strong> Tôn trọng quyền chủ thể.</span>
          </div>
        </div>
      </section>

      {/* e) Khối "Khoá API và bảo mật" */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
            <KeyRound className="w-5 h-5 text-amber-800" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Khoá API và Kiến trúc bảo mật
          </h2>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
          <p>
            Ứng dụng <strong>không lưu khoá API phía client</strong>. Khoá Gemini được đặt trong biến môi trường <code className="font-mono bg-stone-200 px-1 py-0.5 rounded text-stone-900">GEMINI_API_KEY</code> trên Vercel hoặc máy chủ backend, chỉ gọi qua API route phía server (<code className="font-mono bg-stone-200 px-1 py-0.5 rounded text-stone-900">/api/chat</code>).
          </p>
          <p className="text-xs text-stone-500">
            Mọi truy vấn từ trình duyệt tới mô hình AI đều được ủy quyền bảo mật thông qua máy chủ, ngăn chặn rò rỉ mã khoá bí mật ra môi trường công cộng.
          </p>
        </div>
      </section>

      {/* f) Khối "Liên hệ" */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-md space-y-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-serif font-bold text-amber-200">
            Liên hệ và Đóng góp ý kiến
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Mọi phản hồi từ cộng đồng Ba Na và các nhà khoa học xin vui lòng gửi về:
          </p>
          <p className="font-mono text-amber-400 text-sm font-semibold">
            hungnsph70147@fpt.edu.vn (hoặc liên hệ giảng viên hướng dẫn)
          </p>
        </div>

        <a
          href="mailto:hungnsph70147@fpt.edu.vn?subject=Phan%20hoi%20Ho%20so%20di%20san%20F04"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-amber-400 text-stone-950 hover:bg-amber-300 transition-colors shrink-0"
        >
          <Mail className="w-4 h-4" />
          <span>Gửi email góp ý</span>
        </a>
      </section>
    </div>
  );
};

export default GioiThieuPage;
