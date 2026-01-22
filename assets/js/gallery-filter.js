(() => {
  const gallery = document.querySelector(".post-gallery");
  if (!gallery) return;

  const panel = gallery.querySelector(".post-gallery__filter-panel");
  const packageSelect = gallery.querySelector("#gallery-filter-package");
  const brandSelect = gallery.querySelector("#gallery-filter-brand");
  const tiles = Array.from(gallery.querySelectorAll(".post-tile"));
  const filterButtons = Array.from(gallery.querySelectorAll("[data-filter-target]"));
  const clearButton = gallery.querySelector("[data-filter-clear]");

  if (!panel || !packageSelect || !brandSelect || tiles.length === 0) return;

  const openPanel = () => {
    gallery.classList.add("post-gallery--filters-open");
    panel.setAttribute("aria-hidden", "false");
  };

  const closePanel = () => {
    gallery.classList.remove("post-gallery--filters-open");
    panel.setAttribute("aria-hidden", "true");
  };

  const applyFilters = () => {
    const packageValue = packageSelect.value;
    const brandValue = brandSelect.value;

    tiles.forEach((tile) => {
      const title = tile.dataset.title || "";
      const brand = tile.dataset.brand || "";
      const matchesPackage = !packageValue || title === packageValue;
      const matchesBrand = !brandValue || brand === brandValue;
      tile.style.display = matchesPackage && matchesBrand ? "" : "none";
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openPanel();
      const target = button.getAttribute("data-filter-target");
      if (target === "package") {
        packageSelect.focus();
      }
      if (target === "brand") {
        brandSelect.focus();
      }
    });
  });

  packageSelect.addEventListener("change", applyFilters);
  brandSelect.addEventListener("change", applyFilters);

  clearButton?.addEventListener("click", () => {
    packageSelect.value = "";
    brandSelect.value = "";
    applyFilters();
    closePanel();
  });
})();
