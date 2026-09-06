---
title: "NestJS core concepts, wired together"
description: Module, Controller, DTO, Service, Entity, and table relations, connected in one pass.
date: 2026-06-21
tags: ["Backend", "System Design"]
lang: en
draft: true
---

## 1. Startup flow

The entry point decides how the whole application boots.

- Root module: the top-level module the app starts from. Without it, the framework does not exist.
- Route prefix: set one prefix for every API, so `/todos` becomes `/api/todos`.
- Guard the entrance: the frontend sends an undefined field → reject it outright; a type does not match → convert it automatically.

## 2. Module

A spec sheet that tells NestJS which parts a feature is made of.

- A backend project has several modules, each owning one independent slice of functionality.
- A module not registered in the root module does not exist as far as the project is concerned.
- Made of: `imports` (which other modules this one needs), `controllers`, `providers` (injectable services).
- The TypeORM module: `forRoot` configures the database connection globally, written once in the root module; `forFeature` declares which tables this module operates on.

## 3. Controller

Takes the request, returns the response, and hands everything in between to the service.

- Does no database work and holds no business logic.
- Defines which API routes exist, their HTTP methods, what they take, what they return, and basic error handling.
- Uses a DTO to limit which fields the frontend can send.
- `ParseIntPipe`: parameters from the URL arrive as strings; this turns `"1"` into the number `1`.

## 4. DTO (data transfer object)

Defines the fields the frontend sends, and how to validate them.

- The entity defines every column in the table; the DTO defines only the fields the frontend may send (`id` and timestamps are left out).
- Two layers of validation, both required: `@IsOptional()` / `@IsString()` run at runtime, `description?: string` runs at TypeScript compile time.
- `PartialType`: `UpdateDto extends PartialType(CreateDto)` inherits every field and makes them all optional.

## 5. Service

Where the business logic actually runs. The controller says "do it"; the service decides "how".

- `@Injectable()` tells NestJS this class can be injected.
- Inject the repository in the constructor, declaring which tables to operate on.
- Division of labor: the service (brain) decides what to do; the repository (hands) runs it against the database.
- Saving to the database is two steps: `.create(data)` builds the object in memory → `.save(entity)` writes it to the DB.
- Saving related data: TypeORM needs the full object, not just an id — take the ids, look up the full objects, set them as the relation field, then save.

## 6. Entity

The full column definition for one database table.

- `@Entity('table_name')` controls the table name precisely; leave it out and it uses the lowercased class name.
- `@PrimaryGeneratedColumn()`, `@Column()`, `@CreateDateColumn()`, `@UpdateDateColumn()`.
- A `!` after a field tells TypeScript "I guarantee this has a value", because TypeORM only fills it in at runtime.

## 7. Table relations

- One-to-many: `@OneToMany` on the "one" side, `@ManyToOne` on the "many" side; no join table needed, the foreign key goes on the "many" table.
- Many-to-many: `@ManyToMany` on both sides, `@JoinTable` on one side only; a join table is created automatically.
- Remember `relations: { categories: true }` in the query, or the related data does not come back with it.
