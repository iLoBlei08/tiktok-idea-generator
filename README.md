# TikTok Idea Generator 🎬

An AI-powered web app that generates creative TikTok video ideas using Google's Gemini AI. Built with React (frontend) and Node.js/Express (backend).

---

## What it does

Users fill out a short form with their niche, tone, video length, and how many ideas they want. The app calls Gemini via a secure backend and returns a set of structured video ideas — each with an opening hook, a narrative structure, and a suggested call-to-action.

---

## Features

- **Idea generation** — Input your niche, tone, and video duration to get tailored TikTok concepts
- **Structured output** — Each idea includes a hook, content structure, and call-to-action
- **Saved ideas** — Bookmark your favorite ideas locally using localStorage
- **History** — Browse your previous generation sessions and their results
- **Secure API calls** — The Gemini API key is never exposed to the browser

---

## Screens

| Screen | Description |
|---|---|
| Generator | Form to configure your idea generation (niche, tone, duration, quantity) |
| Results | Cards displaying each generated idea |
| Saved | Collection of bookmarked ideas |
| History | Log of past generation sessions |

---

## Tech stack

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for navigation
- [TailwindCSS](https://tailwindcss.com/) for styling

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [Google Generative AI SDK](https://github.com/google/generative-ai-js) for Gemini API calls
- `dotenv` for environment variable management
- `cors` for cross-origin requests

---

## Project structure
tiktok-idea-generator/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Generator.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── Saved.jsx
│   │   │   └── History.jsx
│   │   ├── components/
│   │   │   └── IdeaCard.jsx
│   │   └── App.jsx
│   └── package.json
│
└── backend/
├── routes/
│   └── generate.js
├── prompts/
│   └── builder.js
├── index.js
├── .env.example
└── package.json

---

## How it works

1. User fills out the form on the React frontend
2. React sends a `POST /generate` request to the Express backend
3. The backend builds a structured prompt using the user's parameters
4. The backend calls the Gemini API securely (API key stays on the server)
5. Gemini returns a list of ideas in JSON format
6. The backend forwards the response to the frontend
7. React renders the ideas as cards

---

## Getting started

### Prerequisites
- Node.js v18+
- A [Google Gemini API key](https://aistudio.google.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/tiktok-idea-generator.git
cd tiktok-idea-generator

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment setup

```bash
# In the /backend folder, create a .env file
cp .env.example .env
# Then open .env and add your Gemini API key
```

`.env` file:
GEMINI_API_KEY=your_api_key_here
PORT=3001

### Run the app

```bash
# Terminal 1 — start the backend
cd backend
npm run dev

# Terminal 2 — start the frontend
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key (required) |
| `PORT` | Port for the Express server (default: 3001) |

---

## Roadmap

- [ ] User authentication
- [ ] Export ideas to PDF or Notion
- [ ] Tone presets (educational, humorous, inspirational)
- [ ] Multi-language support

---

## License

MIT