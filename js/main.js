// ====== 入场层逻辑 ======
var introLayer = document.getElementById("intro-layer");
var mainContent = document.getElementById("main-content");
var hasEntered = false;

function typeSubtitle(el, text) {
  if (!el || !text) { el && (el.textContent = "记录与分享"); return; }
  el.textContent = "";
  var chars = text.split("");
  chars.forEach(function(ch, i) {
    var span = document.createElement("span");
    span.textContent = ch;
    span.style.animationDelay = (0.06 * i) + "s";
    el.appendChild(span);
  });
}

function initIntroText() {
  var titleEl = document.getElementById("introTitle");
  var subtitleEl = document.getElementById("introSubtitle");
  
  fetch("data/site.json?v=" + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.name && titleEl) titleEl.textContent = data.name;
      if (data.tagline && subtitleEl) typeSubtitle(subtitleEl, data.tagline);
    })
    .catch(function() {
      if (titleEl) titleEl.textContent = "Latte";
      if (subtitleEl) typeSubtitle(subtitleEl, "记录与分享");
    });
}

function switchToMain() {
  if (hasEntered) return;
  hasEntered = true;
  
  try { sessionStorage.setItem("latte_visited", "1"); } catch(e) {}
  if (typeof switchPage !== "undefined") switchPage.switched = true;
  
  if (typeof stopParticles === "function") stopParticles();
  
  // SVG path morphing
  var shapePath = document.querySelector(".shape path");
  if (shapePath && shapePath.getAttribute("data-original")) {
    shapePath.setAttribute("d", shapePath.getAttribute("data-original"));
  }
  
  // anime.js intro exit animation
  var introWrap = document.querySelector(".intro-wrap");
  if (introWrap && typeof anime !== "undefined") {
    anime({
      targets: ".intro-wrap > *",
      opacity: 0,
      translateY: -30,
      delay: anime.stagger(50),
      duration: 400,
      easing: "easeInQuad",
      complete: function() {
        if (introLayer) {
          introLayer.classList.add("hidden");
          setTimeout(function() {
            if (introLayer.parentNode) introLayer.style.display = "none";
          }, 200);
        }
      }
    });
  } else {
    if (introLayer) {
      introLayer.classList.add("hidden");
      setTimeout(function() {
        if (introLayer.parentNode) introLayer.style.display = "none";
      }, 900);
    }
  }
  
  // Show main content
  if (mainContent) {
    mainContent.classList.remove("intro-active");
    
    // anime.js fade-in for sections
    if (typeof anime !== "undefined") {
      anime({
        targets: "#main-content .fade-in",
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(80, { start: 300 }),
        duration: 600,
        easing: "easeOutCubic",
        begin: function() {
          document.querySelectorAll(".fade-in").forEach(function(el) {
            el.classList.add("visible");
          });
        }
      });
    } else {
      setTimeout(function() {
        document.querySelectorAll(".fade-in").forEach(function(el) {
          el.classList.add("visible");
        });
      }, 300);
    }
    
    // Initialize grid background
    if (typeof initGridBackground === "function") {
      initGridBackground();
    }
  }
  
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

function bindIntroEvents() {
  var enterEl = document.querySelector(".intro-enter");
  var arrowEls = document.querySelectorAll(".intro-arrow");
  
  if (enterEl) {
    enterEl.addEventListener("click", function(e) {
      e.preventDefault();
      switchToMain();
    });
  }
  
  arrowEls.forEach(function(el) {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      switchToMain();
    });
  });
  
  document.addEventListener("wheel", function(e) {
    if (!hasEntered && introLayer && introLayer.style.display !== "none") {
      if (e.deltaY > 0) switchToMain();
    }
  }, { passive: true });
  
  var startY = 0;
  document.addEventListener("touchstart", function(e) {
    if (e.touches.length === 1) startY = e.touches[0].clientY;
  }, { passive: true });
  
  document.addEventListener("touchend", function(e) {
    if (!hasEntered && introLayer && introLayer.style.display !== "none") {
      var endY = e.changedTouches[0].clientY;
      if (startY - endY > 50) switchToMain();
    }
  }, { passive: true });
}

function initIntro() {
  if (!introLayer || !mainContent) return;
  
  var visited = false;
  try { visited = sessionStorage.getItem("latte_visited"); } catch(e) {}
  
  if (visited) {
    introLayer.style.display = "none";
    mainContent.classList.remove("intro-active");
    return;
  }
  
  mainContent.classList.add("intro-active");
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  
  initIntroText();
  bindIntroEvents();
}

if (document.getElementById("intro-layer")) {
  initIntro();
}

// Shared JS for Latte's site

async function loadJSON(path) {
  const res = await fetch(path + '?v=' + Date.now());
  return res.json();
}

