# ML Interview Prep — Deployment Guide

## ⚠️  BEFORE ANYTHING: Rotate your API key
Your old key was exposed. Go to https://console.anthropic.com → API Keys → delete the old key → create a new one.

---

## Deploy to Vercel (step by step)

### Step 1 — Push to GitHub
```bash
cd prep-app
git init
git add .
git commit -m "initial"
# Create a repo at github.com (click + → New repository → name it "ml-interview-prep")
git remote add origin https://github.com/YOUR_USERNAME/ml-interview-prep.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to **https://vercel.com** → sign in with GitHub
2. Click **"Add New Project"**
3. Select your **ml-interview-prep** repository
4. Framework: **Next.js** (auto-detected)
5. Click **"Deploy"** — do NOT deploy yet, first add the env var below

### Step 3 — Add your API key (CRITICAL)
Before clicking final Deploy:
1. In the Vercel deploy screen, click **"Environment Variables"**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-YOUR_NEW_KEY_HERE`
   - **Environment:** Production ✓ Preview ✓ Development ✓
3. Click **"Add"**
4. Now click **"Deploy"**

Your site will be live at `https://ml-interview-prep-xyz.vercel.app` in ~60 seconds.

---

## Run locally
```bash
npm install
# Edit .env.local and add your new API key
npm run dev
# Open http://localhost:3000
```

---

## Update content later
```bash
git add .
git commit -m "update notes"
git push
# Vercel auto-redeploys in ~30 seconds
```

---

## Project structure
```
prep-app/
├── pages/
│   ├── _app.js          # global styles + fonts
│   ├── index.js         # full app (all pages, all components)
│   ├── data.js          # all content (notes, Q&A, projects, etc.)
│   └── api/
│       └── generate.js  # Claude API route (key stays server-side)
├── .env.local           # YOUR API KEY — never committed
├── .gitignore           # ensures .env.local is never pushed
├── next.config.js
└── package.json
```

---

## Security
- The API key lives ONLY in Vercel's environment variables (encrypted at rest)
- The `/api/generate` route calls Anthropic from the server — the key is never sent to the browser
- `.env.local` is in `.gitignore` — it will never be committed
