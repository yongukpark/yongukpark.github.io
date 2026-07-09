---
layout: post
title: "Finding induction heads: from attention patterns to a small circuit"
date: 2026-06-05
cat: interp
map_x: 0.18
map_y: 0.30
description: "Explains the attention-pattern signature of induction heads and the two-head previous-token/induction-head circuit that produces it."
---

Induction heads are one of the cleaner entry points into mechanistic
interpretability. They implement a simple rule — *if the token `A` was
followed by `B` earlier in the context, predict `B` again after the next `A`* —
and yet they turn out to underlie a large share of in-context learning.

## What to look for

An induction head has a recognizable signature in its attention pattern.
Given a repeated sequence, the head attends from the current token back to the
token that *followed* the previous occurrence of the current token:

```
... A B ... A [attends to B]
```

So the diagnostic is not "does this head attend far back" but "does it attend
to the successor of a matching earlier token." Averaged over many random
repeated sequences, this shows up as a strong diagonal offset in the
attention map.

## The two-head mechanism

In practice the behavior is usually a composition of two heads across layers:

1. A **previous-token head** in an earlier layer writes, into each position,
   information about the token that preceded it.
2. An **induction head** in a later layer reads that information through
   Q-composition and attends to the right successor position.

Isolating each of the two heads and ablating them independently is what turns
"this head looks like an induction head" into "this head is *part of* the
circuit that produces the behavior."

## Notes for the next experiment

- Measure the induction score per head on synthetic repeated sequences, then
  confirm on natural text — the ranking should be stable.
- Path-patch from the previous-token head to the candidate induction head to
  check that the composition is causal, not incidental.

Later posts will connect this to how editing a single head's output changes
the model's downstream predictions.
