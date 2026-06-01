async function includePartials() {
  const includeNodes = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(
    includeNodes.map(async (node) => {
      const path = node.getAttribute("data-include");
      if (!path) return;

      const url = new URL(path, window.location.href);
      url.searchParams.set("v", String(Date.now()));

      const response = await fetch(url.toString(), { cache: "no-store" });
      if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);

      node.innerHTML = await response.text();
      node.removeAttribute("data-include");
    }),
  );
}

function hydrateFooterYear() {
  const yearNodes = document.querySelectorAll("[data-year]");
  const year = String(new Date().getFullYear());
  for (const node of yearNodes) node.textContent = year;
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await includePartials();
    hydrateFooterYear();
  } catch (error) {
    console.error(error);
  }
});
