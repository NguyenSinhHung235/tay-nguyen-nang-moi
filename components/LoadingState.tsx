import React from "react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Đang tải..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="w-8 h-8 border-3 border-stone-300 border-t-amber-800 rounded-full animate-spin mb-4"
        role="status"
        aria-label="Đang xử lý dữ liệu"
      />
      <p className="text-stone-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
