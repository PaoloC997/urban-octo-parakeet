function initCarousel(root) {
  const frames = Array.from(root.querySelectorAll(".s-main__frame"));
  if (frames.length === 0) return;

  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = Math.max(
    0,
    frames.findIndex((el) => el.classList.contains("is-active")),
  );

  function setActive(nextIndex) {
    index = (nextIndex + frames.length) % frames.length;
    for (let i = 0; i < frames.length; i++) {
      frames[i].classList.toggle("is-active", i === index);
    }
  }

  function next() {
    setActive(index + 1);
  }

  function prev() {
    setActive(index - 1);
  }

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  let timerId = null;

  function start() {
    if (prefersReducedMotion) return;
    stop();
    timerId = window.setInterval(next, 4500);
  }

  function stop() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  start();
}

window.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");
  for (const root of carousels) initCarousel(root);
});
