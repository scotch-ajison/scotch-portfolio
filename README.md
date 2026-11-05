# scotchajison.com

Portfolio of Scotch Ajison — GIS systems architect, Harare.

Next.js 16 (App Router) · React 19 · Tailwind v4 (CSS-first) · TypeScript strict.
Deployed on Vercel at **https://scotchajison.com**.

```bash
npm install
cp .env.local.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

## The content module is the source of truth

Everything the site says about itself lives in `src/content/`. Pages read from
it; nothing hard-codes a project, a count or a contact detail.

| File | Holds |
| --- | --- |
| `src/content/profile.ts` | Identity, bio, experience, skills, contact, timeline |
| `src/content/projects.ts` | Every project — the only project list |
| `src/content/derived.ts` | `counts`, `featured`, `listed`, `located`, card rhythm |
| `src/content/routes.ts` | Routes, nav membership, sitemap priority and dates |
| `src/lib/site.ts` | The one definition of the site URL |

**Counts are computed, never typed.** The home page, `/work` and the footer all
render `counts.projects`, `counts.live` and `counts.publicRepos`. They used to
be written by hand in four places and disagreed — the home page said "6" and
linked to "All 6 projects" while `/work` advertised "13 Projects" and "15+
Production Systems Built". `npm run check:content` now fails the build if a
literal count reappears in a page.

### Rules this repo enforces

`npm run check:content` asserts, and CI runs it:

- unique slugs and unique `order`
- every image has substantial `alt` text
- `links.repo` is a public `github.com` URL
- `links.live` is absolute — and should only be added after checking it answers
- every project has `problem`, `approach` and `outcome`
- no date in the future, every date parseable
- no hard-coded project counts in `src/app/page.tsx` or `src/app/work/page.tsx`
- every route listed in `routes.ts` has a page on disk

The content rule behind all of it: **a claim a reader can check is either
evidenced or absent.** `role` on each project says what was actually done —
"on the delivering team", not "I built" — and `accessNote` says why there is no
link where a reader would expect one.

## Images

Sources live outside the repo. `scripts/prep-images.mjs` conditions them once,
offline, and writes WebP into `src/assets/images/`, where `next/image` picks
them up as static imports (automatic dimensions and blur placeholder, so no
layout shift).

```bash
npm run prep:images          # only on a machine with the source folders
npm run prep:images -- --force
```

It strips EXIF and GPS from everything. It never runs at build time, and CI
never needs the sources.

## Environment

| Variable | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | canonicals, sitemap, robots, OG | `https://scotchajison.com` in Production **and** Preview |
| `RESEND_API_KEY` | the contact form | without it the form returns 503 and tells the visitor to email directly |
| `ENQUIRY_RECIPIENT` | where enquiries land | defaults to the address in `profile.ts` |
| `RESEND_FROM_NOTIFICATIONS` | sender for the notification | `Scotch Ajison (site) <notifications@scotchajison.com>` |
| `RESEND_FROM_REPLIES` | sender for the auto-reply | `Scotch Ajison <hello@scotchajison.com>` |

### Sending domain — still to do

The route currently falls back to `onboarding@resend.dev`, Resend's shared
sandbox sender. **It only delivers to the Resend account owner's own verified
address**, so it works today by accident and will stop the moment the recipient
changes. To fix it:

1. Resend → Domains → add `scotchajison.com`, pick a region, copy the records.
2. At GoDaddy (the nameservers are `ns25/ns26.domaincontrol.com`), add them. In
   the Host field type `send`, **not** `send.scotchajison.com` — GoDaddy appends
   the domain, and a FQDN becomes `send.scotchajison.com.scotchajison.com`.
   - `TXT` `send` → `v=spf1 include:amazonses.com ~all`
   - `MX`  `send` → the `feedback-smtp.<region>.amazonses.com` host Resend shows, priority 10
   - `TXT` `resend._domainkey` → the DKIM value, no surrounding quotes
3. Wait for Resend to show **Verified**, then set `RESEND_FROM_*` in Vercel.

A `_dmarc` record already exists at `p=quarantine` with relaxed alignment, so
mail will pass once DKIM and SPF are live — but until then it goes to spam
rather than being accepted unauthenticated. Verify before switching the sender.

**The apex has no MX record,** so `scotchajison.com` cannot *receive* mail. The
`send.` MX above is for bounce handling on a subdomain and does not change
that. The design works around it — the notification sets `Reply-To` to the
enquirer, and the auto-reply sets `Reply-To` to the real inbox — so nothing
needs to arrive at the apex. If you want `hello@scotchajison.com` to work as a
real address, ImprovMX's free tier is two apex MX records and no nameserver
move.

## Contact form

`src/app/api/contact/route.ts`. Defences in the order they run: origin check,
honeypot, time trap (under 3s or over 24h is a bot), field validation, then a
per-instance rate limit.

The rate limit is a `Map` in one lambda's module scope — cold starts reset it
and concurrent instances each keep their own, so it slows a flood rather than
stopping one. The checks that actually hold are the stateless ones above it.
Upgrade path when it matters: Upstash Redis via the Vercel Marketplace, which
would also give a durable spool so an enquiry survives a Resend outage.

Every user-supplied value is HTML-escaped before it reaches the email body, and
`Reply-To` is stripped of CR/LF — an unsanitised one is a header-injection
vector. Every message is sent with a plain-text part alongside the HTML.

## Analytics

`@vercel/analytics` and `@vercel/speed-insights`, both in `layout.tsx`. Enable
Web Analytics and Speed Insights in the Vercel dashboard; figures appear there,
nothing is emailed.

## Scripts

| | |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | eslint |
| `npm run check:content` | content invariants |
| `npm run prep:images` | regenerate `src/assets/images/` |

## Known, deliberate

- **The portrait is a 592px source**, the only one that exists. It is cropped to
  head and shoulders, upscaled once offline, and never displayed above 340px so
  it stays inside a 2× render. A higher-resolution photograph would be the
  single easiest visual upgrade: drop it in `scripts/prep-images.mjs` as the
  `portrait` source and re-run.
- **The repo is a fork** of `munashe-chivandire/scotch-portfolio`, so GitHub
  shows a "forked from" banner on a portfolio whose argument is ownership, and
  excludes it from code search by default. With 0 stars and 0 forks there is
  nothing to protect: ask GitHub Support to detach it — that keeps the URL, the
  history and the Vercel connection intact.
- **The Building Change Observatory has no screenshot** because its map is a
  local Leaflet page that needs a running server to capture. The metrics are
  real and on the card; the image slot is ready.
