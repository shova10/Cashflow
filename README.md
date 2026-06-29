# Personal Finance Tracker 💰📊

A modern, responsive, and secure personal finance tracker designed to help users log transactions, monitor balances, and visualize long-term financial trends. The application features a dark-themed UI built with React, Tailwind CSS, Recharts for data analytics, and Zustand for state preservation.

---

## ✨ Features

* 🏠 Interactive Hub: Minimalist landing page with structured dashboard links to view real-time balances, income metrics, and global expense flows.
* 📊 Visual Analytics Engine: * *Income vs. Expense:* A comparative monthly bar chart displaying tracking metrics.
  * Expense Distributions: An interactive doughnut/pie chart splitting resource metrics down by categories.
  * Savings Rate Trend: A smooth monotone line graph tracing historic saving patterns over time.
* 📝 Dynamic Transaction Manager: Unified dashboard listing to record entries (`Income` or `Expense`), apply localized filters (`All`, `Income`, `Expense`), and delete historical logs seamlessly.
* 🇳🇵 Localized Formatting: Built natively with localized currency format wrappers matching standard Nepalese styling guidelines (`Rs. X,XX,XXX.XX`).

---

## 🛠️ Tech Stack

* Core Framework: React (Functional Hooks with Memoization)
* Routing Infrastructure: React Router DOM (v6 Browser Routing Architecture)
* Global State Management: Zustand (`useStore` hook tracking global mutations)
* Visualizations: Recharts (Data-responsive SVG mapping engine)
* Icon Assets: Lucide React
* Styling Layer: Tailwind CSS (Custom dark theme background palette: `#0f1117`)

---

## 📂 Architecture & Routing Map

The layout establishes a structured navigation shell (`Navbar` and `Footer`) around a responsive content portal managed by React Router.

[BrowserRouter]
├──  (Persistent Header)
├── [Main Content View Container]
│      ├── Route "/"            --> 
│      ├── Route "/dashboard"   --> 
│      ├── Route "/transactions"--> 
│      ├── Route "/analytics"   --> 
└──  (Persistent Footer)

### Route Breakdown

| Target Route Path | Core View Component | Layout Composition Elements | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Full Layout Nav/Footer Wrapper | Promotional Landing Frame & Application Capabilities |
| `/dashboard` | `Dashboard` | Full Layout Nav/Footer Wrapper | Aggregated Net Worth Cards & 5 Most Recent Entries |
| `/transactions` | `Transactions` | Full Layout Nav/Footer Wrapper | Global Auditing List, Filtering Engine, & Creation Modals |
| `/analytics` | `Analytics` | Full Layout Nav/Footer Wrapper | Microeconomic Trend Lines, Categorical Pie Layers, & Ratios |

---

## ⚙️ Core Data Processing & Utilities

### Localized Currency Format
The codebase automatically applies regional formatting configurations matching banking conventions (`en-NP`) to display values correctly across standard text outputs:
```javascript const fmt = (n) => 'Rs ' + n.toLocaleString('en-NP', { minimumFractionDigits: 2 })
```


Analytical FormulationsTo maintain stutter-free runtime rendering when sorting large datasets, complex historical transformations are processed safely inside performance-optimized React lifecycle layers:Monthly Aggregations: Transaction logs are mapped by year/month string segments (YYYY-MM) and sorted lexicographically to map linear chart baselines.Savings Ratios: Calculated globally across current records using mathematical evaluation formulas:$$\text{Savings Rate} = \left( \frac{\text{Total Income} - \text{Total Expense}}{\text{Total Income}} \right) \times 100$$


🚀 Installation & Setup
Follow these steps to run this finance tracking workspace locally:

Clone the source repository:

Bash
git clone [https://github.com/yourusername/finance-tracker.git](https://github.com/yourusername/finance-tracker.git)
cd finance-tracker
Install necessary dependencies:

Bash
npm install
Verify state hooks setup:
Ensure your application store is correctly configured at src/store/useStore.js to expose your reactive state metrics:

state.transactions (Array containing title, category, type, date, amount)

state.deleteTransaction (Function updating store via an item ID reference)

Boot the Vite application server:

Bash
npm run dev


