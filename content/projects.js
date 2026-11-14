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
   featured      true puts it in "Selected work" on the home page
   placeholder   true while it still has made-up or missing media. Set to false when it's real.
   ========================================================================== */

window.PROJECTS = [
  {
    slug: "taldumande-youth-services",
    title: "50th birthday animation",
    client: "Taldumande Youth Services",
    year: "2026",
    role: "Animation",
    tools: ["After Effects", "Claude Code (After Effects MCP)"],
    summary: "A slow, emotional film built around one simple motif: a ball.",
    description: `I took a set of storyboards for Taldumande Youth Services and brought them to life as a slow, emotional piece with voice-over and music. A ball carries the feeling through the whole film.

I built it in After Effects, using an After Effects MCP to speed up the set-up so more of my time went into the animation.`,
    thumbnail: "images/taldumande-thumb.jpg",
    previewVideo: "media/taldumande-loop.mp4",
    video: { vimeo: "1243128832" },
    videoDate: "2026-11-03",
    credits: [{ role: "Agency", name: "Fuel" }],
    visible: true,
    featured: true,
    placeholder: false
  },
  {
    slug: "school-of-motion-final",
    title: "Animation Bootcamp final project",
    client: "School of Motion",
    year: "2022",
    role: "Design and animation",
    tools: [],
    summary: "My final project from School of Motion's Animation Bootcamp: bold shapes, loud colour and a lot of keyframes.",
    description: `This was my final project for School of Motion's Animation Bootcamp in 2022, a 35-second piece where I got to put everything the course taught me into practice.`,
    thumbnail: "images/school-of-motion-thumb-2.jpg",
    previewVideo: "media/school-of-motion-loop-2.mp4",
    video: { file: "media/school-of-motion.mp4" },
    videoDate: null,
    credits: [],
    visible: true,
    featured: true,
    placeholder: false
  },
  {
    slug: "landart-brand-reel",
    title: "Brand and website reel",
    client: "Landart",
    year: "2026",
    role: "Motion design, 3D and edit",
    tools: [],
    summary: "A reel showing off Landart's new brand and website, from phone to laptop to the gardens themselves.",
    description: `A reel for Landart's new brand and website. It moves from the identity, onto the site on a phone, through the garden photography and onto the desktop site, all in 44 seconds.`,
    thumbnail: "images/landart-thumb.jpg",
    previewVideo: "media/landart-loop.mp4",
    video: { file: "media/landart.mp4" },
    videoDate: null,
    credits: [{ role: "Agency", name: "Fuel" }],
    visible: true,
    featured: true,
    placeholder: false
  },
  {
    slug: "genius-sports-sizzle-reel",
    title: "GeniusIQ sizzle reel",
    client: "Genius Sports",
    year: "2025",
    role: "Creative direction, 3D and animation",
    tools: [],
    summary: "3D renders and a sizzle reel that helped shape a new brand identity.",
    description: `At Genius Sports I directed the creative vision for a set of 3D renders and animated the sizzle reel that helped define a new brand identity for one part of the business.

It was part of two busy years there, working with partners like the NFL and the Premier League and leading a team of motion designers.`,
    thumbnail: "images/geniusiq-thumb.jpg",
    previewVideo: "media/geniusiq-loop.mp4",
    video: { file: "media/geniusiq.mp4" },
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
    placeholder: false
  },
  {
    slug: "jim-beam-ooh",
    title: "Out-of-home rollout",
    client: "Jim Beam",
    year: "[YEAR]",
    role: "3D animation, lighting and rendering",
    tools: ["Cinema 4D", "Redshift"],
    summary: "3D cans on concrete pillars, built for a 12-piece out-of-home rollout.",
    description: `For this Jim Beam rollout I built 3D cans sitting on textured concrete pillars in Cinema 4D, then lit and rendered them in Redshift with custom lighting and motion blur.

Then came the versioning: four aspect sizes, each in 6, 7 and 10 second cuts. Twelve deliverables in total.`,
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
    visible: false,   // hidden until the film is ready
    featured: true,
    placeholder: true
  },
  {
    slug: "suntory-oceania-hype-reel",
    title: "Japanese spirits hype reel",
    client: "Suntory Oceania",
    year: "[YEAR]",
    role: "Motion design and edit",
    tools: [],
    summary: "A Japanese spirits hype reel, reworked into a story told through voice-over.",
    description: `Suntory Oceania had a hype reel for their Japanese spirits, and I reworked it into a narrative piece. Instead of filling the screen with copy, I let a voice-over carry the story.

To move the viewer through it, I used a depth camera with layers of waves, so each part of the story flows into the next.`,
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
    visible: false,   // hidden until the film is ready
    featured: true,
    placeholder: true
  },
  {
    slug: "canadian-club-motion-guidelines",
    title: "Motion guidelines",
    client: "Canadian Club",
    year: "[YEAR]",
    role: "Motion guidelines and brand system",
    tools: [],
    summary: "How the brand moves, from social video right through to logo animation.",
    description: `I created Canadian Club's motion guidelines: the rules for how the brand moves across social video, digital banners, hype reels and logo animation.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [{ role: "Agency", name: "Fuel" }],
    visible: false,   // hidden until the film is ready
    featured: true,
    placeholder: true
  },
  {
    slug: "the-rugby-pod",
    title: "Tactics analysis and Shorts",
    client: "Dan Biggar, The Rugby Pod",
    year: "[START DATE] to present",
    role: "Freelance motion designer and creative director",
    tools: [],
    summary: "Animated tactics breakdowns and YouTube Shorts for Dan Biggar's The Rugby Pod.",
    description: `I work freelance with Dan Biggar, co-host of The Rugby Pod, animating his rugby tactics analysis and YouTube Shorts and looking after the creative direction.

It's my own gig, so I scope it, price it and deliver it myself, from brief to final export.`,
    thumbnail: null,
    previewVideo: null,
    video: null,
    videoDate: null,
    credits: [],
    visible: false,   // hidden until the film is ready
    featured: true,
    placeholder: true
  }
];
