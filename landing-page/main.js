/**
 * Scroll reveals — viewport marked before html.agt-js to avoid a flash of hidden content.
 */
(function () {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll("[data-reveal]");

  function show(el) {
    el.classList.add("is-visible");
  }

  if (reduced) {
    revealEls.forEach(show);
    root.classList.add("agt-js", "agt-motion-done");
    return;
  }

  const vh = () => window.innerHeight;
  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < vh() * 0.92;
  };

  revealEls.forEach((el) => {
    if (inViewport(el)) show(el);
  });
  root.classList.add("agt-js");

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { root: null, threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );

  revealEls.forEach((el) => {
    if (!el.classList.contains("is-visible")) io.observe(el);
  });

  requestAnimationFrame(() => {
    root.classList.add("agt-motion-done");
  });
})();

// Arsenal horizontal scroll — fade edge indicators
(function () {
  const grid = document.querySelector(".grid--arsenal");
  const wrap = document.querySelector(".arsenal-scroll-wrap");
  if (!grid || !wrap) return;

  function update() {
    const { scrollLeft, scrollWidth, clientWidth } = grid;
    wrap.classList.toggle("can-scroll-left", scrollLeft > 4);
    wrap.classList.toggle("can-scroll-right", scrollLeft < scrollWidth - clientWidth - 4);
  }

  grid.addEventListener("scroll", update, { passive: true });
  new ResizeObserver(update).observe(grid);
  update();
})();
