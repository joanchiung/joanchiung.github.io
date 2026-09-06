---
title: "One wrong switch, a nationwide blackout: how electricity markets work, and what risks they hide"
description: From Taipower's marginal pricing, to the concentration risk the 303 blackout exposed, to where blockchain-style decentralization should actually be applied.
date: 2026-08-05
tags: ["Web3", "Energy", "System Design"]
lang: en
draft: false
featured: true
order: 30
---

## 1. Electricity cannot be stored, so pricing always follows the most expensive unit running right now

Electricity cannot be generated and stored in advance. It has to be generated and consumed in real time. So Taipower divides its generating units into tiers, ordered from cheapest to most expensive. Off-peak, the cheapest units are enough; at peak, everything from cheap to expensive may have to come online. At that point the price is set by the last unit dispatched, which is also the most expensive one, regardless of how cheap the earlier units were.

It is a bit like a table sharing dishes: the prices start ordinary, but the moment someone asks to upgrade one dish to lobster, everyone at the table splits the bill at the upgraded price, not just the person who asked. Electricity is the same. Once the system brings the most expensive unit online to cover peak demand, all the electricity in that period is priced at that unit's rate, no matter who used it or how much.

## 2. Multiple roles concentrated in Taipower is the real risk the 303 blackout exposed

Who built and maintains these different tiers of units? Grid infrastructure is state-controlled, generation is opened to private competition, and Taipower handles integration and faces the consumer. If every power company built and maintained its own grid, there would be duplicate construction, and over time it would be hard to control and the pricing would get chaotic, so it suits being built and maintained centrally by government; generation keeps market competition so costs can keep falling.

In this structure Taipower both owns its own plants and buys power from private plants, then sends it all out through the same grid and bills for it centrally. But that arrangement carries a real risk. In 2022, a single human operating error at the Hsinta plant triggered a chain reaction and caused the 303 blackout, cutting power to more than 5.49 million households nationwide. Losses across semiconductors, panels, and petrochemicals were estimated at over NT$10 billion; Taipower compensated only through electricity-bill rebates, roughly NT$760 million. Only afterward did Taipower propose a 10-year, NT$564.5 billion grid-hardening plan.

The problem is that Taipower simultaneously does generation, grid maintenance, integration of private power, and facing all consumers: multiple roles concentrated in one organization. At that scale, the risk is hard to predict and prevent in advance, and often only gets reinforced after something actually goes wrong. The gap between the losses and the compensation is the whole problem in miniature: the cost of failure is borne mostly by industry and consumers, while Taipower's own cost is relatively small. The organization is too big to fail, and the consequences are externalized to society rather than turned back on itself. This is close to moral hazard in finance: without bearing the full consequences, there is no incentive to prepare ahead and genuinely prevent the risk.

## 3. Blockchain-style decentralization belongs at the settlement layer, not the data-transparency layer

This kind of concentration risk reminds me of another field that also talks about decentralization: blockchain. The grid is like the chain: shared infrastructure that can carry different products on top. Generation is like the application layer: different sources providing supply, open to competition. An integrator like Taipower is like a DEX aggregator, integrating supply from many sides, finding the best liquidity, and delivering it to users.

Technically, blockchain also enables P2P energy trading: letting a generator, say a household with its own solar panels, trade directly with someone who needs power, without going through Taipower's integration, bypassing the middleman's spread. But Taiwan's regulations currently do not allow individuals to trade electricity directly; generation can only be sold to Taipower or a government-approved retailer.

But blockchain's core spirit is transparency and verifiability, and that clashes with the nature of the grid. The grid is critical national infrastructure, and publishing data too finely is itself a security risk: it could be used to infer industrial activity, even strategic intent. Copying blockchain's "put everything public on-chain" approach onto the grid itself is not safe.

I think the direction that can actually be deployed safely is not making real-time generation and consumption data fully public, but using blockchain at the settlement layer. Take how the compensation amount after the 303 blackout was calculated: it was entirely Taipower's own call, with no way for anyone outside to verify it. If the pricing and compensation rules were written as public smart contracts, you would not need to publish every node's real-time consumption; as long as the settlement rules themselves are transparent and verifiable, you could make the compensation mechanism fairer and more auditable without exposing critical-infrastructure detail.