const ICONS = {
  camera: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="26" r="8" stroke="#2471a3" stroke-width="1.8" fill="none"/><circle cx="24" cy="26" r="4.5" stroke="#2471a3" stroke-width="1.5" fill="none"/><rect x="6" y="14" width="36" height="24" rx="4" stroke="#2471a3" stroke-width="1.8" fill="none"/><rect x="14" y="10" width="8" height="6" rx="2" stroke="#2471a3" stroke-width="1.5" fill="none"/><circle cx="32" cy="19" r="1" fill="#7ab0d4"/></svg>',
  book: '<svg viewBox="0 0 48 48" fill="none"><path d="M12 36V12l12-2v26l-12 2z" stroke="#2471a3" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M36 36V12L24 10v26l12-2z" stroke="#2471a3" stroke-width="1.8" fill="none" stroke-linejoin="round"/><line x1="12" y1="36" x2="36" y2="36" stroke="#2471a3" stroke-width="1.8"/></svg>',
  sparkle: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="2" fill="#2471a3"/><line x1="24" y1="8" x2="24" y2="15" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/><line x1="24" y1="33" x2="24" y2="40" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="24" x2="15" y2="24" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/><line x1="33" y1="24" x2="40" y2="24" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/><line x1="12.3" y1="12.3" x2="17.3" y2="17.3" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/><line x1="30.7" y1="30.7" x2="35.7" y2="35.7" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/><line x1="35.7" y1="12.3" x2="30.7" y2="17.3" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/><line x1="17.3" y1="30.7" x2="12.3" y2="35.7" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/></svg>',
  mountain: '<svg viewBox="0 0 48 48" fill="none"><path d="M4 38 L16 18 L24 26 L32 12 L44 38" stroke="#2471a3" stroke-width="1.8" fill="none" stroke-linejoin="round"/><line x1="4" y1="38" x2="44" y2="38" stroke="#a0c8e0" stroke-width="1" stroke-dasharray="3 3"/><circle cx="32" cy="12" r="2" stroke="#2471a3" stroke-width="1.2" fill="none"/></svg>'
};

// ── Render Homepage ──
async function renderHome() {
  try {
  const data = await loadJSON('data/site.json');
  if (!data) return;

  const hero = document.querySelector('.hero .container');
  if (hero) hero.innerHTML = '<div class="hero-geo circle"></div><div class="hero-geo triangle"></div><div class="hero-geo diamond"></div><div class="hero-geo dot-ring"></div><h1>你好，我是 ' + data.name + '</h1><p class="tagline">' + data.tagline + '</p>';

  const about = document.querySelector('.about .container');
  if (about) about.innerHTML = '<div class="geo-accent"></div><div class="section-label">关于</div><p>' + data.about + '</p><div class="dot-divider"><span></span><span></span><span></span></div>';

  const currentlyEl = document.querySelector('.currently .container');
  if (currentlyEl && data.currently) {
    var c = data.currently;
    currentlyEl.innerHTML = '<div class="section-label">当下</div><div class="currently-grid">' +
      '<div class="currently-item"><span class="currently-key">在读</span><span>' + (c.reading || '') + '</span></div>' +
      '<div class="currently-item"><span class="currently-key">在听</span><span>' + (c.listening || '') + '</span></div>' +
      '<div class="currently-item"><span class="currently-key">在学</span><span>' + (c.learning || '') + '</span></div>' +
      '<div class="currently-item"><span class="currently-key">在做</span><span>' + (c.workingOn || '') + '</span></div>' +
      '</div>';
  }

  const grid = document.querySelector('.interest-grid');
  if (grid) {
    grid.innerHTML = data.interests.map(i =>
      '<a class="interest-card" href="' + i.page + '"><div class="icon">' + (ICONS[i.icon] || '') + '</div><span class="label">' + i.name + '</span><span class="card-arrow">探索 &rarr;</span></a>'
    ).join('');
  }

  const bookList = document.querySelector('.book-list');
  if (bookList && data.books) {
    bookList.innerHTML = data.books.map(b =>
      '<div class="book-item"><img class="book-cover" src="' + b.cover + '" alt="' + b.title + '"><div class="book-info">' + b.title + '<span class="author">' + b.author + '</span></div></div>'
    ).join('');
  }

  const contactLinks = document.querySelector('.contact-links');
  if (contactLinks) contactLinks.innerHTML = '<a href="mailto:' + data.contact.email + '">' + data.contact.email + '</a>';

    renderHomeBlog();
    document.querySelectorAll('.fade-in').forEach(function(el) { el.classList.add('visible'); });
  } catch(e) {
    console.error('renderHome error:', e);
    renderHomeBlog();
    document.querySelectorAll('.fade-in').forEach(function(el) { el.classList.add('visible'); });
  }
}

// ── Render blog preview on homepage ──
async function renderHomeBlog() {
  const list = document.getElementById('homeBlogList');
  if (!list) return;
  try {
    const res = await fetch('data/blog.json?v=' + Date.now());
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if (!data.posts || !data.posts.length) { list.innerHTML = '<div class="blog-empty">还没有博客文章</div>'; return; }
    list.innerHTML = data.posts.slice(-3).reverse().map(p =>
      '<a class="blog-card" href="blog/posts/' + p.file + '"><div class="date">' + p.date + '</div><h3>' + p.title + '</h3><div class="summary">' + p.summary + '</div></a>'
    ).join('');
  } catch(e) { list.innerHTML = '<div class="blog-empty">还没有博客文章</div>'; }
}

