# Setting Up Automatic Daily Sale Checking

This turns on a robot that visits every brand's website once a day, checks
whether they currently have a sale live, and updates your website
automatically — no manual checking required. Sales that end will disappear
from your site on their own, usually within a day.

This is a one-time, ~15 minute setup. After that, it runs forever without
you touching anything.

---

## Before you start

You need your website's files in a **GitHub repository** with **Netlify
connected to it** (rather than drag-and-drop uploads). If you haven't done
that yet:

1. Create a free account at [github.com](https://github.com)
2. Create a new repository (e.g. `brandgali-website`)
3. Upload all your website files to it using GitHub's "Add file → Upload
   files" button (drag-and-drop, just like Netlify) — make sure you include
   the `.github` folder too (it's hidden in some file browsers, but it's
   essential — that's what makes the automation run)
4. In Netlify: **Site settings → Build & deploy → Link repository**, and
   connect it to this GitHub repo

If you're already on GitHub + Netlify, skip to the next section.

---

## Step 1 — Confirm the automation files are in your repository

You should have these files, in the main folder of your repository:

- `scraper.js` — the script that checks every brand's website
- `.github/workflows/check-sales.yml` — tells GitHub *when* to run it
  (once a day, automatically)
- `sales-status.json` — where the results get saved (this file will be
  updated automatically every day; you never need to write to it by hand)
- `brands-data.js` — unchanged, still your one place to add/edit brands

If any of these are missing, upload them to your GitHub repository the
same way you uploaded the rest.

---

## Step 2 — Turn on Actions (GitHub sometimes asks for this once)

1. On your repository's GitHub page, click the **"Actions"** tab
2. If you see a message about enabling workflows, click the green button
   to enable them
3. You should see a workflow called **"Check brand sales daily"** listed

That's it — it's now scheduled to run automatically every day at 10:00 AM
Pakistan time. You don't need to do anything else.

---

## Step 3 — Test it right now (optional, but reassuring)

You don't have to wait until tomorrow to see it work:

1. Go to the **Actions** tab → click **"Check brand sales daily"** on the
   left → click the **"Run workflow"** button on the right → click the
   green **"Run workflow"** button that appears
2. Wait about a minute, then refresh the page — you'll see a run appear
   with either a green checkmark (success) or a red X (something went
   wrong — click into it to see the error, or send it to me)
3. Check your repository — `sales-status.json` should now show a new
   "commit" with today's date, meaning it just updated the file
4. Your live website will reflect the change within another minute or two
   (Netlify auto-deploys whenever the file changes)

---

## What happens automatically, every single day

- The script visits every brand's website (skipping Instagram-only brands
  and any brand still using a `#` placeholder link — those aren't
  checkable this way)
- If it finds sale-related wording ("% off," "sale," "flat X% off," "BOGO,"
  etc.) it marks that brand as having a live sale
- If it finds nothing, and that brand previously had a sale marked, the
  sale is removed — so an ended sale disappears from your ticker, your
  homepage, and the Live Sales page on its own
- "New Arrival" badges are never touched by the automation (there's no
  reliable way to detect "new arrival" by scanning a page) — those stay
  exactly as you last set them, whether via automation being blind to
  them or via admin.html

## Where you might still need to step in occasionally

- **Instagram-only brands** — since Instagram can't be scraped this way,
  use `admin.html` to mark a sale for these manually when you know about one
- **Marking something as "New Arrival"** — always manual, via `admin.html`
- **A brand's site uses unusual wording** the scraper doesn't recognise —
  open `scraper.js`, find the `SALE_PATTERNS` list near the top, and add
  the phrase (ask me and I'll add it for you)
- **A brand blocks automated visitors** (some larger sites use bot
  protection) — the scraper will simply leave that brand's previous status
  unchanged rather than guessing wrong; if a specific brand consistently
  fails, let me know and we can look at why

## Changing what time it runs

Open `.github/workflows/check-sales.yml` and look for this line:

```
- cron: '0 5 * * *'
```

The first number is minutes, the second is the hour — **in UTC, not
Pakistan time**. Pakistan is UTC+5, so `5` UTC = `10:00 AM` Pakistan time.
To run at, say, 8:00 AM Pakistan time instead, that's 3:00 AM UTC, so the
line would become `- cron: '0 3 * * *'`.
