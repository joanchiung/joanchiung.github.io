---
title: "What is a hash, and how is it different from encryption?"
description: A question you can settle by asking one thing — will this data ever need to be turned back?
date: 2026-07-06
tags: ["Web3", "System Design"]
lang: en
draft: true
---

## 1. What is a hash?

A hash is a function: feed in any data (a piece of text, a transaction) and it returns a fixed-length string, a fingerprint. Take SHA-256: no matter how large the input, the output is always 256 bits, about 64 characters shown as text.

## 2. The key property: one-way, irreversible

A hash only runs forward; there is no running it backward. Even if quantum computers arrive, they cannot "decrypt" a hash back into the original data, because a hash is designed to lose information on purpose (many-to-one). There is no single original for it to map back to.

## 3. So do hashes collide?

In theory, always — the pigeonhole principle: infinitely many inputs into a finite output space guarantees repeats. But finding one with today's computers would take longer than the age of the universe, so in practice you treat them as "no collisions".

## 4. How does a block explorer find transaction details from a tx hash?

It is not decrypting the hash; it is using the hash as a database index. The ledger already stored the full transaction, and the hash looks it up in a table. Nothing is computed backward.

## 5. So how is a hash different from encryption?

Judge it by one question: does this data ever need to be restored to its original form?

- **Yes → use encryption.** A withdrawal amount that has to be shown to someone, or used to execute a transfer. Encryption is a safe for data: hidden for now, but the right person with the key must be able to open it and read the original.
- **No, you only need to check whether two things match → use a hash.** Password checking, for example. The system recomputes the hash on the spot and compares; it never needs to know your actual password.

A hash is a fingerprint of data: used to verify, used as an index, never restored and never needing to be.
