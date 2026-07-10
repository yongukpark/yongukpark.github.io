/*
 * script.js — Warm minimal researcher portfolio (Yonguk Park)
 * OWNED BY frontend-crafter. Implements _workspace/01_architect_contract.md §3/§5/§6.
 * Vanilla JS, no framework. All DOM lookups null-guarded (no console errors on
 * pages lacking a given element, e.g. #idea-map only exists on /blog/).
 *
 * Modules:
 *   1) Theme toggle  (#theme-toggle → <html data-theme>, localStorage 'theme', aria-pressed)
 *   2) Language toggle (#lang-toggle → <html lang>, localStorage 'lang', [data-i18n]/[data-i18n-aria])
 *   3) Idea map      (#posts-data JSON → dots in #idea-map at map_x/map_y)
 *   4) IntersectionObserver reveal fade (.reveal → .is-visible; reduced-motion aware)
 */
(function () {
  "use strict";

  // Signal JS is active so CSS can gate the pre-split word-reveal state
  // (html.js [data-word-reveal]:not(.is-ready){opacity:0}). No-JS keeps text shown.
  document.documentElement.classList.add("js");

  var STORAGE_THEME = "theme";
  var STORAGE_LANG = "lang";
  var DEFAULT_LANG = "ko";

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Set true once word-reveal is initialized, so a later language swap re-splits
  // the headline and shows it immediately instead of re-triggering the animation.
  var wordRevealActive = false;

  /* Full i18n key inventory (contract §2 + redesign brief §9 — 63 keys). Used for
     a self-check so we can warn content-author about any key missing from window.I18N.
     NOTE: cat.* keys are the only DOM keys emitted via Liquid data-i18n="cat.{{cat}}". */
  var KEY_INVENTORY = [
    // a11y / footer
    "a11y.skip", "footer.github", "footer.email", "footer.copyright",
    // nav
    "nav.brand", "nav.home", "nav.projects", "nav.blog",
    "nav.theme.label", "nav.theme.aria", "nav.lang.label", "nav.lang.aria",
    // categories
    "cat.interp", "cat.llm", "cat.build",
    // home
    "home.intro.name", "home.intro.role", "home.intro.bio",
    "home.interests.heading", "home.interests.item1", "home.interests.item2", "home.interests.item3",
    "home.projects.heading", "home.projects.viewall",
    "home.latest.heading", "home.latest.viewall",
    "home.connect.heading", "home.connect.github", "home.connect.email",
    // projects
    "projects.heading", "projects.intro",
    "project.1.title", "project.1.meta", "project.1.desc",
    "project.2.title", "project.2.meta", "project.2.desc",
    "project.3.title", "project.3.meta", "project.3.desc",
    "project.4.title", "project.4.meta", "project.4.desc",
    "project.5.title", "project.5.meta", "project.5.desc",
    // blog
    "blog.heading", "blog.intro", "blog.map.heading", "blog.map.disclaimer",
    "blog.list.heading", "blog.empty",
    // post
    "post.back",
    // redesign brief §9 — mono section labels, 404 page
    "label.interests", "label.projects", "label.latest", "label.connect", "label.blog",
    "notfound.title", "notfound.desc", "notfound.back",
    // iteration2 §D — profile rows, post retention, RSS
    "profile.affiliation.dt", "profile.affiliation.dd", "profile.focus.dt", "profile.focus.dd",
    "profile.github.dt", "profile.email.dt",
    "post.related", "post.prev", "post.next", "footer.rss",
    // CV scaffold (home §03)
    "label.cv", "home.cv.heading",
    "cv.edu.heading", "cv.edu.1.period", "cv.edu.1.title", "cv.edu.1.desc",
    "cv.exp.heading", "cv.exp.1.period", "cv.exp.1.title", "cv.exp.1.desc",
    "cv.exp.2.period", "cv.exp.2.title", "cv.exp.2.desc",
    "cv.awards.heading", "cv.awards.1.period", "cv.awards.1.title", "cv.awards.1.desc",
    "cv.awards.2.period", "cv.awards.2.title", "cv.awards.2.desc",
    "cv.certs.heading", "cv.certs.1.period", "cv.certs.1.title", "cv.certs.1.desc"
  ];

  // ---------------------------------------------------------------------------
  // Small helpers
  // ---------------------------------------------------------------------------
  function getLang() {
    try {
      return localStorage.getItem(STORAGE_LANG) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function getDict(lang) {
    var I18N = window.I18N || {};
    return I18N[lang] || I18N[DEFAULT_LANG] || {};
  }

  // Translate a key; returns the dict value or null if missing.
  function t(dict, key) {
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return null;
  }

  // ---------------------------------------------------------------------------
  // 2) Language: swap [data-i18n] textContent + [data-i18n-aria] aria-label.
  //    Missing key → keep existing text (defensive) + console.warn.
  // ---------------------------------------------------------------------------
  function applyI18n(lang) {
    var dict = getDict(lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(dict, key);
      if (val === null) {
        console.warn("[i18n] missing key: " + key + " (" + lang + ")");
        return; // keep placeholder text
      }
      el.textContent = val; // NOTE: this destroys any word-reveal spans inside

      // Interface guard (redesign §5): a [data-word-reveal] headline just had its
      // word spans wiped by the textContent swap. If the reveal system is already
      // running (i.e. this is a live language toggle, not first paint), re-split
      // and show it at once so the h1 never goes blank.
      if (wordRevealActive && el.hasAttribute("data-word-reveal")) {
        splitWordReveal(el);
        el.classList.add("is-visible");
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var val = t(dict, key);
      if (val === null) {
        console.warn("[i18n] missing aria key: " + key + " (" + lang + ")");
        return;
      }
      el.setAttribute("aria-label", val);
    });

    document.documentElement.setAttribute("lang", lang);
  }

  // One-time self-check: warn about any inventory key absent from the dict.
  function selfCheckKeys(lang) {
    var dict = getDict(lang);
    var missing = KEY_INVENTORY.filter(function (k) {
      return !Object.prototype.hasOwnProperty.call(dict, k);
    });
    if (missing.length) {
      console.warn(
        "[i18n] " + missing.length + " key(s) missing from I18N[" + lang + "]: " +
        missing.join(", ")
      );
    }
  }

  function initLangToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = getLang() === "ko" ? "en" : "ko";
      try { localStorage.setItem(STORAGE_LANG, next); } catch (e) {}
      applyI18n(next);
      renderMap(); // re-render map so category labels follow the language
    });
  }

  // ---------------------------------------------------------------------------
  // 1) Theme toggle. No-FOUC initial apply already done inline in <head>.
  //    We only read current state and wire the click + aria-pressed.
  // ---------------------------------------------------------------------------
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  }

  function reflectThemeButton(btn, theme) {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function initThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    reflectThemeButton(btn, currentTheme());
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(STORAGE_THEME, next); } catch (e) {}
      reflectThemeButton(btn, next);
    });
  }

  // ---------------------------------------------------------------------------
  // 3) Idea map. Parse #posts-data JSON; render one focusable <a> dot per post
  //    at left=map_x*100%, top=map_y*100% (map_y: 0=top, 1=bottom per contract).
  // ---------------------------------------------------------------------------
  function clamp01(n) {
    if (typeof n !== "number" || isNaN(n)) return 0.5;
    return Math.max(0, Math.min(1, n));
  }

  function readPosts() {
    var node = document.getElementById("posts-data");
    if (!node) return null;
    try {
      var data = JSON.parse(node.textContent);
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn("[map] posts-data JSON parse failed:", e);
      return [];
    }
  }

  function renderMap() {
    var map = document.getElementById("idea-map");
    if (!map) return; // only exists on /blog/

    var posts = readPosts();
    if (posts === null) return;

    map.textContent = ""; // clear (also clears on re-render for lang swap)

    if (posts.length === 0) {
      var empty = document.createElement("p");
      empty.className = "map-empty";
      // Reuse the blog.empty string if available, else a neutral fallback.
      var dict = getDict(getLang());
      empty.textContent = t(dict, "blog.empty") || "—";
      map.appendChild(empty);
      return;
    }

    var dict = getDict(getLang());

    posts.forEach(function (post) {
      if (!post || !post.url) return;

      var x = clamp01(post.map_x);
      var y = clamp01(post.map_y);
      var cat = post.cat || "";

      var dot = document.createElement("a");
      dot.className = "map-dot";
      dot.href = post.url;                 // link integrity: url only
      dot.style.left = (x * 100) + "%";
      dot.style.top = (y * 100) + "%";
      if (cat) dot.setAttribute("data-cat", cat);

      var catLabel = cat ? (t(dict, "cat." + cat) || cat) : "";
      var aria = post.title || "";
      if (post.date) aria += ", " + post.date;
      if (catLabel) aria += ", " + catLabel;
      dot.setAttribute("aria-label", aria);

      // Tooltip revealed on hover/focus (title / date / category label)
      var tip = document.createElement("span");
      tip.className = "map-tooltip";
      tip.setAttribute("role", "presentation");

      var tTitle = document.createElement("span");
      tTitle.className = "map-tooltip-title";
      tTitle.textContent = post.title || "";
      tip.appendChild(tTitle);

      var tMeta = document.createElement("span");
      tMeta.className = "map-tooltip-meta";
      var metaBits = [];
      if (post.date) metaBits.push(post.date);
      if (catLabel) metaBits.push(catLabel);
      tMeta.textContent = metaBits.join(" · ");
      tip.appendChild(tMeta);

      dot.appendChild(tip);
      map.appendChild(dot);
    });
  }

  // ---------------------------------------------------------------------------
  // 4) IntersectionObserver reveal fade. reduced-motion → mark all immediately.
  //    Siblings sharing a parent get an incremental --reveal-i for CSS stagger.
  // ---------------------------------------------------------------------------
  function assignRevealStagger(els) {
    var counts = new Map();
    els.forEach(function (el) {
      var parent = el.parentNode;
      var i = counts.get(parent) || 0;
      el.style.setProperty("--reveal-i", i);
      counts.set(parent, i + 1);
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    assignRevealStagger(els);

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach(function (el) { observer.observe(el); });
  }

  // ---------------------------------------------------------------------------
  // 5) Staggered word reveal (redesign §5 — staggered-word-reveal skill, vanilla).
  //    Split [data-word-reveal] text into per-word spans; each rises + fades once
  //    on scroll-in. Splitter preserves whitespace, exposes the sentence to AT via
  //    aria-label, and marks word spans aria-hidden. Re-splittable after i18n swap.
  // ---------------------------------------------------------------------------
  // Returns true if the text was split into word spans. Single-token strings
  // (e.g. Korean "박용욱") gain nothing from a stagger — leave them as plain,
  // immediately visible text (is-ready lifts the html.js opacity gate).
  function splitWordReveal(element) {
    var text = element.textContent || "";
    var parts = text.split(/(\s+)/);
    var wordCount = parts.filter(function (p) { return p.trim(); }).length;
    var wordIndex = 0;

    if (wordCount < 2) {
      element.removeAttribute("aria-label");
      element.classList.add("is-ready");
      return false;
    }

    element.textContent = "";
    element.setAttribute("aria-label", text.trim());

    parts.forEach(function (part) {
      if (!part.trim()) {
        element.appendChild(document.createTextNode(part));
        return;
      }
      var word = document.createElement("span");
      word.className = "word-reveal__word";
      word.setAttribute("aria-hidden", "true");
      word.style.setProperty("--word-index", wordIndex);
      word.textContent = part;
      element.appendChild(word);
      wordIndex += 1;
    });

    element.classList.add("is-ready");
    return true;
  }

  function initWordReveals() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll("[data-word-reveal]")
    );
    if (!els.length) { wordRevealActive = true; return; }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        splitWordReveal(el);
        el.classList.add("is-visible");
      });
      wordRevealActive = true;
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, io) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach(function (el) {
      if (splitWordReveal(el)) observer.observe(el);
    });

    wordRevealActive = true;
  }

  // ---------------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------------
  function init() {
    var lang = getLang();
    selfCheckKeys(lang);
    applyI18n(lang);          // runs before word-reveal init → text set in plain
    initThemeToggle();
    initLangToggle();
    renderMap();
    initWordReveals();        // splits [data-word-reveal]; sets wordRevealActive
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
