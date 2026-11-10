import React, { useState } from "react";
import {
  Send,
  Sparkles,
  HelpCircle,
  AlertCircle,
  BookmarkCheck,
  ShieldCheck,
} from "lucide-react";
import { getAllBanGhi } from "@/lib/data.ts";
import LoadingState from "@/components/LoadingState.tsx";
import ErrorState from "@/components/ErrorState.tsx";

interface HoiDapPageProps {
  onNavigate: (path: string) => void;
}

interface MessageHistory {
  id: string;
  sender: "user" | "assistant";
  text: string;
  sources?: Array<{
    ma_ban_ghi: string;
    cong_dong: string;
    dia_danh: string;
    nguon: string;
  }>;
  timestamp: string;
}

const SAMPLE_QUESTIONS = [
  "Lễ bỏ mả kéo dài mấy ngày?",
  "Tượng nhà mồ được làm bằng gì và có ý nghĩa gì?",
  "Phần nào của nghi lễ không được ghi hình?",
  "Ai là người cung cấp tư liệu và phạm vi được phép dùng là gì?",
  "Nguồn tư liệu chính thống nào nói về lễ này?",
];

export const HoiDapPage: React.FC<HoiDapPageProps> = () => {
  const allRecords = getAllBanGhi();
  const isEmptyData = allRecords.length === 0;

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageHistory[]>([]);

  const handleAsk = async (queryText?: string) => {
    const textToSend = queryText || question;
    if (!textToSend.trim() || loading || isEmptyData) return;

    setError(null);
    const userMsg: MessageHistory = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: textToSend.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || "Đã xảy ra lỗi khi kết nối với máy chủ AI."
        );
      }

      const assistantMsg: MessageHistory = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: data.answer || "Chưa có phản hồi.",
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(
        err?.message ||
          "Không thể gửi câu hỏi đến Gemini. Vui lòng kiểm tra cấu hình mạng hoặc khoá API."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header (a) */}
      <div className="text-center space-y-2 pb-4 border-b border-stone-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Trợ lý Gemini tra cứu hồ sơ di sản Taynguyennangmoi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Hỏi đáp về nghi lễ vòng đời và lễ bỏ mả
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
          Tra cứu nhanh thông tin điền dã, bối cảnh thực hành và nguồn gốc tư liệu của các dân tộc Tây Nguyên (Ba Na, Ê Đê, Gia Rai, Mnông, Xơ Đăng, Rơ Măm).
        </p>
      </div>

      {/* Empty State Banner (e) */}
      {isEmptyData && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 text-amber-900 flex items-start gap-3.5 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-sm sm:text-base text-amber-950">
              Chưa có dữ liệu trong hồ sơ
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
              Vui lòng nạp bản ghi vào <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-semibold">/data/disan.json</code> trước khi dùng chức năng hỏi đáp. Khi hồ sơ rỗng, trợ lý Gemini bị tạm khoá để tránh tạo ra thông tin suy đoán ngoài tư liệu thật.
            </p>
          </div>
        </div>
      )}

      {/* Gợi ý 5 câu hỏi mẫu (b) */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
          <HelpCircle className="w-4 h-4 text-stone-400" />
          <span>Gợi ý câu hỏi thường gặp:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isEmptyData || loading}
              onClick={() => handleAsk(q)}
              className="text-xs px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-amber-950 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Khung chat / Lịch sử hỏi đáp (d) */}
      <div className="space-y-4">
        {messages.length === 0 && !loading && (
          <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500 space-y-2">
            <p className="text-sm">Chưa có câu hỏi nào trong phiên làm việc.</p>
            <p className="text-xs text-stone-400">
              Hãy chọn câu hỏi gợi ý ở trên hoặc gõ câu hỏi vào ô bên dưới để bắt đầu.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                msg.sender === "user"
                  ? "bg-stone-900 text-white rounded-br-xs"
                  : "bg-white text-stone-800 border border-stone-200 rounded-bl-xs"
              }`}
            >
              <div className="text-xs opacity-75 mb-1.5 font-medium flex items-center gap-1.5">
                {msg.sender === "user" ? (
                  <span>Bạn</span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-700 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Trợ lý Taynguyennangmoi</span>
                  </span>
                )}
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Nội dung câu trả lời */}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </div>

              {/* Khối nguồn riêng biệt nếu trợ lý trả về */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-1 text-stone-500 font-semibold">
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Nguồn tư liệu đính kèm:</span>
                  </div>
                  {msg.sources.map((s, idx) => (
                    <div key={idx} className="font-mono bg-stone-50 p-2 rounded border border-stone-200 text-xs">
                      {s.ma_ban_ghi && <span className="font-semibold text-stone-900">{s.ma_ban_ghi} </span>}
                      {s.cong_dong && <span>– {s.cong_dong} </span>}
                      {s.dia_danh && <span>– {s.dia_danh} </span>}
                      {s.nguon && <span>– {s.nguon}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && <LoadingState message="Trợ lý Gemini đang tra cứu hồ sơ di sản..." />}

        {error && <ErrorState message={error} onRetry={() => handleAsk()} />}
      </div>

      {/* Ô nhập câu hỏi + nút Hỏi (c) */}
      <div className="space-y-2 sticky bottom-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="relative bg-white rounded-2xl border border-stone-300 shadow-md p-2 flex items-end gap-2 focus-within:border-amber-700 focus-within:ring-2 focus-within:ring-amber-700/20"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isEmptyData || loading}
            rows={2}
            placeholder={
              isEmptyData
                ? "Chưa có dữ liệu trong hồ sơ. Vui lòng nạp /data/disan.json để sử dụng."
                : "Nhập câu hỏi về nghi lễ, tượng nhà mồ, người cung cấp... (Nhấn Enter để gửi)"
            }
            className="w-full resize-none bg-transparent p-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none disabled:bg-stone-50 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={isEmptyData || loading || !question.trim()}
            className="p-3 bg-amber-900 hover:bg-amber-800 disabled:bg-stone-300 text-white rounded-xl transition-colors shrink-0 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Gửi câu hỏi"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Ghi chú dưới ô hỏi (f) */}
        <p className="text-xs text-stone-500 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>
            Trợ lý chỉ trả lời dựa trên dữ liệu trong hồ sơ. Không suy đoán, không bịa, không gán thông tin giữa các cộng đồng.
          </span>
        </p>
      </div>
    </div>
  );
};

export default HoiDapPage;
