# 💪 Training Plan — Push / Pull / Legs / Whole Body PWA

A self-contained, offline-capable training tracker built as a single HTML file. No backend database, no account, no build step — just a Progressive Web App you add to your phone's Home Screen and use like a native app.

Track your lifts, log every session, watch your body composition and strength trend over time, and get a push notification when your rest timer runs out — even if the app isn't open.

> **Built entirely on an iPhone.** No laptop, no desktop, no code editor. Every line was written, tested, and shipped from a phone, in collaboration with [Claude](https://claude.ai) (Anthropic).

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Push Notification Server (optional)](#push-notification-server-optional)
- [Usage Guide](#usage-guide)
- [Data & Privacy](#data--privacy)
- [Architecture Notes](#architecture-notes)
- [Known Limitations](#known-limitations)
- [Updating the App](#updating-the-app)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## Overview

This app is a 4-day training program tracker (**Push / Pull / Legs / Whole Body**) with per-exercise weight tracking, a training calendar, body measurement logging, progress charts, and a home dashboard — all running client-side in the browser, with data stored locally on your device.

It's designed to be installed as a **Progressive Web App (PWA)**: add it to your Home Screen once, and it opens full-screen like a native app, works offline, and can send you a push notification when a rest timer finishes.

---

## Features

### 🏋️ Training Tabs (Push / Pull / Legs / Whole Body)
- Four training days, each with a sequence of exercises grouped by muscle/movement.
- Every exercise slot supports **swipeable alternatives** — swipe or use the arrows to switch between variations (e.g. Barbell Bench Press ↔ Dumbbell Bench Press ↔ Cable Chest Press).
- Per-exercise tracking:
  - **LT** — Last Training weight
  - **SB** — Season Best
  - **PB** — Personal Best (with a "since \<date\>" label showing how long the record has stood)
  - **↑ Increase** — a flag you set to remind yourself to add weight next session; clears automatically once you log a heavier LT
- A round **⏱️ rest timer** per exercise — keeps counting even if you switch tabs or background the app, and beeps at 30 seconds remaining and at zero.
- **💪 Done** button on the last exercise of a session logs the whole workout straight to the calendar, with a matching-colour confetti celebration.
- **Whole Body is special**: every exercise there is a *live link* to one already defined in Push, Pull, or Legs — not a separate copy. Logging a weight, editing notes, or updating Tips updates it everywhere at once. Adding an alternative to Whole Body opens a picker of your existing exercises instead of a blank form.
- A shared **Abs** section appears at the end of every training day and is synchronized across all four — edit it once, it updates everywhere.

### ✏️ Exercise Editing
- **Edit** any exercise's name, notes, sets, reps, rest time, and type (Compound / Isolation / Finisher / Abs).
- **Add Alternative** to expand any slot with a new variation.
- Delete an exercise from its home day, or just *unlink* it from Whole Body without affecting the original.

### 💡 Tips
- Full-screen view per exercise with LT/SB/PB, the rest timer, and a rich-text notes editor (bold, underline, bullet lists).
- Every exercise ships with **pre-written, detailed form guidance** — training parameters (sets/reps/intensity/rest) and technique cues — fully editable or replaceable with your own notes.
- Optional YouTube link field for a form-check video.
- Two mini **SB / PB progress charts** (last 12 months) — tap either to enlarge, then swipe or use the arrows to page back through earlier periods. Faint dashed lines at the chart edges hint at data in neighbouring periods.

### 📅 Calendar
- Log a completed session or plan a future one by tapping any day.
- Planned days show a dashed outline; past-due plans can be marked Done or cancelled.
- Mark any session as a **Deload** week (shown with a small red dot on the calendar).
- Swipe left/right across the calendar grid to move between months.
- The entry list below the calendar supports swipe-to-edit and swipe-to-delete.

### 📏 Body Stats
- Log waist, chest, biceps, shoulders, hips, thigh, weight, and body fat %.
- Up to 3 progress photos per entry (front / side / back), sourced from camera or photo library, automatically compressed to keep storage small.
- Year-by-year history view with full edit/delete support.

### 📈 Charts
Six data views, all swipeable to page through history, with a **↩ Today** shortcut when you've navigated away from the current period:
- **Body Measurement Trends** — one line chart per measurement, last 12 months.
- **Weight & Body Fat** — both plotted together on a dual y-axis.
- **Training Type Breakdown** — pie chart of session types.
- **Weekly Training Frequency** — bar chart, colour-coded by session type.
- **New SB / PB per Month** — how frequently you're setting new records.
- **Deload Timeline** — when deload weeks were taken.

### 🖼️ Dashboard (home screen)
- Last completed session and next planned one (tap to jump straight to that tab), each showing how long ago / how soon.
- Weekly consistency streaks (weeks with 3+ and 2+ sessions in a row).
- Weeks since your last deload.
- Total training days logged, with a yearly consistency ring.
- Weekly training frequency chart.
- Three leaderboards: longest-standing **Increase** flags, and exercises furthest overdue for a new **SB** or **PB** — each row shows the training day, position in the session, exercise type, weight, and time elapsed.

### 🥗 Diet
- Katch-McArdle based daily calorie and macro targets from your age, weight, height, body fat %, and activity level.
- Separate targets for maintenance, lean bulk, and cut.

### ⚙️ Settings
- **📜 Record Log** — every SB and PB you've ever set, newest first, 20 per page. Swipe a row right to edit its weight/date or left to delete it; the exercise's current record recalculates automatically from what remains.
- **Export** — all data, or just exercises, calendar, or body stats — as a JSON file.
- **Import** — restore from any of the above exports.
- **Clear** — wipe specific data (e.g. just SB records) without resetting everything.

### 🔔 Notifications & Offline
- Works fully offline once added to the Home Screen (Service Worker caching).
- Keeps the screen awake during an active session (Screen Wake Lock).
- Rest-timer alerts arrive as real push notifications even when the app is closed, via a small relay server + [ntfy.sh](https://ntfy.sh).

---

## Tech Stack

No frameworks, no build step, no package manager for the app itself.

- **HTML / CSS / vanilla JavaScript** — the entire app is one `index.html` file.
- **SVG** — all charts (line, bar, pie) are hand-drawn SVG, generated client-side.
- **Web Audio API** — timer beeps.
- **Service Worker** — offline caching (`sw.js`).
- **localStorage** — all app data lives on-device; nothing is sent to a server except the optional rest-timer push notification.
- **Node.js (`http`/`https` only, no dependencies)** — the tiny push-notification relay server.

## Project Structure

```
.
├── index.html                    # the entire app (rename from plan_serie_powtorzenia.html)
├── sw.js                         # Service Worker — offline caching
├── apple-touch-icon.png          # 512×512 Home Screen icon
├── apple-touch-icon-180.png      # 180×180 Home Screen icon
├── server.js                     # push notification relay (deploy separately)
└── package.json                  # server dependencies (none — Node built-ins only)
```

The app and the notification server are two **separate deployments**:

| Component | Where it runs | Purpose |
|---|---|---|
| `index.html` + `sw.js` + icons | GitHub Pages (or any static host) | The app itself |
| `server.js` + `package.json` | Render.com (or any Node host) | Schedules and relays rest-timer push notifications |

---

## Getting Started

### 1. Deploy the app

1. Create a GitHub repository (e.g. `Training-App`).
2. Upload `index.html` (renamed from `plan_serie_powtorzenia.html`), `sw.js`, `apple-touch-icon.png`, and `apple-touch-icon-180.png` to the repo root.
3. Enable **GitHub Pages** for the repo (Settings → Pages → deploy from the main branch).
4. Your app is now live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Add it to your Home Screen (iOS)

1. Open the deployed URL in **Safari**.
2. Tap the Share icon → **Add to Home Screen**.
3. Launch it from the Home Screen icon — it now runs full-screen, like a native app, with offline support.

### 3. Update the app defaults for your own use

The default program (exercises, sets/reps/rest, tips content) is defined directly in `index.html` under `DEFAULT_EXERCISES`. Edit it before your first launch to start with your own program, or just use the in-app **Edit** / **Add Alternative** tools after installing.

---

## Push Notification Server (optional)

Rest-timer alerts work without this — they just won't survive the app being fully closed. To get real push notifications:

1. Create a **new** GitHub repository (e.g. `training-push-server`) containing only `server.js` and `package.json`.
2. Deploy it to [Render.com](https://render.com) (free tier) as a Web Service — Render auto-detects the Node app via `package.json`.
3. In `index.html`, confirm the `NTFY_URL` / relay endpoint (in the notification-scheduling functions) points at your deployed Render URL.
4. Install the **ntfy** app on your phone and subscribe to the topic name used in `index.html` (`NTFY_TOPIC`).
5. In iOS Settings → Notifications → ntfy, make sure **Sounds** and **Haptics** are enabled — that's what actually makes the phone buzz/beep, controlled by the OS, not the app.

> **Free tier note:** Render's free plan sleeps after inactivity and can take 30–50 seconds to wake up. The app pings the server on launch to pre-warm it, so this is rarely an issue in normal use.

---

## Usage Guide

New here? The app has a full **ℹ️ About** page (bottom navigation, paired with Settings) with a section-by-section walkthrough of every feature — that's the fastest way to get oriented after installing.

---

## Data & Privacy

- **Everything is stored locally** on your device, in the browser's `localStorage` — there is no account, no login, and no database.
- The **only** network requests the app itself makes are: (1) fetching its own cached files, and (2) scheduling/cancelling a rest-timer push notification through your own relay server.
- **Export regularly.** Since data lives only in the browser's local storage, clearing Safari's site data (or losing the device) means losing your history unless you've exported a backup via Settings.
- Progress photos are compressed client-side before storage and never leave the device unless you explicitly export your data.

---

## Architecture Notes

A few non-obvious decisions worth knowing if you're extending this:

- **Shared Abs section** — the last exercise group on every training day uses one shared identifier (`shared-abs`) so weights, tips, and edits sync across all four days without duplicating data.
- **Whole Body = references, not copies** — Whole Body's exercise slots don't own their own data; each alternative is a `{day, groupId, altIdx}` reference into Push/Pull/Legs. This is what keeps everything in sync automatically, and is also why deleting a *source* exercise repairs any dangling Whole Body references (shifting or removing them), while deleting from *within* Whole Body only removes the link.
- **SB / PB history** — beyond the current best, every SB and PB ever recorded is kept in an append-only log (`sbHistory` / `pbHistory`) per exercise. This powers the progress charts and the Settings Record Log, and survives resets of the "current" value.
- **Service Worker cache versioning** — `sw.js` uses a cache-first strategy keyed by a version string (`const CACHE = 'training-vN'`). Because the Service Worker only re-installs when its own file changes byte-for-byte, **you must bump this version number on every deploy** or users will keep seeing a stale cached copy of the app.

---

## Known Limitations

These are iOS/WebKit platform constraints, not bugs:

- **No vibration API** — iOS Safari has never implemented `navigator.vibrate()`. Any haptic feedback you feel comes from the OS handling a real push notification, not from the web app itself.
- **No custom sound while backgrounded** — iOS suspends a page's audio and JavaScript execution when it's not the active tab/app. The push-notification relay server exists specifically to work around this for rest-timer alerts.
- **Tapping a notification opens Safari, not the installed app** — iOS routes notification taps through the browser, which may use a separate storage context from the Home Screen app. There's currently no reliable way around this; the notification's tap target has been left unset for that reason (it still alerts you, you just return to the app manually).

---

## Updating the App

1. Edit `index.html` (and `sw.js` if you touch caching behaviour).
2. **Always bump the cache version** in `sw.js` (`training-vN` → `training-vN+1`) — otherwise your changes won't reach anyone with the app already installed.
3. Push both files to your GitHub Pages repo.
4. Existing installs pick up the update automatically the next time they're online; a full refresh (remove + re-add to Home Screen) guarantees it immediately.

---

## Contributing

This started as a personal project, but issues and pull requests are welcome if you'd like to extend it — new exercise types, additional chart views, or platform-specific fixes are all fair game.

## License

Open source — free to use, modify, and redistribute. If you fork this for your own training program, a credit back to this repo is appreciated but not required.

## Credits

Designed and built by **Marcin Zająkała** (Poland), in collaboration with **Claude** (Anthropic) — describing what to build and refining it conversation by conversation, with Claude writing all of the code. Built entirely with free tools: GitHub Pages, Render.com's free tier, [ntfy.sh](https://ntfy.sh), and Documents by Readdle for on-device testing.

Get in touch: [LinkedIn](https://www.linkedin.com/in/marcin-zajakala)