// ── Render Blog Listing ──
async function renderBlog() {
  const data = await loadJSON('../data/blog.json');
  const list = document.querySelector('.blog-list');
  if (!list) return;
  if (!data.posts || data.posts.length === 0) {
    list.innerHTML = '<div class="blog-empty">还没有博客文章</div>'; return;
  }
  list.innerHTML = [...data.posts].reverse().map(p =>
    '<a class="blog-card" href="posts/' + p.file + '"><div class="date">' + p.date + '</div><h3>' + p.title + '</h3><div class="summary">' + p.summary + '</div></a>'
  ).join('');
}

// ── Render Interest Sub-page ──
async function renderInterestPage() {
  const data = await loadJSON('../data/site.json');
  if (!data) return;
  const pageName = window.location.pathname.split('/').pop().replace('.html', '');
  const pageMap = { 'photography': 'camera', 'books': 'book', 'hobbies': 'sparkle', 'hiking': 'mountain' };
  const iconKey = pageMap[pageName];
  let interest = null;
  for (const i of data.interests) {
    if (i.icon === iconKey || i.page.includes(pageName)) { interest = i; break; }
  }
  if (!interest) return;

  const header = document.querySelector('.interest-page .container');
  if (header) {
    header.innerHTML =
      '<a class="back-link" href="../index.html"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#2471a3" stroke-width="1.5" stroke-linecap="round"/></svg>返回首页</a>' +
      '<h1>' + interest.name + '</h1>' +
      '<p class="sub-desc">' + (interest.description || '') + '</p>';
  }

  const content = document.querySelector('.interest-content-area');
  if (!content) return;

  if (pageName === 'photography') renderPhotographyPage(interest);
  else if (pageName === 'books') renderBooksPage(interest);
  else if (pageName === 'hobbies') renderHobbiesPage(interest);
  else if (pageName === 'hiking') renderHikingPage(interest);
}

// ── Photography Page ──
function renderPhotographyPage(interest) {
  const content = document.querySelector('.interest-content-area');
  const albums = interest.albums || [];

  if (albums.length === 0) {
    content.innerHTML = '<div class="album-empty">还没有创建图集</div>';
    return;
  }

  var albumIdx = 0;
  var hash = window.location.hash.replace('#album', '');
  if (hash) { var i = parseInt(hash); if (i >= 0 && i < albums.length) albumIdx = i; }

  var album = albums[albumIdx];
  var html = '';
  if (albums.length > 1) {
    html += '<div class="book-tabs" style="margin-bottom:1.5rem">';
    albums.forEach(function(a, i) {
      html += '<button class="' + (i === albumIdx ? 'active' : '') + '" onclick="location.hash=\'album' + i + '\';location.reload()">' + a.name + '</button>';
    });
    html += '</div>';
  }

  html += '<div class="interest-gallery">';
  if (album.images && album.images.length) {
    html += album.images.map(function(img) {
      return '<div class="gallery-item"><img src="../' + img + '" alt="" loading="lazy"></div>';
    }).join('');
  } else {
    html += '<div class="album-empty">暂无照片</div>';
  }
  html += '</div>';

  if (album.journal) {
    html += '<div class="album-journal"><h3>随笔</h3><div class="journal-content">' + album.journal + '</div></div>';
  }

  content.innerHTML = html;
}

// ── Books Page ──
function renderBooksPage(interest) {
  const content = document.querySelector('.interest-content-area');
  var read = interest.read || [];
  var reading = interest.reading || [];
  var wantToRead = interest.wantToRead || [];

  var html = '<div class="book-tabs">';
  html += '<button class="active" onclick="switchBookTab(\'read\')">已读</button>';
  html += '<button onclick="switchBookTab(\'reading\')">正在阅读</button>';
  html += '<button onclick="switchBookTab(\'want\')">想要阅读</button>';
  html += '</div>';

  html += '<div class="book-tab-content active" id="tab-read">';
  if (read.length) {
    html += '<div class="book-list">' + read.map(function(b) {
      return '<div class="book-item"><img class="book-cover" src="../' + b.cover + '" alt="' + b.title + '"><div class="book-info">' + b.title + '<span class="author">' + b.author + '</span>' +
        (b.review ? '<span class="book-review-trigger">我的感想<div class="book-review-popup">' + b.review + '</div></span>' : '') +
        '</div></div>';
    }).join('') + '</div>';
  } else { html += '<div class="album-empty">还没有已读书籍</div>'; }
  html += '</div>';

  html += '<div class="book-tab-content" id="tab-reading">';
  if (reading.length) {
    html += '<div class="book-list">' + reading.map(function(b) {
      return '<div class="book-item"><img class="book-cover" src="../' + b.cover + '" alt="' + b.title + '"><div class="book-info">' + b.title + '<span class="author">' + b.author + '</span>' +
        (b.review ? '<span class="book-review-trigger">我的感想<div class="book-review-popup">' + b.review + '</div></span>' : '') +
        '</div></div>';
    }).join('') + '</div>';
  } else { html += '<div class="album-empty">还没有正在读的书</div>'; }
  html += '</div>';

  html += '<div class="book-tab-content" id="tab-want">';
  if (wantToRead.length) {
    html += '<div class="book-list">' + wantToRead.map(function(b) {
      return '<div class="book-item"><img class="book-cover" src="../' + b.cover + '" alt="' + b.title + '"><div class="book-info">' + b.title + '<span class="author">' + b.author + '</span></div></div>';
    }).join('') + '</div>';
  } else { html += '<div class="album-empty">还没有想读的书</div>'; }
  html += '</div>';

  content.innerHTML = html;
}

