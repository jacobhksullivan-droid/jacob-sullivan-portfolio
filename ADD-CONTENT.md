# How to add your work

Everything you'll change lives in the **`content`** folder. You never need to touch anything else.

| File | What's in it |
|---|---|
| `content/reel.js` | Your demo reel |
| `content/projects.js` | Every project |
| `content/about.js` | Bio, photo, experience, skills |
| `content/site.js` | Name, email, headline, social links, brand names |

Images go in the **`images`** folder. Short video loops go in the **`media`** folder.

**Golden rules when editing:**
- Only change text **inside the quote marks**.
- Keep every comma at the end of a line. A missing comma is the #1 thing that breaks the site.
- If the site goes blank on your computer, a red bar at the bottom tells you which file to check. Undo your last change (Cmd+Z) and try again.
- If you replace an image, give the new one a **new file name** (e.g. `jim-beam-v2.jpg`). Browsers cache images for a month, so reusing the old name can keep showing the old picture.

---

## Before you start: where to put full videos

Put full-length videos on **Vimeo** (best) or **YouTube**, not in this folder. GitHub rejects files over 100 MB, and free hosting has bandwidth limits.

To get the ID:
- **Vimeo:** `https://vimeo.com/123456789` → the ID is `123456789`.
  Unlisted video? The link looks like `https://vimeo.com/123456789/abc123def`. Use `"123456789/abc123def"`.
- **YouTube:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → the ID is `dQw4w9WgXcQ`.

Only use local `.mp4` files for **short silent loops** (under ~5 MB for cards, ~10 MB for the home reel loop). In After Effects or Media Encoder: H.264, 1280 or 1920 wide, no audio, 3 to 6 seconds.

---

## (a) Add your reel

Open `content/reel.js` and change `video: null,` to:

```js
  video: { vimeo: "123456789" },
```

That's it. A "Play reel" button appears on the home page.

**Optional extras:**
- A still frame shown before it plays: save a 1920×1080 JPG as `images/reel-poster.jpg`, then set
  ```js
    poster: "images/reel-poster.jpg"
  ```
- A silent loop that plays behind the header (like Ravie): save a short mp4 as `media/reel-loop.mp4`, then set
  ```js
    loop: { file: "media/reel-loop.mp4" },
  ```

---

## (b) Add a project

1. Put a thumbnail in `images` (16:9 JPG, around 1600×900, under 300 KB). Example: `images/jim-beam.jpg`.
2. Upload the full video to Vimeo and copy its ID.
3. Open `content/projects.js`. Copy this whole block and paste it **straight after the `[`** on the line `window.PROJECTS = [` (to put it first), or between two existing blocks:

```js
  {
    slug: "my-new-project",
    title: "My new project",
    client: "Client name",
    year: "2026",
    role: "Animation and 3D",
    tools: ["After Effects", "Cinema 4D"],
    summary: "One line that appears on the card.",
    description: `First paragraph about the project.

Second paragraph. Leave a blank line between paragraphs.`,
    thumbnail: "images/my-new-project.jpg",
    previewVideo: null,
    video: { vimeo: "123456789" },
    credits: [
      { role: "Agency", name: "Fuel" }
    ],
    visible: true,
    featured: true,
    placeholder: false
  },
```

4. Change the text. `slug` becomes the web address (`/work/my-new-project`): lowercase, dashes, no spaces.
5. Make sure there's a comma after the closing `}` (`},`).
6. Run `python3 tools/make_sitemap.py` so Google finds the new page (see Publish).

**Replacing one of the six placeholder projects** is the same: fill in `thumbnail`, `video` and the text, then change `placeholder: true` to `placeholder: false`.

**Hover preview (optional):** save a 3 to 5 second silent mp4 in `media`, then set `previewVideo: "media/my-new-project-preview.mp4",`. It plays when someone hovers over the card.

---

## (c) Hide or reorder a project

- **Hide:** change `visible: true` to `visible: false`. The block stays in the file, but the project disappears from the site.
- **Take it off the home page but keep it on Work:** `featured: false`.
- **Reorder:** cut a whole block, from its `{` down to its `},`, and paste it where you want it. The order in the file is the order on the site. The home page shows the first 6 projects marked `featured: true`.

---

## (d) Change your photo

1. Save a portrait photo (roughly 4:5, around 1200×1500, under 400 KB) as `images/jacob.jpg`.
2. In `content/about.js`, change `photo: null,` to:
   ```js
     photo: "images/jacob.jpg",
   ```

---

## Other quick edits

- **Headline, email, brand names:** `content/site.js`.
- **Social links:** `content/site.js` → `socials`. Paste full links, e.g. `linkedin: "https://www.linkedin.com/in/yourname",`. Empty ones stay hidden on the live site.
- **Bio and CV details:** `content/about.js`.
- **The `[START DATE]` and `[YEAR]` placeholders:** search for `[` in `content/about.js` and `content/projects.js` and fill them in.

---

## Check it on your computer first

In Terminal:

```bash
cd ~/Documents/portfolio && python3 tools/devserver.py
```

Open http://localhost:8780. Refresh after each change. Yellow "Placeholder" tags and "(add link)" notes only show here, never on the live site. Press Ctrl+C in Terminal to stop.

---

## (e) Publish

After saving your changes, in Terminal:

```bash
cd ~/Documents/portfolio && python3 tools/make_sitemap.py && git add -A && git commit -m "Update content" && git push
```

Vercel publishes it automatically, usually within a minute. Refresh the live site to check.

Or just open Claude Code in this folder and say "publish my changes".
