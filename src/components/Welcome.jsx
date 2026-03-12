function Welcome({ onBack, theme, toggleTheme }) {
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

        <h1 className="text-5xl font-bold bg-gradient-to-r from-keyboard via-slash to-vim bg-clip-text text-transparent mb-4">
          Welcome
        </h1>
        <p className="text-text-secondary text-lg">
          AI Innovator 進階分會（中部）
        </p>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Banner */}
        <div
          className="rounded-2xl px-8 py-12 text-center mb-8"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, #7c6fe0 8%, var(--t-bg)), color-mix(in srgb, #4ecdc4 8%, var(--t-bg)))`,
            border: "1px solid color-mix(in srgb, #7c6fe0 25%, var(--t-border))",
          }}
        >
          <p className="text-4xl mb-6">🎉</p>
          <h2 className="text-3xl font-bold text-text mb-4">
            歡迎 AI Innovator 進階分會（中部）的夥伴們
          </h2>
          <h3 className="text-xl text-accent-light font-semibold mb-3">
            參與本次聚會
          </h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-[600px] mx-auto">
            很高興大家今天齊聚一堂！本次聚會我們將一起探索如何使用 Claude Code
            打造屬於自己的網站，從零開始到公開上線。
          </p>
        </div>

        {/* Group Photo */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-border">
          <img
            src="https://github.com/user-attachments/assets/0e740016-9d5d-4d65-a5c3-f0ef2d4e3461"
            alt="AI Innovator 進階分會（中部）合照"
            className="w-full h-auto"
          />
        </div>

        {/* Agenda */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            className="rounded-xl px-6 py-5 border"
            style={{
              backgroundColor: "color-mix(in srgb, #4ecdc4 5%, var(--t-surface))",
              borderColor: "color-mix(in srgb, #4ecdc4 25%, var(--t-border))",
            }}
          >
            <h4 className="text-keyboard font-semibold text-sm uppercase tracking-wider mb-3">
              今日主題
            </h4>
            <p className="text-text text-lg font-medium mb-2">
              用 AI 打造你的第一個網站
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              透過 Claude Code，我們將示範如何從一個想法開始，快速建立 React
              網站並免費部署到 GitHub Pages，讓全世界都能看到你的作品。
            </p>
          </div>

          <div
            className="rounded-xl px-6 py-5 border"
            style={{
              backgroundColor: "color-mix(in srgb, #7c6fe0 5%, var(--t-surface))",
              borderColor: "color-mix(in srgb, #7c6fe0 25%, var(--t-border))",
            }}
          >
            <h4 className="text-slash font-semibold text-sm uppercase tracking-wider mb-3">
              你將學到
            </h4>
            <ul className="flex flex-col gap-2">
              <li className="text-text text-sm flex items-start gap-2">
                <span className="text-keyboard shrink-0 mt-0.5">✦</span>
                <span>使用 Claude Code 加速開發流程</span>
              </li>
              <li className="text-text text-sm flex items-start gap-2">
                <span className="text-keyboard shrink-0 mt-0.5">✦</span>
                <span>建立 React + Vite 專案</span>
              </li>
              <li className="text-text text-sm flex items-start gap-2">
                <span className="text-keyboard shrink-0 mt-0.5">✦</span>
                <span>部署到 GitHub Pages（免費網址）</span>
              </li>
              <li className="text-text text-sm flex items-start gap-2">
                <span className="text-keyboard shrink-0 mt-0.5">✦</span>
                <span>（選修）綁定自訂網域</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-xl px-6 py-5 border border-border bg-surface mb-8">
          <h4 className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 text-center">
            快速連結
          </h4>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://markluce.ai/"
              className="px-5 py-2.5 rounded-lg bg-accent/15 text-accent-light border border-accent/30 text-sm font-medium no-underline hover:bg-accent/25 transition-colors"
            >
              markluce.ai
            </a>
            <a
              href="https://github.com/markluce/2026claudecode-take2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-accent/15 text-accent-light border border-accent/30 text-sm font-medium no-underline hover:bg-accent/25 transition-colors"
            >
              GitHub Repo
            </a>
            <a
              href="https://code.claude.com/docs/en/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-accent/15 text-accent-light border border-accent/30 text-sm font-medium no-underline hover:bg-accent/25 transition-colors"
            >
              Claude Code 官方文件
            </a>
          </div>
        </div>

        {/* Encouragement */}
        <div
          className="rounded-xl px-6 py-5 text-center"
          style={{
            backgroundColor: "var(--t-tip-bg)",
            border: "1px solid var(--t-tip-border)",
          }}
        >
          <p className="text-text text-base font-medium mb-2">
            💡 今天的重點不是做出一模一樣的網站
          </p>
          <p className="text-text-secondary text-sm leading-relaxed max-w-[500px] mx-auto">
            每個人的方向和想法都不一樣，這正是最有趣的地方。
            用你自己的創意，做出屬於你的作品！
          </p>
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

export default Welcome;
