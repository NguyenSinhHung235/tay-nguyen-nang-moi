import React from "react";
import { ShieldCheck, HeartHandshake } from "lucide-react";

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-10 mt-16 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1: Thông tin đề tài */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-amber-200">
              Taynguyennangmoi: Nghi lễ vòng đời & Lễ bỏ mả (Pơ thi)
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Hồ sơ số văn hoá phi vật thể người Ba Na tại Làng Pyang, thị trấn Kông Chro, tỉnh Gia Lai – Vùng văn hoá Tây Nguyên.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 bg-stone-800/80 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dự án văn hoá xã hội phi lợi nhuận</span>
            </div>
          </div>

          {/* Cột 2: Sản phẩm thực tập */}
          <div className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-amber-200">
              Sản phẩm thực tập
            </h4>
            <ul className="text-stone-400 text-xs space-y-1.5 leading-relaxed">
              <li><strong className="text-stone-300">Sinh viên:</strong> Nguyễn Sinh Hùng</li>
              <li><strong className="text-stone-300">Mã sinh viên:</strong> PH70147</li>
              <li><strong className="text-stone-300">Nhóm:</strong> Nhóm 2</li>
              <li><strong className="text-stone-300">Chương trình:</strong> Thực tập sinh Đợt 15 (FPT Polytechnic & IMTA TECH)</li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh & Pháp lý */}
          <div className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-amber-200">
              Mục lục hồ sơ
            </h4>
            <div className="flex flex-col space-y-1 text-xs">
              <a href="/" onClick={(e) => handleNav("/", e)} className="hover:text-amber-400 transition-colors">
                Trang chủ
              </a>
              <a href="/ban-ghi" onClick={(e) => handleNav("/ban-ghi", e)} className="hover:text-amber-400 transition-colors">
                Danh sách bản ghi di sản
              </a>
              <a href="/hoi-dap" onClick={(e) => handleNav("/hoi-dap", e)} className="hover:text-amber-400 transition-colors">
                Trợ lý tra cứu hỏi đáp Gemini
              </a>
              <a href="/nguon-tu-lieu" onClick={(e) => handleNav("/nguon-tu-lieu", e)} className="hover:text-amber-400 transition-colors">
                Nguồn tư liệu & Ghi nhận cộng đồng
              </a>
              <a href="/gioi-thieu" onClick={(e) => handleNav("/gioi-thieu", e)} className="hover:text-amber-400 transition-colors">
                Giới thiệu đề tài & Phạm vi
              </a>
            </div>
          </div>
        </div>

        {/* Dòng ghi nhận cộng đồng & bản quyền phi thương mại */}
        <div className="pt-6 border-t border-stone-800 text-stone-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Tôn trọng tập quán cộng đồng Ba Na Làng Pyang · Tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.</span>
          </p>
          <p className="text-stone-500 text-center sm:text-right">
            Không sử dụng cho mục đích thương mại.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
