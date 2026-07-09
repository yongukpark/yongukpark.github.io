---
layout: post
title: "Building a tool-using agent on the Model Context Protocol"
date: 2026-03-22
cat: build
map_x: 0.82
map_y: 0.74
description: "Build notes on a Model Context Protocol tool-using agent, covering tool description design, small composable tools, and loop-guarding failure modes."
---

Build notes from the MCP-based AI agent (the project that took the Grand Prize
at Kakao × KSC). The Model Context Protocol gives a uniform way to expose tools
to a model, which meant most of the work was in *tool design and control flow*
rather than glue code.

## Why MCP

Instead of hand-wiring each tool into the prompt, every tool is described once
through the protocol — name, input schema, and description — and the model
selects and calls it. Adding a capability becomes "register a new server,"
not "rewrite the orchestration."

## What actually mattered

- **Tool descriptions are prompts.** The single biggest lever on reliability was
  writing precise tool descriptions and input schemas. Vague descriptions led to
  the model calling the wrong tool or filling arguments incorrectly.
- **Small, composable tools** beat one large do-everything tool. They are easier
  for the model to select correctly and easier to debug in isolation.
- **Guarding the loop.** Bounding the number of tool calls and validating
  arguments before execution prevented most runaway behavior.

## Failure modes to watch

- The model narrating a tool call in prose instead of emitting an actual call.
- Silent argument coercion — a tool "succeeding" on malformed input and
  returning something plausible but wrong.

The interpretability thread runs underneath even this: understanding *why* a
model selects one tool over another is the same question of internal
representation, one abstraction level up.