function switchBookTab(tab) {
  document.querySelectorAll('.book-tabs button').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.book-tab-content').forEach(function(c) { c.classList.remove('active'); });
  event.target.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

// ── Hobbies Page ──
function renderHobbiesPage(interest) {
  const content = document.querySelector('.interest-content-area');
  var hobbies = interest.hobbies || [];
  if (hobbies.length === 0) {
    content.innerHTML = '<div class="album-empty">还没有添加爱好</div>';
    return;
  }
  content.innerHTML = '<div class="hobby-tags">' + hobbies.map(function(h) {
    return '<span class="hobby-tag">' + h + '</span>';
  }).join('') + '</div><p style="color:#aaa;text-align:center;margin-top:2rem;font-size:0.92rem;">这些都是我曾经认真投入过的「三分钟热度」，每一项都值得纪念。</p>';
}

// ── Hiking Page ──
function renderHikingPage(interest) {
  const content = document.querySelector('.interest-content-area');
  var climbed = interest.climbed || [];
  var wantToClimb = interest.wantToClimb || [];
  var images = interest.images || [];
  var journal = interest.journal || '';

  var html = '<div class="book-tabs">';
  html += '<button class="active" onclick="switchBookTab(\'climbed\')">已登山脉</button>';
  html += '<button onclick="switchBookTab(\'wantClimb\')">想要征服</button>';
  if (journal) html += '<button onclick="switchBookTab(\'journal\')">随笔</button>';
  if (images.length) html += '<button onclick="switchBookTab(\'photos\')">照片</button>';
  html += '</div>';

  html += '<div class="book-tab-content active" id="tab-climbed">';
  if (climbed.length) {
    html += '<div class="mountain-list">' + climbed.map(function(m) {
      return '<div class="mountain-card"><div class="mountain-icon">' + ICONS.mountain + '</div><div class="mountain-info"><div class="mountain-name">' + m.name + '</div><div class="mountain-detail">' + (m.date || '') + (m.note ? ' · ' + m.note : '') + '</div></div><span class="tag-climbed">已登顶</span></div>';
    }).join('') + '</div>';
  } else { html += '<div class="album-empty">还没有已登山脉</div>'; }
  html += '</div>';

  html += '<div class="book-tab-content" id="tab-wantClimb">';
  if (wantToClimb.length) {
    html += '<div class="mountain-list">' + wantToClimb.map(function(m) {
      return '<div class="mountain-card"><div class="mountain-icon">' + ICONS.mountain + '</div><div class="mountain-info"><div class="mountain-name">' + m.name + '</div>' + (m.reason ? '<div class="mountain-detail">' + m.reason + '</div>' : '') + '</div><span class="tag-wanted">想要征服</span></div>';
    }).join('') + '</div>';
  } else { html += '<div class="album-empty">还没有想要征服的山</div>'; }
  html += '</div>';

  if (journal) {
    html += '<div class="book-tab-content" id="tab-journal"><div class="album-journal"><div class="journal-content">' + journal + '</div></div></div>';
  }

  if (images.length) {
    html += '<div class="book-tab-content" id="tab-photos"><div class="interest-gallery">' + images.map(function(img) { return '<div class="gallery-item"><img src="../' + img + '" alt="" loading="lazy"></div>'; }).join('') + '</div></div>';
  }

  content.innerHTML = html;
}

function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function highlightNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('/site/')))) {
      a.classList.add('active');
    }
  });
}

function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
var gbComments = [];
var GB_TOKEN = ["g","h","p","_","S","U","Q","x","m","s","W","L","D","v","6","X","k","U","n","e","Z","5","b","Y","H","G","j","s","k","e","x","4","b","f","3","3","3","a","f","O"].join("");
var geoShapes = [];
var geoRibbons = [];
var geoAnimId = null;
var geoMouse = { x: 0, y: 0, down: false, drag: null, ox: 0, oy: 0, isRibbon: false };
var geoInfo = null;
var geoNewIdx = -1;
var geoContainerW = 680;
var geoContainerH = 420;

// Pastel palette for shapes
var GEO_COLORS = [
  "#5b9bd5","#e8915c","#6cbe8a","#d47a8c","#5da8c4",
  "#e0a56b","#7fb8c8","#c47a9e","#68a8b4","#d89c78",
  "#8cb8c0","#c88c7c","#74b0c8","#d4908a","#80a8c0",
  "#c098a8","#90b0c4","#b090a0","#7ca8c8","#c4a090"
];
var RIBBON_COLORS = [
  "#d4c8c0","#c8d0d4","#d0ccc8","#ccd0cc","#d8d0cc",
  "#c4ccd0","#d0c4c8","#ccd4d0","#c8c8d0","#d4ccc8",
  "#ccd0c8","#c8ccd0","#d0c8d0","#c4d0cc","#d8ccc4"
];
var SHAPE_TYPES = ["circle","triangle","square","pentagon","hexagon"];

