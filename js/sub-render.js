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
        '<div style="font-size:0.72rem;color:var(--text-dim);margin-bottom:0.4rem;">' + p.date + '</div>' +
        '<h3 style="font-size:1.05rem;color:var(--text-primary);font-weight:500;margin-bottom:0.5rem;">' + p.title + '</h3>' +
        '<p style="font-size:0.82rem;color:var(--text-muted);line-height:1.7;">' + (p.summary || '') + '</p>' +
        '<div style="margin-top:0.8rem;font-size:0.75rem;color:var(--neon-cyan);">阅读文章 →</div>' +
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


// ====== 图片 URL 解析（本地走 GitHub Raw，线上走相对路径） ======
var _imageBase = null;
function getImageBase() {
  if (_imageBase) return _imageBase;
  var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal) {
    // 尝试从 site.json 获取仓库名
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
  // 对中文文件名进行编码
  var parts = imgPath.split('/');
  var encoded = parts.map(function(p) { return encodeURIComponent(p); }).join('/');
  return base + encoded;
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
      coverImg = '<div style="width:100%;height:160px;overflow:hidden;border-radius:10px;margin-bottom:0.8rem;">' +
        '<img src="../' + album.cover + '" alt="" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>';
    }
    var imgCount = album.images ? album.images.length : 0;
    var imgHint = imgCount > 0 ? '<span style="font-size:0.7rem;color:var(--text-dim);">🖼️ ' + imgCount + ' 张</span>' : '';

    html += '<div class="gradient-border-card album-card" onclick="openAlbumDetail(' + i + ')" style="margin-bottom:1rem;padding:1.2rem 1.5rem;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;">' +
      coverImg +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<h3 style="color:var(--neon-pink);font-weight:400;margin:0;font-size:1.05rem;">📷 ' + escapeHtml(album.name) + '</h3>' +
        imgHint +
      '</div>' +
      (album.description ? '<p style="color:var(--text-muted);font-size:0.82rem;line-height:1.7;margin-top:0.4rem;">' + escapeHtml(album.description) + '</p>' : '') +
      (album.journal ? '<p style="color:var(--text-dim);font-size:0.75rem;margin-top:0.6rem;line-height:1.8;border-top:1px solid var(--border-subtle);padding-top:0.6rem;">' + escapeHtml(album.journal) + '</p>' : '') +
      '<div style="margin-top:0.6rem;font-size:0.72rem;color:var(--neon-cyan);text-align:right;">点击浏览 →</div>' +
      '</div>';
  });
  html += '</div><div id="albumDetailView" style="display:none;"></div>';
  container.innerHTML = html;
}

function escapeHtml(s) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(s || ''));
  return d.innerHTML;
}

function openAlbumDetail(idx) {
  if (!_albumList[idx] || !_albumList[idx].images || _albumList[idx].images.length === 0) {
    // 没有图片的图集不做操作
    return;
  }
  _albumCurrentIdx = idx;
  _albumImgIdx = 0;
  renderAlbumDetail();
  document.getElementById('albumListView').style.display = 'none';
  document.getElementById('albumDetailView').style.display = 'block';
  // 绑定键盘
  document.addEventListener('keydown', albumKeyHandler);
}

function closeAlbumDetail() {
  document.getElementById('albumDetailView').style.display = 'none';
  document.getElementById('albumListView').style.display = 'block';
  document.removeEventListener('keydown', albumKeyHandler);
  _albumCurrentIdx = -1;
}

function navigateAlbum(dir) {
  var album = _albumList[_albumCurrentIdx];
  var max = album.images.length;
  _albumImgIdx = (_albumImgIdx + dir + max) % max;
  renderAlbumImage();
}

function albumKeyHandler(e) {
  if (e.key === 'Escape') { closeAlbumDetail(); return; }
  if (e.key === 'ArrowLeft') { navigateAlbum(-1); return; }
  if (e.key === 'ArrowRight') { navigateAlbum(1); return; }
}

function renderAlbumDetail() {
  var album = _albumList[_albumCurrentIdx];
  var detailView = document.getElementById('albumDetailView');
  detailView.innerHTML =
    '<div class="album-lightbox">' +
      '<div class="album-lightbox-header">' +
        '<button class="album-back-btn" onclick="closeAlbumDetail()">← 返回图集</button>' +
        '<span class="album-lightbox-title">📷 ' + escapeHtml(album.name) + '</span>' +
        '<span class="album-lightbox-counter" id="albumCounter">' + (_albumImgIdx + 1) + ' / ' + album.images.length + '</span>' +
      '</div>' +
      '<div class="album-lightbox-main">' +
        '<button class="album-nav-btn album-nav-prev" onclick="navigateAlbum(-1)">‹</button>' +
        '<div class="album-lightbox-img-wrap">' +
          '<img id="albumMainImg" src="../' + album.images[_albumImgIdx] + '" alt="" class="album-main-img">' +
        '</div>' +
        '<button class="album-nav-btn album-nav-next" onclick="navigateAlbum(1)">›</button>' +
      '</div>' +
      '<div class="album-lightbox-thumbs" id="albumThumbs"></div>' +
    '</div>';
  setTimeout(renderAlbumThumbs, 50);
}

