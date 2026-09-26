const navbarToggle = document.querySelector(".c-navbar__toggle");
const navbar = document.querySelector(".c-navbar");
const navbarLinks = document.querySelectorAll(".c-navbar__panel a");
const navPageLinks = document.querySelectorAll(".c-navbar__link");
const navbarLabels = {
  en: {
    open: "Open menu",
    close: "Close menu",
  },
  es: {
    open: "Abrir menú",
    close: "Cerrar menú",
  },
};

const currentPath = window.location.pathname.endsWith("/") ? "/index.html" : window.location.pathname;

for (const link of navPageLinks) {
  if (link.pathname === currentPath) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
}

if (navbarToggle && navbar) {
  const updateNavbarLabel = () => {
    const lang = document.documentElement.lang || "en";
    const isOpen = navbarToggle.getAttribute("aria-expanded") === "true";
    const labels = navbarLabels[lang] || navbarLabels.en;
    navbarToggle.setAttribute("aria-label", isOpen ? labels.close : labels.open);
  };

  navbarToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");
    navbarToggle.setAttribute("aria-expanded", String(isOpen));
    updateNavbarLabel();
  });

  for (const link of navbarLinks) {
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      navbarToggle.setAttribute("aria-expanded", "false");
      updateNavbarLabel();
    });
  }

  document.addEventListener("languagechange", updateNavbarLabel);
}
