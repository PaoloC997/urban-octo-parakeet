function initReveals() {
  const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
  if (nodes.length === 0) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    for (const node of nodes) node.classList.add("is-revealed");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.classList.add("is-revealed");
        observer.unobserve(el);
      }
    },
    { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
  );

  for (const node of nodes) observer.observe(node);
}

window.addEventListener("DOMContentLoaded", initReveals);

