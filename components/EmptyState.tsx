import React from "react";

interface EmptyStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Chưa có dữ liệu",
  message,
  actionLabel,
  actionHref,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-stone-50 rounded-xl border border-stone-200 text-stone-700 my-4 max-w-2xl mx-auto">
      <div className="text-4xl mb-3 select-none" role="img" aria-label="Hộp thư rỗng">
        📭
      </div>
      <h3 className="text-lg font-semibold text-stone-900 mb-2 font-serif">{title}</h3>
      <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-lg mb-6">{message}</p>
      {actionLabel && (
        <div>
          {actionHref ? (
            <a
              href={actionHref}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors"
            >
              {actionLabel}
            </a>
          ) : onAction ? (
            <button
              onClick={onAction}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
