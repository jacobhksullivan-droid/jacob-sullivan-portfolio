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

  // The big line on the home page, under the reel
  headline: "I make motion design and 3D for brands, from first idea to final render.",

  // Used by Google and when the link is shared (keep it under ~155 characters)
  description: "Jacob Sullivan is a motion designer in Sydney making animation, 3D and video for brands like Jim Beam, Suntory and Genius Sports.",

  // The live web address. Change this if you add your own domain later,
  // then run: python3 tools/make_sitemap.py
  url: "https://jacob-sullivan-portfolio.vercel.app",

  // Image shown when the link is shared on LinkedIn, iMessage etc. (1200 x 630).
  // Leave as null for none.
  shareImage: "images/share.jpg",

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
  brandsLabel: "Brands I've worked on",
  brands: [
    { name: "Jim Beam", logo: "images/logos/jim-beam.png", size: 1.7 },
    { name: "Suntory -196", logo: "images/logos/suntory.png", size: 1.4 },
    { name: "Canadian Club", logo: "images/logos/canadian-club.png", size: 1.3 },
    { name: "Genius Sports", logo: "images/logos/genius-sports.png", size: 1.05 },
    { name: "Premier League", logo: "images/logos/premier-league.png", size: 1.15 },
    { name: "NFL", logo: "images/logos/nfl.png", size: 1.55 },
    { name: "The Rugby Pod", logo: "images/logos/rugby-pod.png", size: 1.65 },
    { name: "Taldumande Youth Services", logo: "images/logos/taldumande.png", size: 1 },
    { name: "Prada", logo: "images/logos/prada.svg", size: 0.48 },
    { name: "Samsung", logo: "images/logos/samsung.svg", size: 0.44 },
    { name: "Yves Saint Laurent", logo: "images/logos/yves-saint-laurent.svg", size: 0.68 },
    "L'Oréal",
    "Pictet"
  ],

  // The closing block on the home page
  closing: {
    title: "Have a project in mind?",
    text: "Tell me what you're making. Email is the quickest way to reach me.",
    button: "Email me"
  }
};
