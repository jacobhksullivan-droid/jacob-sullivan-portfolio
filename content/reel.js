/* ==========================================================================
   DEMO REEL
   The reel sits full width at the top of the home page.

   title:  shown on the play button, e.g. "2026 Reel"
   length: shown next to it, e.g. "1:00". "" hides it.

   video:  the full reel, with sound. Plays when someone clicks "Play".
           Use ONE of these:
             { vimeo: "123456789" }
             { vimeo: "123456789/abc123def" }   (unlisted Vimeo: number/code from the share link)
             { youtube: "dQw4w9WgXcQ" }         (Vimeo is better: no ads or other people's videos)
             { file: "media/reel.mp4" }         (not recommended: big files don't belong on GitHub)

   loop:   OPTIONAL short silent loop that plays behind the home page header.
           Keep it under ~10 MB, e.g. { file: "media/reel-loop.mp4" }

   poster: OPTIONAL still image shown before anything plays, e.g. "images/reel-poster.jpg"

   date:   OPTIONAL date the reel went up, "YYYY-MM-DD". Lets Google show it in video results.

   Leave any of them as null and the site shows a placeholder instead.
   ========================================================================== */

window.REEL = {
  title: "Reel",
  length: "0:39",
  // Placeholder: Jacob's older reel, self-hosted (21 MB). Swap for the 2026 reel on Vimeo when it's ready.
  video: { file: "media/reel-placeholder.mp4" },
  loop: { file: "media/reel-loop.mp4" },
  poster: "images/reel-poster.jpg",
  date: null
};
