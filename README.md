# 🛍️ Modern React 19 FakeStore Storefront

A premium, highly responsive e-commerce storefront showcasing catalog discovery, powered by React 19, Vite 8, Tailwind CSS v4, and the experimental React Compiler.

This storefront interacts with the public **FakeStore API** to fetch product categories, list products, handle search filtering, and offer a premium UI experience with micro-animations.

---

## ✨ Features

- **⚡ Instant Search & Debouncing:** Dynamic catalog searching with a built-in input debouncer to avoid excessive UI lag during continuous typing.
- **🏷️ Category Filtering:** Fully interactive product categories directly sourced from the FakeStore API database.
- **✨ Sliding Hover Underline Navigation:** A premium indicator in the navbar that dynamically sizes and slides to follow the user's cursor.
- **📱 Responsive Layout:** Designed for both mobile and desktop screens, including a responsive slide-out mobile drawer.
- **📦 Custom Component Library:** Modular, re-usable design system blocks (Buttons, Inputs, Dropdowns, Product Cards) built from scratch using CSS-first styling.
- **💀 Loading Skeletons:** Premium CSS-pulse loading states that mirror the grid layout while fetching catalog items.
- **🛡️ Error Isolation & Recovery:** Integrated API error catch blocks with instant reload/retry interfaces.

---

## 🛠️ Tech Stack & Selected Libraries

- **React 19:** Built on the latest version of React to leverage modern state handling and rendering performance.
- **React Compiler (`babel-plugin-react-compiler`):** Experimental build-time optimization tool (React Forget) that automatically memoizes components and hooks without the need for manual `useMemo` or `useCallback` optimizations.
- **Vite 8:** Extremely fast frontend tooling and development server.
- **Tailwind CSS v4 (`@tailwindcss/vite`):** The new CSS-first version of Tailwind, configured natively as a Vite plugin with enhanced compile speeds and modern custom CSS variables.
- **Lucide Icons (`lucide-react`):** Premium, lightweight vector iconography for sharp styling.
- **Tailwind Utility (`@sglara/cn`):** Used to safely merge, override, and compile dynamic tailwind class names.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and **pnpm** installed on your machine.

### Installation

Clone the repository, navigate into the directory, and install the dependencies:

```bash
# Install dependencies using pnpm
pnpm install
```

### Running the App

To launch the local development server with hot-module replacement (HMR):

```bash
# Start the local development server
pnpm dev
```

The application will run locally, usually at `http://localhost:5173`.

### Production Build

To build the static application bundle optimized for production hosting:

```bash
# Compile and build the project
pnpm build

# Preview the production build locally
pnpm preview
```

---

## 🧩 Specific Challenges & Solutions

### 1. Initial Underline Slide Flash on Navbar Hover

- **Challenge:** When a user hovered over the navigation menu for the first time, the active indicator span would animate/slide from `left: 0px` (or index 0) to the target element's position, causing an unwanted visual "flash".
- **Solution:** Managed transitions programmatically. On the first hover event, transition is temporarily disabled via `isTransitionEnabled(false)` state, coordinates are set instantly, and then transitions are re-enabled in a minor microtask delay (`setTimeout` with a 20ms threshold). This makes the first appearance instant, and subsequent hover navigation smooth.

### 2. Typing & Prop Delegation on Reusable UI Components

- **Challenge:** Creating custom element wrappers like `Input` and `Button` that support flexible layouts (e.g. prefix/suffix icon slots, `asChild` polymorphism) causes complex typescript errors and prop conflicts in React 19.
- **Solution:** Leveraged `isValidElement` and custom React `cloneElement` checks in TypeScript. Built precise helper interfaces that extend native DOM attributes, ensuring standard events (`onClick`, `onChange`, focus) and class names are merged safely with children using the custom `@sglara/cn` utility.

### 3. Client-Side Catalog Search Debouncing

- **Challenge:** Running character-by-character search filtering across the products array on every single keydown causes the rendering thread to execute layout updates too frequently, degrading performance on low-end devices.
- **Solution:** Implemented client-side input debouncing. The user's input updates the input state instantly, but the catalog filter reacts to a `debouncedSearchQuery` state that updates only after a `1000ms` typing pause using a custom `useEffect` timer cleanup.

---

> [!NOTE]
> All product information, categories, and image assets are mock data served by [FakeStoreAPI](https://fakestoreapi.com).
