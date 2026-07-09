---
name: document-automation
description: Rules for designing precise, print-ready document previews and exporting to A4 PDF with jsPDF and html2pdf.
---

# Document Automation & PDF Generation Skill

This skill governs the construction of official documents (Invoices, Transcripts, Enrollment Certificates) generated inside web applications.

## Design and Export Standards

1. **A4 Paper Alignment (Print Media):**
   * Keep paper styling close to standard A4 size (`width: 210mm`, `min-height: 297mm`).
   * Wrap paper content in a distinct class (e.g. `.print-paper`) and apply clean print stylesheets so it doesn't print browser navigation headers/footers.

2. **html2pdf.js Options Configuration:**
   * Always scale up for high-fidelity rendering: `{ scale: 2 }`.
   * Set configuration format options exactly:
     ```javascript
     {
       margin: 10,
       filename: 'document.pdf',
       image: { type: 'jpeg', quality: 0.98 },
       html2canvas: { scale: 2, useCORS: true },
       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
     }
     ```

3. **Official Seal (Hanko / Stamp) Overlay:**
   * Circular red hanko stamps must be placed absolute to mock official Japanese stamps.
   * Provide a verification QR code linked to the certificate authenticity endpoint.
