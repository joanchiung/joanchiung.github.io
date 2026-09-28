---
title: 驗證服務併回主系統，白名單得改認換裝前的舊網址
description: 驗證服務原本是獨立維護的專案，路徑跟後端都跟主系統分開，改一次邏輯就要跨團隊協調。併進 Next.js 主系統的 monorepo 統一維護後，這組網址仍是外部系統寫死的介面，一個字都不能動，只能用 rewrite 把舊網址接到新頁面。Next.js 的 middleware 跑在 rewrite 之前，白名單認的是換裝前的原始路徑；服務分離後，同一組路徑底下的畫面請求跟驗證 API 請求，也得重新拆流。
date: 2026-08-30
tags: ["前端", "系統設計"]
lang: zh
draft: false
featured: true
order: 40
---

## 換皮的需求，換底的問題

FIDO2 驗證是獨立的後端服務。這塊驗證介面是在早期開發階段，由後端同仁直接做在後端服務的專案裡，跟主系統的前端規範沒有對齊，介面呈現不一致。

由於這套系統面向的是高度仰賴信任、講究嚴謹的產業，所有畫面必須擁有統一的視覺語言。驗證頁面獨立在外，每次調整都要跨團隊溝通，維護成本高。PM 原本的需求是視覺套版，把樣式改成跟主系統一致就好。

接手後檢視後端服務的程式碼現況，發現單純套版做不到：這塊前端是純靜態 `.html`，跟主系統沒有共用的元件跟樣式系統；使用者又是透過外部系統產生的固定連結進到這個頁面，要讓使用者感覺不出網址換了，牽動的不只是視覺，還有背後的路由與驗證邏輯。目標是把整塊前端收進前端的 monorepo，用 Next.js 重寫，跟主系統整合在一起。PM 要的是換皮，這裡要換的其實是骨架。

## 舊網址不能動

舊服務產生的註冊連結，用的是固定的靜態 `.html` 檔名，例如：

```
/verify/register.html?token=<一次性 token>
```

這組網址是外部系統寫死的介面，用來產生 QR code 給使用者掃描，任何調整都會牽動外部所有串接方，無法單方面變更。

這裡不能用 redirect，因為 redirect 會讓網址列變成新路徑，使用者跟外部系統看到的網址就不一樣，直接違反「不能讓使用者發現網址換了」的前提。要不留痕跡地換底，只能用 rewrite，把舊網址接到新的 route：

```ts
rewrites.push({ source: '/verify/register.html', destination: '/verify/register' });
rewrites.push({ source: '/verify/authenticate.html', destination: '/verify/authenticate' });
```

網址列不變，實際渲染的是新版頁面。外部命名固定不會變，這組映射會長期留著，不是遷移期用完就丟的暫時做法。

## middleware 要放行這些網址

FIDO 驗證本來就不需要登入，任何人拿到連結就該看得到驗證頁面，因為掃 QR code 的裝置不會帶著 session。

主 app 有一層 middleware，每個請求都先檢查登入狀態，沒 session 就導去登入頁。免登入的路徑登記在一份白名單裡，把 `/verify/register`、`/verify/authenticate` 標記成免登入即可存取。

白名單得同時涵蓋兩層路徑，不能只登記換裝後的新路徑，原因在 Next.js 處理請求的順序：

```
headers → redirects → middleware → rewrites → 動態路由
```

middleware 跑在 rewrite 之前，檢查的永遠是使用者打進來的原始網址，不是 rewrite 之後的新路徑。白名單如果只登記換裝後的新路徑（`/verify/register`），middleware 檢查的其實是換裝前的原始網址（`/verify/register.html`），兩者對不上，就會被當成需要登入的頁面擋下來。因此需要另外準備一份收原始路徑的白名單：

```ts
const UNAUTHORIZED_RAW_ROUTES = [
  '/verify/register.html',
  '/verify/authenticate.html',
];

function isUnauthorizedRoute(pathname: string): boolean {
  if (UNAUTHORIZED_RAW_ROUTES.includes(pathname)) return true;
  return UNAUTHORIZED_ROUTES.some((route) => matchesRoutePattern(pathname, route));
}
```

整個流程串起來是這樣：

```
掃 QR code
  → 打到 /verify/register.html?token=...
    → middleware 檢查（看到的是換裝前路徑）
        ├─ 在 RAW 白名單 → 放行
        │     → rewrite：register.html → /verify/register
        │         → 渲染新頁面
        └─ 不在白名單 → 導去 /login（不該發生）
```

## 部署上去才卡關

程式在本機測試沒問題，部署到 develop 環境卻一直沒顯示新版畫面。

舊的驗證頁面沒有關閉，還留著給尚未切換的呼叫方使用。新舊兩個介面若共用同一個路徑，系統就無法判斷這次請求該交給哪一邊處理。前端搬進 monorepo 之前，這幾條驗證路徑的請求只有一個去處，不需要區分；搬完之後，同樣開頭的請求要拆成兩條路：使用者要看的畫面轉去新前端，實際驗證的 API 請求仍轉去後端邏輯所在的位置。

這條分流規則是這次搬家才產生的需求，之前不存在。我沒有後端程式碼的可見度，看不出問題出在哪個服務，只能把觀察到的現象（卡在哪個環節、什麼時候發生）交給後端一起排查。最後確認是路由規則沒有指向新服務的位置，調整之後，新舊各自對應清楚，前端這邊沒有再更動任何東西，就恢復正常顯示。

## 結果

驗證流程收進主 app 統一維護後，使用者不用再跳出去另一個系統，呈現的是同一套產品的體驗。之後要調整驗證邏輯，也不用再跨團隊溝通，改一個地方就好。

主系統本身功能龐雜，驗證流程應該讓使用者專注在驗證本身，不被無關的介面細節分散注意力。我和 PM、設計、後端一起把 FIDO 的頁面收斂到這個原則之下，只留下驗證任務真正需要的部分。

這次學到的是，一個服務要拆成兩個之前，原本共用的東西（這裡是路由）要先想清楚怎麼分。合在一起時看不出問題，拆開之後才會浮現。
