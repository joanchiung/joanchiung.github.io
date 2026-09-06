---
title: 資產、負債、權益 —— 這三個數字能看出一家公司的什麼
description: 會計恆等式怎麼讀，以及為什麼鏈上透明度目前只能補強監管、還不能取代它。
date: 2026-06-11
tags: ["金融", "Web3"]
lang: zh
draft: false
---

## 1. 資產負債表是什麼？

損益表是「一段期間的成績單」，資產負債表是「某一天的快照」。

一個富二代跟一般人一樣去上班，他的損益表會跟大家差不多；但看他的資產負債表，就會跟同儕有巨大差距：資產規模大好幾倍，還會出現別人沒有的資產種類（繼承的房子、更多的金融資產）。所以想知道一家公司體質穩不穩、會不會收不到尾款，要看資產負債表。

## 2. 會計恆等式：怎麼讀

資產 = 負債 + 權益。左邊是資產，右邊是「來源」，負債是借來的、權益是股東的。

- 資產：看公司「有什麼、多快能變現」。100 萬現金和 100 萬廠房金額一樣，流動性完全不同。
- 負債：看「欠誰、何時要還」。負債不是越少越好 —— 借的錢報酬大於利息就划算，前提是還得起。
- 權益：資產 − 負債算出來的結果，是歷年累積（保留盈餘）。

<figure class="post-figure">
<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="bs-t bs-d">
<title id="bs-t">The accounting equation</title>
<desc id="bs-d">Assets on the left equal liabilities plus equity on the right, and the two sides always balance. On-chain you can verify assets but not liabilities. Proportions are illustrative.</desc>
<rect class="pf-fill-soft" x="80" y="44" width="200" height="180" rx="4"/>
<text class="pf-label" x="180" y="120" text-anchor="middle">Assets</text>
<text class="pf-muted" x="180" y="142" text-anchor="middle">what the company has</text>
<text class="pf-label" x="320" y="142" text-anchor="middle" font-size="22">=</text>
<rect class="pf-fill-soft" x="360" y="44" width="200" height="72" rx="4"/>
<text class="pf-label" x="460" y="76" text-anchor="middle">Liabilities</text>
<text class="pf-muted" x="460" y="96" text-anchor="middle">borrowed</text>
<rect class="pf-accent-soft" x="360" y="120" width="200" height="104" rx="4"/>
<text class="pf-label" x="460" y="166" text-anchor="middle">Equity</text>
<text class="pf-muted" x="460" y="186" text-anchor="middle">shareholders'</text>
<path class="pf-line-accent" d="M80 238 L80 246 L280 246 L280 238"/>
<text class="pf-accent" x="180" y="266" text-anchor="middle">On-chain: only this side is verifiable</text>
</svg>
<figcaption>Assets = Liabilities + Equity, and the two sides always balance. On-chain you can verify assets but not liabilities, so equity stays invisible. Proportions are illustrative.</figcaption>
</figure>

## 3. Coinbase vs NVIDIA

上週看市值，兩家差 100 多倍；這週看總資產，只差 9 倍。這個落差本身就是資訊：資產負債表記錄公司「有什麼」，市值反映市場認為它「值什麼」，中間的差距是市場對未來獲利的想像。

NVIDIA 的商業模式非常健康：負債比只有 25%，四分之三的資產是股東自己的錢；權益裡有 95% 是歷年淨利累積出來的。兩家長期債務金額幾乎一樣，但公司規模差 9 倍 —— NVIDIA 不是借不到，是賺太多根本不需要借。

Coinbase 負債比 53% 看起來高，但有一部分是商業模式造成的：帳上的客戶託管資金同時出現在資產和負債兩邊，像銀行幫客戶保管錢。

## 4. 用驗證取代信任

現實世界中，財報能被信任，是因為有政府公權力和會計審計在背書 —— 造假會被抓去關。但這個系統的缺點是慢：一季才出一張。傳統公司還能接受，但加密資產一天就可能漲跌超過 10%，等一季一張的報表完全來不及。

區塊鏈想做的，就是把「對公權力的信任」換成「隨時可以驗證」：你隨時可以上鏈查帳，確認資產在不在。

但鏈上驗證現在還無法取代監管，因為鏈上只查得到「資產」，查不到「負債」。用會計恆等式來看，只有左邊、沒有右邊，就算不出權益，看不到公司全貌 —— 這就是為什麼 FTX 倒閉之前，沒有人看得出問題。

所以我的結論是：透明度目前只能補強監管，還不能取代監管。但方向是對的 —— 盡量用制度取代對人的信任。Crypto 圈有一句話叫 "Don't trust, verify"，這就是整件事想做的。
