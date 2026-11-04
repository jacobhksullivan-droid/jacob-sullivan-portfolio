/* ==========================================================================
   PROJECTS
   One block { ... } per project. The order here is the order on the site.

   slug          the web address: "jim-beam-ooh" becomes /work/jim-beam-ooh
                 (lowercase, dashes, no spaces; don't change it once the site is shared)
   title         project name
   client        client name
   year          e.g. "2026"
   role          what you did
   tools         list, e.g. ["Cinema 4D", "Redshift"]  (empty [] hides it)
   summary       one line shown on the project card
   description   the project page text. Leave a blank line between paragraphs.
   thumbnail     card image, e.g. "images/jim-beam.jpg"  (null shows a placeholder)
   previewVideo  OPTIONAL short silent loop played when the mouse is over the card,
                 e.g. "media/jim-beam-preview.mp4"  (keep it small: 2 to 5 MB)
   video         the full video: { vimeo: "ID" } or { youtube: "ID" } or { file: "media/x.mp4" }
   videoDate     OPTIONAL "YYYY-MM-DD" the video went up. Lets Google show it in video results.
   credits       OPTIONAL list, e.g. [{ role: "Agency", name: "Fuel" }]

   CASE STUDY (only when caseStudy: true; any empty part is hidden on the live site)
   agency            e.g. "Fuel"
   responsibilities  list of what you did, e.g. ["3D build", "Lighting"]
   brief             what the client asked for
   keyDecision       the main creative call you made, and why
   result            what happened. Real outcomes only.
   process           images of boards, style frames, tests:
                       [{ image: "images/jb-board-1.jpg", caption: "Storyboard" }]
   details           short silent loops (3 to 9 s, small mp4s):
                       [{ video: "media/jb-detail-1.mp4", poster: "images/jb-detail-1.jpg", caption: "Lighting pass" }]
   visible       true shows it, false hides it everywhere
   featured      true puts it in "Selected work" on the home page (first 6 shown)
   placeholder   true while it still has made-up or missing media. Set to false when it's real.
   ========================================================================== */

window.PROJECTS = [
  {
    slug: "jim-beam-ooh",
    title: "Jim Beam out-of-home rollout",
    client: "Jim Beam",
    year: "[YEAR]",
    role: "3D animation, lighting and rendering",
    tools: ["Cinema 4D", "Redshift"],
    summary: "3D cans on textured concrete pillars, delivered as a twelve-piece out-of-home rollout.",
    description: `An out-of-home rollout for Jim Beam, built in Cinema 4D and rendered in Redshift. 3D cans sit on textured concrete pillars, with custom lighting and motion blur.

Delivered in four aspect sizes and in 6, 7 and 10 second versions: 12 deliverables in total.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [],
    caseStudy: true,
    agency: "Fuel",
    responsibilities: ["3D build in Cinema 4D", "Lighting and rendering in Redshift", "Versioning across four sizes and three durations"],
    brief: "",
    keyDecision: "",
    result: "",
    process: [],
    details: [],
    visible: true,
    featured: true,
    placeholder: true
  },
  {
    slug: "suntory-oceania-hype-reel",
    title: "Suntory Oceania hype reel",
    client: "Suntory Oceania",
    year: "[YEAR]",
    role: "Motion design and edit",
    tools: [],
    summary: "A hype reel for Japanese spirits, reworked into a narrative led by voice-over.",
    description: `A hype reel for Suntory Oceania's Japanese spirits, reworked into a narrative-based piece. Voice-over carries the story, so the screen needs far less copy.

A depth camera moves through layers of waves to carry the viewer from one part of the story to the next.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [],
    caseStudy: true,
    agency: "Fuel",
    responsibilities: ["Restructuring the reel into a narrative", "Voice-over led edit", "Depth camera and wave-layer animation"],
    brief: "",
    keyDecision: "",
    result: "",
    process: [],
    details: [],
    visible: true,
    featured: true,
    placeholder: true
  },
  {
    slug: "canadian-club-motion-guidelines",
    title: "Canadian Club motion guidelines",
    client: "Canadian Club",
    year: "[YEAR]",
    role: "Motion guidelines and brand system",
    tools: [],
    summary: "How the brand moves across social video, banners, hype reels and logo animation.",
    description: `Motion guidelines for Canadian Club, defining how animation is used across social media video, digital banners, hype reels and logo animation.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [{ role: "Agency", name: "Fuel" }],
    visible: true,
    featured: true,
    placeholder: true
  },
  {
    slug: "taldumande-youth-services",
    title: "Taldumande Youth Services",
    client: "Taldumande Youth Services",
    year: "[YEAR]",
    role: "Animation",
    tools: ["After Effects", "Claude Code (After Effects MCP)"],
    summary: "Storyboards animated into a slow, emotional piece, with a ball as the emotional motif.",
    description: `A set of storyboards for Taldumande Youth Services, animated into a slow, emotional piece with voice-over and music. A ball carries the emotion through the film.

Built in After Effects, using an After Effects MCP to speed up the set-up and build.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [{ role: "Agency", name: "Fuel" }],
    visible: true,
    featured: true,
    placeholder: true
  },
  {
    slug: "the-rugby-pod",
    title: "The Rugby Pod: tactics and Shorts",
    client: "Dan Biggar, The Rugby Pod",
    year: "[START DATE] to present",
    role: "Freelance motion designer and creative director",
    tools: [],
    summary: "Animated rugby tactics analysis and YouTube Shorts, with creative direction throughout.",
    description: `Freelance work for Dan Biggar, co-host of The Rugby Pod. I animate rugby tactics analysis and YouTube Shorts, and provide creative direction throughout.

I scoped, priced and delivered the work independently, from brief to final export.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [],
    visible: true,
    featured: true,
    placeholder: true
  },
  {
    slug: "genius-sports-sizzle-reel",
    title: "Genius Sports sizzle reel",
    client: "Genius Sports",
    year: "2023 to 2025",
    role: "Creative direction, 3D and animation",
    tools: [],
    summary: "3D renders and a sizzle reel that helped define a new brand identity for one part of the business.",
    description: `I directed the creative vision for a set of 3D renders and animated a sizzle reel that helped define a new brand identity for one sector of Genius Sports.

It sat alongside wider work at Genius Sports with partners including the NFL and the Premier League.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [],
    caseStudy: true,
    agency: "In-house, Genius Sports",
    responsibilities: ["Creative direction of the 3D renders", "Sizzle reel animation"],
    brief: "",
    keyDecision: "",
    result: "",
    process: [],
    details: [],
    visible: true,
    featured: true,
    placeholder: true
  }
];
