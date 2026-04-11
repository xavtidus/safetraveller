# Safe Traveller

A practical demo Node.js single-page web application that models the concept of destination-based travel safety advisories, inspired by the Australian Government's [smarttraveller.gov.au](https://www.smarttraveller.gov.au) service.

> **Disclaimer** — This project is an independent technical demonstration built for learning and portfolio purposes. It is **not** affiliated with, endorsed by, or connected to the Australian Department of Foreign Affairs and Trade (DFAT), Smartraveller, or the Australian Government. All advisory data is **fictitious and for illustrative purposes only**. The Smartraveller name and service are the property of the Australian Government. No infringement of intellectual property or trademarks is intended.

## Purpose

Safe Traveller demonstrates how a modern React SPA can present travel safety information in a user-friendly way. It showcases:

- A four-tier advisory system (Normal → Do Not Travel) applied to 180+ cities
- Searchable, filterable destination listings with card and table views
- Detailed destination pages with risk assessments, safety tips, health info, transport guidance, and emergency contacts
- Responsive design that works across desktop, tablet, and mobile
- Material UI theming and component patterns

All destination data and safety guidance is **mocked** — it does not reflect real-world conditions and must not be used for actual travel planning.

## Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Runtime      | Node.js 18+                     |
| Framework    | React 19                        |
| Build Tool   | Vite 8                          |
| UI Library   | Material UI 9 (with Emotion)    |
| Routing      | React Router 7                  |
| Language     | JavaScript (ES Modules)         |

## Prerequisites

- **Node.js** 18 or later — [download](https://nodejs.org/)
- **npm** (ships with Node.js)

## Getting Started

```bash
# 1. Clone the repository
git clone git@github.com:xavtidus/safetraveller.git
cd safetraveller

# 2. Install dependencies
cd webapp
npm install

# 3. Start the development server
npm run dev
```

Vite will start a local dev server (typically at `http://localhost:5173`). Changes to source files are reflected instantly via hot module replacement.

## Available Scripts

Run these from the `webapp/` directory:

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the Vite development server with HMR       |
| `npm run build`     | Create an optimised production build in `dist/`   |
| `npm run preview`   | Serve the production build locally for testing    |
| `npm run lint`      | Run ESLint across the project                     |

## Project Structure

```
webapp/
├── public/              # Static assets
├── src/
│   ├── components/      # Shared UI components (Layout, etc.)
│   ├── data/            # Mock destination data and advisory levels
│   ├── pages/           # Route-level page components
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationDetail.jsx
│   │   ├── Safety.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── utils/           # Helpers (gradient card styles, etc.)
│   ├── App.jsx          # Route definitions
│   ├── main.jsx         # Entry point
│   └── theme.js         # MUI theme configuration
├── index.html
├── package.json
└── vite.config.js
```

## Licence

This project is provided as-is for educational and demonstration purposes.
