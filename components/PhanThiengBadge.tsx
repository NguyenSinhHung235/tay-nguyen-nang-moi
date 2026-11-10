import React from "react";
import { Lock } from "lucide-react";

interface PhanThiengBadgeProps {
  content?: string;
  variant?: "badge" | "callout";
}

export const PhanThiengBadge: React.FC<PhanThiengBadgeProps> = ({
  content,
  variant = "callout",
}) => {
  if (variant === "badge") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-800 border border-rose-200">
        <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
        <span>Phần thiêng bảo mật</span>
      </span>
    );
  }

  return (
    <div className="bg-rose-50/90 border border-rose-300 rounded-xl p-4 sm:p-5 text-rose-950">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-rose-100 rounded-lg text-rose-700 shrink-0 mt-0.5">
          <Lock className="w-5 h-5 text-rose-700" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-rose-900 flex items-center gap-1.5">
            <span>Phần thiêng KHÔNG được ghi hình, ghi âm</span>
          </h4>
          <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
            {content ||
              "Theo tập quán cộng đồng Ba Na, khu nhà mồ và các nghi thức ban đêm là không gian thiêng liêng. Hồ sơ này tuyệt đối không ghi hình, không ghi âm và không suy đoán nội dung phần thiêng."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhanThiengBadge;
