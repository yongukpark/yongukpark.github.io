---
layout: post
title: "Fine-tuning DeBERTa to separate human and AI-generated text"
date: 2026-02-20
cat: llm
map_x: 0.55
map_y: 0.52
description: "Notes on fine-tuning DeBERTa to separate human and AI-generated text, and on why the resulting classifier detects stylistic regularity under a fixed generator rather than 'AI text' in general."
---

Notes from the human-vs-AI-generated text classifier (the project that received
the Excellence Award). The task sounds binary and simple; the interesting part
is *what the model latches onto* and how brittle that signal is.

## Setup

- Backbone: DeBERTa, fine-tuned for sequence classification.
- Data: paired human-written and model-generated passages across several
  domains, held out by source so the test set contains generators unseen in
  training.
- Metric: accuracy plus per-domain breakdown, because a single aggregate number
  hides where the classifier fails.

## What carried the signal

Generated text tended to be smoother and lower in "surprise" — fewer abrupt
topic shifts, more uniform sentence length, and a narrower vocabulary tail.
DeBERTa picks up on these regularities quickly. The catch is that they are
properties of *a particular generation setting*, not of AI text in general.

## Where it breaks

- Change the decoding temperature and the distribution of the surprise signal
  shifts, hurting recall on the AI class.
- Short passages carry too little signal; accuracy degrades sharply below a few
  dozen tokens.

## Takeaway

A strong classifier here is really a detector of *stylistic regularity under a
fixed generator*, not a universal "AI detector." Reporting the held-out-by-source
numbers matters far more than the headline accuracy.
