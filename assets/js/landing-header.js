(() => {
  // how far to scroll before showing header
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

  // run once on load (in case page is refreshed mid-scroll)
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// FIXME swap with above once header looks appropriate and i have at least two panels ready
// (() => {
//   const body = document.body;
//   if (!body.classList.contains("landing")) return;

//   const landing = document.querySelector(".landingbrand");
//   if (!landing) {
//     // Fallback: if landingbrand isn't present, just show header.
//     body.classList.add("landing--show-header");
//     return;
//   }

//   const observer = new IntersectionObserver(
//     ([entry]) => {
//       // If landing section is visible, hide header. If not, show it.
//       if (entry.isIntersecting) {
//         body.classList.remove("landing--show-header");
//       } else {
//         body.classList.add("landing--show-header");
//       }
//     },
//     {
//       root: null,
//       threshold: 0.01,
//       // Tweak this if you want header to appear a bit earlier/later:
//       // negative top margin means "consider it gone a bit sooner"
//       rootMargin: "-20px 0px 0px 0px",
//     }
//   );

//   observer.observe(landing);
// })();
