---
title: ORM 與後端環境：Docker、Postgres、Drizzle、Nginx
description: 從空環境到一支能 CRUD 的 API，中間要接起來的東西。
date: 2026-05-19
tags: ["後端", "系統設計"]
lang: zh
draft: true
source: https://www.threads.com/@joanvisual/post/DYhZEywmd_w
---

> 草稿，內容擷取自 Threads，尚未潤稿。

ORM = Object-Relational Mapper（物件關聯對應，用來操作資料庫）。

## Step 1 環境初始化

- 資料庫：Docker 開一個乾淨環境 Container，為後續放 Postgres 做準備；Drizzle ORM 可以用 JS 操作資料庫，不用自己寫 SQL
- API：選用 Express 框架定義 API 網址、接收請求、決定怎麼回應；文件採用 Swagger 展示

## Step 2 資料庫 Schema 設計

- Schema 定義：設計表長什麼樣子、每個欄位叫什麼名字、放什麼型別
- 資料庫連線：Node.js 讓 JS 可以跑在伺服器上；Express 是建立在 Node.js 上、專門寫 API 邏輯的框架；DB 是存資料表的環境。連線就是把 Node.js 和 DB 接起來，讓 API 能請求資料、DB 能回傳

## Step 3 Docker + ORM Migration

- 用 docker yml 檔跑兩個環境：DB 跑 PostgreSQL、app 跑 Node.js + Express
- 在 DB 建表：`drizzle generate` 把 schema（JS）轉成 SQL，`drizzle migrate` 把 SQL 跑進資料庫

## Step 4 Nginx 反向代理

```
瀏覽器端 → Nginx → Express API → DB
```

Nginx 只讓瀏覽器端走 API 路由 + Swagger 文件，其他路徑擋掉，不讓人知道 Node.js 跑哪個 Port、不讓外部直接存取。

## Step 5 API 實作

定義每一支 API 的路由、HTTP 方法（GET/POST/PATCH/DELETE）、payload、response。每支 API 就是提供瀏覽器一個方法，去對後端資料庫做 CRUD。
