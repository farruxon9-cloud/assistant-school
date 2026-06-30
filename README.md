# Assistant School 🏫

Assistant School is a responsive, minimalistic, and state-of-the-art **School Management System** (Web Application) designed for academic institutions, with specialized modules for Japanese Language Schools (日本語学校) dealing with foreign student visas and immigration reporting.

Built using **Vite + React** and a custom **Obsidian Glassmorphic CSS System**, it offers an exceptional UI/UX across computers, tablets, and mobile devices.

---

## 🌟 Key Features

### 1. 🇯🇵 & 🇺🇿 Multilingual Interface
*   Fully localized in **Uzbek** and **Japanese** languages.
*   One-click instantaneous translation switch directly in the top header.
*   Generates official print certificates in correct standard bilingual formats.

### 2. 📷 Smart OCR Card Autofill Simulator
*   Simulates high-fidelity OCR scanning for **Zairyu Cards (Resident Cards)** and **Passports**.
*   Extracts English Name, Katakana Name, Birthday, Nationality, Card Numbers, and Visa dates instantly, auto-filling the registry form to save staff time.

### 3. ⚡ Smart Attendance (Excel Grid)
*   A cross-device responsive spreadsheet layout to register classroom presence.
*   **Check-All Present Shortcut:** Register all students present in a single tap, then edit only absent/late exceptions.
*   Reduces daily attendance registering time to under 5 seconds.

### 4. ⚠️ Automated Visa Expiry Alerts & Monitoring
*   Daily automated check of visa deadlines.
*   Highlights students whose visa expiry is less than 30 or 15 days away in red/orange on the dashboard, warning of potential renewal issues.
*   Monitors and highlights students with critical attendance rates below 80% (risk threshold for visa extension).

### 5. 🖨️ QR-Coded & Stamp-Ready Document Generation
*   Generates A4 printer-ready official documents with Japanese Red Stamps (佐藤之印):
    *   **在学証明書** (Enrollment Certificate)
    *   **成績・出席証明書** (Grades & Attendance Certificate)
    *   **請求書** (Tuition Payment Invoices)
*   Integrates verification **QR Codes** to allow quick authenticity validation.

---

## 🛠️ Technology Stack

*   **Core:** React (Functional components & hooks)
*   **Bundler:** Vite (Ultra-fast HMR and building)
*   **Styling:** Custom Vanilla CSS (Obsidian dark theme, glassmorphic filters, responsive layout, smooth state transitions)
*   **Verification:** QR Code API integrations

---

## 🚀 Setup & Installation

Follow these simple steps to run Assistant School locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/assistant-school.git
cd assistant-school
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🤝 Contribution & Feedback

We welcome contributions from educators, school administrators, and developers to make this system better. If you have recommendations, please:
1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
