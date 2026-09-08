// krisracette.me — scroll-reveal system.
// Synced with the EM site's reveal.v2.js (2026-09-08). Spec: aria/ACTIVE-CONTENT.md.
// Content blocks fade/rise, sections settle into place. Cub.club feel, zero deps.
(function () {
  var SELECTORS = [".reveal-section", ".reveal-stagger", ".reveal"];

  // No-JS fallback: show everything immediately. AT/SEO crawlers see content.
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(SELECTORS.join(",")).forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  function makeObserver(opts) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      opts
    );
    return observer;
  }

  // Block-level reveals: punchy, trigger once ~12% visible.
  var blockObserver = makeObserver({ threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  // Section-level reveals: earlier trigger so the fade begins as the section
  // peeks in (sections are tall; threshold 0.12 would mean the user has scrolled
  // half-way through before the fade starts).
  var sectionObserver = makeObserver({ threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

  document.querySelectorAll(".reveal-section").forEach(function (el) {
    sectionObserver.observe(el);
  });
  document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
    blockObserver.observe(el);
  });
})();
