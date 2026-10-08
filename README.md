# DEVBOARD

> A responsive event discovery platform for finding tech events, workshops, and hackathons.

**Live Demo:** https://devboard-eight-pearl.vercel.app/  
**Repository:** https://github.com/LuminoZ-48/DEVBOARD

---

## Overview

DEVBOARD is a responsive frontend web application designed to make discovering technology events simpler and more engaging.

Users can browse upcoming events, search by keywords, filter by category, view detailed event information, and save events to a personal favourites collection.

The application was built with a focus on responsive design, reusable React components, reactive UI state, and a clean user experience across desktop and mobile devices.

---

## Features

- **Event Discovery** — Browse a curated collection of tech events, workshops, and hackathons.
- **Case-insensitive Search** — Find events using names, keywords, or relevant information.
- **Category Filtering** — Narrow results by event category.
- **Combined Search & Filtering** — Search and category filters work together dynamically.
- **Sorting** — Organize the event list using the available sorting controls.
- **Event Details** — Open a dedicated details view for individual events.
- **Favourites** — Add and remove events from a personal favourites collection.
- **Duplicate Prevention** — Favourites are maintained without duplicate entries.
- **Persistent Favourites** — Favourite state is preserved using browser local storage.
- **Dark/Light Theme** — Switch between themes with persisted preference.
- **Loading State** — Includes an initial loading experience for smoother presentation.
- **Empty & No-results States** — Clear feedback when filters or searches return no events.
- **Responsive Design** — Designed for desktop, tablet, and mobile screen sizes.

---

## Tech Stack

- **React**
- **Vite**
- **JavaScript (ES Modules)**
- **CSS**
- **Browser Local Storage**
- **Git & GitHub**
- **Vercel**

---

## Project Structure

```text
DEVBOARD/
├── public/
│   ├── devboard-icon.svg
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EventCard.jsx
│   │   ├── EventDetails.jsx
│   │   ├── EventGrid.jsx
│   │   ├── FavouritesView.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── Navbar.jsx
│   │
│   ├── data/
│   │   └── events.js
│   │
│   ├── hooks/
│   │   └── useDevboard.js
│   │
│   ├── utils/
│   │   └── eventHelpers.js
│   │
│   ├── styles/
│   │   └── components.css
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Component Architecture

DEVBOARD follows a modular component-based structure rather than placing the entire interface inside a single component.

Key responsibilities are separated across:

- `Navbar` — navigation, favourites access, and theme controls
- `Hero` — primary search experience
- `FilterBar` — category and sorting controls
- `EventGrid` — event collection and result states
- `EventCard` — reusable event presentation
- `EventDetails` — detailed event information
- `FavouritesView` — saved-event experience
- `Footer` — application footer
- `useDevboard` — reusable application state and interaction logic
- `eventHelpers` — event-related utility functions

This structure keeps presentation, state, data, and utility logic separated and makes the application easier to maintain and extend.

---

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/LuminoZ-48/DEVBOARD.git
cd DEVBOARD
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Deployment

The production application is deployed using Vercel.

**Live Demo:** https://devboard-eight-pearl.vercel.app/

---

## AI-Assisted Development

AI tools were used as development assistance during the creation of DEVBOARD, including implementation support, debugging, refinement, and development iteration.

The project requirements, feature decisions, design direction, testing, review, and final validation were directed and reviewed by the developer.

AI assistance was used as a development aid rather than as a replacement for project ownership and final verification.

---

## Project Status

**Completed and deployed.**

The deployed application has been tested against the core event discovery, search, filtering, details, favourites, and responsive user flows.

---

## Author

**Manish Kumar Pradhan**

GitHub: https://github.com/LuminoZ-48