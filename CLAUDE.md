# personal-site — 專案脈絡

張瓊文（Joan Chang）的個人網站，補面試需求。Astro 靜態站，之後 host 在 GitHub Pages（`joanchiung.github.io`）。

## 定位（已定案）

- **工程師為主、設計為輔。** 明確不要讓人覺得「設計師想轉碼」。
- 一句話：設計背景的前端工程師，在受監管的金融系統裡把複雜規則做成介面。
- 橋樑故事（只講一次）：設計師時期做 Design Guideline → 轉前端後做 Design System。
- 語言：中英雙語（`zh` 預設、`en` 走 `/en/`）。英文內容尚未翻。
- 敘事 A（工程為主 + 單一橋樑）vs B（設計區大一點）：**尚未拍板**，先看完素材清單再決定。

## 網站結構

- `/` 黃金圈 landing：Why / How / What。文字目前是**草稿**（從 `_source/` 的自我認識筆記整理），待本人潤稿。
- `/writing/` 文章列表 + `/writing/[slug]` 單篇。放 `.md` 進 `src/content/posts/` 即上稿。
- `/#resume` 履歷 PDF（`public/joan-chang-cv.pdf`，2026-03 版，本人更新中）+ 聯絡方式。
- `/projects/` **尚未做** —— 需要專門討論怎麼擺（見下）。

## 上稿一篇文章

`src/content/posts/` 放 `.md`，frontmatter schema 見 `src/content.config.ts`：
`title, description?, date, tags[], lang(zh|en), draft(bool), source?`
`draft: true` = 只在本機 `npm run dev` 顯示，`npm run build` 不輸出。

## 原始素材位置（`_source/`，已 gitignore，含隱私，不要 commit）

- `_source/00_素材清單.md` — 掃描電腦 Desktop+Documents 的分類清單
- `_source/01_策展建議.md` — 定位敘事 A/B 分析、各區塊 shortlist、缺口清單
- `_source/02_Threads擷取/` — 從 Threads @joanvisual 擷取的 16 篇（技術/金融/工作方法），每篇有 `site_verdict` 判斷。`00_擷取總覽與判斷.md` 是索引。

## 關鍵事實（寫文案時對照）

- GitHub `joanchiung`、LinkedIn `joanvisual`、Email `joankaminari@gmail.com`
- 現職：受監管金融的加密托管系統（M-Key），前端工程師，Next.js/TS、Redux、TanStack Query、Lit Web Components、Paged.js、i18n
- 經歷：11 年設計（7+ 公司 + 接案）→ 前端 since 2023/10
- CV 用化名（BlockTech、Snowbridge、Surasia、BOYU、Innospread）
- 待確認：CV 把 coding 拆成 Snowbridge(2023/10–2024/10) + BlockTech(2024/11–) 兩段，但筆記說連續——同一間還是換過？（會影響文案，需本人確認）
- 已有的 LinkedIn About / 7 段經歷英文定稿在 `_source` 提到的 Codex 產出（本機 `~/Documents/Codex/2026-07-11/`）

## 進行中的決策 / 待辦

1. 定位敘事 A vs B
2. 程式作品怎麼擺：家教練習（asset-tracker、my-crud-backend）vs AI 協作（job-radar）vs 較完整的「網頁轉 A5 紙本」專案（未整理、未上 GitHub）。不要一次放三個，需深度討論
3. Threads 文章潤稿 + 正式上稿（目前只有 1 篇 draft 測試排版）
4. 主頁 Why/How/What 定稿（等本人 CV 改完一起）
5. 部署：private repo → 審核完 → public + 開 Pages

## 完整計畫

`~/.claude/plans/majestic-greeting-possum.md`（5 階段：掃描→策展→撰寫→建站→打磨）。

## 開發

```bash
npm run dev      # localhost:4321
npm run build    # → dist/
```
