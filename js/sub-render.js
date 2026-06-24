// ====== 子页面渲染适配 v3.0 ======
// 覆盖 main.js 中的 renderBlog / renderInterestPage，使用新设计类

var _origRenderBlog = renderBlog;
renderBlog = async function() {
  var list = document.querySelector('.blog-list');
  if (!list) return _origRenderBlog();

  try {
    var res = await fetch('../data/blog.json?v=' + Date.now());
    if (!res.ok) throw new Error('fetch failed');
    var data = await res.json();
    if (!data.posts || !data.posts.length) {
      list.innerHTML = '<div style="padding:2rem;text-align:center;color:#666;">还没有文章 ✨</div>';
      return;
    }
    list.innerHTML = data.posts.reverse().map(function(p) {
      return '<a href="posts/' + p.file + '" class="blog-post-card gradient-border-card tilt-card" style="display:block;text-decoration:none;color:inherit;margin-bottom:1rem;">' +
        '<div style="padding:1.2rem 1.5rem;">' +
        '<div class="blog-card-date">' + p.date + '</div>' +
        '<h3 class="blog-card-title">' + p.title + '</h3>' +
        '<p class="blog-card-summary">' + (p.summary || '') + '</p>' +
        '<div class="blog-card-link">阅读文章 →</div>' +
        '</div></a>';
    }).join('');
  } catch(e) {
    list.innerHTML = '<div style="padding:2rem;text-align:center;color:#666;">还没有文章 ✨</div>';
  }
};

var _origRenderInterestPage = renderInterestPage;
renderInterestPage = async function() {
  var pageName = window.location.pathname.split('/').pop().replace('.html','');
  var data = await loadJSON('../data/site.json');
  if (!data || !data.interests) { if (_origRenderInterestPage) return _origRenderInterestPage(); return; }

  var item = data.interests.find(function(i) { return i.page && i.page.indexOf(pageName) !== -1; });
  if (data.githubRepo) window._siteGithubRepo = data.githubRepo;
  if (!item) { if (_origRenderInterestPage) return _origRenderInterestPage(); return; }

  var hero = document.querySelector('.page-hero .container, .interest-page .container');
  if (hero) {
    hero.innerHTML = '<h1 style="font-size:2.2rem;font-weight:300;color:var(--text-primary);">' + (getEmoji(item.icon) || '') + ' ' + item.name + '</h1>' +
      '<p style="font-size:1rem;color:var(--text-muted);margin-top:0.5rem;font-weight:300;">' + (item.description || '') + '</p>';
  }

  var content = document.querySelector('.interest-content-area');
  if (!content) return;

  switch(pageName) {
    case 'photography':
      renderPhotography(content, item); break;
    case 'books':
      renderBooks(content, item); break;
    case 'hiking':
      renderHiking(content, item); break;
    case 'hobbies':
      renderHobbies(content, item); break;
    default:
      content.innerHTML = '<div class="gradient-border-card" style="padding:2rem;text-align:center;color:var(--text-muted);">内容加载中...</div>';
  }
};

// ====== 图集系统：列表 + 灯箱详情 ======
var _albumList = [];
var _albumCurrentIdx = -1;
var _albumImgIdx = 0;
var _albumContainer = null;

