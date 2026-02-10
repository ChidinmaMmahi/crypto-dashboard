## CoinLytics – Crypto Market Dashboard

CoinLytics is a crypto market dashboard built with **React**, **TypeScript**, and **Vite**.  
It shows live market data from the CoinGecko API, with powerful controls to search, sort, and view coins in either **card** or **table** layout.

---

## Features

- **Live market data**
  - Fetches coins from the CoinGecko public API
  - Supports multiple currencies (e.g. USD, NGN, EUR, GBP, JPY)
- **Market as the default view**
  - Single–page app: no React Router, the Market is always displayed by default
- **Header controls**
  - Global search bar to filter coins by name
  - Sort toggle cycling through:
    - Alphabetical (A–Z)
    - Highest price first
    - Lowest price first
    - Back to no sort
  - Currency selector (dropdown)
  - Layout toggle: **Card view** ↔ **Table view**
- **Card view**
  - Responsive grid of coin cards
  - Shows coin image, name, and current price
  - Click a card to open a detailed modal for that coin
- **Table view**
  - Responsive table with `Coin` and `Price` columns
  - Scrolls horizontally on very small screens when needed
  - Keeps a proper table look on all screen sizes
- **Infinite scrolling**
  - Uses `@tanstack/react-query` `useInfiniteQuery` to load more coins as you scroll
  - Spinner loader appears while additional pages are being fetched
- **Coin detail modal**
  - Uses Ant Design `Modal`
  - Shows richer information for the selected coin (fetched from CoinGecko)
- **Tech stack**
  - React 19 + TypeScript
  - Vite
  - Tailwind CSS
  - @tanstack/react-query
  - Ant Design (for modal & skeletons)
  - framer-motion (animations)

---

## Project Structure (Key Files)

- `src/main.tsx` – App bootstrap
- `src/App.tsx` – Top-level layout and shared state:
  - Manages `currency`, `searchTerm`, `sortMode`, and `displayMode`
  - Renders `Header` and `Market`
- `src/components/Header.tsx` – Logo + search bar + sort button + layout toggle + currency selector
- `src/components/market/Market.tsx` – Thin container that passes props into `CryptoCard`
- `src/components/market/crypto-card/CryptoCard.tsx`
  - Fetches paginated market data (via `useInfiniteQuery` and `fetchCryptos`)
  - Applies search + sort
  - Renders either cards or table based on `displayMode`
  - Handles infinite scroll and coin detail modal
- `src/hooks/useFetchCryptos.ts` – API helpers for:
  - `fetchCryptos` – market list
  - `fetchCoinDetail` – single coin detail
- `src/shared/Loader.tsx` – Reusable loading spinner

---

## Getting Started

### Prerequisites

- **Node.js** (recommended: 18+)
- **npm** (comes with Node)

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

By default Vite runs on `http://localhost:5173` (or another port if that one is busy).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

## Environment & API

This project uses the **public CoinGecko API**, so no API key or `.env` configuration is required.  
The relevant requests are in `src/hooks/useFetchCryptos.ts`.

> Note: CoinGecko has rate limits; heavy usage may hit those limits in development.

---

## Scripts

- `npm run dev` – Start Vite dev server
- `npm run build` – Type-check and build for production
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run ESLint on the project

---

## Styling & UX

- Tailwind CSS for utility-first styling
- Responsive layouts for both card and table views
- Smooth animations using framer-motion for:
  - Card/table item entrance
  - Hover interactions
- Skeleton loaders (AntD `Skeleton`) for initial load

---

## Notes & Limitations

- No authentication or user accounts
- No routing – everything happens on a single page
- Theme is fixed to light mode (no dark-mode toggle)

This README reflects the current state of the CoinLytics crypto dashboard codebase.
