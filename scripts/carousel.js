function initCarousel(root) {
  const frames = Array.from(root.querySelectorAll(".s-main__frame"));
  if (frames.length === 0) return;

  const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = Math.max(
    0,
    frames.findIndex((el) => el.classList.contains("is-active")),
  );

  function setActive(nextIndex) {
    index = (nextIndex + frames.length) % frames.length;
    for (let i = 0; i < frames.length; i++) {
      frames[i].classList.toggle("is-active", i === index);
      dots[i]?.classList.toggle("is-active", i === index);
      if (i === index) {
        dots[i]?.setAttribute("aria-current", "true");
      } else {
        dots[i]?.removeAttribute("aria-current");
      }
    }
  }

  function next() {
    setActive(index + 1);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => setActive(i));
  }

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
  setActive(index);
}

window.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");
  for (const root of carousels) initCarousel(root);
});
