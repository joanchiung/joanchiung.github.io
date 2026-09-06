---
title: "Designing a login system (security aside)"
description: Start from the actions and the roles, then work out authentication, authorization, tables, and endpoints.
date: 2026-06-29
tags: ["Backend", "System Design"]
lang: en
draft: true
---

## 1. What the system does (actions + roles)

Actions: register, log in, log out, get your own data, forgot password.
Roles: stranger / registered user / logged-in user. Then, depending on the product, split registered users into tiers so different roles handle different things.

## 2. What login really is: authentication vs authorization

- Authentication (authn) = confirming "you are who you claim to be" ← login only does this
- Authorization (authz) = confirming "you are allowed to do a given thing" ← decided by role

## 3. Fields on the user table

`id`, `email`, `password`, `createdAt`, `updatedAt`, `status`, `role`

## 4. What you compare at login

- Identify who it is → look up by email
- Confirm it is really them → compare the password
- Token → issued only after a successful login, used on the next request to confirm it is still the same person

## 5. The journey of one login request (NestJS)

- Controller: catches `/auth/login`
- Service: looks up the user by email → compares the password → issues a token if it matches
- Repository / Entity: queries the DB for that user by email, and updates the login timestamp along the way
- Returned to the frontend: token, status, email

## 6. Register vs login: writing vs reading-and-comparing

- Register = a write (add one user row to the DB) → before writing, check whether the email is already registered
- Login = a read plus a comparison (look up that user, check the password is right)

## 7. API design (endpoints)

- `POST /auth/register` — register
- `POST /auth/login` — log in
- `POST /auth/logout` — log out
- `POST /auth/forget-password` — forgot password
- `GET /auth/verify` — verify a token
- `GET /auth/me` — get your own basic data

## 8. How it remembers you after login (token)

A successful login hands you an ID card (a token) that stands for your identity. Every request afterward carries the token, and one check tells the system "still the same person, already logged in". A token has a fixed lifetime; once it expires that counts as logged out and you log in again. A token proves identity; whether you can perform a given action is a separate authorization check based on role.

## 9. The whole journey in one sentence

Register writes → login looks up the email and compares the password → issue a token → later requests carry the token for identity, and role handles authorization.
