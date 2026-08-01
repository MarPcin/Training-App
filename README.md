# 💪 Training Plan — Push / Pull / Legs PWA

A self-contained, offline-capable training tracker built as a single HTML file. No backend database, no account, no build step — just a Progressive Web App you add to your phone's Home Screen and use like a native app.

Track your lifts, log every session, watch your body composition and strength trend over time, earn achievement badges as you go, and get push notifications for rest timers and measurement reminders — even if the app isn't open.

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

This app is a 4-day training program tracker (**Push / Pull / Legs / Whole Body**) with per-exercise weight tracking, a training calendar, body measurement logging, progress charts, a diet calculator, a home dashboard, and a full achievement/badge system — all running client-side in the browser, with data stored locally on your device.

It's designed to be installed as a **Progressive Web App (PWA)**: add it to your Home Screen once, and it opens full-screen like a native app, works offline, and can send you push notifications for rest timers and periodic measurement reminders.

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
- A small **roman numeral set counter** (II, III, IV…) appears next to Increase while a timer runs, counting which set you're about to perform. It follows you if you start a timer on a different exercise, and clears when the session ends.
- **💪 Done** button on the last exercise logs the session to the calendar and opens a **session summary**: an estimated volume range from the exercises you actually timed, any new SB/PB records, and anything flagged with Increase — plus a matching-colour confetti celebration.
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
- Mark any session as a **Deload** week (shown with a small 🔻 on the calendar).
- **🥗 No Cheat Meal** — two checkboxes: one for a clean day where you also trained, and one for a clean day with no training at all. Checking the training-less option grays out the training type and deload fields and lets you log the day without picking a session type — the only way to log a day with no training assigned. Either variant marks the day with a small 🥗 on the calendar and in the entry list.
- Swipe left/right across the calendar grid to move between months.
- The entry list below the calendar supports swipe-to-edit and swipe-to-delete.

### 📏 Body Stats
- Log waist, chest, biceps, shoulders, hips, thigh, weight, and body fat %.
- Up to 3 progress photos per entry (front / side / back), sourced from camera or photo library, automatically compressed to keep storage small.
- Logging every field plus all 3 photos starts a **24-day reminder countdown** — the next time you open the app on or after day 24, you get a push notification nudging you to measure again. Logging another full entry restarts the countdown.
- Year-by-year history view with full edit/delete support.

### 📈 Charts
Eight data views, all swipeable to page through history, with a **↩ Today** shortcut when you've navigated away from the current period:
- **Body Measurement Trends** — one line chart per measurement, last 12 months.
- **Weight & Body Fat** — both plotted together on a dual y-axis.
- **Progress Photos** — compare any two photos side by side, defaulting to your oldest and newest front-on shots; tap either to swap in a different one from any Body Stats entry.
- **Training Type Breakdown** — pie chart of session types.
- **Weekly Training Frequency** — bar chart, colour-coded by session type.
- **New SB / PB per Month** — how frequently you're setting new records.
- **Clean Days per Month** — how many 🥗 No Cheat Meal days you logged.
- **Deload Timeline** — when deload weeks were taken.

### 🖼️ Dashboard (home screen)
- Last completed session and next planned one (tap to jump straight to that tab), each showing how long ago / how soon.
- Weekly consistency streaks (weeks with 3+ and 2+ sessions in a row).
- Weeks since your last deload.
- Total training days logged, with a yearly consistency ring.
- Weekly training frequency chart.
- **🛡️ Badges** progress bar — tap it to jump straight to your Profile.
- **🥗 Clean Diet Days** — current streak and lifetime total, side by side.
- Three leaderboards: longest-standing **Increase** flags, and exercises furthest overdue for a new **SB** or **PB** — each row shows the training day, position in the session, exercise type, weight, and time elapsed. Tap any row to jump straight to that exercise.

### 🥗 Diet
- **Clean Diet Days** streak and total shown right at the top.
- Katch-McArdle based daily calorie and macro targets from your age, weight, height, body fat %, and activity level — separate targets for maintenance, lean bulk, and cut.
- Weight and body fat **auto-fill from your latest Body Stats entry**, and a banner offers to update your targets if your Body Stats have since drifted from what you last calculated with.
- A **Clean Days per month** chart.
- A **💊 Supplementation Guide** — dosing and a plain-language explanation for eight commonly used supplements (creatine, whey protein, caffeine, vitamin D3, omega-3, magnesium, beta-alanine, citrulline malate). General reference info, not medical advice.

