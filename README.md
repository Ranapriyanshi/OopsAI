# OopsAI

**Ultimate Excuse Generator** — AI-powered app to generate believable excuses for any scenario.

Built with **React** (frontend), **Node.js** (backend), and **OpenAI API** (AI).

---

## Project Structure

```
OopsAI/
├── client/          # React + Vite frontend
├── server/          # Node.js + Express backend
└── README.md
```

---

## Setup

### 1. Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file (copy from `.env.example`):

```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

### 2. Frontend (Client)

```bash
cd client
npm install
```

---

## Run

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

- Enter any scenario (e.g., "missed a work meeting")
- Quick-pick common scenarios
- Choose tone: Casual, Formal, Humorous, Creative
- Get 1–5 excuse options
- Copy any excuse to clipboard
- Dark / light mode toggle

---

## Deploy

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for hosting on Vercel + Render.
