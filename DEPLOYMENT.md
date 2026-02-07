# Deploying OopsAI

You can host everything on **Render** — both frontend and backend.

---

## Option A: Both on Render (Recommended)

| Part | Type | Free Tier |
|------|------|-----------|
| Backend (Node.js) | Web Service | Yes — sleeps after inactivity |
| Frontend (React) | Static Site | Yes |

---

### Step 1: Deploy Backend

1. Push your code to **GitHub**.

2. Go to [render.com](https://render.com) → sign up with GitHub.

3. **New** → **Web Service**.

4. Connect your repo and configure:
   - **Name:** `oopsai-api`
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. **Environment Variables:**
   | Key | Value |
   |-----|-------|
   | `OPENAI_API_KEY` | Your OpenAI API key |
   | `FRONTEND_URL` | Set after Step 2 — e.g. `https://oopsai.onrender.com` |

6. Click **Create Web Service**.

7. Copy your backend URL (e.g. `https://oopsai-api.onrender.com`).

---

### Step 2: Deploy Frontend (Static Site on Render)

1. In the same Render dashboard: **New** → **Static Site**.

2. Connect the **same** repo and configure:
   - **Name:** `oopsai` (or any name — this becomes your URL)
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

3. **Environment Variables** (important — add before first deploy):
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://oopsai-api.onrender.com` *(your backend URL from Step 1)* |

4. Click **Create Static Site**.

5. Copy your frontend URL (e.g. `https://oopsai.onrender.com`).

---

### Step 3: Update CORS

1. Go to your **backend** service → **Environment**.

2. Set `FRONTEND_URL` to your **frontend URL** (e.g. `https://oopsai.onrender.com`).

3. Save. Render redeploys automatically.

---

## Done

Both are on Render. Open your frontend URL to use the app.

---

## Render Free Tier Notes

- Backend **spins down** after ~15 minutes of inactivity.
- **First request** after sleep can take 30–60 seconds (cold start).
- Static site stays up — no spin-down.

---

## Option B: Render (Backend) + Vercel (Frontend)

If you prefer Vercel for the frontend:

1. Deploy backend on Render (Step 1 above).
2. Deploy frontend on [vercel.com](https://vercel.com): root dir `client`, add `VITE_API_URL` = backend URL.
3. Set `FRONTEND_URL` on Render to your Vercel URL.
