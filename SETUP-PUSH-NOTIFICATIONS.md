# Setting Up Push Notifications (OneSignal)

This lets a visitor tap "Notify Me" on any brand's card and get a real push
notification the moment that brand's sale goes live — detected automatically
by the same daily scraper you already have running.

Everything in the code is already built and wired together. This guide is
just the one-time account setup to make it actually send notifications.

---

## Step 1 — Create a free OneSignal account

1. Go to **onesignal.com** → Sign Up (free plan, no card required)
2. Click **New App/Website**
3. Give it a name (e.g. "BrandGali") → **Next**
4. Choose **Web Push** as the platform
5. Choose **Typical Site** (not "WordPress" or others)
6. Fill in:
   - **Site Name**: BrandGali
   - **Site URL**: `https://brandgali.com`
   - Leave the default icon, or upload your BrandGali icon logo if you have it handy
7. Click **Save**

## Step 2 — Get your App ID

1. In your new app, go to **Settings → Keys & IDs**
2. Copy the **OneSignal App ID** (a long string with dashes, like `12345678-abcd-1234-abcd-1234567890ab`)

## Step 3 — Paste your App ID into the site (2 files, must match exactly)

In **all three** of `index.html`, `brands.html` and `live-sales.html`, find this line in the `<head>` (appears once in each file):

```js
appId: "YOUR-ONESIGNAL-APP-ID",
```

Replace `YOUR-ONESIGNAL-APP-ID` with your real App ID from Step 2. **All three files must have the exact same App ID** — if they don't match, notifications will behave inconsistently between pages.

## Step 4 — Upload the worker file

You were given a file called `OneSignalSDKWorker.js`. This must be uploaded to your site's **root** — the same folder as `index.html`, not inside any subfolder. This is a fixed requirement from OneSignal (the filename and location can't be changed), and you never need to edit its contents.

If you're using the GitHub + Netlify workflow: add this file to your repo alongside your other files, same as always.

## Step 5 — Get your REST API Key (for sending, not receiving)

1. Same **Settings → Keys & IDs** page in OneSignal
2. Copy the **REST API Key** (a different, longer string than the App ID)

**Keep this one secret** — unlike the App ID (which is fine to have visible in your website's code, since it just identifies which app to connect to), the REST API Key can be used to *send* notifications to your subscribers, so it should never be committed into your GitHub repo in plain text.

## Step 6 — Add both as GitHub Secrets

1. Go to your GitHub repository → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add:
   - Name: `ONESIGNAL_APP_ID` → Value: your App ID from Step 2
   - Name: `ONESIGNAL_API_KEY` → Value: your REST API Key from Step 5
4. Save both

## Step 7 — Tell the GitHub Action to use them

Open `.github/workflows/check-sales.yml` and find the step that runs the scraper — it currently looks something like:

```yaml
- name: Run the sale checker
  run: node scraper.js
```

Change it to:

```yaml
- name: Run the sale checker
  run: node scraper.js
  env:
    ONESIGNAL_APP_ID: ${{ secrets.ONESIGNAL_APP_ID }}
    ONESIGNAL_API_KEY: ${{ secrets.ONESIGNAL_API_KEY }}
```

This passes your two secrets into the scraper as environment variables at run time, without ever exposing them in the repo itself. If you'd like, share this workflow file and I'll make this exact edit directly rather than you typing it by hand.

## Step 8 — Deploy and test

1. Commit all the changed files (`index.html`, `brands.html`, `live-sales.html`, `brands-data.js`, `scraper.js`, `OneSignalSDKWorker.js`, and the updated workflow file) the same way as always
2. Once live, visit your site, click "Notify Me" on any brand
3. Your browser should show its native "Allow notifications from brandgali.com?" prompt — click Allow
4. The button should switch to "Following"

## Step 9 — Test that a real notification actually sends

Fastest way to test without waiting for a real sale:
1. In OneSignal's dashboard, go to **Messages → New Push**
2. Under "Audience," choose **Send to Particular Segment/Users**, then filter by tag `follow_khaadi` (or whichever brand you followed) equals `true`
3. Write a test message, send it
4. You should receive it as a real notification within seconds

Once that works, the automated path (scraper.js detecting a real sale and calling OneSignal's API itself) is already fully wired and will work the same way — no separate testing needed for that part.

---

## What to expect, realistically

- **Not everyone will opt in.** Browser permission prompts get declined often — this is normal, expect a fraction of visitors to allow it, not everyone.
- **iOS Safari has one real limitation**: it only supports this if the visitor has added your site to their iPhone's Home Screen first. This is an Apple restriction, not something fixable on our end. Android and desktop browsers work without this extra step.
- **Notifications fire once per sale, not daily.** If a brand's sale runs for a week, subscribers get notified when it starts, not every single day it continues — intentional, to avoid feeling spammy.

## If something doesn't work

- **Button says "Notify Me" but nothing happens when clicked**: check the browser console for errors — likely the App ID placeholder wasn't replaced correctly in one of the three files
- **Permission prompt never appears**: some browsers require the page to be served over HTTPS (your live Netlify site already is) — this won't work when testing by opening the HTML file directly from your computer, only on the real live site
- **Scraper runs fine but no notification arrives**: check the GitHub Action's run log — it will print either a "push notification sent" line or a specific error/skip reason for each brand with a detected sale
