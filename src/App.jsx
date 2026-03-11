import { useState, useMemo } from "react";
import { categories, commands } from "./data/commands";
import BeginnerGuide from "./components/BeginnerGuide";

const categoryBorderColors = {
  slash: "border-l-slash",
  keyboard: "border-l-keyboard",
  cli: "border-l-cli",
  core: "border-l-core",
  vim: "border-l-vim",
};

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#1a2a3e] px-8 py-14 text-center border-b border-border">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent mb-2">
          Claude Code 指令大全
        </h1>
        <p className="text-text-secondary text-lg mb-4">
          所有指令、快捷鍵與 CLI 選項的完整參考手冊（繁體中文版）
        </p>
        <div className="flex gap-3 justify-center">
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
            共 {commands.length} 個指令
          </span>
          <span className="bg-accent/15 text-accent-light px-4 py-1.5 rounded-full text-sm border border-accent/30 backdrop-blur-sm">
            {categories.length} 個分類
          </span>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl px-6 py-4 border-b border-border">
        <div className="relative max-w-[600px] mx-auto mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50">
            &#128269;
          </span>
          <input
            type="text"
            placeholder="搜尋指令、說明或使用情境..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-10 border border-border rounded-xl bg-search-bg text-text text-base outline-none transition-colors duration-200 focus:border-accent focus:ring-1 focus:ring-accent/50 placeholder:text-text-secondary"
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-text-secondary cursor-pointer text-base px-2 py-1 rounded-md hover:bg-surface-hover hover:text-text transition-colors"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
          <button
            className={`px-4 py-2 border rounded-lg text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "bg-accent text-[#1a1a2e] border-accent font-semibold shadow-lg shadow-accent/20"
                : "bg-surface border-border text-text-secondary hover:bg-surface-hover hover:text-text"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 border rounded-lg text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-accent text-[#1a1a2e] border-accent font-semibold shadow-lg shadow-accent/20"
                  : "bg-surface border-border text-text-secondary hover:bg-surface-hover hover:text-text"
              }`}
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
                    const CardTag = cmd.docUrl ? "a" : "div";
                    const linkProps = cmd.docUrl
                      ? {
                          href: cmd.docUrl,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {};
                    const borderColor =
                      categoryBorderColors[cmd.category] || "";
                    return (
                      <CardTag
                        key={i}
                        className={`block bg-surface border border-border rounded-xl px-5 py-4 transition-all duration-200 border-l-[3px] ${borderColor} hover:bg-surface-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${cmd.docUrl ? "no-underline text-inherit cursor-pointer group" : ""}`}
                        {...linkProps}
                      >
                        <div className="mb-1.5 flex items-center">
                          <code className="font-mono text-[0.95rem] font-semibold text-accent-light bg-accent/10 px-2 py-0.5 rounded">
                            {cmd.command}
                          </code>
                          {cmd.docUrl && (
                            <span
                              className="ml-2 text-sm opacity-40 group-hover:opacity-100 transition-opacity"
                              title="開啟官方文件"
                            >
                              &#x2197;
                            </span>
                          )}
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
                      </CardTag>
                    );
                  })}
                </div>
              </section>
            ))
        )}
      </main>

      {/* Footer */}
      <footer className="text-center p-8 text-text-secondary text-sm border-t border-border mt-8">
        <p>
          Claude Code 指令參考手冊 — 繁體中文版 | 資料來源：Claude Code 官方文件
        </p>
      </footer>
    </div>
  );
}

export default App;
