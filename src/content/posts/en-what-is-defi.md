---
title: "What DeFi is trying to remove is the human variable"
description: DeFi replaces human discretion with hardcoded contracts. But removing the human has a cost, and traditional finance's strength (someone is accountable when it fails) is exactly what fills that gap.
date: 2026-07-10
tags: ["Web3", "Finance"]
lang: en
draft: false
featured: false
order: 0
---

## 1. DeFi has no company running things behind the scenes, just a contract

The biggest difference between DeFi and a centralized exchange is that there is no company matching your trades or holding your assets. What runs it is a hardcoded contract: the rules are written into the contract, nobody can secretly change them, and nobody has to enforce them by hand.

Swapping works the same way. Instead of an exchange matching buyers and sellers, it runs on a liquidity pool: someone puts money into the pool, anyone who wants to swap trades directly with it and pays a fee, most of which goes back to the people who provided the money, with a small part becoming the treasury. There is no central company involved at any point. How the fee is charged, how it is split, all of it is written into the contract and runs automatically.

## 2. Holding the token means holding the power to decide the rules

So who sets the rules in the contract, and can they be changed? The answer is whoever holds the governance token. Hold enough and you can vote on how the contract gets updated and how the treasury is used. The token is voting power, and the people providing the funds may also be the ones writing the rules.

Putting in my own money and helping set the rules feels more like running a business than dropping money into a system. It is a lot like how shareholders work in a traditional company: how much stock you hold determines how much real control you have. The difference is that in DeFi that "stock" is tied directly to the money you put in and the tokens you hold, and the rules themselves are written into a public contract.

## 3. That idea traces back to the 2008 financial crisis

After the 2008 crisis, a lot of people started asking: can technology replace our trust in institutions, in people? Banks had packaged very poor mortgages into financial products and sold them off, rating agencies still gave them high credit ratings, and when it fell apart there was no one specific person who had to answer for it. In the end the government bailed out the banks with taxpayer money. That instinct later grew into Bitcoin, and into DeFi.

Whenever a person is making the call, there is room to abuse that discretion. A loan officer can lend based on connections; a fund manager can bend the rules on subjective judgment. DeFi replaces that discretion with rules hardcoded into a contract: the same rules for everyone, nobody can quietly change them, nobody needs to enforce them.

## 4. The DAO hack: removing the human does not remove the risk

In 2016 The DAO was the largest decentralized venture fund on Ethereum, raising the equivalent of over $150 million in ETH. Then its withdrawal function turned out to have a bug: the code did not update a user's balance before sending funds, so an attacker could call the withdraw function again and again within a single transaction, looping and draining money out, and pulled out roughly a third of the fund.

Afterward the Ethereum community split hard over whether to reverse it, forking into two chains: one chose to fork and return the funds to the victims (the Ethereum we have today), the other held to "code is law, the rules are the rules" (Ethereum Classic). DeFi took human discretion out of the picture and took on a different risk instead: when the code itself is wrong, nobody can step in and stop it, and when something goes wrong there is no one specific person accountable.

## 5. Traditional finance's strength is exactly what DeFi is missing

When something goes wrong in traditional finance, there is a clear party accountable: banks are regulated, audited, and there is legal recourse. The trade-off is that it depends too much on human judgment.

The interesting direction is not either-or, but combining the strengths of both sides: learn DeFi's "replace human discretion with rules" while keeping traditional finance's "someone is accountable when it fails". Techniques like multi-party computation (MPC), originally built for DeFi wallets, are now used by banks and exchanges for institutional-grade custody. Write "who can do what" into the system, use multi-sig and identity verification to minimize human error, and keep the whole process auditable. That is the path institutional custody is on.

Back to the opening line, "DeFi has no company running things, just a contract": the institutional version is not about removing the company, it is about turning permissions and process into rules, so you do not rely on a person to remember or to gatekeep, while still having someone accountable when it fails.
