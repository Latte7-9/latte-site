function initScrollAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".fade-up").forEach(function(el) {
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
    });
  });

  var gridBg = document.querySelector(".grid-background");
  if (gridBg) {
    var isPhone = /Mobile|Android/i.test(navigator.userAgent);
    gsap.to(gridBg, { yPercent: isPhone ? 8 : 20, ease: "none",
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: isPhone ? 0.5 : 1 }
    });
  }

  var progressBar = document.getElementById("reading-progress");
  if (progressBar) {
    gsap.to(progressBar, { width: "100%", ease: "none",
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.3 }
    });
  }
}

if (typeof window !== "undefined") window.initScrollAnimations = initScrollAnimations;