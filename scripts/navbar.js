const navbarToggle = document.querySelector(".c-navbar__toggle");
const navbarMenu = document.querySelector(".c-navbar__menu");
const navbarLinks = document.querySelectorAll(".c-navbar__menu a");
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

if (navbarToggle && navbarMenu) {
  const updateNavbarLabel = () => {
    const lang = document.documentElement.lang || "en";
    const isOpen = navbarToggle.getAttribute("aria-expanded") === "true";
    const labels = navbarLabels[lang] || navbarLabels.en;
    navbarToggle.setAttribute("aria-label", isOpen ? labels.close : labels.open);
  };

  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("is-open");
    navbarToggle.setAttribute("aria-expanded", String(isOpen));
    updateNavbarLabel();
  });

  for (const link of navbarLinks) {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("is-open");
      navbarToggle.setAttribute("aria-expanded", "false");
      updateNavbarLabel();
    });
  }

  document.addEventListener("languagechange", updateNavbarLabel);
}
