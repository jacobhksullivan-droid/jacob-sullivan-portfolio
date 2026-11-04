/* ==========================================================================
   DEMO REEL
   The reel sits full width at the top of the home page.

   video:  the full reel, with sound. Plays when someone clicks "Play reel".
           Use ONE of these:
             { vimeo: "123456789" }
             { vimeo: "123456789/abc123def" }   (unlisted Vimeo: number/code from the share link)
             { youtube: "dQw4w9WgXcQ" }
             { file: "media/reel.mp4" }         (not recommended: big files don't belong on GitHub)

   loop:   OPTIONAL short silent loop that plays behind the home page header.
           Keep it under ~10 MB, e.g. { file: "media/reel-loop.mp4" }

   poster: OPTIONAL still image shown before anything plays, e.g. "images/reel-poster.jpg"

   Leave any of them as null and the site shows a placeholder instead.
   ========================================================================== */

window.REEL = {
  title: "Showreel",
  video: null,
  loop: null,
  poster: null
};
