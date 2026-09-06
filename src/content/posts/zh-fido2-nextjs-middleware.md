---
title: 整合 FIDO2 到 Next.js：middleware 跑在 rewrite 之前，害我 debug 半天
description: 把一個獨立的 passwordless 驗證服務整併進主 app，掃 QR code 的手機卻一直被導去登入頁 —— 問題出在 Next.js 的執行順序。
date: 2026-08-30
tags: ["前端", "系統設計"]
lang: zh
draft: false
featured: true
order: 40
---

## 背景

要把一個原本獨立的 FIDO2（passwordless / WebAuthn）驗證服務，整併進主 Next.js app 統一維護。

舊服務產生的註冊連結，用的是固定的靜態 `.html` 檔名，例如：

```
/fido/register_raw.html?state=<一次性 token>
```

這個命名不能改 —— 外部系統（主後端、舊版驗證 server）已經寫死用這組網址去畫 QR code。使用者掃碼或點連結，打到的就是這個 `.html` 路徑。

## 作法：用 rewrite 換裝

在 `next.config.ts` 加 rewrite，把舊的 `.html` 網址接到新頁面的 route：

```ts
rewrites.push({ source: '/fido/register_raw.html',   destination: '/fido/register' });
rewrites.push({ source: '/fido/authenticate.html',   destination: '/fido/authenticate' });
```

網址列不變，實際渲染的是新版頁面。這不是遷移期的臨時 shim —— 外部命名固定不變，所以這層映射是永久的。

## Bug：掃碼的手機被導去 /login

主 app 有一個 middleware 當登入檢查關卡：沒有 session 就導去 `/login`。免登入的路徑放在一份白名單裡（掃碼的裝置本來就不會有 session，所以驗證頁一定要在白名單）。

白名單登記的是 **換裝後** 的名稱（`/fido/register`）。但手機一掃碼，就被彈回登入頁。

## 原因：Next.js 的執行順序

Next.js 處理一個請求的順序是：

```
headers → redirects → middleware → rewrites → 動態路由
```

middleware 跑在 rewrite **之前**。所以 middleware 看到的 pathname，是換裝前的原始路徑 `/fido/register_raw.html` —— 不是白名單裡登記的 `/fido/register`。兩者對不上，middleware 判定「未登入」，導去 `/login`。

換裝（rewrite）要等 middleware 放行之後才發生，但這時候已經太遲了。

## 修法：另建一份「原始路徑」白名單

白名單原本綁在路由型別上（只收換裝後的合法 route）。加一組不受型別限制的清單，專門涵蓋換裝前的網址：

```ts
const UNAUTHORIZED_RAW_ROUTES = [
  '/fido/register_raw.html',
  '/fido/authenticate.html',
];

function isUnauthorizedRoute(pathname: string): boolean {
  if (UNAUTHORIZED_RAW_ROUTES.includes(pathname)) return true;
  return UNAUTHORIZED_ROUTES.some((route) => matchesRoutePattern(pathname, route));
}
```

流程變成：

```
掃 QR code
  → 打到 /fido/register_raw.html?state=...
    → middleware 檢查（看到的是換裝前路徑）
        ├─ 在 RAW 白名單 → 放行
        │     → rewrite：register_raw.html → /fido/register
        │         → 渲染新頁面
        └─ 不在白名單 → 導去 /login（不該發生）
```

## 收尾：技術做完 ≠ 能 demo

修好之後還卡了一關，而且不是程式問題：手機掃碼連不到目標網域。那個網域只能透過公司內部 DNS 解析，電腦能連是因為走內部網路，手機即使同一個 Wi-Fi 也不一定在同網段。最後要跟 IT 確認手機能不能加進對應網段。

整併的程式早就寫完了，真正卡住上線的是網路拓樸。
