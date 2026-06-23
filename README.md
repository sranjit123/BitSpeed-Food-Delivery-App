# BiteSpeed 🍕 – Hyper-Local Food Delivery Mockup

BiteSpeed is a premium, consumer-facing e-commerce application tailored for the food delivery industry. Designed to simulate high-growth platforms like DoorDash or UberEats, it emphasizes a fluid user experience, real-time catalog exploration, and a streamlined multi-step checkout workflow.

## 🚀 Live Demo
[Check out the Live Deployment here](https://bitespeed-mockup.vercel.app/) *(Mock Link)*

## ✨ Core Features

- **Dynamic Menu Catalog**: A responsive grid featuring real-time text searching and multi-category filtering (Vegan, Gluten-Free, Italian, etc.).
- **Global State Management**: A persistent shopping cart powered by React Context, allowing seamless item management across various application views.
- **Micro-Animations**: Smooth slide-out sidebars and layout transitions powered by Framer Motion for a "native-app" feel.
- **Glassmorphic UI**: A modern design system utilizing backdrop blurs, vibrant color palettes (Sunset Orange), and premium typography (Outfit & Inter).
- **Checkout Simulator**: A 3-step wizard (Delivery Address ➔ Payment Selection ➔ Order Summary) with field validation and order processing simulation.

## 🛠️ Tech Stack

- **Frontend**: React + Vite (Fast, scalable, and modern)
- **State Management**: React Context API (State persistence with LocalStorage)
- **Styling**: Vanilla CSS (CSS Variables, Flex/Grid, Glassmorphism)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📂 Project Structure

```text
src/
├── components/
│   ├── Cart/         # Slide-out sidebar & calculations
│   ├── Checkout/     # Multi-step checkout wizard
│   ├── Header/       # Search & navigation
│   ├── Menu/         # Grid, filtering & search logic
│   └── UI/           # Reusable atomic components
├── context/          # Global Cart state
├── data/             # Mock food database
└── styles/           # Design system & global tokens
```

## 🛠️ Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/yourusername/bitespeed-mockup.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```

---
*Created with ❤️ for technical recruitment portfolios.*