function renderAlbumImage() {
  var album = _albumList[_albumCurrentIdx];
  var img = document.getElementById('albumMainImg');
  if (img) img.src = resolveImageUrl(album.images[_albumImgIdx]);
  var counter = document.getElementById('albumCounter');
  if (counter) counter.textContent = (_albumImgIdx + 1) + ' / ' + album.images.length;
  // 更新缩略图选中状态
  var thumbs = document.querySelectorAll('.album-thumb');
  thumbs.forEach(function(t, i) {
    t.classList.toggle('active', i === _albumImgIdx);
  });
}

function renderAlbumThumbs() {
  var album = _albumList[_albumCurrentIdx];
  var thumbsContainer = document.getElementById('albumThumbs');
  if (!thumbsContainer || album.images.length <= 1) return;
  var html = '';
  album.images.forEach(function(img, i) {
    html += '<div class="album-thumb' + (i === _albumImgIdx ? ' active' : '') + '" onclick="jumpToImage(' + i + ')">' +
      '<img src="../' + img + '" alt="" loading="lazy"></div>';
  });
  thumbsContainer.innerHTML = html;
}

function jumpToImage(idx) {
  _albumImgIdx = idx;
  renderAlbumImage();
}

function renderBooks(container, item) {
  var html = '';
  
  if (item.reading && item.reading.length > 0) {
    html += '<h3 style="color:var(--neon-cyan);font-weight:400;margin:1rem 0 0.6rem;">📖 正在读</h3>';
    item.reading.forEach(function(b) {
      html += '<div class="gradient-border-card tilt-card" style="margin-bottom:0.8rem;padding:1rem 1.2rem;display:flex;gap:1rem;align-items:center;">' +
        (b.cover ? '<div style="width:50px;height:70px;border-radius:4px;background:linear-gradient(135deg,rgba(255,61,113,0.2),rgba(0,212,170,0.2));flex-shrink:0;"></div>' : '') +
        '<div><div style="color:var(--text-primary);font-size:0.95rem;">' + b.title + '</div>' +
        '<div style="color:var(--text-dim);font-size:0.75rem;">' + (b.author || '') + '</div>' +
        (b.review ? '<div style="color:var(--text-muted);font-size:0.78rem;margin-top:0.3rem;line-height:1.6;">' + b.review + '</div>' : '') +
        '</div></div>';
    });
  }
  
  if (item.read && item.read.length > 0) {
    html += '<h3 style="color:var(--neon-gold);font-weight:400;margin:1.2rem 0 0.6rem;">✅ 已读完</h3>';
    item.read.forEach(function(b) {
      html += '<div class="gradient-border-card tilt-card" style="margin-bottom:0.8rem;padding:1rem 1.2rem;display:flex;gap:1rem;align-items:center;">' +
        (b.cover ? '<div style="width:50px;height:70px;border-radius:4px;background:linear-gradient(135deg,rgba(255,184,0,0.2),rgba(255,61,113,0.2));flex-shrink:0;"></div>' : '') +
        '<div><div style="color:var(--text-primary);font-size:0.95rem;">' + b.title + '</div>' +
        '<div style="color:var(--text-dim);font-size:0.75rem;">' + (b.author || '') + '</div>' +
        (b.review ? '<div style="color:var(--text-muted);font-size:0.78rem;margin-top:0.3rem;line-height:1.6;">' + b.review + '</div>' : '') +
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
  var m = { camera:'📷', book:'📖', sparkle:'✨', mountain:'⛰️' };
  return m[iconName] || '';
}
function getHobbyEmoji(h) {
  var m = { '手冲咖啡':'☕','钩织':'🧶','吉他':'🎸','烹饪':'🍳','动漫':'🎬','徒步':'🥾','想学攀岩':'🧗' };
  return m[h] || '⭐';
}

// ====== 自动初始化 ======
document.addEventListener('DOMContentLoaded', function() {
  // 兴趣子页渲染
  if (document.querySelector('.interest-page') || document.querySelector('.interest-content-area')) {
    if (typeof renderInterestPage === 'function') renderInterestPage();
  }
  // 博客列表渲染
  if (document.querySelector('.blog-list')) {
    if (typeof renderBlog === 'function') renderBlog();
  }
  // 滚动动画
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

// 滚动动画
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      gsap.utils.toArray('.fade-in, .gradient-border-card, .blog-post-card').forEach(function(el, i) {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out'
        });
      });
    }, 400);
  });
}
