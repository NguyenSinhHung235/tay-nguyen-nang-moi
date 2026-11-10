import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { BanGhi, ChatResponse, ChatSourceItem } from "./types.ts";

const disanFilePath = fileURLToPath(new URL("../data/disan.json", import.meta.url));
const rawData = JSON.parse(fs.readFileSync(disanFilePath, "utf-8"));

const disanData: BanGhi[] = Array.isArray(rawData) ? (rawData as BanGhi[]) : [];

export async function askGeminiAssistant(question: string): Promise<ChatResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_key_here") {
    throw new Error("Chưa cấu hình GEMINI_API_KEY trên server.");
  }

  // Nếu disan.json rỗng, trả về ngay theo quy định
  if (!disanData || disanData.length === 0) {
    return {
      answer:
        "Chưa có dữ liệu trong hồ sơ. Vui lòng nạp bản ghi vào /data/disan.json trước khi dùng chức năng hỏi đáp.",
      sources: [],
    };
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  const systemInstruction = `Bạn là trợ lý tra cứu hồ sơ di sản Taynguyennangmoi về nghi lễ vòng đời và lễ bỏ mả (Pơ thi) của các cộng đồng dân tộc Tây Nguyên (Ba Na, Ê Đê, Gia Rai, Mnông, Xơ Đăng, Rơ Măm).

Quy tắc BẮT BUỘC:
1. Chỉ trả lời dựa trên nội dung tệp disan.json được cung cấp trong ngữ cảnh. KHÔNG bịa, KHÔNG suy đoán.
2. Nếu không tìm thấy thông tin, trả lời đúng câu:
   "Chưa có tư liệu trong hồ sơ về nội dung này."
3. Không gán thông tin của cộng đồng này sang cộng đồng khác.
4. Không trả lời câu hỏi ngoài phạm vi di sản. Nếu bị hỏi ngoài phạm vi, trả lời: "Câu hỏi này nằm ngoài phạm vi hồ sơ di sản."
5. Nếu hỏi về "phần thiêng", trả lời: cộng đồng không cho phép ghi hình/ghi âm phần này, hồ sơ chỉ ghi nhận sự tồn tại và giới hạn.
6. Dùng giọng người học hỏi, tôn trọng. Không dùng các từ "kỳ lạ", "hoang sơ", "lạc hậu", "bí ẩn".
7. Mỗi câu trả lời PHẢI kết thúc bằng khối:
   "---
   Nguồn: [mã bản ghi] – [cộng đồng] – [địa danh] – [nguồn tư liệu]"

Dữ liệu disan.json:
${JSON.stringify(disanData, null, 2)}`;

  // Set timeout 30s
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            "Yêu cầu xử lý quá thời gian quy định (30 giây). Vui lòng thử lại với câu hỏi ngắn gọn hơn."
          )
        ),
      30000
    )
  );

  const generatePromise = ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: question,
    config: {
      systemInstruction,
    },
  });

  const response = await Promise.race([generatePromise, timeoutPromise]);
  const text = (response.text ?? "").trim();

  // Tách khối Nguồn: ở cuối nếu có
  const sources: ChatSourceItem[] = [];
  const parts = text.split(/---\s*\n*Nguồn:\s*/i);

  let cleanAnswer = text;
  if (parts.length > 1) {
    cleanAnswer = parts[0].trim();
    const sourceText = parts.slice(1).join("\n").trim();
    // Parse source lines
    const lines = sourceText.split("\n");
    for (const line of lines) {
      const trimmed = line.replace(/^[-*•\s]+/, "").trim();
      if (!trimmed) continue;
      const segments = trimmed.split(/–|-/).map((s) => s.trim());
      sources.push({
        ma_ban_ghi: segments[0] || "",
        cong_dong: segments[1] || "",
        dia_danh: segments[2] || "",
        nguon: segments.slice(3).join(" - ") || segments[0] || trimmed,
      });
    }
  }

  return {
    answer: text, // Giữ đầy đủ câu trả lời gồm cả khối nguồn theo yêu cầu hiển thị
    sources,
  };
}
