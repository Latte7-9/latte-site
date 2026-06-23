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

function renderPhotography(container, item) {
  if (!item.albums) return;
  var html = '';
  item.albums.forEach(function(album) {
    html += '<div class="gradient-border-card tilt-card" style="margin-bottom:1.2rem;padding:1.2rem 1.5rem;">' +
      '<h3 style="color:var(--neon-pink);font-weight:400;margin-bottom:0.5rem;">📷 ' + album.name + '</h3>' +
      '<p style="color:var(--text-muted);font-size:0.85rem;line-height:1.7;">' + album.description + '</p>' +
      (album.journal ? '<p style="color:var(--text-dim);font-size:0.8rem;margin-top:0.8rem;line-height:1.8;">' + album.journal + '</p>' : '') +
      (album.images && album.images.length > 0 ? '<div style="margin-top:0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap;">' + album.images.map(function(img) {
        return '<img src="../' + img + '" alt="" style="max-width:200px;border-radius:8px;border:1px solid var(--border-subtle);" loading="lazy">';
      }).join('') + '</div>' : '') +
      '</div>';
  });
  container.innerHTML = html;
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
