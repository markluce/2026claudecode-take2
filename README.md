# Claude Code 指令大全（繁體中文版）

所有指令、快捷鍵與 CLI 選項的完整參考手冊。

**線上版：** [markluce.ai](https://markluce.ai/) | [markluce.github.io](https://markluce.github.io/2026claudecode-take2/)

## 功能特色

- 138+ 個 Claude Code 指令，含詳細繁體中文說明
- 5 大分類：斜線指令、鍵盤快捷鍵、CLI 旗標、核心指令、Vim 模式
- 新手學習路線（Lv.1 ~ Lv.5 循序漸進）
- 深色 / 淺色主題切換
- 點擊卡片彈出詳細說明視窗

## 技術棧

- [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- GitHub Pages 部署

## 在本地運行

### 前置需求

- [Node.js](https://nodejs.org/) 18 以上
- [npm](https://www.npmjs.com/) 或 [pnpm](https://pnpm.io/)

### 安裝與啟動

```bash
# 1. 複製專案
git clone https://github.com/markluce/2026claudecode-take2.git
cd 2026claudecode-take2

# 2. 安裝相依套件
npm install

# 3. 啟動開發伺服器
npm run dev
```

瀏覽器開啟 [http://localhost:5173](http://localhost:5173) 即可預覽。

### 其他指令

```bash
# 建置生產版本
npm run build

# 預覽生產版本
npm run preview

# 程式碼檢查
npm run lint
```

## 專案結構

```
src/
├── App.jsx                # 主應用程式元件
├── index.css              # Tailwind 設定與主題變數
├── components/
│   ├── BeginnerGuide.jsx  # 新手學習路線元件
│   └── CommandModal.jsx   # 指令詳細說明彈窗
└── data/
    ├── commands.js        # 所有指令資料
    └── beginnerGuide.js   # 新手指南資料
```

## 作者

由 **Mark Luce** 與 **Claude (Anthropic)** 攜手合作打造

馬克路思科技有限公司 | 統一編號 60670979

聯絡信箱：[markluceai@gmail.com](mailto:markluceai@gmail.com)

## 授權

本專案採用 [MIT 授權](LICENSE)。
