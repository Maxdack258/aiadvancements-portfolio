# AI Portfolio: Exploring the Future

A modern, interactive frontend web application built as a portfolio to showcase state-of-the-art AI advancements up through 2026. This project was meticulously designed to visually explain complex LLM metrics, timeline evolutions, and significant thoughts from industry leaders, all wrapped in a premium dark UI aesthetic. 

## ✨ Key Features

- **Interactive 3D Environments:** Utilizes `@react-three/fiber` and `@react-three/drei` to render an interactive hero sphere utilizing custom material mesh distortion.
- **Physics-Based Scroll Animations:** A fully horizontal timeline built natively with `framer-motion`'s `useScroll` integration tracking viewport progress in real-time.
- **Live Data Visualizations:** Integration of `react-chartjs-2` configured with raw, multi-gradient bar charts mapping benchmark variables from `ArtificialAnalysis`.
- **Dynamic Theming Systems:** A robust CSS variable setup that drives neon accents (`#3b82f6` & `#8b5cf6`), glassmorphism card UI, and ambient glow background layers.
- **Intelligent Iconography:** Mapping specific milestones (Text, Vision, Video functionality) directly to minimalistic vector representations using `lucide-react`.

## 🛠 Tech Stack

- **Framework:** React + Vite
- **Styling:** Vanilla CSS (CSS Variables + Glassmorphism logic)
- **Animations:** Framer Motion
- **3D Rendering:** Three.js + React Three Fiber
- **Data Visualization:** Chart.js
- **Icons:** Lucide React

## 🚀 Getting Started

You can access the website through the following cloudflare link:
```bash
https://aiadvancements-portfolio.pages.dev/
```

To run this project locally, ensure you have Node.js installed on your machine.

### 1. Clone or Download the repository
Navigate into the root directory of the application:
```bash
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

The application should now be accessible at `http://localhost:5173`.

## 💡 Project Structure

- `src/App.jsx`: Main single-page application orchestrating Sections, Scroll Hooks, Three.js contexts, and Chart.js instances.
- `src/index.css`: A comprehensive master stylesheet driving the entire atomic, responsive design system.

---
*Created as a demonstration of frontend capabilities in modern web ecosystems combined with AI analytical research.*
