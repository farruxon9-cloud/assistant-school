---
name: db-transaction-safety
description: Guidelines for ensuring database transaction safety, double-check logic, and input sanitization.
---

# Database Transaction Safety & Double-Check Protocol

This skill dictates how agents should write state updating logic (mutations) in mock and production databases to prevent inconsistencies.

## Verification Standards

1. **State Mutation Double-Check:**
   * Before committing a write to state (e.g. `setStudents`), perform basic checks:
     * Check if IDs exist.
     * Validate bounds (e.g., EJU score between `0` and `400`).
     * Ensure dates are well-formatted.

2. **Depositor Matching Audits:**
   * When handling tuition fees, verify that the depositor name, bank branch, and transaction reference match bank statement records before updating status to `Paid`.

3. **Data Loss Prevention:**
   * Always write back mutated structures to persistent cache (`localStorage` or backend databases) immediately after updating state.
