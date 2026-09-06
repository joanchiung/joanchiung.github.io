---
title: "Turning a Photoshop cleanup SOP into a set of rules for automation"
description: Can the mess left over from my design years become a SKILL plus a Photoshop MCP?
date: 2026-06-28
tags: ["Design", "AI", "Workflow"]
lang: en
draft: true
---

I have been working through my ancient design folder, and this time it is the Photoshop files themselves. Rushing design work in the past, I left a lot of mess behind: chaotic naming, old files edited directly with leftover empty and hidden layers, and dead layers that are switched on but covered by something above and never actually render.

## The cleanup SOP

1. **Name the artboards**: re-categorize, strip the word "copy"
2. **Delete dead layers**: clear every empty, hidden, or covered-up folder
3. **Flatten and merge**: layers that will not change again (light and shadow, fine detail) get flattened, keeping only the main structure
4. **Rename the layers**

The payoff is obvious. One file today: 130MB → 59MB, more than half gone.

## But doing it by hand is draining and slow

I keep wondering: could I write this cleanup logic as a set of rules (a SKILL), wire it to a Photoshop MCP, and have it handle these chores automatically?

The one worry is that the results of automation are hard to predict. Would it delete an important layer by mistake, or flatten something that should have stayed separate?
