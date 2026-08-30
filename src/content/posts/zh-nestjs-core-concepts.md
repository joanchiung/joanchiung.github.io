---
title: NestJS 核心概念筆記
description: Module、Controller、DTO、Service、Entity、資料表關聯，一次串起來。
date: 2026-06-21
tags: ["後端"]
lang: zh
draft: true
featured: true
source: https://www.threads.com/@joanvisual/post/DZ2W9o2mbDp
---

> 草稿，內容擷取自 Threads，尚未潤稿。

## 1. 啟動流程

程式的入口，決定整個應用怎麼跑起來。

- 根模組：以最上層的模組為基礎，啟動整個應用；沒有這步，框架不存在
- 路由前綴：統一設定所有 API 的前綴字，例如 `/todos` 變成 `/api/todos`
- 保護入口：前端多傳了沒定義的欄位 → 直接擋掉；型別不符 → 自動轉換

## 2. Module（模組）

一份說明書，告訴 NestJS 這個功能有哪些零件。

- 一個後端專案會有多個模組，每個模組負責一塊獨立功能
- 沒有在根模組登記的模組，整個專案不會知道它存在
- 組成：`imports`（需要用到哪些其他模組）、`controllers`、`providers`（可被注入的 Service）
- TypeORM 模組：`forRoot` 全域設定資料庫連線，只在根模組寫一次；`forFeature` 宣告這個模組要操作哪幾張資料表

## 3. Controller（控制器）

接請求、回 Response，中間的事全部交給 Service。

- 不做任何資料庫操作，不寫業務邏輯
- 定義有哪些 API 路由、各自的 HTTP 方法、傳什麼、回什麼、基本錯誤處理
- 用 DTO 限制前端能傳哪些欄位
- `ParseIntPipe`：URL 傳進來的參數全部是字串，負責把 `"1"` 轉成數字 `1`

## 4. DTO（資料傳輸物件）

定義前端傳過來的欄位，以及如何驗證它們。

- Entity 定義整張資料表有哪些欄位；DTO 只定義前端「可以傳」的欄位（`id`、時間戳不放）
- 兩層驗證缺一不可：`@IsOptional()` / `@IsString()` 是執行階段，`description?: string` 是 TypeScript 編譯階段
- `PartialType`：`UpdateDto extends PartialType(CreateDto)` 繼承所有欄位並全部變成可選

## 5. Service（服務）

實際執行業務邏輯的地方，Controller 說「去做」，Service 決定「怎麼做」。

- `@Injectable()` 讓 NestJS 知道這個 class 可以被注入
- constructor 裡注入 Repository，宣告要操作哪幾張資料表
- 分工：Service（腦）決定要做什麼；Repository（手）實際去資料庫執行
- 存入資料庫兩步驟：`.create(data)` 在記憶體建立物件 → `.save(entity)` 寫進 DB
- 存關聯資料：TypeORM 需要完整物件，不能只給 id（ids → 查出完整物件 → 設為關聯欄位 → 存）

## 6. Entity（實體）

對應資料庫一張表的完整欄位定義。

- `@Entity('table_name')` 精準控制表名；不填則用 class 名稱小寫
- `@PrimaryGeneratedColumn()`、`@Column()`、`@CreateDateColumn()`、`@UpdateDateColumn()`
- 欄位後面加 `!`：告訴 TypeScript「我保證這個欄位一定有值」，因為 TypeORM 是執行階段才填值

## 7. 資料表關聯

- 一對多：`@OneToMany` 寫在「一」邊、`@ManyToOne` 寫在「多」邊；不需要中間表，外鍵加在「多」的那張表
- 多對多：`@ManyToMany` 兩邊都寫、`@JoinTable` 只寫一邊；會自動產生中間表
- 查詢記得加 `relations: { categories: true }`，不然關聯資料不會一起帶出來
