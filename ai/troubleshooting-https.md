# GitHub Pages HTTPS 強制啟用疑難排解

## 問題描述

在 GitHub Pages 設定頁面中，「Enforce HTTPS」選項無法勾選，或勾選後 HTTPS 仍然無法正常運作。

## 根本原因

GitHub Pages 使用 Let's Encrypt 自動簽發 SSL 憑證。如果 DNS 設定不完整或未通過驗證，GitHub 無法為你的網域申請憑證，HTTPS 就無法啟用。

## 解決方案

### 前置條件

HTTPS 要正常運作，必須先完成以下步驟：

1. **DNS 檢查必須通過** — 參考 [troubleshooting-dns.md](./troubleshooting-dns.md)
2. A 記錄（4 筆）和 AAAA 記錄（4 筆）都要正確設定
3. `www` CNAME 必須指向 `markluce.github.io`
4. `public/CNAME` 檔案內容必須是你的自訂網域（例如 `markluce.ai`）

### 啟用步驟

1. 確認 DNS 檢查顯示綠色勾勾 ✅
2. 勾選 **Enforce HTTPS**
3. 等待幾分鐘讓 SSL 憑證自動簽發

### 如果 Enforce HTTPS 無法勾選

- 確認 DNS 檢查已通過（沒有通過的話此選項會被停用）
- 嘗試刪除自訂網域後重新設定，觸發重新驗證
- 等待最多 24 小時讓 DNS 完全生效後再試

### 確認 CNAME 檔案存在

專案的 `public/CNAME` 檔案必須包含你的網域：

```
markluce.ai
```

Vite 建置時會自動將 `public/CNAME` 複製到 `dist/CNAME`，確保部署時 GitHub Pages 能識別自訂網域。

## 參考資料

- [GitHub 官方文件：使用 HTTPS 保護 GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
