import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  onSearch: (keyword: string) => void;
  className?: string;
  size?: "md" | "lg";
}

export const SearchBar: React.FC<SearchBarProps> = ({
  defaultValue = "",
  placeholder = "Tìm kiếm theo tên nghi lễ, tên bản địa, vật phẩm, người cung cấp...",
  onSearch,
  className = "",
  size = "md",
}) => {
  const [keyword, setKeyword] = useState(defaultValue);

  useEffect(() => {
    setKeyword(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  const handleClear = () => {
    setKeyword("");
    onSearch("");
  };

  const isLarge = size === "lg";

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-3.5 text-stone-400 pointer-events-none">
        <Search className={isLarge ? "w-5 h-5 text-stone-500" : "w-4 h-4 text-stone-400"} />
      </div>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white text-stone-900 border border-stone-300 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-800 placeholder:text-stone-400 ${
          isLarge
            ? "py-3.5 pl-11 pr-24 text-base shadow-sm"
            : "py-2.5 pl-10 pr-20 text-sm"
        }`}
      />

      <div className="absolute right-2 flex items-center gap-1">
        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-md transition-colors"
            title="Xoá tìm kiếm"
            aria-label="Xoá tìm kiếm"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className={`font-medium rounded-lg text-white bg-amber-900 hover:bg-amber-800 transition-colors ${
            isLarge ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs"
          }`}
        >
          Tìm
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
