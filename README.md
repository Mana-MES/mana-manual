# Mana MES User Manual

A comprehensive, modern, and fully localized user manual website for Mana MES (Manufacturing Execution System).

## Features

- 🌐 **Bilingual Support**: Full Thai and English translation with language switcher
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, professional design matching Mana MES brand identity
- 📚 **Comprehensive Tutorials**: Step-by-step guides for:
  - System Overview
  - Master Data Setup
  - Running Production
  - Monitoring Performance
  - Editing Data

## Tech Stack

- **HTML5** with semantic markup
- **Tailwind CSS** for styling
- **Vanilla JavaScript** for interactivity and i18n
- **Vite** for development and building

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mana_manual_web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
mana_manual_web/
├── index.html              # Landing page
├── user-manual.html        # User manual index page
├── manuals/               # Tutorial pages
│   ├── 01-setup-master-data.html
│   ├── 02-running-production.html
│   ├── 03-monitoring.html
│   ├── 04-editing-data.html
│   └── 05-system-overview.html
├── artwork/               # Images and graphics
├── IBM_Plex_Sans_Thai/   # Thai font files
└── vite.config.js         # Vite configuration
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy.

## Brand Colors

- Primary Orange: `#FF7825`
- Dark Background: `#070711`
- Dark Blue: `#28334E`
- Light Background: `#EFF3FD`

## License

Private - Mana MES
