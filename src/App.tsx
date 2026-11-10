import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import HomePage from "./pages/HomePage.tsx";
import BanGhiListPage from "./pages/BanGhiListPage.tsx";
import BanGhiDetailPage from "./pages/BanGhiDetailPage.tsx";
import HoiDapPage from "./pages/HoiDapPage.tsx";
import NguonTuLieuPage from "./pages/NguonTuLieuPage.tsx";
import GioiThieuPage from "./pages/GioiThieuPage.tsx";
import { getAllBanGhi } from "@/lib/data.ts";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname + window.location.search;
    }
    return "/";
  });

  const banGhiList = getAllBanGhi();
  const recordCount = banGhiList.length;

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Route matching logic
  const renderCurrentView = () => {
    const [pathname, search] = currentPath.split("?");
    const params = new URLSearchParams(search || "");
    const q = params.get("q") || "";

    if (pathname === "/" || pathname === "") {
      return <HomePage onNavigate={navigate} />;
    }

    if (pathname.startsWith("/ban-ghi/")) {
      const ma = decodeURIComponent(pathname.replace("/ban-ghi/", ""));
      return <BanGhiDetailPage ma={ma} onNavigate={navigate} />;
    }

    if (pathname === "/ban-ghi") {
      return <BanGhiListPage initialSearch={q} onNavigate={navigate} />;
    }

    if (pathname === "/hoi-dap") {
      return <HoiDapPage onNavigate={navigate} />;
    }

    if (pathname === "/nguon-tu-lieu") {
      return <NguonTuLieuPage onNavigate={navigate} />;
    }

    if (pathname === "/gioi-thieu") {
      return <GioiThieuPage onNavigate={navigate} />;
    }

    // Default fallback to HomePage
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        recordCount={recordCount}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {renderCurrentView()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
