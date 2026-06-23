/* ====== 黑胶播放器 v2.7 —— 预置 iframe + src 赋值 + clip-path 面板 ====== */

(function() {
  var player, record, panel, title, artist, iframeWrap, closeBtn, ripple, vinylFrame;
  var state = "hidden";
  var top1Song = null;
  var autoRetractTimer = null;
  var _vinylInitDone = false;
  var iframeSrcSet = false;

  function getAPIBase() {
    var host = window.location.hostname;
    return (host === "localhost" || host === "127.0.0.1")
      ? "" : "https://latte-site-production.up.railway.app";
  }

  async function fetchTop1() {
    try {
      var r = await fetch(getAPIBase() + "/api/netease/weekly");
      var d = await r.json();
      if (d.songs && d.songs.length > 0) {
        top1Song = d.songs[0];
        title.textContent = top1Song.name;
        artist.textContent = top1Song.artists;
        return true;
      }
    } catch(e) { console.warn("Vinyl: API unavailable", e); }
    title.textContent = "随机听听";
    artist.textContent = "";
    return false;
  }

  /* 设置 iframe src 并显示 */
  function loadIframe() {
    if (iframeSrcSet || !top1Song || !top1Song.id || !vinylFrame) return;
    iframeSrcSet = true;
    vinylFrame.src = "https://music.163.com/outchain/player?type=2&id=" +
      top1Song.id + "&auto=1&height=66";
    vinylFrame.style.display = "block";
  }

  function inkDropEntrance() {
    if (state !== "hidden") return;
    state = "entering";
    player.style.display = "flex";
    player.classList.add("ink-entering");
    setTimeout(function() {
      player.classList.remove("ink-entering");
      player.classList.add("idle");
      state = "idle";
      setTimeout(function() {
        if (state === "idle") expand();
      }, 1500);
    }, 750);
  }

  function expand() {
    if (state !== "idle") return;
    state = "expanded";
    clearTimeout(autoRetractTimer);
    player.style.display = "flex";
    player.classList.add("expanded");

    if (!autoRetractTimer) {
      autoRetractTimer = setTimeout(function() { retract(); }, 6000);
    }
  }

  function retract() {
    if (state !== "expanded") return;
    state = "idle";
    clearTimeout(autoRetractTimer);
    autoRetractTimer = null;
    player.classList.remove("expanded");
    player.style.display = "flex";
  }

  var _eventsBound = false;
  function bindEvents() {
    if (_eventsBound) return;
    _eventsBound = true;

    record.addEventListener("click", function(e) {
      e.stopPropagation();
      if (state === "idle") { loadIframe(); expand(); }
      else if (state === "expanded") retract();
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        retract();
      });
    }

    document.addEventListener("click", function(e) {
      if (state === "expanded" && !player.contains(e.target)) {
        retract();
      }
    });
  }

  async function init() {
    if (_vinylInitDone) return;
    _vinylInitDone = true;

    player = document.getElementById("vinylPlayer");
    record = document.getElementById("vinylRecord");
    panel = document.getElementById("vinylPanel");
    title = document.getElementById("vinylTitle");
    artist = document.getElementById("vinylArtist");
    iframeWrap = document.getElementById("vinylIframe");
    closeBtn = document.getElementById("vinylClose");
    ripple = document.getElementById("vinylRipple");
    vinylFrame = document.getElementById("vinylFrame");

    if (!player || !record) return;
    bindEvents();
    await fetchTop1();

    var introLayer = document.getElementById("intro-layer");
    var visited = false;
    try { visited = sessionStorage.getItem("latte_visited"); } catch(e) {}
    if (visited || (introLayer && introLayer.style.display === "none")) {
      setTimeout(function() { inkDropEntrance(); }, 600);
    }
  }

  // 用户点「进入」→ 加载 iframe + 墨滴入场
  window.triggerVinylEntrance = function() {
    if (state === "hidden") {
      loadIframe();
      inkDropEntrance();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.initVinylPlayer = init;
})();