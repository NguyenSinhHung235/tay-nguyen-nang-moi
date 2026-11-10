import React, { useState } from "react";
import { Menu, X, BookOpen, MessageSquareText } from "lucide-react";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  recordCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  recordCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: `Bản ghi (${recordCount})`, path: "/ban-ghi" },
    { label: "Hỏi đáp Gemini", path: "/hoi-dap" },
    { label: "Nguồn tư liệu", path: "/nguon-tu-lieu" },
    { label: "Giới thiệu", path: "/gioi-thieu" },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark brand */}
          <a
            href="/"
            onClick={(e) => handleLinkClick("/", e)}
            className="flex items-center gap-2.5 font-serif text-base sm:text-lg font-bold tracking-tight text-amber-100 whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Taynguyennangmoi</span>
          </a>

          {/* Zone 2: 4–5 single-line clean nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(item.path, e)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                    isActive
                      ? "text-amber-400 border-amber-400 font-semibold"
                      : "text-stone-300 hover:text-white border-transparent"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action button + mobile hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/hoi-dap"
              onClick={(e) => handleLinkClick("/hoi-dap", e)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Hỏi đáp Gemini</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(item.path, e)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-stone-800 text-amber-400 font-semibold"
                    : "text-stone-300 hover:bg-stone-800 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="/hoi-dap"
              onClick={(e) => handleLinkClick("/hoi-dap", e)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Hỏi đáp với Trợ lý Gemini</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
