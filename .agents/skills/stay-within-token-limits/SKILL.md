---
name: stay-within-token-limits
description: Performance guidelines to optimize token usage, minimize context sizes, and prevent token overflows during execution.
---

# Token Optimization & Performance Skill

This skill governs context management and performance rules to optimize execution when coding.

## Optimization Protocol

1. **Selective File Reading:**
   * Do not view whole files if only a single function needs to be edited. Specify start and end lines.
   * View the folder structure before scanning files at random.

2. **Clean Replacement Chunks:**
   * When modifying files, prefer `replace_file_content` with a targeted start and end line rather than writing the entire file again, which consumes massive tokens.

3. **Concise Reponse Formatting:**
   * Keep responses to the user short and to the point.
   * Avoid repeating artifact content in text replies.
