/* ==========================================================================
   Site engine. You shouldn't need to edit this: change the files in content/.
   Each page's <body data-page="..."> says which page to draw.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var host = location.hostname;
  var isDev = host === "localhost" || host === "127.0.0.1" || host === "[::1]" || /\.(localhost|test)$/.test(host);
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  root.classList.add("js");
  if (isDev) root.classList.add("is-dev");

  var S = window.SITE, R = window.REEL, P = window.PROJECTS, A = window.ABOUT;
  var missing = [];
  if (!S) missing.push("content/site.js");
  if (!R) missing.push("content/reel.js");
  if (!P) missing.push("content/projects.js");
  if (!A) missing.push("content/about.js");
  S = S || {}; R = R || {}; P = Array.isArray(P) ? P : []; A = A || {};

  var page = document.body.getAttribute("data-page") || "";
  var visible = P.filter(function (p) { return p && p.slug && p.visible !== false; });

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function src(p) {
    if (!p) return "";
    p = String(p);
    return /^(https?:)?\/\//.test(p) || p.charAt(0) === "/" ? p : "/" + p;
  }
  function paras(t) {
    var list = Array.isArray(t) ? t : String(t || "").split(/\n\s*\n/);
    return list.map(function (x) { return String(x).trim(); }).filter(Boolean)
      .map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("");
  }
  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function devTag(inline) {
    return isDev ? '<span class="dev-tag' + (inline ? " dev-tag--inline" : "") + '">Placeholder</span>' : "";
  }
  function ph(label, dark) {
    return '<div class="ph' + (dark ? " ph--dark" : "") + '"><span class="ph__label">' + esc(label) + "</span></div>";
  }
  function mailto() { return "mailto:" + (S.email || ""); }
  function hasVideo(v) { return !!(v && (v.vimeo || v.youtube || v.file)); }
  var arrow = '<span class="arrow" aria-hidden="true">&rarr;</span>';

  /* ---------- video ---------- */

  function embedUrl(v, autoplay) {
    if (v.vimeo) {
      var parts = String(v.vimeo).split("/");
      return "https://player.vimeo.com/video/" + encodeURIComponent(parts[0]) +
        "?dnt=1&title=0&byline=0&portrait=0" + (parts[1] ? "&h=" + encodeURIComponent(parts[1]) : "") +
        (autoplay ? "&autoplay=1" : "");
    }
    if (v.youtube) {
      return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.youtube) +
        "?rel=0&playsinline=1" + (autoplay ? "&autoplay=1" : "");
    }
    return "";
  }
  function posterFor(v, poster) {
    if (poster) return src(poster);
    if (v && v.youtube) return "https://i.ytimg.com/vi/" + encodeURIComponent(v.youtube) + "/hqdefault.jpg";
    return "";
  }
  function playerInner(v, title, autoplay) {
    if (v.file) {
      return '<video src="' + esc(src(v.file)) + '" controls playsinline preload="metadata"' + (autoplay ? " autoplay" : "") + "></video>";
    }
    return '<iframe src="' + esc(embedUrl(v, autoplay)) + '" title="' + esc(title) +
      '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe>';
  }
  /* A 16:9 player. Shows a poster with a play button if there is one (loads the
     heavy player only on click), otherwise the player itself, otherwise a placeholder. */
  function player(v, opts) {
    opts = opts || {};
    var title = opts.title || "Video";
    if (!hasVideo(v)) return '<div class="player">' + ph(opts.label || "Add project video here", true) + "</div>";
    var poster = posterFor(v, opts.poster);
    if (poster) {
      return '<div class="player" data-player>' +
        '<img class="player__poster" src="' + esc(poster) + '" alt="" loading="lazy" decoding="async">' +
        '<button class="player__btn" type="button"><span class="visually-hidden">Play video: ' + esc(title) + "</span></button></div>";
    }
    return '<div class="player">' + playerInner(v, title, false) + "</div>";
  }
  function wirePlayers(scope, lookup) {
    $$("[data-player]", scope).forEach(function (el) {
      el.addEventListener("click", function () {
        var v = lookup(el);
        if (v) el.innerHTML = playerInner(v, "Video", true);
      }, { once: true });
    });
  }

  /* ---------- meta tags ---------- */

  function setMeta(title, description, path, noindex) {
    var base = (S.url || "").replace(/\/$/, "");
    document.title = title;
    function meta(attr, key, val) {
      if (!val) return;
      var m = document.head.querySelector("meta[" + attr + '="' + key + '"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); }
      m.setAttribute("content", val);
    }
    meta("name", "description", description);
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);
    if (base && path != null) {
      meta("property", "og:url", base + path);
      var c = document.head.querySelector('link[rel="canonical"]');
      if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
      c.href = base + path;
    }
    if (S.shareImage && base) {
      meta("property", "og:image", base + src(S.shareImage));
      meta("name", "twitter:image", base + src(S.shareImage));
    }
    if (noindex) meta("name", "robots", "noindex");
  }

  /* ---------- header, menu, footer ---------- */

  var NAV = [
    { href: "/work", label: "Work", key: "work" },
    { href: "/about", label: "About", key: "about" },
    { href: "/contact", label: "Contact", key: "contact" }
  ];
  function current(key) {
    return key === page || (key === "work" && page === "project") ? ' aria-current="page"' : "";
  }

  function renderHeader() {
    var el = $("#site-header");
    if (!el) return;
    el.className = "site-header";
    el.innerHTML =
      '<div class="wrap site-header__inner">' +
        '<a class="brand" href="/">' + esc(S.name || "Jacob Sullivan") + "</a>" +
        '<nav class="nav" aria-label="Main"><ul class="nav__list">' +
          NAV.map(function (n) { return '<li><a class="nav__link" href="' + n.href + '"' + current(n.key) + ">" + n.label + "</a></li>"; }).join("") +
        "</ul></nav>" +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-panel">' +
          '<span class="menu-btn__text">Menu</span><span class="menu-btn__icon" aria-hidden="true"></span></button>' +
      "</div>";

    var panel = document.createElement("div");
    panel.className = "menu-panel";
    panel.id = "menu-panel";
    panel.setAttribute("aria-label", "Menu");
    panel.innerHTML =
      '<ul class="menu-panel__list">' +
        NAV.map(function (n) { return '<li><a class="menu-panel__link" href="' + n.href + '"' + current(n.key) + ">" + n.label + "</a></li>"; }).join("") +
      "</ul>" +
      '<div class="menu-panel__foot"><a class="link-u" href="' + esc(mailto()) + '" style="justify-self:start">' + esc(S.email) + "</a>" +
      '<span class="muted">' + esc(S.location) + "</span></div>";
    el.after(panel);

    var btn = $(".menu-btn", el);
    var txt = $(".menu-btn__text", el);
    function setOpen(open) {
      root.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", String(open));
      txt.textContent = open ? "Close" : "Menu";
      if ("inert" in panel) panel.inert = !open;
      if (open) { var first = $("a", panel); if (first) first.focus(); }
    }
    if ("inert" in panel) panel.inert = true;
    btn.addEventListener("click", function () { setOpen(!root.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("menu-open")) { setOpen(false); btn.focus(); }
    });
    $$("a", panel).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });

    // Header sits transparent over a dark hero, then turns solid once you scroll past it.
    var hero = $("[data-hero]");
    if (hero) {
      el.classList.add("on-dark");
      var ticking = false;
      var update = function () {
        ticking = false;
        el.classList.toggle("is-solid", window.scrollY > hero.offsetHeight - el.offsetHeight);
      };
      window.addEventListener("scroll", function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener("resize", update);
      update();
    } else {
      el.classList.add("is-solid");
    }
  }

  function socialLinks() {
    var s = S.socials || {};
    var names = { linkedin: "LinkedIn", instagram: "Instagram", vimeo: "Vimeo" };
    return Object.keys(names).map(function (k) {
      if (s[k]) return '<a class="link-u" href="' + esc(s[k]) + '" target="_blank" rel="noopener">' + names[k] + "</a>";
      return isDev ? '<span class="soon">' + names[k] + " (add link)</span>" : "";
    }).filter(Boolean);
  }

  function renderFooter() {
    var el = $("#site-footer");
    if (!el) return;
    el.className = "site-footer";
    var phone = S.showPhone && S.phone ? '<p><a class="link-u" href="tel:' + esc(String(S.phone).replace(/\s+/g, "")) + '">' + esc(S.phone) + "</a></p>" : "";
    el.innerHTML =
      '<div class="wrap">' +
        '<div class="footer__grid">' +
          '<div class="footer__col">' +
            '<p class="footer__name">' + esc(S.name) + "</p>" +
            '<p class="muted">' + esc(S.role) + "</p>" +
            "<p>" + esc(S.location) + "</p>" +
            '<p><a class="link-u" href="' + esc(mailto()) + '">' + esc(S.email) + "</a></p>" + phone +
          "</div>" +
          '<div class="footer__col"><p class="label">Pages</p><ul>' +
            NAV.map(function (n) { return '<li><a class="link-u" href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
          "</ul></div>" +
          '<div class="footer__col footer__links">' +
            '<a class="link-u" href="' + esc(mailto()) + '">Email me</a>' + socialLinks().join("") +
          "</div>" +
        "</div>" +
        '<div class="footer__base"><span>&copy; ' + new Date().getFullYear() + " " + esc(S.name) + "</span>" +
          '<a class="link-u" href="#top">Back to top</a></div>' +
      "</div>";
  }

  /* ---------- shared blocks ---------- */

  function card(p, i) {
    var media;
    if (p.thumbnail) {
      media = '<img src="' + esc(src(p.thumbnail)) + '" alt="" loading="lazy" decoding="async">';
    } else {
      media = ph("Add thumbnail here");
    }
    return '<article class="card reveal" style="--d:' + ((i % 2) * 90) + 'ms">' +
      '<a class="card__link" href="/work/' + encodeURIComponent(p.slug) + '"' +
        (p.previewVideo ? ' data-preview="' + esc(src(p.previewVideo)) + '"' : "") + ">" +
        '<h3 class="card__title"><span>' + esc(p.title) + "</span></h3>" +
        '<p class="card__summary">' + esc(p.summary) + "</p>" +
        '<div class="card__media">' + media + (p.placeholder ? devTag() : "") + "</div>" +
      "</a></article>";
  }

  function wireCardPreviews(scope) {
    $$("[data-preview]", scope).forEach(function (a) {
      var box = $(".card__media", a), vid = null;
      function start() {
        if (!canHover.matches || reduceMotion.matches) return;
        if (!vid) {
          vid = document.createElement("video");
          vid.muted = true; vid.loop = true; vid.playsInline = true;
          vid.setAttribute("muted", ""); vid.setAttribute("playsinline", ""); vid.setAttribute("aria-hidden", "true");
          vid.preload = "auto";
          vid.src = a.getAttribute("data-preview");
          box.appendChild(vid);
        }
        var pr = vid.play();
        if (pr && pr.catch) pr.catch(function () {});
        box.classList.add("is-previewing");
      }
      function stop() {
        box.classList.remove("is-previewing");
        if (vid) vid.pause();
      }
      a.addEventListener("mouseenter", start);
      a.addEventListener("mouseleave", stop);
      a.addEventListener("focus", start);
      a.addEventListener("blur", stop);
    });
  }

  function closing() {
    var c = S.closing || {};
    return '<section class="closing wrap reveal" aria-labelledby="closing-title">' +
      '<h2 class="closing__title" id="closing-title">' + esc(c.title || "Have a project in mind?") + "</h2>" +
      (c.text ? '<p class="closing__text">' + esc(c.text) + "</p>" : "") +
      '<a class="btn" href="' + esc(mailto()) + '">' + esc(c.button || "Email me") + " " + arrow + "</a>" +
    "</section>";
  }

  /* ---------- pages ---------- */

  function renderHome(main) {
    var reelTitle = R.title || "Showreel";
    var media;
    var loop = R.loop && R.loop.file && !reduceMotion.matches;
    var poster = posterFor(R.video, R.poster);
    if (loop) {
      media = '<video autoplay muted loop playsinline preload="auto"' + (poster ? ' poster="' + esc(poster) + '"' : "") +
        ' src="' + esc(src(R.loop.file)) + '" aria-hidden="true"></video>';
    } else if (poster) {
      media = '<img src="' + esc(poster) + '" alt="" fetchpriority="high" decoding="async">';
    } else if (hasVideo(R.video)) {
      media = '<div class="ph ph--dark" aria-hidden="true"></div>';
    } else {
      media = ph("Add reel here", true);
    }
    var controls = "";
    if (hasVideo(R.video)) {
      controls += '<button class="hero__play" type="button" data-reel-open><span class="hero__play-icon" aria-hidden="true"></span>Play reel</button>';
    }
    if (loop) {
      controls += '<button class="hero__pause" type="button" aria-label="Pause background video" data-loop-toggle>' +
        '<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="2.5" height="10"/><rect x="7.5" y="1" width="2.5" height="10"/></svg></button>';
    }

    var featured = visible.filter(function (p) { return p.featured; });
    if (featured.length < 6) featured = featured.concat(visible.filter(function (p) { return !p.featured; }));
    featured = featured.slice(0, 6);

    var brands = (S.brands || []).map(function (b) { return '<li class="marquee__item">' + esc(b) + "</li>"; }).join("");

    main.innerHTML =
      '<section class="hero" data-hero aria-label="' + esc(reelTitle) + '">' +
        '<div class="hero__media">' + media + "</div>" +
        '<div class="hero__shade" aria-hidden="true"></div>' +
        (controls ? '<div class="hero__controls">' + controls + "</div>" : "") +
      "</section>" +

      '<section class="intro wrap">' +
        '<h1 class="intro__headline reveal">' + esc(S.headline) + "</h1>" +
        '<div class="intro__row reveal" style="--d:120ms">' +
          '<p class="intro__role">' + esc(S.roleLine) + "</p>" +
          '<a class="btn" href="' + esc(mailto()) + '">Get in touch ' + arrow + "</a>" +
        "</div>" +
      "</section>" +

      (brands ?
      '<section class="brands" aria-label="' + esc(S.brandsLabel || "Brands") + '">' +
        '<p class="label wrap brands__label">' + esc(S.brandsLabel || "Brands") + "</p>" +
        '<div class="marquee"><div class="marquee__track">' +
          '<ul class="marquee__group">' + brands + "</ul>" +
          '<ul class="marquee__group" aria-hidden="true">' + brands + "</ul>" +
        "</div></div>" +
      "</section>" : "") +

      '<section class="section section--tight-top wrap" aria-labelledby="sel-title">' +
        '<div class="section__head"><h2 class="label" id="sel-title">Selected work</h2>' +
          '<a class="link-u" href="/work">All work</a></div>' +
        '<div class="grid">' + featured.map(card).join("") + "</div>" +
      "</section>" +

      '<section class="wrap" aria-labelledby="about-teaser">' +
        '<div class="teaser reveal">' +
          '<h2 class="label" id="about-teaser">About</h2>' +
          '<div><p class="teaser__text">' + esc(A.teaser) + "</p>" +
          '<p style="margin-top:24px"><a class="link-u" href="/about">More about me</a></p></div>' +
        "</div>" +
      "</section>" +

      closing() +

      '<dialog class="lightbox" aria-label="' + esc(reelTitle) + '">' +
        '<button class="lightbox__close" type="button" data-reel-close>Close</button>' +
        '<div class="player" data-reel-frame></div>' +
      "</dialog>";

    setMeta((S.name || "") + " | " + (S.roleLine || "Motion designer"), S.description, "/");

    var dlg = $(".lightbox", main), frame = $("[data-reel-frame]", main);
    var openBtn = $("[data-reel-open]", main);
    if (openBtn && dlg && dlg.showModal) {
      openBtn.addEventListener("click", function () {
        frame.innerHTML = playerInner(R.video, reelTitle, true);
        dlg.showModal();
      });
      $("[data-reel-close]", main).addEventListener("click", function () { dlg.close(); });
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener("close", function () { frame.innerHTML = ""; openBtn.focus(); });
    } else if (openBtn) {
      openBtn.addEventListener("click", function () { $(".hero__media", main).innerHTML = playerInner(R.video, reelTitle, true); });
    }
    var tog = $("[data-loop-toggle]", main);
    if (tog) {
      var v = $(".hero__media video", main);
      tog.addEventListener("click", function () {
        if (v.paused) { v.play(); tog.setAttribute("aria-label", "Pause background video"); tog.innerHTML = '<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="2.5" height="10"/><rect x="7.5" y="1" width="2.5" height="10"/></svg>'; }
        else { v.pause(); tog.setAttribute("aria-label", "Play background video"); tog.innerHTML = '<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 1l8 5-8 5z"/></svg>'; }
      });
    }
    wireCardPreviews(main);
  }

  function renderWork(main) {
    main.innerHTML =
      '<section class="page-top wrap">' +
        '<p class="label reveal">Work</p>' +
        '<h1 class="page-title reveal" style="margin-top:16px">Selected projects</h1>' +
      "</section>" +
      '<section class="section section--tight-top wrap" aria-label="Projects">' +
        '<div class="grid">' + visible.map(card).join("") + "</div>" +
      "</section>" + closing();
    setMeta("Work | " + S.name, "Selected motion design, 3D and animation projects by " + S.name + ", " + (S.roleLine || "") + ".", "/work");
    wireCardPreviews(main);
  }

  function renderProject(main) {
    var parts = location.pathname.replace(/\/+$/, "").split("/");
    var slug = decodeURIComponent(parts[parts.length - 1] || "");
    if (slug === "project" || slug === "project.html") slug = new URLSearchParams(location.search).get("slug") || "";
    var i = -1;
    visible.forEach(function (p, n) { if (p.slug === slug) i = n; });
    if (i < 0) return renderNotFound(main, "That project isn't here.");

    var p = visible[i];
    var prev = visible[(i - 1 + visible.length) % visible.length];
    var next = visible[(i + 1) % visible.length];
    var tools = (p.tools || []).filter(Boolean);
    var credits = (p.credits || []).filter(function (c) { return c && (c.role || c.name); });

    function metaRow(label, val) { return val ? '<div><dt class="label">' + label + "</dt><dd>" + esc(val) + "</dd></div>" : ""; }

    main.innerHTML =
      '<section class="project__video wrap">' +
        player(p.video, { title: p.title, poster: p.thumbnail }) +
      "</section>" +
      '<article class="wrap">' +
        '<div class="project__head">' +
          "<div>" +
            '<h1 class="project__title reveal">' + esc(p.title) + (p.placeholder ? devTag(true) : "") + "</h1>" +
            '<div class="project__desc reveal" style="--d:100ms">' + paras(p.description) + "</div>" +
          "</div>" +
          '<dl class="meta reveal" style="--d:180ms">' +
            metaRow("Client", p.client) + metaRow("Role", p.role) + metaRow("Year", p.year) +
            metaRow("Tools", tools.join(", ")) +
          "</dl>" +
        "</div>" +
        (credits.length ?
          '<section class="credits reveal" aria-labelledby="credits-title"><h2 class="label" id="credits-title">Credits</h2><ul class="credits__list">' +
          credits.map(function (c) { return '<li><span class="muted">' + esc(c.role) + "</span><span>" + esc(c.name) + "</span></li>"; }).join("") +
          "</ul></section>" : "") +
        (visible.length > 1 ?
        '<nav class="pager" aria-label="More projects">' +
          '<a href="/work/' + encodeURIComponent(prev.slug) + '"><span class="label">&larr; Previous</span><span class="pager__title">' + esc(prev.title) + "</span></a>" +
          '<a href="/work/' + encodeURIComponent(next.slug) + '"><span class="label">Next &rarr;</span><span class="pager__title">' + esc(next.title) + "</span></a>" +
        "</nav>" : "") +
      "</article>" + closing();

    setMeta(p.title + " | " + S.name, p.summary || S.description, "/work/" + p.slug);
    wirePlayers(main, function () { return p.video; });
  }

  function renderAbout(main) {
    var photo = A.photo ? '<img src="' + esc(src(A.photo)) + '" alt="' + esc(A.photoAlt || S.name) + '" decoding="async" fetchpriority="high">' : ph("Add photo here");
    var jobs = (A.experience || []).map(function (j) {
      return '<li class="job">' +
        '<div class="job__head"><p><span class="job__role">' + esc(j.role) + "</span>" +
          (j.company ? ', <span>' + esc(j.company) + "</span>" : "") +
          (j.place ? ' <span class="job__where">&middot; ' + esc(j.place) + "</span>" : "") + "</p>" +
          '<p class="job__dates">' + esc(j.dates) + "</p></div>" +
        ((j.points || []).length ? '<ul class="job__points">' + j.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
      "</li>";
    }).join("");
    var earlier = (A.earlier || []).map(function (j) {
      return '<li><span>' + esc(j.role) + (j.company ? ", " + esc(j.company) : "") + '</span><span class="job__dates">' + esc(j.dates) + "</span></li>";
    }).join("");
    function tags(list) { return '<ul class="tags">' + (list || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"; }
    var edu = (A.education || []).map(function (e) {
      return '<li><span>' + esc(e.name) + (e.by ? ' <span class="muted">&middot; ' + esc(e.by) + "</span>" : "") + '</span><span class="job__dates">' + esc(e.dates) + "</span></li>";
    }).join("");
    function row(title, body, d) { return '<section class="row reveal"' + (d ? ' style="--d:' + d + 'ms"' : "") + '><h2 class="row__title">' + title + "</h2><div>" + body + "</div></section>"; }

    main.innerHTML =
      '<section class="page-top wrap">' +
        '<p class="label reveal">About</p>' +
        '<h1 class="page-title reveal" style="margin-top:16px;margin-bottom:clamp(40px,6vw,96px)">' + esc(S.name) + "</h1>" +
        '<div class="about__top">' +
          '<figure class="about__photo reveal">' + photo + "</figure>" +
          '<div class="about__bio reveal" style="--d:120ms">' + paras(A.bio) + "</div>" +
        "</div>" +
      "</section>" +
      '<div class="wrap section">' +
        row("Experience", '<ol class="timeline">' + jobs + "</ol>" +
          (earlier ? '<div style="margin-top:40px"><p class="label" style="margin-bottom:12px">Earlier</p><ul class="earlier">' + earlier + "</ul></div>" : "")) +
        row("Skills", tags(A.skills)) +
        row("Tools", tags(A.tools)) +
        row("Education", '<ul class="edu">' + edu + "</ul>") +
        (A.outside ? row("Outside work", '<p style="font-size:var(--fs-body-l);max-width:52ch">' + esc(A.outside) + "</p>") : "") +
      "</div>" + closing();

    var first = (Array.isArray(A.bio) ? A.bio[0] : A.bio) || S.description;
    setMeta("About | " + S.name, String(first).slice(0, 155), "/about");
  }

  function renderContact(main) {
    var phone = S.showPhone && S.phone ?
      '<div><dt class="label">Phone</dt><dd><a class="link-u" href="tel:' + esc(String(S.phone).replace(/\s+/g, "")) + '">' + esc(S.phone) + "</a></dd></div>" : "";
    var socials = socialLinks();
    main.innerHTML =
      '<section class="page-top wrap">' +
        '<p class="label reveal">Contact</p>' +
        '<h1 class="page-title reveal" style="margin-top:16px;max-width:14ch">' + esc((S.closing && S.closing.title) || "Have a project in mind?") + "</h1>" +
        '<a class="contact__email link-u reveal" href="' + esc(mailto()) + '">' + esc(S.email) + "</a>" +
        '<div class="contact__actions reveal">' +
          '<a class="btn" href="' + esc(mailto()) + '">Email me ' + arrow + "</a>" +
          '<button class="btn btn--ghost" type="button" data-copy>Copy email</button>' +
          '<span class="visually-hidden" aria-live="polite" data-copy-status></span>' +
        "</div>" +
        '<dl class="contact__details reveal">' +
          '<div><dt class="label">Location</dt><dd>' + esc(S.location) + "</dd></div>" + phone +
          (socials.length ? '<div><dt class="label">Elsewhere</dt><dd class="socials">' + socials.join("") + "</dd></div>" : "") +
        "</dl>" +
      "</section>" +
      '<div class="section"></div>';
    setMeta("Contact | " + S.name, "Get in touch with " + S.name + ", " + (S.roleLine || "motion designer") + ". Email " + S.email + ".", "/contact");

    var btn = $("[data-copy]", main), status = $("[data-copy-status]", main);
    btn.addEventListener("click", function () {
      function done(ok) {
        btn.textContent = ok ? "Copied" : "Press Cmd+C to copy";
        status.textContent = ok ? "Email copied to clipboard" : "";
        setTimeout(function () { btn.textContent = "Copy email"; }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(S.email).then(function () { done(true); }, function () { done(fallback()); });
      } else { done(fallback()); }
      function fallback() {
        var t = document.createElement("textarea");
        t.value = S.email; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
        document.body.appendChild(t); t.select();
        var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
        t.remove(); return ok;
      }
    });
  }

  function renderNotFound(main, msg) {
    main.innerHTML =
      '<section class="page-top wrap notfound">' +
        '<p class="label">404</p>' +
        '<h1 class="page-title" style="margin-top:16px">' + esc(msg || "Page not found.") + "</h1>" +
        '<p class="page-lede">Try the work page, or head back home.</p>' +
        '<div class="contact__actions"><a class="btn" href="/work">See the work ' + arrow + '</a><a class="btn btn--ghost" href="/">Home</a></div>' +
      "</section>";
    setMeta("Not found | " + (S.name || ""), "This page doesn't exist.", null, true);
  }

  /* ---------- reveal on scroll ---------- */

  function wireReveals() {
    var els = $$(".reveal");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    // Anything already on screen at load fades in straight away, even if the observer is slow to report.
    var vh = window.innerHeight;
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top < vh) setTimeout(function () { e.classList.add("is-in"); }, 40);
      else io.observe(e);
    });
  }

  /* ---------- go ---------- */

  try {
    var main = $("#main");
    var pages = { home: renderHome, work: renderWork, project: renderProject, about: renderAbout, contact: renderContact, notfound: renderNotFound };
    if (main && pages[page]) pages[page](main);
    renderHeader();
    renderFooter();
    wireReveals();
  } catch (err) {
    missing.push(String(err && err.message || err));
    if (window.console) console.error(err);
  }

  if (missing.length && isDev) {
    var b = document.createElement("div");
    b.className = "dev-banner";
    b.textContent = "Something in the content files needs fixing (only you see this, on your computer): " + missing.join(" | ") +
      ". Usually a missing comma or quote mark near your last edit.";
    document.body.appendChild(b);
  }
})();