### 🎖️ Profile & Achievements
- Tap the round avatar in the header to open your Profile.
- Set a **nickname** (type it, tap the ✓ that appears, or hit Enter) and pick an **avatar** — a coloured preset or your own photo from camera/library, with a remove option.
- An **Accent Color** picker swaps the app's orange highlight for one of seven other colours; training-type, chart, and badge-category colours stay fixed on purpose, so nothing becomes ambiguous.
- **55 badges** across 8 categories — Training Consistency, Planning, Strength Milestones, Perfect Rests, Discipline, Body Tracking, Personalization, and Clean Eating. Locked badges show a live progress count (e.g. "62/100") so the goal is always visible; unlocked ones glow in their category colour.
- Badges **pop up the moment you earn them**, wherever you are in the app — not just when you happen to open your Profile. Tap any badge for its full description and unlock date.

### ⚙️ Settings
- **📜 Record Log** — every SB and PB you've ever set, newest first, 20 per page with jump-to-page. Swipe a row right to edit its weight/date or left to delete it; the exercise's current record recalculates automatically from what remains.
- **Export** — all data, or just exercises, calendar, or body stats — as a JSON file.
- **Import** — restore from any of the above exports.
- **Clear by section** — wipe specific data (exercises, weights, SB only, calendar, body stats, or every unlocked badge) without resetting everything else.