async function loadGuestbook() {
  try {
    var res = await fetch("data/comments.json?v=" + Date.now());
    if (!res.ok) { gbComments = []; renderGeoGuestbook(); return; }
    gbComments = await res.json();
    if (!Array.isArray(gbComments)) gbComments = [];
  } catch(e) { gbComments = []; }
  try {
    var local = JSON.parse(localStorage.getItem("gb_local") || "[]");
    local.forEach(function(c) {
      if (!gbComments.some(function(x) { return x.text === c.text && x.name === c.name && x.date === c.date; })) {
        gbComments.unshift(c);
      }
    });
  } catch(e) {}
  renderGeoGuestbook();
}

function roundedPolyPath(sides, r, cr) {
  var cx = 50, cy = 50;
  var pts = [];
  for (var i = 0; i < sides; i++) {
    var a = (Math.PI*2*i)/sides - Math.PI/2;
    pts.push({x: cx + r*Math.cos(a), y: cy + r*Math.sin(a)});
  }
  var d = '';
  for (var i = 0; i < sides; i++) {
    var p0 = pts[(i+sides-1)%sides], p1 = pts[i], p2 = pts[(i+1)%sides];
    var dx1 = p0.x - p1.x, dy1 = p0.y - p1.y, len1 = Math.sqrt(dx1*dx1+dy1*dy1) || 1;
    var dx2 = p2.x - p1.x, dy2 = p2.y - p1.y, len2 = Math.sqrt(dx2*dx2+dy2*dy2) || 1;
    var t1 = Math.min(cr/len1, 0.45), t2 = Math.min(cr/len2, 0.45);
    var a1x = p1.x + dx1*t1, a1y = p1.y + dy1*t1;
    var a2x = p1.x + dx2*t2, a2y = p1.y + dy2*t2;
    if (i === 0) d += 'M'+a1x.toFixed(1)+' '+a1y.toFixed(1);
    d += ' L'+a1x.toFixed(1)+' '+a1y.toFixed(1);
    d += ' Q'+p1.x.toFixed(1)+' '+p1.y.toFixed(1)+' '+a2x.toFixed(1)+' '+a2y.toFixed(1);
  }
  d += ' Z';
  return d;
}

