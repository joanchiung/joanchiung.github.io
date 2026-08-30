# personal-site — 專案脈絡

張瓊文（Joan Chang）的個人網站，補面試需求。Astro 靜態站，之後 host 在 GitHub Pages（`joanchiung.github.io`）。

## 定位（已定案）

- **工程師為主、設計為輔。** 明確不要讓人覺得「設計師想轉碼」。
- 一句話：設計背景的前端工程師，在受監管的金融系統裡把複雜規則做成介面。
- 橋樑故事（只講一次）：設計師時期做 Design Guideline → 轉前端後做 Design System。
- 語言：中英雙語（`zh` 預設、`en` 走 `/en/`）。英文內容尚未翻。
- 敘事 A（工程為主 + 單一橋樑）vs B（設計區大一點）：**尚未拍板**，先看完素材清單再決定。

## 網站結構

- nav：首頁 / 關於我 / 文章 ＋ 語言 dropdown（獨立，右上）
- `/` 黃金圈 landing：姓名+定位 → Why / How / What → **作品** → 履歷卡。文字用 Notion 履歷措辭，待精簡定稿。
- `/about/` 關於我：設計→工程的完整故事（含 Design Guideline → Design System 橋樑）
- `/writing/` 文章列表：精選卡片（`featured: true`）+ 全部時間軸，每頁 10 篇。第 2 頁起 `/writing/page/N/`。`/writing/[slug]/` 單篇，底部有上一篇/下一篇（依日期）。共用邏輯在 `src/lib/writing.ts` + `src/components/WritingList.astro`。`.md` 進 `src/content/posts/`。
- 文章列表/單篇**不顯示** draft 標籤、也不顯示原始出處連結（`source` 欄位仍保留在 frontmatter 供參考）。
- tag 詞彙（控制用）：前端 / 後端 / Web3 / 金融 / 能源 / AI / 工作流程 / 設計 / 系統設計
- 文章共 17 篇（全 draft）：11 篇來自 Threads + 6 篇來自英文課 W6/W7-8/W9/W11/W12/W13 備課稿（`_source` 外，原檔在 `~/Desktop/學習與成長/英文學習/prep/`）。W6（DeFi→M-Key）是 featured 強候選，目前放時間軸。
- 作品：`.md` 進 `src/content/projects/`（schema 見 content.config.ts：title/description/tech/repo/demo/status/order/draft）。目前只有 `travel-handbook.md`（出國手冊，draft，repo 未開）。首頁作品區直接讀這個集合。
- 履歷：`public/joan-chang-cv.pdf`（2026-03 英文版；本人在 Notion 弄新版）。主頁文件卡（下載履歷/線上看）+ footer btn。
- footer：GitHub / LinkedIn（inline 品牌 SVG，Lucide 沒有品牌 icon）+ Mail（Lucide）+ 下載履歷 btn（Lucide download）
- 圖示：`@lucide/astro`（`import X from '@lucide/astro/icons/x'`）。品牌 logo 用 inline SVG。

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
- 現職：區塊科技 BlockChain Security Corp（2024/11–），前端工程師，M-Key 加密貨幣托管平台（服務銀行與執法機關）。Next.js/TS、TanStack Query、Zod。負責金庫管理、30+ 審批事件流程、團隊管理、設計系統基礎（色彩/字體 Token、自動化圖示產線 → 交付時間 1.5 週縮到 3 天）
- 前一份：雪橋 Snowbridge Inc（2023/10–2024/11），5 人團隊唯一前端。1510.ai 不動產工具（Paged.js，網頁 UI 與 PDF 同步，4hr→0.5hr）、ERC-1155 循環經濟平台原型、NextAuth 多角色租賃平台
- **確認：coding 是兩間公司，不是連續一間。真名可用（跟 CV/LinkedIn 一致）。**
- 自由接案 2018/03–2023/10（能源署淨零網站「源宇宙」、Gold Alles 錢包 App、臥和彩日診所 VI）；2012–2018 設計（BVG、Surasia、BOYU、Innospread）
- 最新履歷文案來源：Notion「履歷 - 通用版」`https://app.notion.com/p/3c60a677b5e581b19275c181880667f8`（本人還在精簡）。主頁 Why/How 已改用此版自我簡介的措辭。
- 一句定位：「前端工程師｜銀行級 Web3 與金融科技系統」
- Why：「我擅長把模糊、未定義的需求，拆解成可以執行的路徑。」

## 最小 MVP 標準（目標：家教課上能從頭走一遍，不用道歉）

- [x] 主導覽只留「文章」
- [x] 語言切換獨立成 dropdown（右上，與 nav 分開）
- [x] 履歷從 nav 移除 → 主頁做成文件卡（下載 PDF / 線上看）+ footer
- [x] 主頁重新結構：姓名+定位 → Why → How → What（文章）→ 履歷卡 → 連結
- [x] 拿掉黃色草稿提示條（中文頁）
- [ ] 精選 4 篇潤稿 + 拿掉 draft（讓正式 build 有內容）
- [ ] 單篇文章排版細修
- [ ] 手機版 nav 不破版（實機看）
- [ ] EN 頁：等中文定稿後做 i18n（今天先中文）

**不在 MVP**：程式作品區、15 篇全潤完、部署、文章英譯、定位敘事 A/B。

## 進行中的決策 / 待辦

1. 精選 4 篇（電力市場、登入系統、NestJS、CEX vs DEX）逐篇潤稿、拿掉 draft
2. 程式作品怎麼擺：家教練習（asset-tracker、my-crud-backend）vs AI 協作（job-radar）vs 「網頁轉 A5 紙本」出國手冊專案（有程式碼、未整理、未上 GitHub → 要開 repo + 寫 case study）
3. 主頁 Why/How 最終版（等本人 Notion 履歷精簡完）
4. 中文定稿後補英文 i18n
5. 部署：private repo → 審核完 → public + 開 Pages

## 完整計畫

`~/.claude/plans/majestic-greeting-possum.md`（5 階段：掃描→策展→撰寫→建站→打磨）。

## 開發

```bash
npm run dev      # localhost:4321
npm run build    # → dist/
```
