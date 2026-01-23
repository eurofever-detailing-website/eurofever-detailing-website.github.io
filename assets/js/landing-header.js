(() => {
  const SHOW_AFTER_PX = 40;

  const body = document.body;
  if (!body.classList.contains("landing")) return;

  const onScroll = () => {
    if (window.scrollY > SHOW_AFTER_PX) {
      body.classList.add("landing--show-header");
    } else {
      body.classList.remove("landing--show-header");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
