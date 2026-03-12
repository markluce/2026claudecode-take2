import { useEffect } from "react";

const categoryLabels = {
  slash: "斜線指令",
  keyboard: "鍵盤快捷鍵",
  cli: "CLI 旗標",
  core: "核心指令",
  vim: "Vim 模式",
};

const categoryColors = {
  slash: "#7c6fe0",
  keyboard: "#4ecdc4",
  cli: "#ff6b9d",
  core: "#ffd93d",
  vim: "#6bcf7f",
};

function CommandModal({ cmd, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!cmd) return null;

  const color = categoryColors[cmd.category] || "#d4a574";
  const label = categoryLabels[cmd.category] || cmd.category;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-surface border border-border rounded-2xl max-w-[600px] w-full max-h-[85vh] overflow-y-auto shadow-2xl transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Doc link bar */}
        {cmd.docUrl && (
          <a
            href={cmd.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-accent/10 border-b border-border text-accent text-sm no-underline hover:bg-accent/20 transition-colors"
          >
            <span>&#x2197;</span>
            <span className="truncate">{cmd.docUrl}</span>
          </a>
        )}

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full border"
              style={{
                backgroundColor: `${color}20`,
                color: color,
                borderColor: `${color}40`,
              }}
            >
              {label}
            </span>
          </div>
          <code
            className="block font-mono text-xl font-bold text-accent-light mb-2 px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: "var(--t-code-bg)" }}
          >
            {cmd.command}
          </code>
          <p className="text-text text-base font-medium">{cmd.brief}</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Detail */}
          <div className="mb-5">
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color }}
            >
              詳細說明
            </h4>
            <p className="text-text-secondary text-[0.92rem] leading-relaxed whitespace-pre-line">
              {cmd.detail}
            </p>
          </div>

          {/* Use Case */}
          <div
            className="flex items-start gap-2 rounded-lg px-4 py-3"
            style={{
              backgroundColor: "var(--t-tip-bg)",
              border: "1px solid var(--t-tip-border)",
            }}
          >
            <span className="text-base shrink-0 mt-px">💡</span>
            <div>
              <span className="text-accent font-semibold text-xs uppercase tracking-wider">
                使用情境
              </span>
              <p className="text-text-secondary text-sm leading-relaxed mt-1">
                {cmd.useCase}
              </p>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-surface-hover/60 text-text-secondary hover:text-text hover:bg-surface-hover transition-colors cursor-pointer border-none text-lg"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default CommandModal;
