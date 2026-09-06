# personal-site — 開發脈絡

Joan Chang 的個人網站。Astro 靜態站，部署在 GitHub Pages（`joanchiung.github.io`）。
中英雙語：`zh` 為預設（無前綴），`en` 走 `/en/`。

> 定位敘事、履歷細節、原始素材等非程式脈絡不放這裡（在 gitignore 的 `_source/`）。

## 網站結構

- **nav**：首頁 / 關於我 / 文章 ＋ 語言 dropdown（獨立，右上）＋ 深淺色 toggle
- **`/`**：兩層 hero（姓名＋定位＋一句 hook，粉膚漸層 sticky 底 + sheet 滑上）→ 精選文章卡 → 履歷卡。結構在 `HomePage.astro`，文案在 `src/i18n/home.ts`。
- **`/about/`**：`AboutPage.astro` + `src/content/pages/{zh,en}-about.md`
- **`/writing/`**：精選卡（`featured: true`，`order` 越大越前）+ 全部時間軸，每頁 10 篇；第 2 頁起 `/writing/page/N/`。單篇 `/writing/<slug>/`，底部上一篇／下一篇（依日期）。共用邏輯在 `src/lib/writing.ts` + `src/components/WritingList.astro`。
  - 公開網址 slug 會拿掉檔名的語言前綴：`zh-balance-sheet.md` → `/writing/balance-sheet/`（`slugOf()`）。zh／en 同 slug 時，單篇的語言切換可直接互跳。
  - 文章列表／單篇不顯示 draft 標籤，也不顯示 `source`（欄位保留供參考）。
- **tag 詞彙**（控制用）：前端 / 後端 / Web3 / 金融 / 能源 / AI / 工作流程 / 設計 / 系統設計
- **履歷**：`public/joan-chang-cv.pdf`。主頁文件卡（下載／線上看）+ footer btn。
- **footer**：GitHub / LinkedIn（inline 品牌 SVG）+ Mail（Lucide）+ 下載履歷 btn。border-top 在 `.site-footer-inner`。
- **圖示**：`@lucide/astro`（`import X from '@lucide/astro/icons/x'`）；品牌 logo 用 inline SVG。
- **深淺色**：預設跟隨系統；nav toggle 存 localStorage，`<head>` inline script 防閃爍。
  - 淺色 canvas `#eeeae5`；深色 canvas `#423a34`（暖棕微光，非近黑）
  - hero 漸層：淺色 `#f5ede9 → #a8868c`；深色 `#6d4a4d → #ad8489`。改 `--hero-tl` / `--hero-br`
  - 色票 token 在 `global.css`：淺色在 `:root`，深色有**兩塊**（`@media` + `:root[data-theme="dark"]`）——**改值兩塊都要改**

## i18n（thin route → 共用 component → 依語言分離內容）

- 每頁都是 `src/pages/{,en/}xxx.astro` 三行 wrapper → 傳 `lang` 給共用 component
  （`HomePage` / `AboutPage` / `WritingListPage` / `ArticlePage`）
- **UI 字串**（nav/footer/eyebrow/分頁…）在 `src/i18n/ui.ts` 的 `{ zh, en }` 字典，`useT(lang)` 取；另有 `pathForLocale` / `base` / `htmlLang` helper。新增介面字串加 key，別在 component 內寫 inline 字典。
- **首頁文案** 在 `src/i18n/home.ts`。
- **長文內容** 走 content collection：關於我 `src/content/pages/{zh,en}-about.md`，文章 `src/content/posts/{zh,en}-<slug>.md`。`getCollection` 用 `data.lang` 篩。
- 分頁計算在 `lib/writing.ts` 的 `getWritingPage()` / `writingPagePaths()`。
- 沒有某語言版本時，首頁精選會 fallback 用另一語言的資料。

## 上稿一篇文章

`src/content/posts/` 放 `.md`，frontmatter schema 見 `src/content.config.ts`：
`title, description?, date, tags[], lang(zh|en), draft(bool), featured(bool), order(number), source?`
`draft: true` = 只在本機 `npm run dev` 顯示，`npm run build` 不輸出。

## 作品集合

`src/content/projects/`（schema 見 `content.config.ts`）。目前首頁沒有讀這個集合（作品區暫時只放精選文章）；要恢復作品卡再把 `HomePage.astro` 的 projects 區塊接回來。

## 開發

```bash
npm run dev      # localhost:4321
npm run build    # → dist/
npm run check    # astro check（型別）
```

## 部署

`main` 一有 push，`.github/workflows/deploy.yml` 會跑 `npm run check` → build → 發佈到 GitHub Pages。
首次啟用：repo Settings → Pages → Source 選「GitHub Actions」。