var _imageBase = null;
function getImageBase() {
  if (_imageBase) return _imageBase;
  var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal) {
    _imageBase = (window._siteGithubRepo)
      ? 'https://raw.githubusercontent.com/' + window._siteGithubRepo + '/main/'
      : '../';
  } else {
    _imageBase = '../';
  }
  return _imageBase;
}
function resolveImageUrl(imgPath) {
  if (!imgPath) return '';
  if (/^https?:\/\//i.test(imgPath)) return imgPath;
  var base = getImageBase();
  var parts = imgPath.split('/');
  var encoded = parts.map(function(p) { return encodeURIComponent(p); }).join('/');
  return base + encoded;
}

function openAlbum(idx) {
  _albumCurrentIdx = idx;
  _albumImgIdx = 0;
  showAlbumLightbox();
}
function closeAlbum() {
  var lb = document.getElementById('albumLightbox');
  if (lb) lb.remove();
  _albumCurrentIdx = -1;
}
function showAlbumLightbox() {
  closeAlbum();
  var album = _albumList[_albumCurrentIdx];
  if (!album) return;
  var images = album.images || [];

  var lb = document.createElement('div');
  lb.id = 'albumLightbox';
  lb.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;';
  lb.addEventListener('click', closeAlbum);

  var img = document.createElement('img');
  img.id = 'albumLightboxImg';
  img.style.cssText = 'max-width:90vw;max-height:75vh;object-fit:contain;border-radius:4px;';
  lb.appendChild(img);

  var info = document.createElement('div');
  info.style.cssText = 'margin-top:1rem;color:var(--text-muted);font-size:0.78rem;';
  lb.appendChild(info);

  var nav = document.createElement('div');
  nav.style.cssText = 'margin-top:0.5rem;display:flex;gap:1rem;';
  var prevBtn = document.createElement('button');
  prevBtn.textContent = '← 上一张';
  prevBtn.style.cssText = 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#ccc;padding:0.4rem 1rem;border-radius:6px;cursor:pointer;';
  prevBtn.addEventListener('click', function(e) { e.stopPropagation(); _albumImgIdx = (_albumImgIdx - 1 + images.length) % images.length; updateLightboxImg(); });
  var nextBtn = document.createElement('button');
  nextBtn.textContent = '下一张 →';
  nextBtn.style.cssText = prevBtn.style.cssText;
  nextBtn.addEventListener('click', function(e) { e.stopPropagation(); _albumImgIdx = (_albumImgIdx + 1) % images.length; updateLightboxImg(); });
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  lb.appendChild(nav);

  document.body.appendChild(lb);

  function updateLightboxImg() {
    img.src = resolveImageUrl(images[_albumImgIdx]);
    info.textContent = (_albumImgIdx + 1) + ' / ' + images.length + (album.name ? ' — ' + album.name : '');
    prevBtn.style.display = images.length > 1 ? '' : 'none';
    nextBtn.style.display = images.length > 1 ? '' : 'none';
  }
  updateLightboxImg();
}

function renderPhotography(container, item) {
  if (!item.albums) { container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem;">暂无图集</p>'; return; }
  _albumList = item.albums;
  _albumContainer = container;

  var html = '<div id="albumListView">';
  item.albums.forEach(function(album, i) {
    var coverImg = '';
    if (album.images && album.images.length > 0) {
      coverImg = '<div style="width:100%;height:160px;overflow:hidden;border-radius:10px;margin-bottom:0.8rem;">' +
        '<img src="../' + album.images[0] + '" alt="" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>';
    } else if (album.cover) {
      coverImg = '<div style="width:100%;height:160px;overflow:hidden;border-radius:10px;margin-bottom:0.8rem;background:var(--bg-card);display:flex;align-items:center;justify-content:center;font-size:2rem;">📷</div>';
    }
    html += '<div class="gradient-border-card tilt-card" style="cursor:pointer;margin-bottom:0.8rem;padding:0;" onclick="openAlbum(' + i + ')">' +
      coverImg +
      '<div style="padding:0.6rem 1rem 0.8rem;">' +
      '<div style="color:var(--text-primary);font-size:0.9rem;font-weight:500;">' + (album.name || '图集 ' + (i+1)) + '</div>' +
      '<div style="color:var(--text-dim);font-size:0.7rem;margin-top:0.2rem;">' + (album.images ? album.images.length + ' 张照片' : '') + (album.date ? ' · ' + album.date : '') + '</div>' +
      '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function renderBooks(container, item) {
  var html = '';

  if (item.read && item.read.length > 0) {
    html += '<h3 style="color:var(--neon-pink);font-weight:400;margin:0 0 0.6rem;">📚 已读</h3>';
    item.read.forEach(function(b) {
      html += '<div class="gradient-border-card tilt-card" style="margin-bottom:0.5rem;padding:0.8rem 1rem;display:flex;gap:0.8rem;align-items:center;">' +
        '<div style="width:32px;height:44px;border-radius:3px;flex-shrink:0;background:linear-gradient(135deg,rgba(255,61,113,0.2),rgba(0,212,170,0.2));"></div>' +
        '<div>' +
        '<div style="color:var(--text-primary);font-size:0.85rem;">' + b.title + '</div>' +
        '<div style="color:var(--text-dim);font-size:0.7rem;">' + (b.author || '') + '</div>' +
        (b.note ? '<div style="color:var(--text-muted);font-size:0.7rem;margin-top:0.2rem;line-height:1.5;">' + b.note + '</div>' : '') +
        '</div></div>';
    });
  }

  if (item.reading && item.reading.length > 0) {
    html += '<h3 style="color:var(--neon-cyan);font-weight:400;margin:1.2rem 0 0.6rem;">📖 在读</h3>';
    item.reading.forEach(function(b) {
      html += '<div class="gradient-border-card tilt-card" style="margin-bottom:0.5rem;padding:0.8rem 1rem;display:flex;gap:0.8rem;align-items:center;">' +
        '<div style="width:32px;height:44px;border-radius:3px;flex-shrink:0;background:linear-gradient(135deg,rgba(0,212,170,0.2),rgba(124,77,255,0.2));"></div>' +
        '<div>' +
        '<div style="color:var(--text-primary);font-size:0.85rem;">' + b.title + '</div>' +
        '<div style="color:var(--text-dim);font-size:0.7rem;">' + (b.author || '') + '</div>' +
        (b.progress ? '<div style="color:var(--text-muted);font-size:0.7rem;margin-top:0.2rem;">进度: ' + b.progress + '</div>' : '') +
        '</div></div>';
    });
  }

  if (item.wantToRead && item.wantToRead.length > 0) {
    html += '<h3 style="color:var(--text-dim);font-weight:400;margin:1.2rem 0 0.6rem;">📋 想读</h3>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;">';
    item.wantToRead.forEach(function(b) {
      html += '<span style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:20px;padding:0.3rem 0.8rem;font-size:0.78rem;color:var(--text-muted);">' + b.title + ' ' + (b.author || '') + '</span>';
    });
    html += '</div>';
  }

  container.innerHTML = html || '<div style="color:var(--text-dim);text-align:center;padding:2rem;">暂无书籍记录</div>';
}

function renderHiking(container, item) {
  var html = '';

  if (item.journal) {
    html += '<div class="gradient-border-card" style="padding:1.2rem 1.5rem;margin-bottom:1rem;">' +
      '<div style="color:var(--text-body);font-size:0.9rem;line-height:2;">' + item.journal + '</div></div>';
  }

  if (item.climbed && item.climbed.length > 0) {
    html += '<h3 style="color:var(--neon-pink);font-weight:400;margin:1rem 0 0.6rem;">⛰️ 已登顶</h3>';
    item.climbed.forEach(function(m) {
      html += '<div class="gradient-border-card tilt-card" style="margin-bottom:0.6rem;padding:0.8rem 1.2rem;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<span style="color:var(--text-primary);font-size:0.9rem;">' + m.name + '</span>' +
        '<span style="color:var(--text-dim);font-size:0.7rem;">' + m.date + '</span></div>' +
        (m.note ? '<div style="color:var(--text-muted);font-size:0.75rem;margin-top:0.3rem;line-height:1.6;">' + m.note + '</div>' : '') +
        '</div>';
    });
  }

  if (item.wantToClimb && item.wantToClimb.length > 0) {
    html += '<h3 style="color:var(--neon-cyan);font-weight:400;margin:1rem 0 0.6rem;">🗻 想去</h3>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;">';
    item.wantToClimb.forEach(function(m) {
      html += '<span class="gradient-border-card" style="padding:0.5rem 1rem;font-size:0.8rem;color:var(--text-body);">' +
        m.name + (m.reason ? ' <span style="color:var(--text-dim);font-size:0.7rem;">— ' + m.reason + '</span>' : '') +
        '</span>';
    });
    html += '</div>';
  }

  container.innerHTML = html || '<div style="color:var(--text-dim);text-align:center;padding:2rem;">暂无登山记录</div>';
}

function renderHobbies(container, item) {
  if (!item.hobbies) return;
  var html = '<div style="display:flex;flex-wrap:wrap;gap:0.8rem;justify-content:center;">';
  item.hobbies.forEach(function(h, i) {
    var colors = ['#ff3d71','#00d4aa','#ffb800','#2990c0','#7c4dff','#ff6d3a','#3ad4ff'];
    var c = colors[i % colors.length];
    html += '<div class="gradient-border-card tilt-card" style="width:140px;padding:1.5rem 1rem;text-align:center;">' +
      '<div style="font-size:2.5rem;margin-bottom:0.5rem;">' + getHobbyEmoji(h) + '</div>' +
      '<div style="color:var(--text-primary);font-size:0.85rem;">' + h + '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function getEmoji(iconName) {
  var m = { camera:'📷', book:'📉', sparkle:'✨', mountain:'⛰️' };
  return m[iconName] || '';
}
function getHobbyEmoji(h) {
  var m = { '手冲咖啡':'☕', '钩织':'🧶', '吉他':'🎸', '烹饪':'🍳', '动漫':'🎬', '徒步':'🥾', '想学攀岩':'🧗' };
  return m[h] || '🎯';
}

// ====== 自动初始化 ======
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.interest-page') || document.querySelector('.interest-content-area')) {
    if (typeof renderInterestPage === 'function') renderInterestPage();
  }
  if (document.querySelector('.blog-list')) {
    if (typeof renderBlog === 'function') renderBlog();
  }
  setTimeout(function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.fade-in, .gradient-border-card, .blog-post-card').forEach(function(el, i) {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out'
        });
      });
    }
  }, 400);
});