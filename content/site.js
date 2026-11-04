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

  // The scrolling strip of names on the home page
  brandsLabel: "Brands I've worked on",
  brands: [
    "Jim Beam",
    "Suntory",
    "Canadian Club",
    "Genius Sports",
    "Premier League",
    "NFL",
    "The Rugby Pod",
    "Taldumande Youth Services",
    "Prada",
    "Samsung",
    "Yves Saint Laurent",
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
