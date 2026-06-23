function initVinylPlayer() {
  var player = document.getElementById("vinylPlayer");
  var record = document.getElementById("vinylRecord");
  var body = document.getElementById("vinylBody");
  var title = document.getElementById("vinylTitle");
  var artist = document.getElementById("vinylArtist");
  var closeBtn = document.getElementById("vinylClose");
  if (!player) return;

  fetch("data/site.json?v=" + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.currently && data.currently.listening) {
        var parts = data.currently.listening.split("\u300a");
        artist.textContent = parts[0] || "";
        title.textContent = "\u300a" + (parts[1] || "");
      }
    })
    .catch(function() {
      title.textContent = "\u968f\u673a\u542c\u542c";
    });

  player.addEventListener("click", function(e) {
    if (e.target === closeBtn) return;
    player.classList.toggle("expanded");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      player.classList.remove("expanded");
    });
  }

  // 默认显示
  player.style.display = "flex";
}

if (typeof window !== "undefined") window.initVinylPlayer = initVinylPlayer;
