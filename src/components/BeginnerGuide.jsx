import { useState } from "react";
import { levels } from "../data/beginnerGuide";

function BeginnerGuide() {
  const [expandedLevel, setExpandedLevel] = useState(1);
  const [expandedCase, setExpandedCase] = useState({});

  const toggleCase = (levelIdx, caseIdx) => {
    const key = `${levelIdx}-${caseIdx}`;
    setExpandedCase((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-12 pb-10 border-b-2 border-border">
      {/* Guide Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-keyboard via-slash to-vim bg-clip-text text-transparent mb-2">
          新手學習路線
        </h2>
        <p className="text-text-secondary text-base">
          從零開始，循序漸進掌握 Claude Code — 以「使用情境」引導你逐步升級
        </p>
      </div>

      {/* Level Progress Dots */}
      <div className="flex justify-center items-center gap-0 mb-8 relative px-4">
        <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-border -translate-y-1/2 z-0" />
        {levels.map((lvl) => (
          <button
            key={lvl.level}
            className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer z-10 px-4 py-2 transition-all duration-300"
            onClick={() => setExpandedLevel(lvl.level)}
          >
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                expandedLevel === lvl.level
                  ? "text-[#1a1a2e] shadow-lg"
                  : "bg-surface border-2 border-border text-text-secondary"
              }`}
              style={
                expandedLevel === lvl.level
                  ? {
                      backgroundColor: lvl.color,
                      borderColor: lvl.color,
                      boxShadow: `0 0 16px ${lvl.color}80`,
                    }
                  : {}
              }
            >
              Lv.{lvl.level}
            </span>
            <span
              className={`text-xs whitespace-nowrap transition-colors duration-300 ${
                expandedLevel === lvl.level ? "font-semibold" : "text-text-secondary"
              }`}
              style={
                expandedLevel === lvl.level ? { color: lvl.color } : {}
              }
            >
              {lvl.title}
            </span>
          </button>
        ))}
      </div>

      {/* Level Sections */}
      <div className="flex flex-col gap-3">
        {levels.map((lvl) => {
          const isExpanded = expandedLevel === lvl.level;
          return (
            <div
              key={lvl.level}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                isExpanded ? "shadow-lg" : "border-border"
              }`}
              style={
                isExpanded
                  ? {
                      borderColor: lvl.color,
                      boxShadow: `0 0 20px ${lvl.color}26`,
                    }
                  : {}
              }
            >
              {/* Level Title Bar */}
              <button
                className="w-full flex items-center gap-4 px-5 py-4 bg-surface border-none text-text cursor-pointer text-left transition-colors duration-200 hover:bg-surface-hover"
                onClick={() =>
                  setExpandedLevel(isExpanded ? null : lvl.level)
                }
              >
                <div
                  className="w-12 h-8 rounded-md flex items-center justify-center text-[0.8rem] font-bold shrink-0 border"
                  style={{
                    backgroundColor: `${lvl.color}33`,
                    color: lvl.color,
                    borderColor: `${lvl.color}66`,
                  }}
                >
                  Lv.{lvl.level}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-0">{lvl.title}</h3>
                  <span className="text-sm text-text-secondary">
                    {lvl.subtitle}
                  </span>
                </div>
                <span className="text-xs text-text-secondary bg-bg px-3 py-1 rounded-full border border-border whitespace-nowrap">
                  {lvl.useCases.length} 個情境
                </span>
                <span className="text-xs text-text-secondary shrink-0">
                  {isExpanded ? "▼" : "▶"}
                </span>
              </button>

              {/* Use Cases */}
              {isExpanded && (
                <div
                  className="px-5 pb-5 pt-3 flex flex-col gap-2.5"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${lvl.color} 3%, var(--color-bg))`,
                  }}
                >
                  {lvl.useCases.map((uc, i) => {
                    const key = `${lvl.level}-${i}`;
                    const isOpen = expandedCase[key] !== false;
                    return (
                      <div
                        key={i}
                        className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                          isOpen ? "" : "border-border"
                        }`}
                        style={
                          isOpen
                            ? {
                                borderColor: `color-mix(in srgb, ${lvl.color} 40%, var(--color-border))`,
                              }
                            : {}
                        }
                      >
                        {/* Use Case Header */}
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3.5 bg-surface border-none text-text cursor-pointer text-left text-[0.95rem] transition-colors duration-200 hover:bg-surface-hover"
                          onClick={() => toggleCase(lvl.level, i)}
                        >
                          <span className="text-lg shrink-0">💡</span>
                          <span className="flex-1 font-medium">
                            「{uc.scenario}」
                          </span>
                          <span className="text-xl text-text-secondary shrink-0 w-5 text-center">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {/* Use Case Body */}
                        {isOpen && (
                          <div
                            className="px-5 py-4 border-t border-border"
                            style={{
                              backgroundColor: `color-mix(in srgb, var(--color-surface) 60%, var(--color-bg))`,
                            }}
                          >
                            {/* Steps */}
                            <div className="mb-4">
                              <h4
                                className="text-xs font-semibold uppercase tracking-wider mb-2"
                                style={{ color: lvl.color }}
                              >
                                操作步驟
                              </h4>
                              <ol className="pl-6 flex flex-col gap-1.5">
                                {uc.steps.map((step, j) => (
                                  <li
                                    key={j}
                                    className="text-sm text-text leading-relaxed"
                                  >
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: step.replace(
                                          /`([^`]+)`/g,
                                          '<code class="font-mono text-[0.82rem] bg-[rgba(212,165,116,0.12)] text-[var(--color-accent-light)] px-1.5 py-0.5 rounded">$1</code>'
                                        ),
                                      }}
                                    />
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Commands */}
                            <div className="mb-4">
                              <h4
                                className="text-xs font-semibold uppercase tracking-wider mb-2"
                                style={{ color: lvl.color }}
                              >
                                相關指令
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {uc.commands.map((cmd, j) => (
                                  <code
                                    key={j}
                                    className="font-mono text-[0.82rem] bg-slash/12 text-[#b0a8f0] px-3 py-1.5 rounded-md border border-slash/25 whitespace-nowrap"
                                  >
                                    {cmd}
                                  </code>
                                ))}
                              </div>
                            </div>

                            {/* Tip */}
                            <div className="flex items-start gap-2 bg-core/8 border border-core/20 rounded-lg px-4 py-3">
                              <span className="text-base shrink-0 mt-px">
                                💡
                              </span>
                              <span
                                className="text-sm text-text-secondary leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: uc.tip.replace(
                                    /`([^`]+)`/g,
                                    '<code class="font-mono text-[0.8rem] bg-[rgba(212,165,116,0.12)] text-[var(--color-accent-light)] px-1 py-0.5 rounded">$1</code>'
                                  ),
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BeginnerGuide;
