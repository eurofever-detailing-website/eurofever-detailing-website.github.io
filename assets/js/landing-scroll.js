// assets/js/landing-scroll.js
(() => {
  const trigger = document.querySelector(".landingbrand__button--ghost");
  if (!trigger) return;

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#about-panel");
    if (!target) return;

    const start = window.scrollY;
    const top = target.getBoundingClientRect().top + window.scrollY;
    const change = top - start;
    const duration = 1000; 
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      window.scrollTo(0, start + change * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });
})();
