---
title: "Demand response: using incentives to move consumption in time, not to generate new power"
description: A gentler buffer one step before "we have to cut power". AI data centers are participants too.
date: 2026-08-21
tags: ["Energy", "AI"]
lang: en
draft: false
---

## 1. Mechanism: use incentives to move consumption in time

Storage moves electricity to the moment it is needed. Demand response is another way to adjust timing, and the difference is that it works on user behavior: through a reward mechanism, it gets people to voluntarily use power off-peak. In practice, Taipower offers a discount to encourage users to shift peak consumption to the off-peak hours in the middle of the night.

But for this to work, you need smart meters paired with a two-way smart grid, so you can measure closely whether users are actually cooperating. A traditional meter is read once a month, and the utility cannot tell whether you consumed at peak or off-peak.

## 2. Risk: with no buffer between supply and demand, if it cannot hold, power gets cut

Electricity has one property: supply and demand have to balance in real time, and you cannot store a large amount to release slowly. If peak demand exceeds supply and the grid has no tool on hand to bring demand down immediately, then to protect the system from burning out, it triggers a fuse-like protection: sacrifice a part, rotate the outages, and keep the whole grid from collapsing.

Taiwan has a tiered load-shedding system: tiers A and B cut power immediately on a sudden fault, tiers C through F are pre-announced outages when a shortfall is foreseen, and tiers H, I, J are dedicated feeders for critical national facilities that are never included in rotating cuts. The point of demand response is to provide a gentler buffer before things reach "we have to cut power".

## 3. AI data centers can take part in demand response too

Taiwan's approach lets data centers join Taipower's power trading platform through an aggregator and become part of a "virtual power plant" (VPP). When Taipower needs to shed load or discharge due to weather or a sudden unit fault, the VPP automatically dispatches the data center's storage or non-critical load within seconds to minutes, with core compute completely unaffected. The data center can actually earn ancillary-service payments from Taipower for providing this backup: save on the power bill, and make some extra on the side.

Another approach uses price incentives: AI model training uses enormous amounts of power but is not strictly time-critical, so by widening the peak/off-peak price spread, Taipower gets compute operators to voluntarily schedule training tasks into the solar-rich daytime peak or the deep off-peak at night, avoiding the evening hours when supply is tightest.

## 4. The meter dispute is a hardware problem, not a mechanism problem

In Taiwan and elsewhere, there have been cases where, after switching to smart meters, consumption behavior did not change but the bill went up, and users suspected over-billing. I think this is more of a transition-period problem. The over-billing dispute traces back to something more like a procurement issue: these smart meters are mass-produced hardware, and procurement easily runs into uneven quality. The problem is in the hardware supply chain, not the concept of demand response itself.

To resolve users' distrust, the key is not to publish all the consumption data, but for the utility to offer a support or complaint mechanism that users can verify for themselves.
