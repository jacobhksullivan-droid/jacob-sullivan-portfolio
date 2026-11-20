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
- Big videos go on Vimeo/YouTube, never in the repo (GitHub rejects >100 MB). Local mp4s for short silent loops, plus small finished films (under ~25 MB, e.g. `media/school-of-motion.mp4`, 19.5 MB). Taldumande (2.2 GB ProRes) needs Vimeo.
- Never change hosting, account or security settings yourself. Ask Jacob to click them.

## Content (the only files Jacob edits)
- `content/site.js`: name, headline, email, url, socials, brand strip, showPhone, closing CTA. Each brand is `"Name"` (text) or `{ name, logo: "images/logos/x.svg", size }` (always solid black via `--logo-filter`, no hover change, marquee never pauses; optional `logoMono` = black version used instead (NFL, Jim Beam, Premier League, Taldumande — the latter three supplied by Jacob, white made transparent); `size` is an optical-weight multiplier). `brandsLabel` "" = no label above the strip; the "Selected work" heading is visually hidden.. Logos in `images/logos/`: Jim Beam, Suntory -196, Canadian Club, Genius Sports, Premier League, NFL, The Rugby Pod (white-on-black original recoloured to ink) supplied by Jacob (cropped to content, transparent, 128px tall PNG); Prada, Samsung, YSL from Wikimedia Commons. Still text: L'Oréal, Pictet.
- Reel: 2026 showreel, self-hosted `media/reel-2026.mp4` (1080p, 5.2 Mbps, 21.6 MB, from `/Volumes/Extreme SSD/PERSONAL/Reel Assets/JS_ShowReel_26_a02.mp4`), silent hero loop `media/reel-2026-hero.mp4` (the whole reel from 0:00, 720p, ~10 MB), poster `images/reel-2026-poster.jpg`. Clicking the hero or Play opens a full-window black player that starts from 0:00 with sound. Re-encode with `swift tools/video/transcode.swift` / stills with `tools/video/frames.swift` / join clips end to end with `tools/video/concat.swift out.mp4 a.mp4 b.mp4`.
- `site.js` `design: { title, sets: [{ title, text, link, ratio, items: [{ image, alt }] }] }` → "Design" section on home under the work grid, laid out like the work cards: title (+ optional text line, title linked if `link`) and "1 / 3" count above each image, on the same 6-column grid. Rhythm per 3 sets: 1st spans 4 cols, 2nd spans 2 cols and runs down two rows, 3rd spans 2 cols (Jake Three, scaled down) (`grid-auto-flow: dense`). Order now: Genius Sports (16/9, links to GeniusIQ; order: low-latency frame, new-edge frame, t-shirts), Gradient series (9/16; first item is the silent loop `media/design/expectation-reality.mp4`, a gradient reel from 2023; Jacob plans more gradient reels and may want their own section/page later), Jake Three (1/1, "Leave The World Behind"). Each set is its own small carousel (one image at a time, scroll-snap, plain white chevrons with a soft shadow on the image edges, hidden at the ends; arrow keys; swipe on touch). Clicking any image opens a full-screen black viewer (`dialog.lightbox.viewer`, reuses the reel lightbox styles) with prev/next chevrons, "1 / 3" count, arrow keys, swipe, Esc/Close/backdrop to close. Phone: one column, tall sets capped at 62svh. Images in `images/design/`. No separate pages for these (decided: thin pages pull focus from the motion work). Set items can be `{ video, poster, alt }` (silent loop, loads and plays only while on screen; plays in the viewer too). The whole section sits on a full-bleed ocean-blue band (#1291bd, white text, tokens re-pointed inside `.design`, accent white; dark `--dark` was tried first) to separate it from the work.
- `content/reel.js`: `title` + `length` (play-button label), `video` (`{vimeo}`/`{youtube}`/`{file}`), optional `loop` (silent hero mp4), `poster`, `date` (enables VideoObject JSON-LD).
- `files/jacob-sullivan-cv-2026.pdf`: CV download = Jacob's own designed CV (`/Volumes/Extreme SSD/PERSONAL/JacobSullivanCV.pdf`). It includes his phone number: Jacob explicitly chose to publish it (Nov 2026). The site pages themselves still never show the phone (`showPhone` false). The older Satoshi-less HTML CV in `~/Documents/PERSONAL/cv/` is retired.
- `site.js` also: `positioning` (line over the reel, and the home page h1), `headline` ("" = off; per the research brief the home order is positioning line → reel → work → contact, so the old headline block is off), `availability`, `cv` (PDF path, must not contain his phone), `analytics` (loads Vercel Web Analytics; only after he enables it in Vercel).
- `content/projects.js`: one object per project (slug, title, client, year, role, tools[], summary, description, thumbnail, previewVideo, video, credits[], visible, featured, placeholder). File order = site order. Home shows every `featured` project.
- `content/about.js`: photo, photoHover (ocean shot; hovering/tapping the photo swaps it and adds `html.deep-sea`, which re-points the colour tokens to ocean blue #1291bd with white text), bio[] (no "Hi, I'm…" opener; the page title already says Jacob Sullivan), tools[], testimonial {quote,name,role} (real quotes only), optional teaser (shows an About block on home; off).
- **Rule from Jacob: if it isn't in the research brief (`~/Documents/PERSONAL/portfolio-site-brief.md`), leave it out.** So About = photo, bio, CV download, clients and companies (from the brand strip), tools, testimonial. No experience timeline, skills or education on the site (they live in the CV). Home = positioning line + reel, logos, work, closing contact.
- **Copy voice (all site copy):** first person, warm and conversational, plain words, a little personality, like his own bio ("Hi, I'm Jacob Sullivan…", "When I'm not tweaking keyframes…"). No corporate phrasing, no buzzwords, still only CV facts.
- Projects with `caseStudy: true` (Jim Beam, Suntory, Genius Sports) get agency, responsibilities[], brief, keyDecision, result, process[] ({image,caption}), details[] ({video,poster,caption} loops). Card `previewVideo` and detail loops autoplay muted while on screen (IntersectionObserver), not under reduced motion. `videoDate` enables JSON-LD per project.
- `process` (any project): `{ title, intro, items: [{ image|video, poster, ratio, caption, wide }] }` (`ratio` e.g. "1600 / 820" keeps a loop uncropped) (array also accepted) → Buck-style "Process" section under the head: heading, intro, images at natural ratio, 2-up grid, `wide` = full row, videos are silent in-view loops. Hidden on live until it has items or intro; dev shows placeholder layout. Taldumande (moodboard + style frames), GeniusIQ (in-venue big screens loop `media/geniusiq-screens.mp4` first (34 s, 1600x900, 12 MB), then 3 style frames: collage wide, phone betting UI + "Sports" 3D type; the phone and Sports ones are stills pulled from single-frame mp4s in `/Volumes/Extreme SSD/PERSONAL/Reel Assets/GIQ Stjlls/`) and Imagination (chainsaw build then motion as one wide loop, robot parts/timeline, ending/T-rex loops) are filled.
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
- `css/style.css`: all design tokens (colours, fonts, spacing, motion) in `:root` at the top. Font: Satoshi everywhere (Fontshare, free; 300/400/500/700). `--serif` and `--sans` both point at it; headings weight 500, tracking -0.02em. Grid rhythm 4/2, 3/3, 2/4 on a 6-column grid. Cross-page view transitions; `prefers-reduced-motion` respected. `--accent` #1291bd = hover colour for underlines (link-u wipe, nav, card titles) and button fills (white text); white in deep-sea mode. Phones: tap areas enlarged (invisible ::after) under `(pointer: coarse), (max-width: 767px)`; on touch devices the reel also requests native fullscreen (iOS `webkitEnterFullscreen`), and leaving fullscreen closes it. Checked at 375 and 320 px: no sideways scroll.
- `tools/make_sitemap.py`: rebuilds `sitemap.xml` + `robots.txt` from `content/site.js` url and visible projects.
- Logo: Jacob's JS monogram. `images/logo.svg` (master), inline copy in `js/app.js` (`LOGO`, currently unused); the header shows his name in Satoshi Regular, the logo is the tab icon, `images/favicon-js.svg` (tab icon, flips to light in dark mode).
- `tools/devserver.py`: local preview. `tools/share-card.html`: source for `images/share-satoshi.jpg` (OG image, 1200×630).
