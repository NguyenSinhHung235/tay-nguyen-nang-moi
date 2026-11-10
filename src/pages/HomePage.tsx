import React from "react";
import {
  Calendar,
  Layers,
  Lock,
  MessageSquareText,
  BookmarkCheck,
  Info,
  AlertTriangle,
  ArrowRight,
  Shield,
  FileText,
  BookOpen,
} from "lucide-react";
import { getAllBanGhi } from "@/lib/data.ts";
import SearchBar from "@/components/SearchBar.tsx";

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const banGhiList = getAllBanGhi();
  const count = banGhiList.length;

  const handleSearch = (keyword: string) => {
    if (keyword.trim()) {
      onNavigate(`/ban-ghi?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      onNavigate("/ban-ghi");
    }
  };

  return (
    <div className="space-y-12">
      {/* Banner vàng nếu 0 bản ghi (Empty State) */}
      {count === 0 && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-sm sm:text-base text-amber-950">
              Chưa có bản ghi nào trong hồ sơ (0 bản ghi)
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
              Vui lòng nạp dữ liệu vào <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-semibold">/data/disan.json</code> theo schema 17 trường chuẩn. Xem mục{" "}
              <button
                onClick={() => onNavigate("/gioi-thieu")}
                className="underline font-semibold hover:text-amber-950 cursor-pointer"
              >
                Giới thiệu
              </button>{" "}
              hoặc tệp README để biết thêm chi tiết. Khung ứng dụng đã sẵn sàng nạp dữ liệu và chạy ngay.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 text-stone-100 rounded-2xl p-6 sm:p-10 lg:p-12 border border-stone-800 shadow-lg">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-700/50">
            <span>Taynguyennangmoi · Di sản phi vật thể</span>
            <span aria-hidden="true">·</span>
            <span>
              {count > 0 ? `${count} bản ghi` : "0 bản ghi – đang chờ nạp dữ liệu"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-amber-100 leading-tight">
            Taynguyennangmoi: Nghi lễ vòng đời và lễ bỏ mả (Pơ thi)
          </h1>

          <p className="text-base sm:text-lg text-stone-300 font-serif leading-relaxed">
            Người Ba Na – Làng Pyang, thị trấn Kông Chro, tỉnh Gia Lai – Vùng văn hoá Tây Nguyên
          </p>

          <p className="text-sm text-stone-400 leading-relaxed">
            Nền tảng số hoá chuẩn mực lưu giữ tri thức dân gian, phân biệt rõ giữa nghi lễ truyền thống nguyên bản của cộng đồng và các hoạt động mô phỏng phục vụ du lịch.
          </p>

          {/* Thanh tìm kiếm lớn */}
          <div className="pt-2">
            <SearchBar
              size="lg"
              onSearch={handleSearch}
              placeholder="Tìm kiếm nghi lễ, tên bản địa (Pơ thi...), vật phẩm tượng mồ, già làng..."
            />
          </div>
        </div>
      </section>

      {/* Cảnh báo màu đỏ nhạt (Phần thiêng) */}
      <section className="bg-rose-50 border border-rose-300 text-rose-950 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-rose-100 rounded-lg text-rose-700 shrink-0 mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-serif font-bold text-base text-rose-900 flex items-center gap-2">
              <span>Lưu ý về không gian và nghi thức thiêng liêng</span>
            </h3>
            <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
              Khu nhà mồ và nghi thức ban đêm là phần thiêng theo tập quán cộng đồng Ba Na. Hồ sơ này <strong>KHÔNG ghi hình, không ghi âm, không suy đoán nội dung phần thiêng</strong>. Mọi tư liệu được lưu giữ trên nguyên tắc tôn trọng tuyệt đối tính tôn nghiêm và thỏa thuận với các bậc cao niên trong làng.
            </p>
          </div>
        </div>
      </section>

      {/* Khối giới thiệu ngắn (3 thẻ) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Các nội dung trọng tâm của hồ sơ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => onNavigate("/ban-ghi")}
            className="group bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-800/40 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-900 transition-colors">
                Trình tự nghi lễ
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Từng bước chuẩn bị từ làm nhà mồ, đẽo tượng, lễ cúng rước thần, đến nghi thức chia tay người chết và điệu múa xoang quanh nhà mồ.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-amber-900">
              <span>Xem danh sách bản ghi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate("/ban-ghi")}
            className="group bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-800/40 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-900 transition-colors">
                Vật phẩm & tượng nhà mồ
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Nghệ thuật đẽo tượng gỗ dân gian, kiến trúc nhà mồ đặc trưng, ghè rượu cần, cây nêu kút và các lễ vật hiến tế mang linh hồn Tây Nguyên.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-amber-900">
              <span>Tra cứu chú giải vật phẩm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate("/nguon-tu-lieu")}
            className="group bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-800/40 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-rose-900 transition-colors">
                Phần thiêng không ghi hình
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Quy định nghiêm ngặt về quyền tự quyết của cộng đồng chủ thể, bảo mật văn hoá và giới hạn đạo đức nhân học khi tiếp cận di sản.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-rose-800">
              <span>Xem ghi nhận & phạm vi sử dụng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid liên kết nhanh đến 5 màn hình còn lại */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-stone-900">
          Chức năng và Tra cứu hồ sơ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate("/ban-ghi")}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-400 text-left transition-all hover:shadow-sm cursor-pointer"
          >
            <BookOpen className="w-6 h-6 text-amber-800 mb-2" />
            <h4 className="font-serif font-bold text-stone-900 mb-1">Danh mục bản ghi</h4>
            <p className="text-xs text-stone-600">
              Duyệt qua danh sách 17 trường chuẩn, lọc theo loại hình và bối cảnh.
            </p>
          </button>

          <button
            onClick={() => onNavigate("/hoi-dap")}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-400 text-left transition-all hover:shadow-sm cursor-pointer"
          >
            <MessageSquareText className="w-6 h-6 text-amber-800 mb-2" />
            <h4 className="font-serif font-bold text-stone-900 mb-1">Trợ lý Gemini</h4>
            <p className="text-xs text-stone-600">
              Hỏi đáp chuẩn xác dựa trên dữ liệu hồ sơ, không suy đoán ngoài tư liệu.
            </p>
          </button>

          <button
            onClick={() => onNavigate("/nguon-tu-lieu")}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-400 text-left transition-all hover:shadow-sm cursor-pointer"
          >
            <BookmarkCheck className="w-6 h-6 text-amber-800 mb-2" />
            <h4 className="font-serif font-bold text-stone-900 mb-1">Nguồn tư liệu</h4>
            <p className="text-xs text-stone-600">
              Ghi nhận cộng đồng chủ thể Ba Na, trích dẫn báo chí và cơ sở pháp lý.
            </p>
          </button>

          <button
            onClick={() => onNavigate("/gioi-thieu")}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-400 text-left transition-all hover:shadow-sm cursor-pointer"
          >
            <Info className="w-6 h-6 text-amber-800 mb-2" />
            <h4 className="font-serif font-bold text-stone-900 mb-1">Giới thiệu đề tài</h4>
            <p className="text-xs text-stone-600">
              Thông tin thực tập sinh, phạm vi nghiên cứu và hạn chế còn tồn đọng.
            </p>
          </button>
        </div>
      </section>

      {/* Khối "Sản phẩm thực tập" */}
      <section className="bg-stone-100/80 rounded-xl p-5 sm:p-6 border border-stone-200 text-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 font-sans">
              Dự án học thuật phi lợi nhuận
            </span>
            <p className="text-sm font-medium text-stone-900">
              Nguyễn Sinh Hùng – MSV PH70147 – Nhóm 2 – Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.
            </p>
          </div>
          <button
            onClick={() => onNavigate("/gioi-thieu")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Xem hồ sơ thực tập</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
