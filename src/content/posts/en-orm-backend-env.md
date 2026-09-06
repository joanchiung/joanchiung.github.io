---
title: "ORM and the backend environment: Docker, Postgres, Drizzle, Nginx"
description: What you have to wire together to get from an empty environment to an API that can do CRUD.
date: 2026-05-19
tags: ["Backend", "System Design"]
lang: en
draft: true
---

ORM = Object-Relational Mapper — a layer for working with the database through objects instead of raw SQL.

## Step 1 — Initialize the environment

- Database: spin up a clean container with Docker, ready for Postgres later. Drizzle ORM lets you work with the database in JS instead of writing SQL by hand.
- API: use Express to define the routes, take requests, and decide the responses; expose the docs with Swagger.

## Step 2 — Design the database schema

- Schema: what the tables look like, what each column is called, and what type it holds.
- Connection: Node.js runs JS on the server; Express sits on top of Node.js for API logic; the DB holds the tables. The connection wires Node.js to the DB so the API can request data and the DB can return it.

## Step 3 — Docker + ORM migration

- Run two services from a Docker Compose file: DB on PostgreSQL, app on Node.js + Express.
- Create the tables: `drizzle generate` turns the JS schema into SQL, `drizzle migrate` runs that SQL into the database.

## Step 4 — Nginx reverse proxy

```
browser → Nginx → Express API → DB
```

Nginx only lets the browser reach the API routes and the Swagger docs; every other path is blocked, so nobody sees which port Node.js runs on and nothing external hits it directly.

## Step 5 — Implement the API

Define each endpoint's route, HTTP method (GET/POST/PATCH/DELETE), payload, and response. Each endpoint is one way for the browser to do CRUD against the backend database.
