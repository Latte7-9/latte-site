document.addEventListener("scroll", function() {
  var nav = document.querySelector(".nav-glass");
  if (!nav) return;
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});