function renderGeoGuestbook() {
  var container = document.getElementById("guestbookList");
  if (!container) return;
  if (geoAnimId) { cancelAnimationFrame(geoAnimId); geoAnimId = null; }
  
  if (!gbComments || !gbComments.length) {
    container.innerHTML = '<div style="color:#bbb;font-size:0.92rem;text-align:center;padding:3rem 0">还没有留言，来说点什么吧 ✨</div>';
    geoShapes = []; geoRibbons = [];
    return;
  }
  
  // Double container: outer visual frame + inner physics area
  container.innerHTML = '';
  container.style.cssText = 'position:relative;padding:12px;background:#e8e8e8;border-radius:24px;box-shadow:0 4px 30px rgba(0,0,0,0.04)';
  container.setAttribute('data-geo', '1');
  
  var inner = document.createElement('div');
  inner.className = 'geo-inner';
  inner.style.cssText = 'position:relative;height:420px;overflow:hidden;background:linear-gradient(180deg,#f8f8f8 0%,#f0f0f0 40%,#ececec 100%);border-radius:16px;cursor:grab;user-select:none;box-shadow:inset 0 0 40px rgba(0,0,0,0.03)';
  container.appendChild(inner);
  
  geoInfo = document.createElement('div');
  geoInfo.className = 'geo-info';
  geoInfo.innerHTML = '<div class="geo-info-inner"></div>';
  inner.appendChild(geoInfo);
  
  // SVG clip paths for rounded shapes
  var svgNS = 'http://www.w3.org/2000/svg';
  var svgEl = document.createElementNS(svgNS, 'svg');
  svgEl.setAttribute('width', '0'); svgEl.setAttribute('height', '0');
  svgEl.style.cssText = 'position:absolute;pointer-events:none';
  var defs = document.createElementNS(svgNS, 'defs');
  
  var clipDefs = {};
  SHAPE_TYPES.forEach(function(type) {
    var sides = type === 'circle' ? 50 : type === 'triangle' ? 3 : type === 'square' ? 4 : type === 'pentagon' ? 5 : 6;
    var clipId = 'rp_' + type;
    clipDefs[type] = clipId;
    var clip = document.createElementNS(svgNS, 'clipPath');
    clip.setAttribute('id', clipId);
    clip.setAttribute('clipPathUnits', 'objectBoundingBox');
    if (type === 'circle') {
      var circ = document.createElementNS(svgNS, 'circle');
      circ.setAttribute('cx', '0.5'); circ.setAttribute('cy', '0.5'); circ.setAttribute('r', '0.5');
      clip.appendChild(circ);
    } else {
      var path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', roundedPolyPath(sides, 48, 8));
      path.setAttribute('transform', 'scale(0.01)');
      clip.appendChild(path);
    }
    defs.appendChild(clip);
  });
  svgEl.appendChild(defs);
  inner.appendChild(svgEl);
  
  var W = inner.clientWidth || geoContainerW;
  var H = 420;
  var cols = Math.min(gbComments.length, 5);
  
  // Create shapes
  geoShapes = [];
  gbComments.slice(0, 30).forEach(function(c, i) {
    var shapeType = SHAPE_TYPES[i % SHAPE_TYPES.length];
    var color = GEO_COLORS[i % GEO_COLORS.length];
    var size = 50 + Math.floor(Math.random() * 6);
    var el = document.createElement('div');
    el.className = 'geo-shape geo-' + shapeType;
    var clipId = clipDefs[shapeType];
    var bg = 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5) 0%, ' + color + '99 60%, ' + color + 'cc 100%)';
    el.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;clip-path:url(#' + clipId + ');-webkit-clip-path:url(#' + clipId + ');background:' + bg + ';opacity:0.88;box-shadow:0 3px 12px rgba(0,0,0,0.07),inset 0 1px 0 rgba(255,255,255,0.3);transition:transform 0.1s,opacity 0.5s;z-index:1';
    el.setAttribute('data-idx', i);
    el.title = (c.name || '匿名') + '│' + (c.text || '').substring(0, 60);
    inner.appendChild(el);
    
    var isNew = (i === 0 && geoNewIdx === 0);
    var startY = isNew ? -size - 10 : 30 + Math.floor(i / cols) * 90 + Math.random() * 30;
    // Direct click handler - reliable fallback
    el.addEventListener('click', function(ev) {
      ev.stopPropagation();
      var s = geoShapes[i];
      if (!s) return;
      var inn = document.querySelector('[data-geo] .geo-inner');
      if (!inn) return;
      showGeoInfo(s, inn);
    });
    geoShapes.push({
      el: el, type: shapeType, color: color,
      x: 30 + (i % cols) * (W / cols) + Math.random() * 20,
      y: startY, vx: (Math.random() - 0.5) * 2, vy: isNew ? 0 : 0,
      size: size, mass: size / 50,
      comment: c, angle: Math.random() * Math.PI * 2, av: (Math.random() - 0.5) * 3
    });
  });
  
  // Create ribbon decorations
  geoRibbons = [];
  var ribbonCount = Math.min(12, 6 + gbComments.length);
  for (var r = 0; r < ribbonCount; r++) {
    var rEl = document.createElement('div');
    rEl.className = 'geo-ribbon';
    var rColor = RIBBON_COLORS[r % RIBBON_COLORS.length];
    var rw = 8 + Math.random() * 12;
    var rh = 4 + Math.random() * 8;
    var rx = Math.floor(Math.random() * 100);
    var ry = Math.floor(Math.random() * 60);
    // Create wavy ribbon effect with border-radius
    rEl.style.cssText = 'position:absolute;width:' + rw + 'px;height:' + rh + 'px;background:' + rColor + 'aa;border-radius:' + rx + '% ' + (100-rx) + '% ' + ry + '% ' + (100-ry) + '% / ' + (100-ry) + '% ' + ry + '% ' + rx + '% ' + (100-rx) + '%;opacity:0.55;box-shadow:0 2px 6px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.2);z-index:0;pointer-events:none';
    inner.appendChild(rEl);
    geoRibbons.push({
      el: rEl,
      x: 40 + Math.random() * (W - 80),
      y: Math.random() * H * 0.7,
      vx: (Math.random() - 0.5) * 1.5,
      vy: 0,
      size: Math.max(rw, rh),
      mass: 0.3,
      angle: Math.random() * Math.PI * 2,
      av: (Math.random() - 0.5) * 2
    });
  }
  
  // Set positions
  function placeAll() {
    geoShapes.forEach(function(s) {
      s.x = Math.max(s.size/2, Math.min(W - s.size/2, s.x));
      s.y = Math.max(s.size/2, Math.min(H - s.size/2, s.y));
      updateShapePos(s);
    });
    geoRibbons.forEach(function(r) {
      r.x = Math.max(r.size/2, Math.min(W - r.size/2, r.x));
      r.y = Math.max(r.size/2, Math.min(H - r.size/2, r.y));
      updateRibbonPos(r);
    });
  }
  placeAll();
  
  geoLoop(W, H);
}

function updateShapePos(s) {
  s.el.style.left = (s.x - s.size/2) + 'px';
  s.el.style.top = (s.y - s.size/2) + 'px';
  s.el.style.transform = 'rotate(' + s.angle + 'rad)';
}

function updateRibbonPos(r) {
  r.el.style.left = (r.x - r.size/2) + 'px';
  r.el.style.top = (r.y - r.size/2) + 'px';
  r.el.style.transform = 'rotate(' + r.angle + 'rad)';
}

