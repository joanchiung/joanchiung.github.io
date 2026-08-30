# personal-site

張瓊文個人網站。Astro 靜態站，之後 host 在 GitHub Pages。

## 現況（2026-08-30）

骨架階段。已完成：
- 黃金圈主頁（`src/pages/index.astro`）— Why / How / What 為**草稿**，待本人潤稿
- 文章系統：`/writing/` 列表 + 單篇範本，放 `.md` 進 `src/content/posts/` 即上稿
- 中英 i18n 骨架（`zh` 預設、`en` 走 `/en/`），英文內容尚未翻
- 履歷 PDF：`public/joan-chang-cv.pdf`（2026-03 版，更新中）

**尚未做**：程式作品區、設計作品、把 Threads 文章正式上稿、正式文案、部署。

## 開發

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
```

## 上一篇文章

在 `src/content/posts/` 放一個 `.md`，frontmatter：

```yaml
---
title: 標題
description: 一句話摘要
date: 2026-06-29
tags: ["前端", "系統設計"]
lang: zh          # zh 或 en
draft: true       # true = 只在本機 dev 看得到，build 不輸出
source: https://...   # 選填，原始出處
---
```

`draft: true` 的文章：本機 `npm run dev` 看得到（列表有 draft 標籤），`npm run build` 不會輸出。

## 部署（之後）

1. 建 private repo `joanchiung.github.io`
2. 內容審核完 → repo 改 public + Settings → Pages → Source 設 GitHub Actions
3. 加 `.github/workflows/deploy.yml`（`withastro/action`）
