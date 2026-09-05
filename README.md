# Happy Birthday Risha 🎂✨

A cosmic, story-driven birthday surprise website built with React, Vite, Framer Motion, and Tailwind CSS.

## Project Structure

```
risha-birthday/
├── public/
│   └── images/
│       ├── risha1.jpg    ← Memory stop 1
│       ├── risha2.jpg    ← Memory stop 2
│       ├── risha3.jpg    ← Memory stop 3
│       ├── risha4.jpg    ← Memory stop 4
│       └── risha5.jpg    ← Memory stop 5 (shown last in collage)
├── src/
│   ├── components/
│   │   └── Starfield.jsx        ← Reusable canvas starfield
│   ├── phases/
│   │   ├── Phase1Preloader.jsx  ← Baby star born in deep space (3s)
│   │   ├── Phase2Spark.jsx      ← "Let there be light" button
│   │   ├── Phase3CosmicOrigin.jsx ← Galaxy map, pick origin
│   │   ├── Phase4Journey.jsx    ← 5 polaroid stops with messages
│   │   ├── Phase5SolarSystem.jsx ← Solar system, click Earth
│   │   ├── Phase6Landing.jsx    ← Tap star 3x to crack & shatter
│   │   ├── Phase7Shatter.jsx    ← Photo collage + particle emojis
│   │   └── Phase8Finale.jsx     ← Birthday cake + confetti finale
│   ├── App.jsx                  ← Phase state machine
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── .nvmrc
```

## Setup & Run

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm (comes with Node.js)

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:5173

### Build for Production
```bash
npm run build
```
Output is in `/dist` folder.

### Preview Build
```bash
npm run preview
```

## Deploying to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push this folder to a GitHub/GitLab repo
2. Go to https://vercel.com/new
3. Import your repo
4. Vercel auto-detects Vite — click Deploy!

## Customizing the Images

The 5 Risha images are stored in `/public/images/`. To replace them:
1. Put your new images in that folder
2. Name them `risha1.jpg` through `risha5.jpg`
   - risha1.jpg through risha4.jpg appear in Phase 4 (journey stops)
   - risha5.jpg appears last, at stop 5 of the journey AND in the Phase 7 collage
3. Run `npm run build` again

## Phases Overview

| Phase | Name | Interaction |
|-------|------|-------------|
| 1 | Preloader | Auto (3 sec) |
| 2 | The Spark | Click "Let there be light" |
| 3 | Cosmic Origin | Click any galaxy |
| 4 | The Journey | 5 polaroid stops, click "Continue Journey" |
| 5 | Solar System | Click Earth |
| 6 | The Landing | Tap star fragment 3 times |
| 7 | The Shatter | Tap anywhere for emoji particles, wait for "Reveal Final Surprise" (14s) |
| 8 | The Finale | Click the candle flame to blow it out |

## Tech Stack
- ⚛️ React 18
- ⚡ Vite 5
- 🎞️ Framer Motion 11
- 🎨 Tailwind CSS 3
- 📦 Vercel-ready (`vercel.json` included)
