# personal-site

張瓊文（Joan Chang）的個人網站。Astro 靜態站，部署在 GitHub Pages。

- 正式站：https://joanchiung.github.io
- 技術：Astro 5、TypeScript、無框架 CSS、`@lucide/astro` 圖示
- 中英雙語：`zh` 為預設（無前綴），`en` 走 `/en/`

## 開發

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
npm run preview  # 本機預覽 build 結果
```

## 內容

| 類型 | 位置 | 說明 |
| --- | --- | --- |
| 文章 | `src/content/posts/*.md` | 檔名 `{zh,en}-<slug>.md`；schema 見 `src/content.config.ts` |
| 關於我 | `src/content/pages/{zh,en}-about.md` | |
| UI 字串 | `src/i18n/ui.ts` | nav / footer / 分頁等介面文字 |
| 首頁文案 | `src/i18n/home.ts` | hero、區塊標題 |
| 履歷 PDF | `public/joan-chang-cv-{zh,en}.pdf` | 依語系下載；對應表在 `src/i18n/ui.ts` 的 `resume` |

`draft: true` 的文章只在 `npm run dev` 顯示，`npm run build` 不輸出。

### 上一篇文章

在 `src/content/posts/` 放一個 `.md`：

```yaml
---
title: 標題
description: 一句話摘要
date: 2026-06-29
tags: ["前端", "系統設計"]
lang: zh          # zh 或 en
draft: false
---
```

## 部署

`main` 一有 push，`.github/workflows/deploy.yml` 就會 build 並發佈到 GitHub Pages。
首次啟用：repo Settings → Pages → Source 選「GitHub Actions」。
