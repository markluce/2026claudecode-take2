# GitHub Pages 自訂網域 DNS 設定疑難排解

## 問題描述

在 GitHub Pages 設定自訂網域時，DNS 檢查反覆出現「DNS Check in Progress」，狀態時好時壞，HTTPS 也無法穩定啟用。

## 根本原因

GitHub Pages 的 DNS 檢查會同時驗證 IPv4（A 記錄）和 IPv6（AAAA 記錄）。如果缺少 AAAA 記錄，檢查有時透過 IPv4 通過，有時嘗試 IPv6 超時而失敗，導致狀態不穩定。

## 解決方案

### 1. 確認 A 記錄（IPv4）

在你的 DNS 供應商設定以下 4 筆 A 記錄：

| 類型 | 名稱 | 值 |
|------|------|-----|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

### 2. 新增 AAAA 記錄（IPv6）— 這是最常被遺漏的步驟

| 類型 | 名稱 | 值 |
|------|------|-----|
| AAAA | @ | `2606:50c0:8000::153` |
| AAAA | @ | `2606:50c0:8001::153` |
| AAAA | @ | `2606:50c0:8002::153` |
| AAAA | @ | `2606:50c0:8003::153` |

### 3. www CNAME 設定

`www` 子網域可以用以下任一方式設定，兩種都能正常運作：

| 類型 | 名稱 | 值 | 說明 |
|------|------|-----|------|
| CNAME | www | `markluce.ai` | 指向裸域名（透過 A 記錄解析） ✅ |
| CNAME | www | `markluce.github.io` | 直接指向 GitHub Pages ✅ |

> 💡 兩種方式都可以，只要裸域名的 A/AAAA 記錄正確即可。

### 4. 觸發重新檢查

DNS 記錄更新後（通常需要幾分鐘到幾小時不等）：

1. 前往 GitHub Repo → **Settings** → **Pages**
2. 在 Custom domain 欄位刪除網域後重新輸入（例如 `markluce.ai`）
3. 點擊 **Save**，等待 DNS 檢查通過
4. 勾選 **Enforce HTTPS**

## 驗證指令

在終端機執行以下指令確認 DNS 設定正確：

```bash
# 檢查 A 記錄
nslookup markluce.ai

# 檢查 www CNAME
nslookup -type=CNAME www.markluce.ai

# 應該看到 markluce.github.io
```

## 參考資料

- [GitHub 官方文件：管理自訂網域](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
