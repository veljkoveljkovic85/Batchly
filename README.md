# Batchly

A web application for processing batch transfers via CSV files. Upload, validate, and manage bulk transfer operations through a guided workflow.

## Overview

Batchly streamlines batch payment and transfer processing. The home page displays a dashboard of all transactions with their current statuses, giving you a clear view of your transfer pipeline. To initiate a new batch, a dialog walks you through a simple three-step process for uploading and submitting a CSV file.

## Features

- **Transaction Dashboard** — View all transactions at a glance with real-time status indicators
- **3-Step CSV Upload Wizard** — A guided dialog that walks you through selecting, previewing, and submitting your CSV file
- **CSV Parsing & Validation** — Automatic parsing of CSV data with built-in validation powered by PapaParse
- **Status Tracking** — Monitor the state of each transaction throughout the processing lifecycle
- **Responsive UI** — Clean Material Design interface that works across devices

## Tech Stack

| Layer       | Technology                    |
| ----------- | ----------------------------- |
| Framework   | React 19                      |
| Language    | TypeScript                    |
| Build Tool  | Vite 8                        |
| UI Library  | MUI (Material UI) 7           |
| CSV Parsing | PapaParse                     |
| Linting     | ESLint + React Hooks plugin   |
| Formatting  | Prettier                      |
| Git Hooks   | Husky                         |
| Compiler    | React Compiler (Babel plugin) |

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm**

### Installation

```bash
git clone https://github.com/veljkoveljkovic85/Batchly.git
cd Batchly
npm install
```

### Development

```bash
npm run dev
```

Opens the app in development mode with hot module replacement.

### Build

```bash
npm run build
```

Compiles TypeScript and builds the production bundle.

### Preview Production Build

```bash
npm run preview
```

### Other Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `npm run lint`      | Run ESLint                        |
| `npm run typecheck` | Type-check without emitting files |
| `npm run format`    | Format code with Prettier         |
| `npm start`         | Build and serve on port 3000      |

## Project Structure

```
Batchly/
├── public/              # Static assets
├── src/                 # Application source code
├── index.html           # Entry HTML file
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.js     # ESLint configuration
└── package.json
```
