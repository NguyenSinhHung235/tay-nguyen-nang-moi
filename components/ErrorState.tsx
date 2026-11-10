import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-rose-50/80 rounded-xl border border-rose-200 text-rose-900 my-4 max-w-xl mx-auto">
      <AlertCircle className="w-8 h-8 text-rose-600 mb-3" />
      <h3 className="text-base font-semibold text-rose-950 mb-1">Đã xảy ra lỗi</h3>
      <p className="text-rose-800 text-sm leading-relaxed mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors cursor-pointer"
        >
          Thử lại
        </button>
      )}
    </div>
  );
};

export default ErrorState;
