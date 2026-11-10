import React from "react";
import {
  HeartHandshake,
  CheckCircle2,
  ExternalLink,
  Scale,
  Mail,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

interface NguonTuLieuPageProps {
  onNavigate?: (path: string) => void;
}

interface SourceEntry {
  ten: string;
  moTa: string;
  chinhThong: boolean;
  nam?: string;
  url?: string;
}

const SOURCES_LIST: SourceEntry[] = [
  // Nguồn chính thống (≥ 3)
  {
    ten: "Báo Gia Lai – \"Lễ bỏ mả của người Bahnar ở Kông Chro\"",
    moTa: "Bài viết phóng sự phản ánh nghi thức lễ bỏ mả thực tế tại huyện Kông Chro, tỉnh Gia Lai.",
    nam: "24/02/2025",
    chinhThong: true,
    url: "https://baogialai.com.vn",
  },
  {
    ten: "VOV World – \"Tượng nhà mồ của người Bana\"",
    moTa: "Chuyên mục Văn hoá các dân tộc Việt Nam – Phân tích mỹ thuật và linh hồn trong tượng gỗ nhà mồ.",
    nam: "2024",
    chinhThong: true,
    url: "https://vovworld.vn",
  },
  {
    ten: "Cục Di sản văn hoá – Danh mục di sản phi vật thể quốc gia",
    moTa: "Cơ sở dữ liệu tư liệu số quốc gia về di sản văn hoá phi vật thể của Bộ Văn hoá, Thể thao và Du lịch.",
    chinhThong: true,
    url: "https://dsvh.gov.vn",
  },
  {
    ten: "UNESCO ICH – Danh sách di sản Việt Nam",
    moTa: "Công ước Bảo vệ Di sản Văn hoá Phi vật thể (UNESCO 2003) và Không gian văn hoá cồng chiêng Tây Nguyên.",
    chinhThong: true,
    url: "https://ich.unesco.org",
  },

  // Nguồn bổ sung
  {
    ten: "Vietnam News – \"Wooden sculptures play key roles in life and death\"",
    moTa: "Bài viết chuyên sâu về triết lý sinh tử và vai trò tượng gỗ dân gian Tây Nguyên.",
    nam: "14/03/2020",
    chinhThong: false,
    url: "https://vietnamnews.vn",
  },
  {
    ten: "Vietnamtourism – \"Lễ bỏ mả\"",
    moTa: "Cổng thông tin xúc tiến du lịch và giới thiệu phong tục truyền thống các dân tộc Tây Nguyên.",
    chinhThong: false,
    url: "https://vietnamtourism.vn",
  },
  {
    ten: "Sách chuyên khảo: Ngô Văn Doanh, \"Lễ hội bỏ mả Bắc Tây Nguyên\"",
    moTa: "Công trình khảo cứu nhân học văn hoá dân gian kinh điển, NXB Văn hoá Dân tộc, Hà Nội.",
    nam: "1995",
    chinhThong: false,
  },
];

const LEGAL_DOCS = [
  {
    code: "Luật Di sản văn hoá số 45/2024/QH15",
    desc: "Quy định nguyên tắc bảo vệ, kiểm kê và phát huy giá trị di sản văn hoá phi vật thể của các dân tộc Việt Nam.",
  },
  {
    code: "Nghị định số 308/2025/NĐ-CP",
    desc: "Quy định chi tiết thi hành một số điều của Luật Di sản văn hoá về bảo tồn và quản lý di sản trong môi trường số.",
  },
  {
    code: "Nghị định số 93/2023/NĐ-CP",
    desc: "Quy định về xét tặng danh hiệu Nghệ nhân Nhân dân, Nghệ nhân Ưu tú và chính sách tôn vinh nghệ nhân cộng đồng.",
  },
  {
    code: "Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15",
    desc: "Quy định quyền bảo vệ đời tư, bí mật thông tin cá nhân và dữ liệu điền dã đối với người cung cấp tư liệu.",
  },
  {
    code: "Công ước UNESCO 2003 & Bộ nguyên tắc đạo đức UNESCO 2015",
    desc: "Đảm bảo sự đồng thuận tự nguyện, trước và có thông tin (FPIC) của cộng đồng nắm giữ di sản văn hoá phi vật thể.",
  },
];

export const NguonTuLieuPage: React.FC<NguonTuLieuPageProps> = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Tiêu đề trang */}
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 font-sans">
          Trách nhiệm đạo đức & Nguồn tư liệu
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Nguồn tư liệu & Ghi nhận cộng đồng
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Tính minh bạch học thuật, quyền sở hữu văn hoá của cộng đồng Ba Na và các căn cứ pháp lý số hoá di sản.
        </p>
      </div>

      {/* Phần A – Ghi nhận cộng đồng */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-stone-900">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold">
            Phần A — Ghi nhận cộng đồng chủ thể
          </h2>
        </div>

        <div className="prose prose-stone text-stone-700 text-sm sm:text-base leading-relaxed bg-stone-50 p-5 rounded-xl border border-stone-200">
          <p>
            Cộng đồng Ba Na tại làng Pyang, thị trấn Kông Chro, tỉnh Gia Lai là chủ thể sáng tạo, nắm giữ, thực hành và trao truyền di sản này.
          </p>
          <p className="mt-3">
            Hồ sơ ghi nhận đóng góp của già làng và những người trực tiếp thực hành nghi lễ (thông tin cá nhân cụ thể được ẩn danh trong bản công bố; hồ sơ đầy đủ lưu nội bộ có kiểm soát truy cập), phù hợp với Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.
          </p>
        </div>
      </section>

      {/* Phần B – Phạm vi được phép sử dụng */}
      <section className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-6 sm:p-8 text-emerald-950 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-200 text-emerald-900">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-emerald-950">
            Phần B — Phạm vi được phép sử dụng
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
          <div className="bg-white/80 p-4 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Được phép thực hiện:</span>
            </div>
            <p className="text-emerald-950 text-xs sm:text-sm">
              Dùng ảnh chụp bối cảnh lễ hội ngoài trời (cồng chiêng, múa xoang, tượng nhà mồ) với chú thích nguồn và bối cảnh rõ ràng; phục vụ nghiên cứu, giáo dục và bảo tồn văn hoá phi lợi nhuận.
            </p>
          </div>

          <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-rose-900">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Không được phép:</span>
            </div>
            <p className="text-rose-950 text-xs sm:text-sm">
              Đăng tải lời khấn, nghi thức bên trong nhà mồ, hình ảnh cận cảnh phần thiêng; tuyệt đối không dùng cho mục đích thương mại, quảng cáo hoặc sân khấu hoá sai lệch.
            </p>
          </div>
        </div>
      </section>

      {/* Phần C – Nguồn tư liệu (tối thiểu 7, trong đó ≥ 3 nguồn chính thống) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Phần C — Danh mục nguồn tư liệu ({SOURCES_LIST.length} nguồn)
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
            ≥ 3 nguồn chính thống
          </span>
        </div>

        <div className="space-y-3">
          {SOURCES_LIST.map((source, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                    {source.ten}
                  </h3>
                  {source.chinhThong ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-semibold border border-sky-300">
                      Nguồn chính thống
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-medium">
                      Nguồn bổ sung
                    </span>
                  )}
                  {source.nam && (
                    <span className="text-xs text-stone-500">
                      ({source.nam})
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-600">
                  {source.moTa}
                </p>
              </div>

              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-700 bg-amber-100/60 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors shrink-0 self-start sm:self-auto"
                >
                  <span>Mở ↗</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-stone-400 italic shrink-0">
                  Ấn phẩm in
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Phần D – Văn bản pháp lý đã dựa vào */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
            <Scale className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Phần D — Văn bản pháp lý và chuẩn mực đã dựa vào
          </h2>
        </div>

        <div className="space-y-3">
          {LEGAL_DOCS.map((doc, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-3"
            >
              <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                  {doc.code}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {doc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phần E – Nút phản hồi */}
      <section className="bg-amber-50/70 border border-amber-300 rounded-2xl p-6 sm:p-8 text-amber-950 space-y-4 text-center">
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-lg font-serif font-bold text-amber-950">
            Phần E — Tiếp nhận ý kiến đóng góp từ cộng đồng
          </h2>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            Nếu bạn là người trong cộng đồng và thấy thông tin chưa đúng, vui lòng liên hệ để yêu cầu chỉnh sửa hoặc gỡ bỏ.
          </p>
        </div>

        <div>
          <a
            href="mailto:contact@fpt.edu.vn?subject=Phan%20hoi%20Ho%20so%20di%20san%20F04%20Ba%20Na"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-amber-900 text-white hover:bg-amber-800 transition-colors shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Gửi phản hồi cho Ban biên tập hồ sơ</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default NguonTuLieuPage;
