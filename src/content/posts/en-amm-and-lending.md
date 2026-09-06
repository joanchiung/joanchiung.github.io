---
title: "After DeFi removes the middleman, where does the risk go? AMMs and lending liquidations"
description: An AMM leaves the risk with the liquidity provider; a lending protocol leaves it at the moment collateral falls short or liquidation comes too late. In neither case is the protocol the one losing money.
date: 2026-07-24
tags: ["Web3", "Finance", "System Design"]
lang: en
draft: false
featured: true
order: 10
source: English-class prep, weeks 7-8 (AMM liquidity risk + lending liquidations)
---

## Bridge: no company, just a contract, applied to different activities

The biggest difference between DeFi and centralized finance is that there is no company matching your trades, checking your credit, or holding your assets. What runs it is a contract with hardcoded rules that nobody can privately change. That principle is not limited to "swapping coins".

| Activity | Centralized version | Decentralized version |
|---|---|---|
| Trading / swapping | Exchange (CEX, stock exchange) | AMM liquidity pool |
| Borrowing | Bank loan (checks credit) | DeFi lending protocol (checks collateral) |

## AMM: the pool replaces the counterparty, and price catches up through impermanent loss

An order book depends on "someone else being willing to trade at your price at the same time", and thin tokens often have no such counterparty. An AMM replaces the human counterparty with a "pool": as long as there is money in the pool, you can swap any time. The pool prices itself automatically with a formula, and the intuition is simple: the less of a given coin in the pool, the more expensive it is.

An example: I deposit 100 units of token A (worth $100 at the time) plus $100 of token B into the pool, and earn a share of trading fees. It sounds like guaranteed passive income.

But the pool does not know the market price outside has changed. If token A rises to $4 on the external market, arbitrageurs bring dollars into the pool and buy out the cheap A, buying until the price of A in the pool catches up to the external $4. When I go to withdraw, the pool holds 50 units of A and $200 of B, worth $400. But if I had never put anything into the pool and simply held 100 units of A and $100, it would be worth $500. That $100 gap is impermanent loss, taken by the arbitrageurs on an information gap.

## Lending: over-collateralization replaces credit, liquidation does the enforcing

DeFi lending has no credit score and no identity check, so how does the protocol know you will repay? The answer is over-collateralization: the value of the collateral must exceed the loan amount. To borrow $100, the protocol requires a minimum collateral ratio of 150%, so you deposit $150 of collateral.

The protocol sets two lines: the minimum ratio required at the moment of borrowing (150%), and a lower liquidation threshold (say, triggered when collateral drops to $120). Suppose the market crashes so fast that by the time a liquidator actually acts, the collateral is only worth $90. The liquidator buys it at a discount (say $85) and immediately resells for a $5 spread; it is a race for speed. But the protocol only recovers $85, having lent out $100, and the $15 gap in between is bad debt the protocol absorbs itself.

## Comparing the two risks: a one-time write-off vs a continuous drain

If you ask who carries the more invisible risk, I think it is the depositor on the lending side. Once liquidation starts, it means this loan is ending. If liquidation is too late and the loan amount is higher than what the collateral sells for, that is a real loss, a one-time write-off.

The LP's situation is a bit different: because fees keep coming in, even after being arbitraged, in theory the fees can slowly close the gap as long as the price later stabilizes. But there is a caveat: "breaking even" only holds if the price returns exactly to where it was at deposit, which is not a guaranteed outcome.

Overall, the lending risk is a one-time, certain write-off; the LP risk is a continuous drain with a chance to close but no guarantee. Neither is "the protocol itself losing money". In both cases, some participant is bearing the risk that a middleman used to absorb.
