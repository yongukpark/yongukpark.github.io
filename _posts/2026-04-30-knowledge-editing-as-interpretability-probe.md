---
layout: post
title: "Knowledge editing as a probe for interpretability hypotheses"
date: 2026-04-30
cat: interp
map_x: 0.30
map_y: 0.24
description: "Argues that knowledge editing functions as a causal test for interpretability claims about where facts are localized, not as an independent research track."
---

I treat knowledge editing less as a goal in itself and more as a **causal test**
for claims about where and how a fact is represented. If interpretability says
"this component stores this association," editing gives a way to intervene on
exactly that component and see whether the prediction moves the way the
hypothesis says it should.

## The loop

1. Localize a candidate site for a fact — a set of MLP or attention outputs at
   specific layers — using an attribution method.
2. Apply a targeted edit (e.g. a rank-one update) at that site.
3. Check three things: the target fact changed, *related* facts changed in the
   predicted direction, and *unrelated* facts stayed put.

Step 3 is the part that actually validates the interpretability claim. An edit
that flips the target but also corrupts unrelated knowledge means the localized
site was not as clean as the attribution suggested.

## Why this is interpretability, not a separate track

The edit is a scalpel used to confirm a claim about internal structure. When a
minimal, localized change produces exactly the predicted downstream behavior and
nothing else, that is strong evidence the localization was correct. So knowledge
editing here sits *downstream of* mechanistic interpretability — it is how a
structural hypothesis earns the word "causal."

## Open question

How well does a site localized for one fact generalize to structurally similar
facts? If editing one association reliably transfers to a family of related
ones, that points to shared circuitry rather than isolated storage.
