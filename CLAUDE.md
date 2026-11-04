# Jacob Sullivan portfolio: project instructions

Personal motion design portfolio. Plain static site (HTML, CSS, vanilla JS), **no framework, no build step**. Layout modelled on ravie.co (patterns only, none of their content or branding). Original brief: `~/Documents/PERSONAL/portfolio-prompt.md`. Source of truth for CV facts: `~/Documents/PERSONAL/Jacob-Sullivan-Motion-Designer-CV.pdf`.

## Who you're working with
- Jacob is a motion designer in Sydney, working toward Creative Director. **Not a developer**: do the technical work, tell him exactly what to click or paste.
- Blunt and short on time. Act, don't over-explain. Short, plain replies.
- Use they/them for anyone whose pronouns aren't stated.

## Hard rules
- Everything must be **free** (zero budget). No contact form (needs a paid/third-party service).
- **Never publish his phone number.** `showPhone` in `content/site.js` stays `false` unless he says otherwise; the repo is public.
- Don't invent results, numbers or client quotes. Only CV facts.
- Site must be **indexable**: no `X-Robots-Tag: noindex` (unlike the camper app). No passcode gate.
- Big videos go on Vimeo/YouTube, never in the repo (GitHub rejects >100 MB). Local mp4s only for short silent loops.
- Never change hosting, account or security settings yourself. Ask Jacob to click them.

## Content (the only files Jacob edits)
- `content/site.js`: name, headline, email, url, socials, brand strip, showPhone, closing CTA. Each brand is `"Name"` (text) or `{ name, logo: "images/logos/x.svg", size }` (logo in its own colours; `--logo-filter` in style.css can force all-black; `size` is an optical-weight multiplier). Logos in `images/logos/`: Jim Beam, Suntory -196, Canadian Club, Genius Sports, Premier League, NFL supplied by Jacob (cropped to content, transparent, 128px tall PNG); Prada, Samsung, YSL from Wikimedia Commons. Still text: The Rugby Pod, Taldumande, L'Oréal, Pictet.
- `content/reel.js`: `video` (`{vimeo}`/`{youtube}`/`{file}`), optional `loop` (silent hero mp4) and `poster`.
- `content/projects.js`: one object per project (slug, title, client, year, role, tools[], summary, description, thumbnail, previewVideo, video, credits[], visible, featured, placeholder). File order = site order. Home shows first 6 `featured`.
- `content/about.js`: photo, teaser, bio[], experience[], earlier[], skills[], tools[], education[], outside.
- Missing media renders as labelled placeholders. `placeholder: true` shows a yellow tag **only on localhost**.
- Plain-English editing guide for Jacob: `ADD-CONTENT.md`. Keep it in sync if fields change.

## Hosting / deploy (same setup as the camper app `jacobhksullivan-droid/vibez`)
- GitHub repo `jacobhksullivan-droid/jacob-sullivan-portfolio` (public, branch `main`). Vercel project connected by Jacob; every push to `main` auto-deploys.
- Live: https://jacob-sullivan-portfolio.vercel.app (also in `content/site.js` → `url`; change both if a custom domain is added, then rerun the sitemap script).
- `vercel.json`: `framework: null`, no build/install; rewrites `/work`, `/about`, `/contact` → `*.html`, `/work/:slug` → `project.html`. HTML/CSS/JS/content `max-age=0, must-revalidate`; `/images` and `/media` cached 30 days (so new image = new filename).
- `.vercelignore` keeps `tools/`, `CLAUDE.md`, `ADD-CONTENT.md` off the live site.
- git push auth: GitHub CLI at `~/.local/gh/gh` (logged in as jacobhksullivan-droid, git credential helper).
- Deploy after every change:
  ```bash
  python3 tools/make_sitemap.py
  git add -A && git commit -m "…" && git push
  ```
  Then verify with curl on the live URL: `/`, `/work`, `/about`, `/contact`, every `/work/<slug>`, `/robots.txt`, `/sitemap.xml` return 200.

## Local preview
- `python3 tools/devserver.py` → http://localhost:8780 (no-cache, mirrors the Vercel rewrites, 404s like production).
- `.claude/launch.json`: `portfolio` (starts the server) and `portfolio-attach` (url-only). macOS can block the preview runner from reading ~/Documents; if so, start the server via Bash in the background, then preview_start `portfolio-attach`.
- If the browser pane is hidden, the page doesn't paint, so scroll reveals and transitions look stuck. Not a site bug.

## Code map
- `index.html`, `work.html`, `project.html`, `about.html`, `contact.html`, `404.html`: thin shells (static meta fallbacks + script tags). `<body data-page>` picks the renderer.
- `js/app.js`: everything. Header/menu/footer, home (reel hero + lightbox, marquee, grid, teaser, closing CTA), work grid, project page (slug from URL), about, contact (copy email), per-page meta/OG tags, scroll reveals, card hover previews, dev-only placeholder tags and content-error banner.
- `css/style.css`: all design tokens (colours, fonts, spacing, motion) in `:root` at the top. Fonts: Cormorant Garamond (300/400) + Inter. Grid rhythm 4/2, 3/3, 2/4 on a 6-column grid. Cross-page view transitions; `prefers-reduced-motion` respected.
- `tools/make_sitemap.py`: rebuilds `sitemap.xml` + `robots.txt` from `content/site.js` url and visible projects.
- `tools/devserver.py`: local preview. `tools/share-card.html`: source for `images/share.jpg` (OG image, 1200×630).
