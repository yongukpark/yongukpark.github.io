---
layout: post
title: "Toward a functional map of attention heads"
date: 2026-01-15
cat: interp
map_x: 0.24
map_y: 0.42
description: "Early notes on an ongoing effort to group attention heads by the operation they implement rather than by layer, with the full write-up still pending."
---

A longer-term thread I want to keep notes on: building a **functional map** of
attention heads in a mid-size Transformer — grouping heads by the operation they
appear to implement (previous-token, induction, duplicate-token, name-mover,
and so on) rather than by layer index.

The plan is to combine per-head diagnostic scores with ablation studies, then
check whether heads that score similarly also share downstream effects.

**Write-up coming.** This is an active experiment and I would rather post the
methodology and results once the head groupings are stable than sketch
conclusions early. Notes and figures will follow.
