# Deploying OopsAI

This guide covers hosting with **Render** (backend) + **Vercel** (frontend) — both have free tiers.

---

## Overview

| Part | Host | Free Tier |
|------|------|-----------|
| Backend (Node.js) | Render | Yes — sleeps after inactivity |
| Frontend (React) | Vercel | Yes |

---

## Step 1: Deploy Backend to Render

1. **Push your code to GitHub** (if not already).

2. Go to [render.com](https://render.com) and sign up with GitHub.

3. **New** → **Web Service**.

4. Connect your repo and configure:
   - **Name:** `oopsai-api` (or any name)
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. **Environment Variables** (add these):
   | Key | Value |
   |-----|-------|
   | `OPENAI_API_KEY` | Your OpenAI API key |
   | `FRONTEND_URL` | `https://your-app.vercel.app` *(add after Step 2)* |

6. Click **Create Web Service**.

7. After deployment, copy your backend URL (e.g. `https://oopsai-api.onrender.com`).

---

## Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.

2. **Add New** → **Project** → import your repo.

3. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)

4. **Environment Variables** (add this):
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://your-render-url.onrender.com` *(from Step 1)* |

5. Click **Deploy**.

6. Copy your frontend URL (e.g. `https://oopsai.vercel.app`).

---

## Step 3: Update Backend CORS

1. Go back to **Render** → your web service → **Environment**.

2. Edit `FRONTEND_URL` and set it to your **Vercel URL** (e.g. `https://oopsai.vercel.app`).

3. Save. Render will redeploy automatically.

---

## Done

Your app is live. The frontend will call the backend using `VITE_API_URL`.

---

## Render Free Tier Notes

- **Spins down** after ~15 minutes of no requests.
- **First request** after sleep can take 30–60 seconds (cold start).
- Consider upgrading or using Railway/Railway.app if you need always-on.

---

## Alternative: Deploy Both on Railway

[Railway](https://railway.app) can host both frontend and backend:

1. Create a new project, add your GitHub repo.
2. Add two services: one for `server`, one for `client`.
3. Set env vars for each. Use the backend URL as `VITE_API_URL` for the frontend service.