function geoLoop(W, H) {
  var allObjects = geoShapes.concat(geoRibbons);
  
  // Physics update
  allObjects.forEach(function(s) {
    if (geoMouse.drag === s) return;
    s.vy += 0.25;
    s.vx *= 0.997;
    s.vy *= 0.997;
    s.av *= 0.98;
    s.x += s.vx;
    s.y += s.vy;
    s.angle += s.av;
    
    var r = s.size / 2;
    if (s.x - r < 0) { s.x = r; s.vx = Math.abs(s.vx) * 0.5; s.av += s.vy * 0.02; }
    if (s.x + r > W) { s.x = W - r; s.vx = -Math.abs(s.vx) * 0.5; s.av -= s.vy * 0.02; }
    if (s.y - r < 0) { s.y = r; s.vy = Math.abs(s.vy) * 0.5; s.av += s.vx * 0.02; }
    if (s.y + r > H) { s.y = H - r; s.vy = -Math.abs(s.vy) * 0.35; s.vx *= 0.85; s.av -= s.vx * 0.02; }
    
    if (s.el.classList.contains('geo-shape')) updateShapePos(s);
    else updateRibbonPos(s);
  });
  
  // Collision between all objects
  for (var i = 0; i < allObjects.length; i++) {
    for (var j = i + 1; j < allObjects.length; j++) {
      var a = allObjects[i], b = allObjects[j];
      if (geoMouse.drag === a || geoMouse.drag === b) continue;
      var dx = b.x - a.x, dy = b.y - a.y;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var minDist = (a.size + b.size) / 2;
      if (dist < minDist && dist > 0.01) {
        var nx = dx / dist, ny = dy / dist;
        var overlap = minDist - dist;
        var totalMass = a.mass + b.mass;
        a.x -= nx * overlap * (b.mass / totalMass);
        a.y -= ny * overlap * (b.mass / totalMass);
        b.x += nx * overlap * (a.mass / totalMass);
        b.y += ny * overlap * (a.mass / totalMass);
        var dvx = a.vx - b.vx, dvy = a.vy - b.vy;
        var dvn = dvx * nx + dvy * ny;
        if (dvn > 0) {
          var imp = 1.8 * dvn / totalMass;
          a.vx -= imp * b.mass * nx; a.vy -= imp * b.mass * ny;
          b.vx += imp * a.mass * nx; b.vy += imp * a.mass * ny;
          a.av += (b.vy - a.vy) * 0.02; b.av += (a.vy - b.vy) * 0.02;
        }
        if (a.el.classList.contains('geo-shape')) updateShapePos(a);
        else updateRibbonPos(a);
        if (b.el.classList.contains('geo-shape')) updateShapePos(b);
        else updateRibbonPos(b);
      }
    }
  }
  
  geoAnimId = requestAnimationFrame(function() { geoLoop(W, H); });
}

