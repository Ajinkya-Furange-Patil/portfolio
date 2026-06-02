# Ajinkya Furange — Personal Portfolio & Creative Showcase

A premium, interactive personal portfolio showing digital craftsmanship, full-stack engineering expertise, and creative front-end design. This repository hosts two distinct, high-fidelity portfolio experiences: the **Editorial Brutalist Portal** (Primary root website) and the **Modern Glassmorphic Interface** (Archived in `/Old Portfolio`).

---

## 🚀 Live Demo
The portfolio is deployed and accessible at: **[ajinkyafurange.netlify.app](https://ajinkyafurange.netlify.app)**

---

## 📂 Repository Structure

The workspace contains two portfolio layouts, allowing for comparison of design systems:

```
├── .vscode/                 # Editor configurations
├── images/                  # Universal image assets (avatars, screenshots)
├── index.html               # Entry point for the Editorial Brutalist Portfolio (Root)
├── projects.html            # Grid view of all deployments for brutalist layout
├── style.css                # Token-based brutalist design system
├── animations.js            # GSAP/Anime.js motion engine (character splits, parallax)
├── DESIGN.md                # Detailed visual and UI design system documentation
├── SKILL.md                 # Core design tokens and system variables
├── robots.txt               # Main SEO crawler settings
├── Old Portfolio/           # Glassmorphic Portfolio (Archived subfolder)
│   ├── index.html           # Main entry page for glassmorphic version
│   ├── style.css            # Style foundations for Glassmorphic layout
│   ├── app.js               # Logic and interactive particles
│   ├── sw.js                # Service Worker for offline capabilities and PWA caching
│   ├── projects.html        # Projects page for glassmorphic layout
│   ├── projects.css         # Styles for glassmorphic projects page
│   └── robots.txt           # Glassmorphic site specific crawler settings
└── README.md                # This documentation file
```

---

## 💎 Design Systems

### 1. Editorial Brutalist Portfolio (Root)
* **Aesthetics:** High-contrast editorial style inspired by modern brutalist design agencies (e.g., Obys Agency). Uses a dark mode backdrop with a single neon lime-green accent color (`#c8f135`).
* **Styling Framework:** Vanilla CSS using a strict token-based custom design system (defined in `SKILL.md`).
* **Features:**
  - **Typographic Dominance:** Uses monospace fonts (`Space Mono` for display headers, `DM Mono` for body text/code snippets) as visual architecture.
  - **Fluid Typography:** Smooth responsive scaling (`clamp`) to avoid layout overflows.
  - **Letter-by-Letter Animation:** Anime.js-powered entry sequence that splits names character-by-character, grouped inside word-wrappers to prevent orphaned wrapping.
  - **Horizontal Deployments Scrub:** GSAP ScrollTrigger pins the viewport and slides cards horizontally on scroll.
  - **Interactive Terminal Loader:** Interactive CLI boot sequence simulated prior to main content rendering.

### 2. Modern Glassmorphic Portfolio (`/Old Portfolio`)
* **Aesthetics:** Vibrant cyan/purple gradients, soft glassmorphism filters, neon-like text glows, dynamic mouse-follower cursor, and a dark space-like atmosphere.
* **Styling Framework:** TailwindCSS + Custom CSS variables.
* **Features:**
  - Interactive 3D interactive particle field (Three.js WebGL canvas).
  - Floating elements and smooth entry micro-interactions (GSAP).

---

## 🛠️ Tech Stack & Libraries

- **Markup & Layout:** HTML5, CSS3 (Vanilla & TailwindCSS)
- **Programming Language:** JavaScript (ES6+ with WebSockets and asynchronous integrations)
- **Creative WebGL Canvas:** [Three.js](https://threejs.org/) (Custom shader and mesh rendering)
- **Animation Orchestrator:** [GSAP (GreenSock)](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Micro-Animations & Splits:** [Anime.js](https://animejs.com/)
- **CSS Animations:** [Animate.css](https://animate.style/)

---

## 🌟 Key Featured Projects

* **AgriConnect Platform:** Direct-to-consumer ecosystem reducing intermediary overhead by 30-40% via intelligent order routing. Built with Node.js, Express, and MySQL.
* **Ajinkya Sampark (Chat Engine):** Sub-50ms latency WebSocket messaging layer built with Socket.io.
* **ExpiryWatchDog:** Smart LocalStorage-based MVP tracking product expiry dates with a clean responsive UI.
* **Medical Payment Tracker:** Healthcare administrative tool automating billing cycles, reducing administrative error margins by 60%.

---

## 🏆 Achievements Highlighted

* 🥇 **1st Place** — Azure AI Agent Challenge (Microsoft, 2025)
* 🥇 **1st Place** — Startup Pitching (Bhausaheb Vartak Polytechnic)
* 🥇 **1st Place** — Replica Race (Shankar Narayan College)
* 🥉 **3rd Place** — MongoDB AI Hackathon (MongoDB Global, 2025)

---

## ⚙️ Local Setup & Development

To run either portfolio locally, simply spin up any static web server in the root of this project:

### Using Node.js (http-server)
```bash
# Install globally or run directly via npx
npx http-server .
```

### Using Python
```bash
# Python 3
python -m http.server 8000
```

Open `http://localhost:8080` (or `8000`) in your browser to view the editorial brutalist version (root), or navigate to `http://localhost:8080/Old Portfolio` to view the older glassmorphic design.
