// ADMIN_V3_LOADED_20260624
// ====== Latte 管理后台 v3.0 ======
var Admin = (function() {
  var R = '', T = '', site = null, blog = { posts: [] }, comments = [];
  var API_BASE = 'https://latte-site-production.up.railway.app';

  function b64e(s) { return btoa(unescape(encodeURIComponent(s))); }
  function b64d(s) {
    var raw = atob(s.replace(/\s/g, ''));
    var t = decodeURIComponent(escape(raw));
    if (t.charCodeAt(0) === 0xFEFF) t = t.slice(1);
    return t;
  }
  function esc(s) { var d = document.createElement('div'); d.appendChild(document.createTextNode(s||'')); return d.innerHTML; }

  function gh(method, path, bodySha, bodyObj) {
    var url = 'https://api.github.com/repos/' + R + '/contents/' + path;
    console.log('[Admin] fetch ' + method + ' ' + url);
    var headers = { 'Authorization': 'Bearer ' + T, 'Accept': 'application/vnd.github+json' };
    var opts = { method: method, headers: headers };
    if (method === 'PUT' && bodyObj) {
      var b = Object.assign({}, bodyObj);
      if (bodySha) b.sha = bodySha;
      opts.body = JSON.stringify(b);
    }
    var ctrl = new AbortController(); var tmr = setTimeout(function(){ctrl.abort();},15000);
    opts.signal = ctrl.signal;
    return fetch(url, opts).then(function(r) {
      clearTimeout(tmr); console.log('[Admin] response ' + r.status);
      if (!r.ok) throw new Error(r.status + ': ' + r.statusText);
      return r.json();
    }).catch(function(err) {
      clearTimeout(tmr);
      if (err.name === 'AbortError') throw new Error('请求超时(15s)');
      throw err;
    });
  }

  function ghPut(path, content, sha) { return gh('PUT', path, sha, { message: 'Update ' + path, content: b64e(content) }); }
  function ghGet(path) { return gh('GET', path); }

  function msg(elId, type, text) {
    var el = document.getElementById(elId); if (!el) return;
    el.textContent = text; el.className = 'status-badge status-' + type;
  }

  function login() {
    console.log('[Admin] login() called');
    var btn = document.getElementById('loginBtn');
    btn.textContent = '连接中...'; btn.disabled = true;
    R = document.getElementById('repoInput').value.trim();
    T = document.getElementById('tokenInput').value.trim();
    if (!R || !T) { alert('请填写仓库名和 Token'); btn.textContent = '连接'; btn.disabled = false; return; }
    msg('loginMsg', 'info', '连接中...');
    sessionStorage.setItem('latte_admin_v3', JSON.stringify({ r: R, t: T }));
    ghGet('data/site.json').then(function(j) {
      site = JSON.parse(b64d(j.content));
      return ghGet('data/blog.json').then(function(bj) { blog = JSON.parse(b64d(bj.content)); }).catch(function() { blog = { posts: [] }; });
    }).then(function() {
      return ghGet('data/comments.json').then(function(cj) { comments = JSON.parse(b64d(cj.content)); }).catch(function() { comments = []; });
    }).then(function() {
      document.getElementById('loginPanel').style.display = 'none';
      document.getElementById('mainPanel').style.display = 'block';
      btn.textContent = '连接'; btn.disabled = false;
      msg('connStatus', 'ok', '已连接');
      renderAll();
    }).catch(function(err) {
      console.error('[Admin] login failed', err);
      btn.textContent = '连接'; btn.disabled = false;
      var tip = err.message;
      if (tip === 'Failed to fetch') tip = '网络不通 — 按F12看Console/Network面板';
      else if (tip.indexOf('401') !== -1) tip = '认证失败(401) — Token无效或过期';
      else if (tip.indexOf('404') !== -1) tip = '仓库/文件不存在(404)';
      else if (tip.indexOf('403') !== -1) tip = '权限不足(403) — Token需repo或Contents权限';
      msg('loginMsg', 'err', '连接失败: ' + tip);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('tabBar').addEventListener('click', function(e) {
      var btn = e.target.closest('.tab-btn'); if (!btn) return;
      document.querySelectorAll('.tab-btn').forEach(function(t) { t.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(function(t) { t.classList.remove('active'); });
      document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.add('active');
      refreshTab(btn.getAttribute('data-tab'));
    });
    var imgInput = document.getElementById('imgFileInput');
    if (imgInput) imgInput.addEventListener('change', function() {
      var f = imgInput.files[0]; if (f) { document.getElementById('imgFileName').textContent = f.name; uploadImage(f); }
    });
    initRichToolbar();
    var saved = sessionStorage.getItem('latte_admin_v3');
    if (saved) { try { var c = JSON.parse(saved); R = c.r; T = c.t; } catch(e) { sessionStorage.removeItem('latte_admin_v3'); } }
  });

  function refreshTab(name) { if (name === 'images') loadImages(); if (name === 'music') loadMusicStatus(); }

  function renderAll() {
    document.getElementById('siteName').value = site.name || '';
    document.getElementById('siteTagline').value = site.tagline || '';
    document.getElementById('siteAbout').value = site.about || '';
    document.getElementById('siteEmail').value = (site.contact && site.contact.email) || '';
    renderBlog(); renderGuestbook(); renderPhoto(); renderBooks(); renderHiking(); renderHobbies();
  }  // ====== 1. 站点 ======
  function saveSite() {
    site.name = document.getElementById('siteName').value;
    site.tagline = document.getElementById('siteTagline').value;
    site.about = document.getElementById('siteAbout').value;
    if (!site.contact) site.contact = {};
    site.contact.email = document.getElementById('siteEmail').value;
    msg('siteMsg', 'info', '保存中...');
    ghGet('data/site.json').then(function(j) {
      return ghPut('data/site.json', JSON.stringify(site, null, 2), j.sha);
    }).then(function() { msg('siteMsg', 'ok', '已保存'); }).catch(function(err) { msg('siteMsg', 'err', '失败: ' + err.message); });
  }

  // ====== 2. 博客 ======
  function renderBlog() {
    var list = document.getElementById('blogList');
    if (!blog.posts || !blog.posts.length) { list.innerHTML = '<p style="color:var(--ink-muted);text-align:center;padding:1rem;">暂无文章</p>'; return; }
    list.innerHTML = blog.posts.map(function(p, i) {
      return '<div class="item-card"><div class="item-header"><div><span class="item-title">' + esc(p.title) + '</span><span class="item-meta" style="margin-left:0.5rem;">' + esc(p.date) + '</span></div><div><button class="btn btn-ghost btn-sm" onclick="Admin.editBlogPost(' + i + ')">编辑</button><button class="btn btn-danger btn-sm" onclick="Admin.deleteBlogPost(' + i + ')" style="margin-left:0.3rem;">删除</button></div></div><div class="item-body">' + (p.summary || '') + '</div></div>';
    }).join('');
  }
  function newBlogPost() { var slug = 'post-' + new Date().toISOString().slice(0,10);
    blog.posts.unshift({ title: '新文章', date: new Date().toISOString().slice(0,10), summary: '', content: '', file: slug + '.html' });
    renderBlog(); editBlogPost(0);
  }
  function deleteBlogPost(i) { if (!confirm('确定删除？')) return; blog.posts.splice(i, 1); saveBlog(); }
  function editBlogPost(i) {
    var p = blog.posts[i];
    document.getElementById('blogList').innerHTML = '<div class="content-card" style="margin-top:0;"><h2>编辑文章</h2><div class="form-group"><label>标题</label><input id="bpTitle" value="' + esc(p.title) + '"></div><div class="form-group"><label>日期</label><input type="date" id="bpDate" value="' + esc(p.date) + '"></div><div class="form-group"><label>摘要</label><textarea id="bpSummary" rows="2">' + esc(p.summary) + '</textarea></div><div class="form-group"><label>正文 (HTML)</label><textarea id="bpContent" rows="10" data-rich="true">' + esc(p.content) + '</textarea></div>' +
      '<div class="form-group"><label>页面文件名（如 my-post.html）</label><input id="bpFile" value="' + esc(p.file) + '"></div>' +
      '<div class="action-bar"><button class="btn btn-ghost" onclick="Admin.renderBlog()">取消</button><button class="btn btn-primary" id="bpSaveBtn">保存文章</button></div></div>';
    document.getElementById('bpSaveBtn').addEventListener('click', function() {
      blog.posts[i].title = document.getElementById('bpTitle').value;
      blog.posts[i].date = document.getElementById('bpDate').value;
      blog.posts[i].summary = document.getElementById('bpSummary').value;
      blog.posts[i].content = document.getElementById('bpContent').value;
      blog.posts[i].file = document.getElementById('bpFile').value;
      saveBlog(i);
    });
  }
  function saveBlog(editedIdx) {
    msg('blogMsg', 'info', '保存中...');
    ghGet('data/blog.json').then(function(j) {
      return ghPut('data/blog.json', JSON.stringify(blog, null, 2), j.sha);
    }).then(function() {
      if (editedIdx !== undefined && editedIdx >= 0) {
        var p = blog.posts[editedIdx];
        if (p.file) {
          var html = '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + esc(p.title) + ' - Latte</title>\n<link rel="stylesheet" href="../../css/tokens.css">\n<link rel="stylesheet" href="../../css/base.css">\n<link rel="stylesheet" href="../../css/nav.css">\n<link rel="stylesheet" href="../../css/contact-footer.css">\n</head>\n<body>\n<div id="reading-progress"></div>\n<nav class="site-nav"><div class="nav-glass">\n  <a class="nav-brand" href="../../index.html">Latte</a>\n  <div class="nav-links">\n    <a href="../../index.html" class="nav-link">首页</a>\n    <a href="../index.html" class="nav-link">博客</a>\n  </div>\n</div></nav>\n<article style="max-width:700px;margin:0 auto;padding:7rem 1.5rem 3rem;">\n  <div class="gradient-border-card" style="padding:2rem 2.5rem;">\n    <div style="font-size:0.78rem;color:var(--text-dim);margin-bottom:0.6rem;">' + p.date + '</div>\n    <h1 style="font-size:1.6rem;font-weight:300;color:var(--text-primary);margin-bottom:1.5rem;line-height:1.4;">' + p.title + '</h1>\n    <div style="color:var(--text-body);font-size:0.95rem;line-height:2.1;">' + (p.content || '') + '</div>\n    <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid var(--border-subtle);">\n      <a href="../index.html" style="color:var(--neon-cyan);font-size:0.85rem;text-decoration:none;">← 返回博客</a>\n    </div>\n  </div>\n</article>\n<footer>\n  <div class="footer-inner" style="max-width:900px;margin:0 auto;padding:0 1.5rem;">\n    <span>&copy; 2026 Latte · 由 Codex 搭建</span>\n  </div>\n</footer>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></' + 'script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></' + 'script>\n<script src="../../js/cursor.js"></' + 'script>\n</body>\n</html>';
          var path = 'blog/posts/' + p.file;
          return ghGet(path).then(function(existing) {
            return ghPut(path, html, existing.sha);
          }).catch(function() {
            return ghPut(path, html);
          });
        }
      }
    }).then(function() { msg('blogMsg', 'ok', '已保存'); renderBlog(); })
      .catch(function(err) { msg('blogMsg', 'err', '失败: ' + err.message); });
  }

  // ====== 3. 留言板 ======
  function renderGuestbook() {
    var list = document.getElementById('gbList');
    if (!comments || !comments.length) { list.innerHTML = '<p style="color:var(--ink-muted);text-align:center;padding:1rem;">暂无留言</p>'; return; }
    list.innerHTML = comments.map(function(c, i) {
      return '<div class="item-card"><div class="item-header"><span class="item-title">' + esc(c.name || '匿名') + '</span><div><span class="item-meta" style="margin-right:0.5rem;">' + esc(c.date) + '</span><button class="btn btn-danger btn-sm" onclick="Admin.deleteComment(' + i + ')">删除</button></div></div><div class="item-body">' + esc(c.text) + '</div></div>';
    }).join('');
  }
  function deleteComment(i) { if (!confirm('确定删除？')) return; comments.splice(i, 1); saveGuestbook(); }
  function syncLocalGuestbook() {
    var local = JSON.parse(localStorage.getItem('gb_local') || '[]');
    if (!local.length) { msg('gbMsg', 'info', '没有待同步的本地留言'); return; }
    var added = 0;
    local.forEach(function(c) { if (!comments.some(function(x) { return x.text===c.text&&x.name===c.name&&x.date===c.date; })) { comments.unshift(c); added++; } });
    if (!added) { msg('gbMsg', 'info', '没有新留言'); return; }
    msg('gbMsg', 'info', '同步中...');
    ghGet('data/comments.json').then(function(j) { return ghPut('data/comments.json', JSON.stringify(comments,null,2), j.sha); })
      .then(function() { localStorage.removeItem('gb_local'); msg('gbMsg', 'ok', '已同步'+added+'条'); renderGuestbook(); }).catch(function(err) { msg('gbMsg', 'err', '失败: '+err.message); });
  }
  function saveGuestbook() {
    msg('gbMsg', 'info', '保存中...');
    ghGet('data/comments.json').then(function(j) { return ghPut('data/comments.json', JSON.stringify(comments,null,2), j.sha); })
      .then(function() { msg('gbMsg', 'ok', '已保存'); renderGuestbook(); }).catch(function(err) { msg('gbMsg', 'err', '失败: '+err.message); });
  }

  // ====== 4. 摄影 ======
  function getPhoto() {
    if (!site.interests) site.interests = [];
    var it = site.interests.find(function(i) { return i.name === '摄影'; });
    if (!it) { it = { name:'摄影',icon:'camera',page:'interests/photography.html',description:'',albums:[] }; site.interests.push(it); }
    if (!it.albums) it.albums = [];
    return it;
  }
  function renderPhoto() {
    var it = getPhoto();
    if (!it.albums.length) { document.getElementById('photoList').innerHTML = '<p style="color:var(--ink-muted);text-align:center;padding:1rem;">暂无图集</p>'; return; }
    var h = '';
    it.albums.forEach(function(a, i) {
      h += '<div class="item-card"><div class="item-header"><span class="item-title">📷 ' + esc(a.name||'未命名') + '</span><button class="btn btn-danger btn-sm" onclick="Admin.deleteAlbum('+i+')">删除</button></div><div class="form-group"><label>名称</label><input class="pa-name" value="'+esc(a.name||'')+'"></div><div class="form-group"><label>描述</label><input class="pa-desc" value="'+esc(a.description||'')+'"></div><div class="form-group"><label>封面路径</label><input class="pa-cover" value="'+esc(a.cover||'')+'"></div><div class="form-group"><label>图片（一行一个路径）</label><textarea class="pa-imgs" rows="3">'+(a.images||[]).join('\n')+'</textarea></div><div class="form-group"><label>日志</label><textarea class="pa-journal" rows="3" data-rich="true">'+esc(a.journal||'')+'</textarea></div></div>';
    });
    document.getElementById('photoList').innerHTML = h;
  }
  function newAlbum() { getPhoto().albums.push({ name:'',description:'',cover:'',images:[],journal:'' }); renderPhoto(); }
  function deleteAlbum(i) { if (!confirm('确定删除？')) return; getPhoto().albums.splice(i,1); renderPhoto(); }
  function savePhoto() {
    var it = getPhoto();
    var cards = document.querySelectorAll('#photoList .item-card');
    cards.forEach(function(card, i) { it.albums[i].name=card.querySelector('.pa-name').value; it.albums[i].description=card.querySelector('.pa-desc').value; it.albums[i].cover=card.querySelector('.pa-cover').value; it.albums[i].images=card.querySelector('.pa-imgs').value.split('\n').filter(function(l){return l.trim();}); it.albums[i].journal=card.querySelector('.pa-journal').value; });
    msg('photoMsg','info','保存中...');
    ghGet('data/site.json').then(function(j){return ghPut('data/site.json',JSON.stringify(site,null,2),j.sha);}).then(function(){msg('photoMsg','ok','已保存');}).catch(function(err){msg('photoMsg','err','失败: '+err.message);});
  }
  // ====== 5. 书籍 ======
  function getBooks() { var it=site.interests.find(function(i){return i.name==='书籍';}); if(!it){it={name:'书籍',icon:'book',page:'interests/books.html',description:'',read:[],reading:[],wantToRead:[]};site.interests.push(it);} return it; }
  function renderBooks() {
    var it=getBooks();
    var sections=[{key:'reading',label:'📖 在读',arr:it.reading||[]},{key:'read',label:'✅ 已读',arr:it.read||[]},{key:'wantToRead',label:'📋 想读',arr:it.wantToRead||[]}];
    var h='';
    sections.forEach(function(sec){
      h+='<div class="section-group"><h3>'+sec.label+'</h3>';
      sec.arr.forEach(function(b,j){
        h+='<div class="item-card"><div class="item-header"><span class="item-title">'+esc(b.title||'')+'</span>'+
          '<button class="btn btn-danger btn-sm" onclick="Admin.deleteBook(\''+sec.key+'\','+j+')">删除</button></div>'+
          '<div class="form-group"><label>书名</label><input class="bk-title" value="'+esc(b.title||'')+'"></div>'+
          '<div class="form-group"><label>作者</label><input class="bk-author" value="'+esc(b.author||'')+'"></div>'+
          '<div class="form-group"><label>封面</label><input class="bk-cover" value="'+esc(b.cover||'')+'"></div>'+
          '<div class="form-group"><label>书评</label><textarea class="bk-review" rows="2">'+esc(b.review||'')+'</textarea></div></div>';
      });
      h+='<button class="btn btn-ghost btn-sm" onclick="Admin.newBook(\''+sec.key+'\')" style="margin-top:0.3rem;">+ 添加</button></div>';
    });
    document.getElementById('booksList').innerHTML=h;
  }
  function newBook(key){var it=getBooks();(it[key]||(it[key]=[])).push({title:'',author:'',cover:'',review:''});renderBooks();}
  function deleteBook(key,i){getBooks()[key].splice(i,1);renderBooks();}
  function saveBooks(){
    var it=getBooks();
    var groups=document.querySelectorAll('#booksList .section-group');
    ['reading','read','wantToRead'].forEach(function(key,gi){var grp=groups[gi];if(!grp)return;var cards=grp.querySelectorAll('.item-card');it[key]=Array.from(cards).map(function(card){return{title:card.querySelector('.bk-title').value,author:card.querySelector('.bk-author').value,cover:card.querySelector('.bk-cover').value,review:card.querySelector('.bk-review').value};});});
    msg('booksMsg','info','保存中...');
    ghGet('data/site.json').then(function(j){return ghPut('data/site.json',JSON.stringify(site,null,2),j.sha);}).then(function(){msg('booksMsg','ok','已保存');renderBooks();}).catch(function(err){msg('booksMsg','err','失败: '+err.message);});
  }

  // ====== 6. 登山 ======
  function getHiking(){var it=site.interests.find(function(i){return i.name==='登山';});if(!it){it={name:'登山',icon:'mountain',page:'interests/hiking.html',description:'',climbed:[],wantToClimb:[],journal:'',images:[]};site.interests.push(it);}return it;}
  function renderHiking(){
    var it=getHiking();
    var h='<div class="section-group"><h3>📝 登山日志</h3><textarea id="hikeJournal" rows="4" data-rich="true">'+esc(it.journal||'')+'</textarea></div>';
    h+='<div class="section-group"><h3>⛰️ 已登顶</h3>';
    (it.climbed||[]).forEach(function(m,j){h+='<div class="item-card"><div class="item-header"><span class="item-title">'+esc(m.name||'')+'</span><button class="btn btn-danger btn-sm" onclick="Admin.deleteClimbed('+j+')">删除</button></div><div class="form-group"><label>山名</label><input class="hc-name" value="'+esc(m.name||'')+'"></div><div class="form-group"><label>日期</label><input class="hc-date" value="'+esc(m.date||'')+'"></div><div class="form-group"><label>备注</label><textarea class="hc-note" rows="2">'+esc(m.note||'')+'</textarea></div></div>';});
    h+='<button class="btn btn-ghost btn-sm" onclick="Admin.newClimbed()">+ 添加</button></div>';
    h+='<div class="section-group"><h3>🗻 想去</h3>';
    (it.wantToClimb||[]).forEach(function(m,j){h+='<div class="item-card"><div class="item-header"><span class="item-title">'+esc(m.name||'')+'</span><button class="btn btn-danger btn-sm" onclick="Admin.deleteWantClimb('+j+')">删除</button></div><div class="form-group"><label>山名</label><input class="hw-name" value="'+esc(m.name||'')+'"></div><div class="form-group"><label>理由</label><input class="hw-reason" value="'+esc(m.reason||'')+'"></div></div>';});
    h+='<button class="btn btn-ghost btn-sm" onclick="Admin.newWantClimb()">+ 添加</button></div>';
    document.getElementById('hikingList').innerHTML=h;
  }
  function newClimbed(){var it=getHiking();if(!it.climbed)it.climbed=[];it.climbed.push({name:'',date:'',note:''});renderHiking();}
  function newWantClimb(){var it=getHiking();if(!it.wantToClimb)it.wantToClimb=[];it.wantToClimb.push({name:'',reason:''});renderHiking();}
  function deleteClimbed(i){getHiking().climbed.splice(i,1);renderHiking();}
  function deleteWantClimb(i){getHiking().wantToClimb.splice(i,1);renderHiking();}
  function saveHiking(){
    var it=getHiking();it.journal=document.getElementById('hikeJournal').value;
    var g1=document.querySelectorAll('#hikingList .section-group')[1];
    if(g1){it.climbed=Array.from(g1.querySelectorAll('.item-card')).map(function(card){return{name:card.querySelector('.hc-name').value,date:card.querySelector('.hc-date').value,note:card.querySelector('.hc-note').value};});}
    var g2=document.querySelectorAll('#hikingList .section-group')[2];
    if(g2){it.wantToClimb=Array.from(g2.querySelectorAll('.item-card')).map(function(card){return{name:card.querySelector('.hw-name').value,reason:card.querySelector('.hw-reason').value};});}
    msg('hikingMsg','info','保存中...');
    ghGet('data/site.json').then(function(j){return ghPut('data/site.json',JSON.stringify(site,null,2),j.sha);}).then(function(){msg('hikingMsg','ok','已保存');}).catch(function(err){msg('hikingMsg','err','失败: '+err.message);});
  }

  // ====== 7. 爱好 ======
  function getHobbies(){var it=site.interests.find(function(i){return i.name==='三分钟热度';});if(!it){it={name:'三分钟热度',icon:'sparkle',page:'interests/hobbies.html',description:'',hobbies:[]};site.interests.push(it);}return it;}
  function renderHobbies(){var it=getHobbies();var h=(it.hobbies||[]).map(function(hb,i){return '<div class="item-card"><div class="item-header"><span class="item-title">'+esc(hb)+'</span><button class="btn btn-danger btn-sm" onclick="Admin.deleteHobby('+i+')">删除</button></div><input class="hobby-input" value="'+esc(hb)+'"></div>';}).join('');document.getElementById('hobbiesList').innerHTML=h||'<p style="color:var(--ink-muted);text-align:center;padding:1rem;">暂无爱好</p>';}
  function newHobby(){getHobbies().hobbies.push('');renderHobbies();}
  function deleteHobby(i){getHobbies().hobbies.splice(i,1);renderHobbies();}
  function saveHobbies(){var it=getHobbies();it.hobbies=Array.from(document.querySelectorAll('#hobbiesList .hobby-input')).map(function(i){return i.value.trim();}).filter(Boolean);msg('hobbiesMsg','info','保存中...');ghGet('data/site.json').then(function(j){return ghPut('data/site.json',JSON.stringify(site,null,2),j.sha);}).then(function(){msg('hobbiesMsg','ok','已保存');}).catch(function(err){msg('hobbiesMsg','err','失败: '+err.message);});}
  // ====== 8. 图片管理 ======
  function uploadImage(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var b64 = e.target.result.split(',')[1];
      msg('imgMsg', 'info', '上传中...');
      ghGet('images/' + file.name).then(function(j) { return gh('PUT', 'images/' + file.name, j.sha, { message: 'Upload ' + file.name, content: b64 }); })
        .catch(function() { return gh('PUT', 'images/' + file.name, null, { message: 'Upload ' + file.name, content: b64 }); })
        .then(function() { msg('imgMsg', 'ok', '已上传: images/' + file.name); document.getElementById('imgFileName').textContent = ''; document.getElementById('imgFileInput').value = ''; loadImages(); })
        .catch(function(err) { msg('imgMsg', 'err', '失败: ' + err.message); });
    };
    reader.readAsDataURL(file);
  }
  function loadImages() {
    fetch('https://api.github.com/repos/' + R + '/contents/images', { headers: { 'Authorization': 'Bearer ' + T } })
      .then(function(r) { if (!r.ok) throw new Error(''); return r.json(); })
      .then(function(files) {
        var imgs = files.filter(function(f) { return f.type === 'file' && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name); });
        document.getElementById('imgGrid').innerHTML = imgs.map(function(f) { return '<div class="img-grid-item"><img src="' + f.download_url + '" alt="' + f.name + '" loading="lazy"><span class="img-name">' + f.name + '</span></div>'; }).join('') || '<p style="color:var(--ink-muted);width:100%;">暂无图片</p>';
      }).catch(function() { document.getElementById('imgGrid').innerHTML = '<p style="color:var(--ink-muted);">暂无图片</p>'; });
  }

  // ====== 9. 音乐同步 ======
  function loadMusicStatus() {
    fetch(API_BASE + '/api/netease/status').then(function(r) { return r.json(); }).then(function(d) {
      document.getElementById('musicStatus').innerHTML = '当前缓存: <strong>' + d.songCount + '</strong> 首歌 | 更新于: ' + (d.cachedAt ? new Date(d.cachedAt).toLocaleString('zh-CN') : '未知');
    }).catch(function() { document.getElementById('musicStatus').textContent = '无法连接音乐服务'; });
  }
  function syncMusic() {
    msg('musicMsg', 'info', '同步中...');
    fetch(API_BASE + '/api/netease/sync', { method: 'POST' }).then(function(r) { return r.json(); })
      .then(function(d) { msg('musicMsg', 'ok', '同步完成！共 ' + d.songCount + ' 首'); loadMusicStatus(); })
      .catch(function(err) { msg('musicMsg', 'err', '失败: ' + err.message); });
  }

  // ====== 富文本工具栏 ======
  function initRichToolbar() {
    var tb = document.getElementById('richToolbar'), activeTA = null;
    document.addEventListener('focusin', function(e) {
      if (e.target.tagName === 'TEXTAREA' && e.target.hasAttribute('data-rich')) {
        activeTA = e.target; var r = e.target.getBoundingClientRect();
        tb.style.left = Math.max(5, r.left) + 'px'; tb.style.top = Math.max(5, r.top + window.scrollY - 44) + 'px'; tb.style.display = 'flex';
      }
    });
    document.addEventListener('click', function(e) { if (!e.target.closest('[data-rich]') && !e.target.closest('#richToolbar')) { tb.style.display = 'none'; activeTA = null; } });
    tb.addEventListener('click', function(e) {
      var btn = e.target.closest('button'); if (!btn || !activeTA) return; e.preventDefault();
      var tag = btn.getAttribute('data-tag'); if (!tag) return;
      var ta = activeTA, s = ta.selectionStart, n = ta.selectionEnd, v = ta.value, sel = v.substring(s, n), w = ['', ''];
      switch (tag) {
        case 'b': w = ['<strong>', '</strong>']; break;
        case 'i': w = ['<em>', '</em>']; break;
        case 'h3': w = ['<h3>', '</h3>']; break;
        case 'blockquote': w = ['<blockquote><p>', '</p></blockquote>']; break;
        case 'mark': w = ['<mark>', '</mark>']; break;
        case 'br': w = ['', '<br>']; sel = ''; break;
        case 'a': var url = prompt('链接地址:', 'https://'); if (!url) return; w = ['<a href="' + url + '">', '</a>']; break;
      }
      var rep = w[0] + sel + w[1]; ta.value = v.substring(0, s) + rep + v.substring(n);
      ta.focus(); var np = s + w[0].length + sel.length + (tag === 'br' ? 4 : 0); ta.setSelectionRange(np, np);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  return {
    login: login, saveSite: saveSite,
    renderBlog: renderBlog, newBlogPost: newBlogPost, deleteBlogPost: deleteBlogPost, editBlogPost: editBlogPost, saveBlog: saveBlog,
    deleteComment: deleteComment, syncLocalGuestbook: syncLocalGuestbook, saveGuestbook: saveGuestbook,
    newAlbum: newAlbum, deleteAlbum: deleteAlbum, savePhoto: savePhoto,
    renderBooks: renderBooks, newBook: newBook, deleteBook: deleteBook, saveBooks: saveBooks,
    renderHiking: renderHiking, newClimbed: newClimbed, newWantClimb: newWantClimb, deleteClimbed: deleteClimbed, deleteWantClimb: deleteWantClimb, saveHiking: saveHiking,
    renderHobbies: renderHobbies, newHobby: newHobby, deleteHobby: deleteHobby, saveHobbies: saveHobbies,
    loadImages: loadImages, loadMusicStatus: loadMusicStatus, syncMusic: syncMusic
  };
})();
