# Portfolio Website

A modern, interactive, and responsive portfolio website built with **React**, **Vite**, and **Tailwind CSS**.

## 🚀 Live Demo
[https://chetanya1998.github.io/Portfolio/](https://chetanya1998.github.io/Portfolio/)

## 🏗️ File Structure

The project follows a standard React + Vite structure. Here's an overview of the key files and directories:

```
/Users/chetanya/Portfolio/
├── src/
│   ├── components/
│   │   ├── GlowingCursor.jsx   # Custom custom cursor effect
│   │   └── HeroBackground.jsx  # Interactive "Aurora" gradient mesh background
│   ├── assets/                 # Static assets (images, icons)
│   ├── App.jsx                 # Main application application wrapper
│   ├── Portfolio.jsx           # Core single-page component (Hero, About, Projects, etc.)
│   ├── main.jsx                # Entry point mounting the React app
│   └── index.css               # Global styles & Tailwind configuration
├── dist/                       # Production build output
├── public/                     # Public static files
├── index.html                  # HTML entry point (Vite)
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration (includes gh-pages base URL)
└── tailwind.config.js          # Tailwind CSS configuration
```

## ⚙️ Functionality & Key Components

### 1. **Core Application (`src/Portfolio.jsx`)**
This is the heart of the single-page application. It contains all the main sections:
- **Hero Section**: Landing area with typewriter effect and interactive background.
- **About, Experience, Projects**: Content sections using a grid layout.
- **Contact & Footer**: Social links and contact info.
It manages state for the active section and handles smooth scrolling navigation.

### 2. **Interactive Hero Background (`src/components/HeroBackground.jsx`)**
- **Technology**: HTML5 Canvas API.
- **Effect**: Creates a "Gradient Mesh" or "Aurora" effect.
- **Behavior**:
    - Generates multiple large, colorful "blobs" (Orange, Purple, Blue).
    - Blobs float naturally and react to mouse movement (repulsion effect).
    - Uses `globalCompositeOperation = 'screen'` for vibrant color blending.
    - Heavily blurred via CSS (`blur-[80px]`) for a soft, premium look.

### 3. **Glowing Cursor (`src/components/GlowingCursor.jsx`)**
- **Effect**: A custom orange glowing orb that follows the user's mouse pointer.
- **Behavior**:
    - Uses `useEffect` to attach mouse event listeners (`mousemove`, `mousedown`, etc.).
    - Updates a fixed `div` position using 3D transforms (`translate3d`) for performance.
    - Disables itself on mobile devices to prevent UX issues.
    - Adds a subtle interactive state (scale down) on click.

### 4. **Styling & Responsiveness**
- **Tailwind CSS v4**: Used for all styling.
- **Mobile-First**: The layout starts with mobile styles and enhances for standard (`md`) and large (`lg`) screens.
- **Typography**: Optimized font sizes for readability across devices (`text-5xl` hero links on desktop, `text-3xl` on mobile).

## 🛠️ Setup & Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

4.  **Deploy to GitHub Pages**:
    ```bash
    npm run deploy
    ```
