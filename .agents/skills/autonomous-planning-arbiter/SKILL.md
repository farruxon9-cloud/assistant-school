---
name: autonomous-planning-arbiter
description: Guidelines for decomposing massive multi-file development tasks into checkpoint-based phases.
---

# Autonomous Planning Arbiter Skill

This skill governs the generation, editing, and execution of structured technical implementation plans.

## Planning Workflow

1. **Phase Breakdown:**
   * Break down changes into chronological phases (e.g. Database schema updates -> Core component functions -> UI layout -> Verification).
   * Do not make parallel edits across different sub-systems without testing the previous layer.

2. **Checkpoint Tracking:**
   * Create or update the conversation task tracker checklist (`task.md`) for every phase.
   * Mark tasks as in-progress `[/]` or completed `[x]` to maintain state alignment across sessions.

3. **User Approval Handshake:**
   * Always write clear, actionable designs in the `implementation_plan.md` and wait for user approval before making source changes when in planning mode.