### 🔔 Notifications & Offline
- Works fully offline once added to the Home Screen (Service Worker caching).
- Keeps the screen awake during an active session (Screen Wake Lock).
- Rest-timer alerts arrive as real push notifications even when the app is closed, via a small relay server + [ntfy.sh](https://ntfy.sh).
- A separate reminder nudges you to re-measure 24 days after a full Body Stats entry, delivered the next time you open the app on or after that day (see [Known Limitations](#known-limitations) for why it isn't delivered exactly on day 24 while the app is closed).

### ✨ Interface polish
- A subtle press-and-spring **tap animation** on every button and interactive tile, plus smooth fade/slide transitions on every popup — small details that add up to a more "native app" feel.

---

## Tech Stack

No frameworks, no build step, no package manager for the app itself.

- **HTML / CSS / vanilla JavaScript** — the entire app is one `index.html` file.
- **SVG** — all charts (line, bar, pie) are hand-drawn SVG, generated client-side.
- **Web Audio API** — timer beeps.
- **Service Worker** — offline caching (`sw.js`).
- **localStorage** — all app data lives on-device; nothing is sent to a server except the optional push notifications (rest-timer and measurement reminder).
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
| `server.js` + `package.json` | Render.com (or any Node host) | Schedules and relays push notifications (rest timers and measurement reminders) |

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

Rest-timer and reminder alerts work without this — they just won't survive the app being fully closed. To get real push notifications:

1. Create a **new** GitHub repository (e.g. `training-push-server`) containing only `server.js` and `package.json`.
2. Deploy it to [Render.com](https://render.com) (free tier) as a Web Service — Render auto-detects the Node app via `package.json`.
3. In `index.html`, confirm the `NTFY_URL` / relay endpoint (in the notification-scheduling functions) points at your deployed Render URL.
4. Install the **ntfy** app on your phone and subscribe to the topic name used in `index.html` (`NTFY_TOPIC`).
5. In iOS Settings → Notifications → ntfy, make sure **Sounds** and **Haptics** are enabled — that's what actually makes the phone buzz/beep, controlled by the OS, not the app.

> **Free tier note:** Render's free plan sleeps after inactivity and can take 30–50 seconds to wake up. The app pings the server on launch to pre-warm it, so this is rarely an issue for rest timers in normal use. It's also why the measurement reminder is checked client-side on app open rather than scheduled 24 days in advance — see [Known Limitations](#known-limitations).

---

## Usage Guide

New here? The app has a full **ℹ️ About** page (bottom navigation, paired with Settings) with a section-by-section walkthrough of every feature — that's the fastest way to get oriented after installing.

---

## Data & Privacy

- **Everything is stored locally** on your device, in the browser's `localStorage` — there is no account, no login, and no database.
- The **only** network requests the app itself makes are: (1) fetching its own cached files, and (2) scheduling/cancelling a push notification (rest timer or measurement reminder) through your own relay server.
- **Export regularly.** Since data lives only in the browser's local storage, clearing Safari's site data (or losing the device) means losing your history unless you've exported a backup via Settings.
- Progress photos (and your avatar photo, if you set one) are compressed client-side before storage and never leave the device unless you explicitly export your data.

---

## Architecture Notes

A few non-obvious decisions worth knowing if you're extending this:

- **Shared Abs section** — the last exercise group on every training day uses one shared identifier (`shared-abs`) so weights, tips, and edits sync across all four days without duplicating data.
- **Whole Body = references, not copies** — Whole Body's exercise slots don't own their own data; each alternative is a `{day, groupId, altIdx}` reference into Push/Pull/Legs. This is what keeps everything in sync automatically, and is also why deleting a *source* exercise repairs any dangling Whole Body references (shifting or removing them), while deleting from *within* Whole Body only removes the link.
- **SB / PB history** — beyond the current best, every SB and PB ever recorded is kept in an append-only log (`sbHistory` / `pbHistory`) per exercise. This powers the progress charts, several badges, and the Settings Record Log, and survives resets of the "current" value.
- **Badges are permanent once earned** — `checkBadges()` only ever adds to the unlocked set, never removes from it, so a badge that depended on a streak (for example) stays earned even after that streak later breaks. Several badge calculations specifically scan *all-time* history rather than current state for this reason (e.g. longest-ever weekly streak, not the currently active one).
- **Diet-only calendar days don't count as training** — a day logged as "No Cheat Meal" with no training attached (`dietOnly: true`) is deliberately excluded from every statistic that counts training sessions (streaks, totals, the yearly consistency ring, "last training," etc.), while still counting toward Clean Diet Days stats and badges.
- **Service Worker cache versioning** — `sw.js` uses a cache-first strategy keyed by a version string (`const CACHE = 'training-vN'`). Because the Service Worker only re-installs when its own file changes byte-for-byte, **you must bump this version number on every deploy** or users will keep seeing a stale cached copy of the app.

---

## Known Limitations

These are iOS/WebKit or free-tier hosting constraints, not bugs:

- **No vibration API** — iOS Safari has never implemented `navigator.vibrate()`. Any haptic feedback you feel comes from the OS handling a real push notification, not from the web app itself.
- **No custom sound while backgrounded** — iOS suspends a page's audio and JavaScript execution when it's not the active tab/app. The push-notification relay server exists specifically to work around this for rest-timer alerts.
- **Tapping a notification opens Safari, not the installed app** — iOS routes notification taps through the browser, which may use a separate storage context from the Home Screen app. There's currently no reliable way around this; the notification's tap target has been left unset for that reason (it still alerts you, you just return to the app manually).
- **The measurement reminder isn't a true 24-day scheduled push** — Node's `setTimeout` overflows past ~24.8 days, and Render's free tier can restart or sleep the relay server at any point, wiping any long-running in-memory timer regardless of length. Instead, the app checks how long it's been since your last full Body Stats entry every time it's opened, and fires the reminder then if 24+ days have passed — so you're notified the next time you open the app on or after day 24, not necessarily on day 24 itself while it's closed.

---

## Updating the App

1. Edit `index.html` (and `sw.js` if you touch caching behaviour, or `server.js` if you touch notification payloads).
2. **Always bump the cache version** in `sw.js` (`training-vN` → `training-vN+1`) — otherwise your changes won't reach anyone with the app already installed.
3. Push both files to your GitHub Pages repo. If you changed `server.js`, redeploy it on Render too.
4. Existing installs pick up the update automatically the next time they're online; a full refresh (remove + re-add to Home Screen) guarantees it immediately.

---

## Contributing

This started as a personal project, but issues and pull requests are welcome if you'd like to extend it — new exercise types, additional chart views, new badges, or platform-specific fixes are all fair game.

## License

Open source — free to use, modify, and redistribute. If you fork this for your own training program, a credit back to this repo is appreciated but not required.

## Credits

Designed and built by **Marcin Zająkała** (Poland), in collaboration with **Claude** (Anthropic) — describing what to build and refining it conversation by conversation, with Claude writing all of the code. Built entirely with free tools: GitHub Pages, Render.com's free tier, [ntfy.sh](https://ntfy.sh), and Documents by Readdle for on-device testing.

Get in touch: [LinkedIn](https://www.linkedin.com/in/marcin-zajakala)