// Mouse events for drag
document.addEventListener('mousedown', function(e) {
  var container = document.querySelector('[data-geo] .geo-inner');
  if (!container) return;
  var target = e.target.closest('.geo-shape');
  if (!target) return;
  e.preventDefault();
  var idx = parseInt(target.getAttribute('data-idx'));
  var shape = geoShapes[idx];
  if (!shape) return;
  var rect = container.getBoundingClientRect();
  geoMouse.down = true;
  geoMouse.drag = shape;
  geoMouse.isRibbon = false;
  geoMouse.ox = e.clientX - rect.left - shape.x;
  geoMouse.oy = e.clientY - rect.top - shape.y;
  geoMouse.startX = shape.x;
  geoMouse.startY = shape.y;
  shape.el.style.zIndex = 10;
  shape.el.style.transition = 'none';
  container.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function(e) {
  var inner = document.querySelector('[data-geo] .geo-inner');
  if (!inner) return;
  var rect = inner.getBoundingClientRect();
  geoMouse.x = e.clientX - rect.left;
  geoMouse.y = e.clientY - rect.top;
  if (geoMouse.drag && geoMouse.down) {
    var shape = geoMouse.drag;
    shape.vx = (geoMouse.x - shape.x - geoMouse.ox) * 0.8;
    shape.vy = (geoMouse.y - shape.y - geoMouse.oy) * 0.8;
    shape.x = geoMouse.x - geoMouse.ox;
    shape.y = geoMouse.y - geoMouse.oy;
    updateShapePos(shape);
  }
});

document.addEventListener('mouseup', function(e) {
  var inner = document.querySelector('[data-geo] .geo-inner');
  if (!inner) return;
  if (geoMouse.drag && geoMouse.down) {
    var shape = geoMouse.drag;
    showGeoInfo(shape, inner);
    shape.el.style.zIndex = 1;
    shape.el.style.transition = 'transform 0.1s';
    inner.style.cursor = 'grab';
  }
  geoMouse.down = false;
  geoMouse.drag = null;
});

// Touch events
document.addEventListener('touchstart', function(e) {
  var inner = document.querySelector('[data-geo] .geo-inner');
  if (!inner) return;
  var target = e.target.closest('.geo-shape');
  if (!target) return;
  e.preventDefault();
  var idx = parseInt(target.getAttribute('data-idx'));
  var shape = geoShapes[idx];
  if (!shape) return;
  var rect = inner.getBoundingClientRect();
  var touch = e.touches[0];
  geoMouse.down = true;
  geoMouse.drag = shape;
  geoMouse.isRibbon = false;
  geoMouse.ox = touch.clientX - rect.left - shape.x;
  geoMouse.oy = touch.clientY - rect.top - shape.y;
  geoMouse.startX = shape.x;
  geoMouse.startY = shape.y;
  shape.el.style.zIndex = 10;
  shape.el.style.transition = 'none';
}, { passive: false });

document.addEventListener('touchmove', function(e) {
  if (geoMouse.drag && geoMouse.down) {
    e.preventDefault();
    var inner = document.querySelector('[data-geo] .geo-inner');
    if (!inner) return;
    var rect = inner.getBoundingClientRect();
    var touch = e.touches[0];
    var shape = geoMouse.drag;
    shape.vx = (touch.clientX - rect.left - shape.x - geoMouse.ox) * 0.8;
    shape.vy = (touch.clientY - rect.top - shape.y - geoMouse.oy) * 0.8;
    shape.x = touch.clientX - rect.left - geoMouse.ox;
    shape.y = touch.clientY - rect.top - geoMouse.oy;
    updateShapePos(shape);
  }
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (geoMouse.drag && geoMouse.down) {
    var shape = geoMouse.drag;
    var inner = document.querySelector('[data-geo] .geo-inner');
    if (inner) showGeoInfo(shape, inner);
    shape.el.style.zIndex = 1;
    shape.el.style.transition = 'transform 0.1s';
  }
  geoMouse.down = false;
  geoMouse.drag = null;
});

function showGeoInfo(shape, inner) {
  // Remove any existing popup
  var existing = document.querySelector('.geo-popup-on');
  if (existing) existing.parentElement.removeChild(existing);
  
  var c = shape.comment;
  var popup = document.createElement('div');
  popup.className = 'geo-popup-on';
  popup.innerHTML = '<button class="geo-popup-close" onclick="this.parentElement.remove()">×</button><strong style="color:' + shape.color + '">' + (c.name || '匿名') + '</strong><span style="font-size:0.7rem;color:#aaa;margin-left:0.5rem">' + (c.date || '') + '</span><p style="margin-top:0.6rem;line-height:1.7">' + (c.text || '').replace(/</g, '&lt;').replace(/\n/g, '<br>') + '</p>';
  popup.style.cssText = 'position:absolute;width:240px;background:rgba(30,35,50,0.94);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:14px;border:1px solid rgba(255,255,255,0.12);box-shadow:0 12px 40px rgba(0,0,0,0.3);padding:1.2rem;z-index:9999;font-size:0.85rem;color:#e0e4ec;pointer-events:auto';
  
  var rect = inner.getBoundingClientRect();
  var top = shape.y + shape.size/2 + 5;
  var left = Math.max(10, Math.min(rect.width - 260, shape.x - 120));
  var maxH = inner.clientHeight || 420;
  if (top + 150 > maxH) top = shape.y - 150;
  if (top < 0) top = 10;
  popup.style.top = top + 'px';
  popup.style.left = left + 'px';
  
  inner.appendChild(popup);
  // Auto-remove after 8 seconds
  setTimeout(function() { if (popup.parentElement) popup.remove(); }, 8000);
}async function submitGuestbook(name, text) {
  var comment = { name: name, text: text, date: new Date().toISOString().slice(0, 10) };
  gbComments.unshift(comment);
  geoNewIdx = 0;
  renderGeoGuestbook();
  geoNewIdx = -1;
  
  try {
    var getResp = await fetch("https://api.github.com/repos/Latte7-9/latte-site/contents/data/comments.json", {
      headers: { Authorization: "Bearer " + GB_TOKEN }
    });
    if (!getResp.ok) throw new Error("fetch failed");
    var getJson = await getResp.json();
    var existing = JSON.parse(decodeURIComponent(escape(atob(getJson.content.replace(/\s/g, "")))));
    if (!Array.isArray(existing)) existing = [];
    existing.unshift(comment);
    if (existing.length > 100) existing = existing.slice(0, 100);
    var content = btoa(unescape(encodeURIComponent(JSON.stringify(existing, null, 2))));
    await fetch("https://api.github.com/repos/Latte7-9/latte-site/contents/data/comments.json", {
      method: "PUT",
      headers: { Authorization: "Bearer " + GB_TOKEN },
      body: JSON.stringify({ message: "New guestbook comment", content: content, sha: getJson.sha })
    });
  } catch(e) {
    var local = JSON.parse(localStorage.getItem("gb_local") || "[]");
    local.unshift(comment);
    if (local.length > 50) local = local.slice(0, 50);
    localStorage.setItem("gb_local", JSON.stringify(local));
  }
}

function initGuestbook() {
  loadGuestbook();
  var form = document.getElementById("guestbookForm");
  if (!form) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("gbName").value.trim() || "匿名";
    var text = document.getElementById("gbText").value.trim();
    var msg = document.getElementById("gbMsg");
    if (!text) { msg.textContent = "请输入留言内容"; msg.style.color = "#c62828"; return; }
    submitGuestbook(name, text);
    msg.textContent = "留言成功！✨";
    msg.style.color = "#2e7d32";
    form.reset();
    setTimeout(function() { msg.textContent = ""; }, 3000);
  });
}



document.addEventListener('DOMContentLoaded', () => { initBackToTop();
  highlightNav();
  initGuestbook();
  var homePromise = document.querySelector('.hero') ? renderHome() : Promise.resolve();
  homePromise.then(function() { initFadeIn(); });
  if (document.querySelector('.blog-list')) renderBlog();
  if (document.querySelector('.interest-page')) renderInterestPage();
  if (!document.querySelector('.hero') && !document.querySelector('.blog-list') && !document.querySelector('.interest-page')) initFadeIn();
});
