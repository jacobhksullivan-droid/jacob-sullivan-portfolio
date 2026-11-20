/* ==========================================================================
   SITE DETAILS
   Edit the text between the quotes. Keep the commas and quotes as they are.
   Save, then refresh the page to see the change.
   ========================================================================== */

window.SITE = {
  name: "Jacob Sullivan",
  role: "Motion designer",
  roleLine: "Motion designer, Sydney",          // shown under the home headline
  location: "Sydney, Australia",
  email: "Jacob.hksullivan@gmail.com",

  // Short line shown on top of the reel, bottom left. Set to "" to remove it.
  positioning: "2D & 3D motion designer.",

  // OPTIONAL big statement under the reel, with a "Get in touch" button.
  // Off by default: the line on the reel already says who you are (per the research brief).
  headline: "",

  // Shown on the Contact page and in the closing block. Set to "" to hide.
  availability: "I'm open to freelance projects and full-time roles.",

  // Your CV as a PDF in the "files" folder, e.g. "files/jacob-sullivan-cv.pdf".
  // null hides the download button. (This one includes your phone number, by your choice.)
  cv: "files/jacob-sullivan-cv-2026.pdf",

  // Visitor stats. Turn on Web Analytics in Vercel first, then set to true.
  analytics: true,

  // Used by Google and when the link is shared (keep it under ~155 characters)
  description: "Jacob Sullivan is a motion designer in Sydney making animation, 3D and video for brands like Jim Beam, Suntory and Genius Sports.",

  // The live web address. Change this if you add your own domain later,
  // then run: python3 tools/make_sitemap.py
  url: "https://jacob-sullivan-portfolio.vercel.app",

  // Image shown when the link is shared on LinkedIn, iMessage etc. (1200 x 630).
  // Leave as null for none.
  shareImage: "images/share-satoshi.jpg",

  // Social links. Paste the full address, e.g. "https://www.linkedin.com/in/yourname".
  // Empty ones are hidden on the live site.
  socials: {
    linkedin: "",
    instagram: "",
    vimeo: ""
  },

  // Phone number stays off the site unless showPhone is true.
  // This file is public on GitHub, so only type a number here if you want it public.
  showPhone: false,
  phone: "",

  // The scrolling strip on the home page.
  // A plain "Name" shows as text. To show a logo instead, use:
  //   { name: "Name", logo: "images/logos/name.svg", size: 1 }
  // Logos show in their own colours. Use SVG or a PNG with a transparent
  // background (no white logos: they vanish on the off-white page). "size" nudges one logo bigger (1.3) or smaller (0.7)
  // so they all look the same weight.
  brandsLabel: "",          // small label above the logos; "" hides it
  brands: [
    { name: "Jim Beam", logo: "images/logos/jim-beam.png", logoMono: "images/logos/jim-beam-black.png", size: 1.7 },
    { name: "Suntory -196", logo: "images/logos/suntory.png", size: 1.4 },
    { name: "Canadian Club", logo: "images/logos/canadian-club.png", size: 1.3 },
    { name: "Genius Sports", logo: "images/logos/genius-sports.png", size: 1.05 },
    { name: "Premier League", logo: "images/logos/premier-league.png", logoMono: "images/logos/premier-league-black.png", size: 1.15 },
    { name: "NFL", logo: "images/logos/nfl.png", logoMono: "images/logos/nfl-mono.png", size: 1.55 },
    { name: "The Rugby Pod", logo: "images/logos/rugby-pod.png", size: 1.65 },
    { name: "Taldumande Youth Services", logo: "images/logos/taldumande.png", logoMono: "images/logos/taldumande-black.png", size: 1 },
    { name: "Prada", logo: "images/logos/prada.svg", size: 0.48 },
    { name: "Samsung", logo: "images/logos/samsung.svg", size: 0.44 },
    { name: "Yves Saint Laurent", logo: "images/logos/yves-saint-laurent.svg", size: 0.68 },
    "L'Oréal",
    "Pictet"
  ],

  // "Design" carousel on the home page, under the work. Swipe or use the arrows.
  // Images are grouped into sets; each set gets a caption underneath.
  //   title  shown under the set
  //   text   OPTIONAL short line after the title ("" hides it)
  //   link   OPTIONAL page the caption links to, e.g. "/work/genius-sports-sizzle-reel"
  //   ratio  the shape of the set's images: "1 / 1" square, "9 / 16" tall, "16 / 9" wide
  // Each set is its own little carousel: people use the arrows to flip through it.
  // Delete every set (sets: []) to hide the carousel.
  design: {
    title: "Design",
    sets: [
      {
        title: "Genius Sports",
        ratio: "16 / 9",
        text: "",
        link: "/work/genius-sports-sizzle-reel",
        items: [
          { image: "images/design/genius-low-latency.jpg", alt: "Genius Sports frame: All within a low-latency stream" },
          { image: "images/design/genius-new-edge.jpg", alt: "Genius Sports frame: Everyone is looking for a new edge" },
          { image: "images/design/genius-tshirts.webp", alt: "Genius Sports t-shirt design, front and back" }
        ]
      },
      {
        title: "Gradient series",
        ratio: "9 / 16",
        text: "",
        link: "",
        items: [
          { image: "images/design/gradient-bars.webp", alt: "Glowing red and pink gradient bars on black" },
          { image: "images/design/gradient-cubes.webp", alt: "Two glossy cubes floating over a red gradient" },
          { image: "images/design/gradient-discs.webp", alt: "A sphere resting on stacked gradient discs" }
        ]
      },
      {
        title: "Jake Three",
        ratio: "1 / 1",
        text: "Leave The World Behind",
        link: "",
        items: [
          { image: "images/design/jake-three-sky.webp", alt: "Leave The World Behind cover art for Jake Three: a hand reaching down through the clouds" },
          { image: "images/design/jake-three-space.webp", alt: "Leave The World Behind cover art for Jake Three: purple space and swirling smoke" }
        ]
      }
    ]
  },

  // The closing block on the home page
  closing: {
    title: "Have a project in mind?",
    text: "Tell me what you're working on and I'll get back to you. Email is the quickest way to reach me.",
    button: "Email me"
  }
};
