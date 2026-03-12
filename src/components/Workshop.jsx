import { useState } from "react";
import { workshopSteps } from "../data/workshopSteps";

function Workshop({ onBack, theme, toggleTheme }) {
  const [expandedStep, setExpandedStep] = useState(1);

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <header
        className="relative px-8 py-14 text-center border-b border-border transition-colors duration-300"
        style={{
          background: `linear-gradient(135deg, var(--t-header-from), var(--t-header-via), var(--t-header-to))`,
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-5 left-5 px-4 py-2.5 rounded-full bg-surface/60 backdrop-blur-sm border border-border text-sm cursor-pointer transition-all duration-300 hover:bg-surface-hover hover:scale-105 text-text-secondary flex items-center gap-2"
        >
          <span>←</span>
          <span>返回指令大全</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-surface/60 backdrop-blur-sm border border-border text-xl cursor-pointer transition-all duration-300 hover:bg-surface-hover hover:scale-110 flex items-center justify-center"
          title={theme === "dark" ? "切換到淺色模式" : "切換到深色模式"}
        >
          {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
        </button>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-keyboard via-slash to-vim bg-clip-text text-transparent mb-2">
          工作坊：從零打造指令大全
        </h1>
        <p className="text-text-secondary text-lg mb-4">
          完整記錄我們如何一步步建立這個 Claude Code 繁體中文參考手冊
        </p>
        <div className="flex gap-3 justify-center">
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
            {workshopSteps.length} 個步驟
          </span>
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
            {workshopSteps.filter((s) => s.isOptional).length} 個選修
          </span>
        </div>
      </header>

      <main className="p-6">
        {/* Progress Dots */}
        <div className="flex justify-center items-center gap-0 mb-8 relative px-4 flex-wrap">
          <div className="absolute top-1/2 left-[5%] right-[5%] h-0.5 bg-border -translate-y-1/2 z-0 hidden sm:block" />
          {workshopSteps.map((s) => (
            <button
              key={s.step}
              className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer z-10 px-3 py-2 transition-all duration-300"
              onClick={() => setExpandedStep(s.step)}
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  expandedStep === s.step
                    ? "shadow-lg"
                    : "bg-surface border-2 border-border text-text-secondary"
                }`}
                style={
                  expandedStep === s.step
                    ? {
                        backgroundColor: s.color,
                        borderColor: s.color,
                        boxShadow: `0 0 16px ${s.color}80`,
                        color: "var(--t-active-tab-text)",
                      }
                    : {}
                }
              >
                {s.step}
              </span>
              <span
                className={`text-[0.7rem] whitespace-nowrap transition-colors duration-300 max-w-[80px] truncate ${
                  expandedStep === s.step
                    ? "font-semibold"
                    : "text-text-secondary"
                }`}
                style={expandedStep === s.step ? { color: s.color } : {}}
              >
                {s.isOptional ? `${s.title}*` : s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Step Cards */}
        <div className="flex flex-col gap-3">
          {workshopSteps.map((s) => {
            const isExpanded = expandedStep === s.step;
            return (
              <div
                key={s.step}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "shadow-lg" : "border-border"
                }`}
                style={
                  isExpanded
                    ? {
                        borderColor: s.color,
                        boxShadow: `0 0 20px ${s.color}26`,
                      }
                    : {}
                }
              >
                {/* Title Bar */}
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 bg-surface border-none text-text cursor-pointer text-left transition-colors duration-200 hover:bg-surface-hover"
                  onClick={() =>
                    setExpandedStep(isExpanded ? null : s.step)
                  }
                >
                  <div
                    className="w-12 h-8 rounded-md flex items-center justify-center text-[0.8rem] font-bold shrink-0 border"
                    style={{
                      backgroundColor: `${s.color}33`,
                      color: s.color,
                      borderColor: `${s.color}66`,
                    }}
                  >
                    {s.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-0 flex items-center gap-2">
                      {s.title}
                      {s.isOptional && (
                        <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-accent/15 text-accent-light border border-accent/30">
                          選修
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-text-secondary">
                      {s.subtitle}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary shrink-0">
                    {isExpanded ? "▼" : "▶"}
                  </span>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    className="px-5 pb-5 pt-3"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${s.color} 3%, var(--t-bg))`,
                    }}
                  >
                    {/* Description */}
                    <div className="mb-5">
                      <h4
                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: s.color }}
                      >
                        說明
                      </h4>
                      <p className="text-text-secondary text-[0.92rem] leading-relaxed">
                        {s.description}
                      </p>
                    </div>

                    {/* Key Actions */}
                    <div className="mb-5">
                      <h4
                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: s.color }}
                      >
                        關鍵操作
                      </h4>
                      <ol className="pl-6 flex flex-col gap-1.5">
                        {s.keyActions.map((action, i) => (
                          <li
                            key={i}
                            className="text-sm text-text leading-relaxed"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: action.replace(
                                  /`([^`]+)`/g,
                                  '<code class="font-mono text-[0.82rem] text-[var(--t-accent-light)] px-1.5 py-0.5 rounded" style="background:var(--t-code-bg)">$1</code>'
                                ),
                              }}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Code Snippets */}
                    {s.codeSnippets.length > 0 && (
                      <div className="mb-5">
                        <h4
                          className="text-xs font-semibold uppercase tracking-wider mb-2"
                          style={{ color: s.color }}
                        >
                          程式碼 / 指令
                        </h4>
                        <pre
                          className="rounded-lg px-4 py-3 overflow-x-auto text-sm leading-relaxed font-mono"
                          style={{
                            backgroundColor: "var(--t-code-bg)",
                            border: "1px solid var(--t-border)",
                          }}
                        >
                          {s.codeSnippets.map((line, i) => (
                            <div
                              key={i}
                              className={
                                line.startsWith("#")
                                  ? "text-text-secondary"
                                  : "text-accent-light"
                              }
                            >
                              {line || "\u00A0"}
                            </div>
                          ))}
                        </pre>
                      </div>
                    )}

                    {/* Checkpoint */}
                    <div
                      className="flex items-start gap-3 rounded-lg px-4 py-3 mb-4"
                      style={{
                        backgroundColor: `${s.color}12`,
                        border: `1px solid ${s.color}30`,
                      }}
                    >
                      <span className="text-lg shrink-0 mt-px">✅</span>
                      <div>
                        <span
                          className="font-semibold text-xs uppercase tracking-wider"
                          style={{ color: s.color }}
                        >
                          Checkpoint
                        </span>
                        <p className="text-text-secondary text-sm leading-relaxed mt-1">
                          {s.checkpoint}
                        </p>
                      </div>
                    </div>

                    {/* Tip */}
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
                          小提示
                        </span>
                        <p className="text-text-secondary text-sm leading-relaxed mt-1">
                          {s.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center px-8 pt-10 pb-12 border-t border-border mt-8">
        <p className="text-lg font-medium text-text mb-2">
          由 Mark Luce 與 Claude (Anthropic) 攜手合作打造
        </p>
        <a
          href="mailto:markluceai@gmail.com"
          className="text-accent hover:text-accent-light transition-colors text-base no-underline"
        >
          markluceai@gmail.com
        </a>
        <p className="text-text-secondary/60 text-xs mt-3">
          馬克路思科技有限公司 | 統一編號 60670979 |
          臺中市中區大誠里臺灣大道一段501號10樓之1
        </p>
      </footer>
    </div>
  );
}

export default Workshop;
