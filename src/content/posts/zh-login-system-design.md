---
title: 登入系統怎麼設計（不含資安）
description: 從動作與角色出發，把認證、授權、資料表、endpoint 想清楚。
date: 2026-06-29
tags: ["後端", "系統設計"]
lang: zh
draft: true
---

## 1. 這個系統要做什麼（動作＋角色）

動作：註冊、登入、登出、拿自己的資料、忘記密碼。
角色：陌生人 / 已註冊使用者 / 登入後使用者。再依產品需求把已註冊使用者分層，讓不同 role 負責不同的事。

## 2. 登入的本質：認證 vs 授權

- 認證 authn = 確認「你是不是你宣稱的那個人」← 登入只做這件事
- 授權 authz = 確認「你有沒有權限做某件事」← 由 role 決定

## 3. 使用者資料表的欄位

`id`、`email`、`password`、`createdAt`、`updatedAt`、`status`、`role`

## 4. 登入時拿什麼比對

- 辨識是誰 → 用 email 去查
- 確認是不是本人 → 比對 password
- token → 登入成功後才發，用在下一個請求確認還是同一人

## 5. 一個登入請求的旅程（NestJS）

- Controller：接住 `/auth/login`
- Service：用 email 查出 user → 比對密碼 → 對了就發 token
- Repository / Entity：用 email 去 DB 查出那筆 user（順帶更新登入時間）
- 回傳前端：token、status、email

## 6. 註冊 vs 登入：寫入 vs 讀取比對

- 註冊 = 寫入（DB 新增一筆 user）→ 寫之前先檢查 email 是否已被註冊
- 登入 = 讀取＋比對（查出那筆 user，比對密碼對不對）

## 7. API 設計（endpoints）

- `POST /auth/register` — 註冊
- `POST /auth/login` — 登入
- `POST /auth/logout` — 登出
- `POST /auth/forget-password` — 忘記密碼
- `GET /auth/verify` — 驗證 token
- `GET /auth/me` — 拿自己的基本資料

## 8. 登入後怎麼記得你（token）

登入成功後拿到一張身份卡（token），代表他的身份。之後每個請求都帶著 token，系統一驗證就知道「還是同一個人、已經登入」。token 有固定的有效期限，過期就視為登出、要重新登入。token 證明的是身份；能不能做某個動作，是另外靠 role 做授權判斷。

## 9. 一句話講完整旅程

註冊寫入 → 登入查 email 比對密碼 → 發 token → 之後帶 token 驗證身份、靠 role 授權。
