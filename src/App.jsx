import { useState, useMemo, useEffect, useCallback } from "react";
import { categories, commands } from "./data/commands";
import BeginnerGuide from "./components/BeginnerGuide";
import CommandModal from "./components/CommandModal";

const categoryBorderColors = {
  slash: "border-l-slash",
  keyboard: "border-l-keyboard",
  cli: "border-l-cli",
  core: "border-l-core",
  vim: "border-l-vim",
};

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCmd, setSelectedCmd] = useState(null);
  const { theme, toggle: toggleTheme } = useTheme();
  const closeModal = useCallback(() => setSelectedCmd(null), []);

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      const matchCategory =
        activeCategory === "all" || cmd.category === activeCategory;
      const matchSearch =
        !searchTerm ||
        cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.brief.includes(searchTerm) ||
        cmd.useCase.includes(searchTerm);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const grouped = useMemo(() => {
    const map = {};
    for (const cmd of filteredCommands) {
      if (!map[cmd.category]) map[cmd.category] = [];
      map[cmd.category].push(cmd);
    }
    return map;
  }, [filteredCommands]);

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <header
        className="relative px-8 py-14 text-center border-b border-border transition-colors duration-300"
        style={{
          background: `linear-gradient(135deg, var(--t-header-from), var(--t-header-via), var(--t-header-to))`,
        }}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-surface/60 backdrop-blur-sm border border-border text-xl cursor-pointer transition-all duration-300 hover:bg-surface-hover hover:scale-110 flex items-center justify-center"
          title={theme === "dark" ? "切換到淺色模式" : "切換到深色模式"}
        >
          {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
        </button>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent mb-2">
          Claude Code 指令大全
        </h1>
        <p className="text-text-secondary text-lg mb-4">
          所有指令、快捷鍵與 CLI 選項的完整參考手冊（繁體中文版）
        </p>
        <div className="flex gap-3 justify-center mb-4">
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
            共 {commands.length} 個指令
          </span>
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
            {categories.length} 個分類
          </span>
        </div>
        <p className="text-text-secondary/80 text-sm">
          由 Mark Luce 與 Claude (Anthropic) 攜手合作打造 |{" "}
          <a
            href="mailto:markluceai@gmail.com"
            className="text-accent-light/70 hover:text-accent-light transition-colors no-underline"
          >
            markluceai@gmail.com
          </a>
        </p>
        <p className="text-text-secondary/60 text-xs mt-2">
          馬克路思科技有限公司 | 統一編號 60670979 | 臺中市中區大誠里臺灣大道一段501號10樓之1
        </p>
        <p className="text-text-secondary/80 text-sm font-bold mt-3">
          <a
            href="https://markluce.ai/"
            className="text-accent-light/70 hover:text-accent-light transition-colors no-underline"
          >
            markluce.ai
          </a>
          {" | "}
          <a
            href="https://github.com/markluce/2026claudecode-take2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-light/70 hover:text-accent-light transition-colors no-underline"
          >
            GitHub Repo
          </a>
        </p>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl px-6 py-4 border-b border-border transition-colors duration-300">
        <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
          <button
            className={`px-4 py-2 border rounded-lg text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "bg-accent border-accent font-semibold shadow-lg shadow-accent/20"
                : "bg-surface border-border text-text-secondary hover:bg-surface-hover hover:text-text"
            }`}
            style={activeCategory === "all" ? { color: "var(--t-active-tab-text)" } : {}}
            onClick={() => setActiveCategory("all")}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 border rounded-lg text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-accent border-accent font-semibold shadow-lg shadow-accent/20"
                  : "bg-surface border-border text-text-secondary hover:bg-surface-hover hover:text-text"
              }`}
              style={activeCategory === cat.id ? { color: "var(--t-active-tab-text)" } : {}}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name.split("（")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="p-6">
        <BeginnerGuide />
        {filteredCommands.length === 0 ? (
          <div className="text-center py-16 px-8 text-text-secondary">
            <p className="text-lg mb-4">找不到符合「{searchTerm}」的指令</p>
            <button
              className="px-6 py-2.5 border border-accent rounded-lg bg-transparent text-accent cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg font-medium"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
            >
              清除篩選
            </button>
          </div>
        ) : (
          categories
            .filter((cat) => grouped[cat.id])
            .map((cat) => (
              <section key={cat.id} className="mb-10">
                <div className="flex items-baseline gap-4 mb-4 pb-3 border-b border-border flex-wrap">
                  <h2 className="text-xl font-semibold text-text">
                    {cat.name}
                  </h2>
                  <p className="text-text-secondary text-sm flex-1">
                    {cat.description}
                  </p>
                  <span className="text-xs text-text-secondary bg-surface px-3 py-1 rounded-full border border-border">
                    {grouped[cat.id].length} 個指令
                  </span>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-3">
                  {grouped[cat.id].map((cmd, i) => {
                    const borderColor =
                      categoryBorderColors[cmd.category] || "";
                    return (
                      <div
                        key={i}
                        className={`block bg-surface border border-border rounded-xl px-5 py-4 transition-all duration-200 border-l-[3px] ${borderColor} hover:bg-surface-hover hover:-translate-y-0.5 hover:shadow-lg cursor-pointer group`}
                        style={{ "--tw-shadow-color": "var(--t-card-shadow)" }}
                        onClick={() => setSelectedCmd(cmd)}
                      >
                        <div className="mb-1.5 flex items-center">
                          <code
                            className="font-mono text-[0.95rem] font-semibold text-accent-light px-2 py-0.5 rounded"
                            style={{ backgroundColor: "var(--t-code-bg)" }}
                          >
                            {cmd.command}
                          </code>
                          <span className="ml-auto text-xs text-text-secondary opacity-0 group-hover:opacity-60 transition-opacity">
                            點擊查看詳情
                          </span>
                        </div>
                        <div className="text-[0.92rem] text-text mb-1.5 font-medium">
                          {cmd.brief}
                        </div>
                        <div className="text-[0.82rem] text-text-secondary leading-relaxed">
                          <span className="text-accent font-semibold text-[0.78rem]">
                            使用情境：
                          </span>
                          {cmd.useCase}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
        )}
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
          馬克路思科技有限公司 | 統一編號 60670979 | 臺中市中區大誠里臺灣大道一段501號10樓之1
        </p>
        <p className="text-text-secondary text-sm mt-4">
          Claude Code 指令參考手冊 — 繁體中文版 | 資料來源：Claude Code 官方文件
        </p>
      </footer>

      {/* Command Detail Modal */}
      {selectedCmd && (
        <CommandModal cmd={selectedCmd} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
