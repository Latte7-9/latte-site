(function() {
  var introLayer = document.getElementById("intro-layer");
  var blob = document.getElementById("introBlob");
  var particles = document.getElementById("introParticles");
  var content = document.querySelector(".intro-content");
  var hint = document.querySelector(".intro-hint");
  var hasEntered = false;

  function createParticles(count) {
    for (var i = 0; i < count; i++) {
      var p = document.createElement("div");
      p.className = "intro-particle";
      var colors = ["#ff3d71", "#00d4aa", "#ffb800", "#2990c0", "#7c4dff"];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      var size = 2 + Math.random() * 5;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = "50%";
      p.style.top = "50%";
      p.style.opacity = "0";
      p.style.boxShadow = "0 0 " + (4 + Math.random() * 8) + "px " + p.style.background;
      particles.appendChild(p);
    }
  }

  function playIntroAnimation() {
    if (!blob || !content || !hint) return;
    createParticles(25);
    var tl = gsap.timeline();

    tl.set(blob, { width: 0, height: 0, opacity: 0, left: "50%", top: "50%", xPercent: -50, yPercent: -50 })
      .to(blob, { width: 80, height: 80, opacity: 0.4, duration: 0.5, ease: "power2.out" })
      .to(blob, { width: 200, height: 200, opacity: 0.7, duration: 1, ease: "power3.inOut",
        borderRadius: "45% 55% 60% 40% / 50% 55% 45% 50%" })
      .to(blob, { borderRadius: "60% 40% 30% 70% / 55% 45% 55% 45%",
        width: 250, height: 180, opacity: 0.8, duration: 0.5, ease: "power2.inOut" })
      .to(blob, { borderRadius: "40% 60% 55% 45% / 60% 40% 50% 50%",
        width: 200, height: 220, duration: 0.5, ease: "power2.inOut" })
      .to(blob, { width: 400, height: 400, opacity: 0, filter: "blur(40px)",
        duration: 0.7, ease: "power3.out" }, "-=0.2")
      .to(".intro-particle", {
        opacity: 0.7,
        x: function() { return (Math.random() - 0.5) * 300; },
        y: function() { return (Math.random() - 0.5) * 300; },
        scale: function() { return 0.5 + Math.random() * 1.5; },
        stagger: 0.03, duration: 0.8, ease: "power2.out"
      }, "<")
      .to(".intro-particle", { opacity: 0, duration: 0.6, ease: "power2.in" }, "+=0.3")
      .to(content, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(hint, { opacity: 1, duration: 0.4, ease: "power2.out" }, "+=0.3");
  }

  function switchToMain() {
    if (hasEntered) return;
    hasEntered = true;
    try { sessionStorage.setItem("latte_visited", "1"); } catch(e) {}
    if (typeof stopParticles === "function") stopParticles();

    var mc = document.getElementById("main-content");

    // 主页初始状态：微下沉 + 透明，准备接住 intro 退场后浮起
    if (mc) {
      mc.classList.remove("intro-active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      gsap.set(mc, { opacity: 0, y: 80, filter: "blur(4px)" });
    }

    introLayer.style.overflow = "visible";

    var tl = gsap.timeline({
      onComplete: function() {
        introLayer.style.display = "none";
        introLayer.style.transform = "";
        introLayer.style.overflow = "";
        introLayer.style.background = "";
        if (mc) mc.style.filter = "";
        if (typeof initScrollAnimations === "function") initScrollAnimations();
        if (typeof initGridBackground === "function") initGridBackground();
      }
    });

    tl
      // 阶段1: 文字消失 + blob 爆裂
      .to(content, { opacity: 0, duration: 0.18, ease: "power2.in" })
      .to(hint, { opacity: 0, duration: 0.12, ease: "power2.in" }, "<")
      .to(blob, {
        width: window.innerWidth * 3.5, height: window.innerHeight * 3.5,
        opacity: 0.92, filter: "blur(0px)",
        duration: 0.5, ease: "power3.in"
      }, "-=0.1")
      .to(introLayer, {
        background: "radial-gradient(ellipse at center, rgba(0,212,170,0.2) 0%, rgba(10,10,10,1) 65%)",
        duration: 0.15
      }, "-=0.25")
      // 阶段2: 墨色沉降
      .to(introLayer, {
        background: "#0a0a0a",
        duration: 0.3, ease: "power2.out"
      })
      // 阶段3: intro 下沉消失 ← → 主页上升浮现（同步进行）
      .to(introLayer, {
        y: "100%",
        opacity: 0,
        duration: 1.0,
        ease: "power4.inOut"
      }, "+=0.1")
      .to(mc, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out"
      }, "-=1.0");
  }

  function initIntro() {
    if (!introLayer) return;
    var mc = document.getElementById("main-content");
    if (mc) mc.classList.add("intro-active");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    playIntroAnimation();

    hint.addEventListener("click", function(e) { e.preventDefault(); switchToMain(); });
    document.addEventListener("wheel", function(e) {
      if (!hasEntered && e.deltaY > 0) switchToMain();
    }, { passive: true });
    var startY = 0;
    document.addEventListener("touchstart", function(e) {
      if (e.touches.length === 1) startY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener("touchend", function(e) {
      if (!hasEntered && introLayer && introLayer.style.display !== "none") {
        if (startY - e.changedTouches[0].clientY > 50) switchToMain();
      }
    }, { passive: true });
  }

  window.initIntro = initIntro;
})();