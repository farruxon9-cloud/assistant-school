---
name: advanced-reasoning
description: Provides advanced reasoning, systematic edge-case verification, and self-correction loops for AI coding agents.
---

# Advanced Reasoning & Systematic Verification Skill

This skill guides AI agents to perform systematic, high-fidelity reasoning when solving complex programming tasks, preventing silent bugs and coding hallucination.

## Reasoning Protocol

1. **Chain-of-Thought Formulation:**
   * Before writing any code, state the problem, constraints, and dependencies explicitly.
   * Diagram the flow of data or state transitions when dealing with complex interactions.

2. **Edge-Case Analysis Checklist:**
   * **Empty States:** How does the UI look if lists/arrays are empty? (Provide placeholders/fallbacks).
   * **Data Type Discrepancies:** Ensure strings and numbers are strictly parsed before arithmetic/state updates (e.g. `Number(value)`).
   * **Null/Undefined Checking:** Always guard object navigation (e.g., `student?.arubaito?.jobs`).

3. **Self-Correction & Linting Loops:**
   * Run builds frequently.
   * If a compilation or linting error occurs, do not guess; inspect the exact line and file first using file read tools before modifying code.
