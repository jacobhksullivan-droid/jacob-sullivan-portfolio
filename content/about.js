/* ==========================================================================
   ABOUT PAGE
   Each paragraph of the bio is one "..." line, separated by commas.
   Your full work history lives in your CV (the Download CV button), not here.
   ========================================================================== */

window.ABOUT = {
  // Your photo, e.g. "images/jacob.jpg" (portrait, roughly 4:5). null shows a placeholder.
  photo: "images/jacob.jpg",
  photoAlt: "Jacob Sullivan",

  // Shown when someone hovers over (or taps) your photo. The page fades to ocean blue at the same time. null turns it off.
  photoHover: "images/jacob-ocean-2.jpg",
  photoHoverAlt: "Jacob underwater in a wetsuit, looking up at the surface",

  bio: [
    "I grew up in Deepcut, a quiet village just outside London, and I've always had a passion for film. After A-levels that passion shifted into post-production, which took me down a video production path for a few years, directing, filming and editing events for brands like Prada, Samsung and L'Oréal. Along the way I started animating, taught myself 3D, and never really looked back.",
    "These days I work freelance, animating and creative directing for Dan Biggar's The Rugby Pod. Before that I was at Fuel in Sydney and Genius Sports in London, working on brands like Jim Beam and the Premier League.",
    "I love animation and film enough to make it in my own time too, like the charity film I made for Taldumande. Down the line I want to be a Creative Director, so I care as much about the idea as I do about the keyframes.",
    "I'm really interested in AI and how it can speed up production without taking anything away from the craft. I use ChatGPT and Claude every day for writing and prompting, and I've plugged AI straight into my tools with Claude Code: MCPs in After Effects to speed up resizing animations, and in Blender to generate 3D models and materials.",
    "When I'm not animating, you'll find me in the water. I surf at Manly around three times a week, go spearfishing, and I'm training for the 2.4km Coogee Island Challenge."
  ],

  tools: [
    "After Effects",
    "Cinema 4D and Redshift",
    "Blender",
    "Illustrator",
    "Premiere Pro",
    "Photoshop",
    "Rive",
    "ChatGPT",
    "Claude",
    "Higgsfield",
    "Claude Code (Blender and After Effects MCPs)"
  ],

  // A real quote from someone you've worked with. Hidden while quote is "".
  testimonial: {
    quote: "",
    name: "",
    role: ""      // e.g. "Creative Director, Fuel"
  }
};
