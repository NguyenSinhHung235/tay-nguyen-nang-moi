import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { askGeminiAssistant } from "./lib/gemini.ts";

dotenv.config();
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProduction = process.env.NODE_ENV === "production";

  app.use(express.json());

  // API Route cho trợ lý hỏi đáp Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { question } = req.body || {};
      if (!question || typeof question !== "string" || !question.trim()) {
        return res
          .status(400)
          .json({ error: "Vui lòng cung cấp nội dung câu hỏi." });
      }

      const result = await askGeminiAssistant(question.trim());
      return res.json(result);
    } catch (error: any) {
      console.error("Gemini API Error:", error?.message || error);
      const isMissingKey =
        error?.message?.includes("Chưa cấu hình GEMINI_API_KEY") ||
        error?.message?.includes("API key");
      return res.status(500).json({
        error: isMissingKey
          ? "Chưa cấu hình GEMINI_API_KEY trên server."
          : error?.message || "Đã xảy ra lỗi khi kết nối với Gemini.",
      });
    }
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});
