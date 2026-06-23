// ====== 🦆 霓虹橡皮鸭蓄水池 v5.0 ======
// 核心修正：
//   1. 橡皮鸭 SVG 重绘为经典圆润造型
//   2. 鸭子浸入水中 ~30%，不飘在空气里
//   3. 入水仅下沉→浮起，不弹跳
//   4. 所有鸭子默认稳稳浮于水面
(function() {
  var pool, rippleCanvas, rippleCtx, waveCanvas, waveCtx, ducksLayer;
  var ducks = [];
  var ripples = [];
  var splashes = [];
  var animId = null;
  var WATER_LEVEL = 0.60;       // 水面在容器 60% 处（上方空气，下方水）
  var GRAVITY = 0.50;
  var BUOYANCY = 0.06;
  var SUBMERGE_RATIO = 0.30;    // 鸭子底部有 30% 浸入水中
  var poolW = 0, poolH = 0;
  var isDragging = false;
  var dragDuck = null;
  var dragOffX = 0, dragOffY = 0;
  var time = 0;
  var activeCard = null;

  var NEON_COLORS = [
    '#ff3d71', '#00d4aa', '#ffb800', '#7c4dff',
    '#2990c0', '#ff6d3a', '#ff3d9e', '#3ad4ff',
    '#ff5e99', '#00e5bf', '#ffcc33', '#9d6eff'
  ];

  var waveLayers = [
    { amp: 7,  freq: 0.008, speed: 0.7,  color: 'rgba(0,212,170,0.13)', width: 2 },
    { amp: 4,  freq: 0.013, speed: 1.1,  color: 'rgba(0,180,160,0.08)', width: 1.5 },
    { amp: 2,  freq: 0.019, speed: 1.6,  color: 'rgba(0,160,140,0.05)', width: 1 }
  ];

  // 鸭子水面 Y 坐标（鸭子顶部位置，底部浸入水面下 SUBMERGE_RATIO）
  function duckSurfaceY(duck) {
    return WATER_LEVEL * poolH - duck.size * 0.85 * (1 - SUBMERGE_RATIO);
  }

  // ====== 初始化 ======
  function init() {
    pool = document.getElementById('duckPool');
    rippleCanvas = document.getElementById('poolRippleCanvas');
    waveCanvas = document.getElementById('poolWaveCanvas');
    ducksLayer = document.getElementById('poolDucksLayer');
    if (!pool || !rippleCanvas || !waveCanvas || !ducksLayer) return;
    resizePool();
    window.addEventListener('resize', resizePool);
    rippleCtx = rippleCanvas.getContext('2d');
    waveCtx = waveCanvas.getContext('2d');
    loadMessages();
    bindEvents();
    startLoop();
  }

  function resizePool() {
    poolW = pool.clientWidth;
    poolH = pool.clientHeight;
    rippleCanvas.width = poolW;
    rippleCanvas.height = poolH;
    waveCanvas.width = poolW;
    waveCanvas.height = poolH;
  }

  // ====== 数据加载 ======
  async function loadMessages() {
    var messages = [];
    try {
      var res = await fetch('data/comments.json?v=' + Date.now());
      if (res.ok) messages = await res.json();
    } catch(e) {}
    try {
      var local = JSON.parse(localStorage.getItem('gb_local') || '[]');
      local.forEach(function(c) {
        if (!messages.some(function(m) { return m.text === c.text && m.name === c.name; })) {
          messages.unshift(c);
        }
      });
    } catch(e) {}
    messages.forEach(function(msg) { spawnDuck(msg, true); });
    updateDuckCount();
  }

  // ====== 经典橡皮鸭 SVG ======
  // 造型参考真实橡皮鸭：椭圆身体 + 圆头（无缝连接）+ 短喙 + 小圆尾 + 两点眼睛
  function createDuckSVG(color, size) {
    var s = size;
    var r, g, b;
    if (color.startsWith('#')) {
      r = parseInt(color.slice(1,3),16); g = parseInt(color.slice(3,5),16); b = parseInt(color.slice(5,7),16);
    } else { r = 255; g = 61; b = 113; }
    var hi = 'rgba(' + r + ',' + g + ',' + b + ',0.22)';
    var lo = 'rgba(' + Math.max(0,r-30) + ',' + Math.max(0,g-30) + ',' + Math.max(0,b-30) + ',0.40)';

    return '<svg viewBox="0 0 80 68" width="' + s + '" height="' + (s*0.85) + '" style="display:block;pointer-events:none;">' +

      // === 身体（圆润椭圆，经典橡皮鸭体型） ===
      '<ellipse cx="32" cy="42" rx="23" ry="16" fill="' + color + '" opacity="0.90"/>' +
      // 身体高光
      '<ellipse cx="34" cy="38" rx="16" ry="10" fill="' + hi + '"/>' +
      // 身体暗面（底部）
      '<ellipse cx="30" cy="48" rx="16" ry="7" fill="' + lo + '"/>' +

      // === 头部（圆，与身体重叠，无颈部间隙） ===
      '<circle cx="50" cy="24" r="12" fill="' + color + '" opacity="0.90"/>' +
      // 头顶高光
      '<circle cx="52" cy="20" r="7" fill="' + hi + '"/>' +
      // 头侧暗面
      '<circle cx="47" cy="26" r="6.5" fill="' + lo + '"/>' +

      // === 嘴巴（短而圆润的鸭喙） ===
      '<path d="M60,22 C64,21 68,22.5 68,24 C68,25.5 64,26 60,25 Z" fill="' + color + '" opacity="0.80"/>' +

      // === 眼睛（两点式，经典玩具眼） ===
      '<circle cx="53" cy="21" r="3.2" fill="#0a0a0a"/>' +
      '<circle cx="53.8" cy="20.4" r="1.2" fill="#fff" opacity="0.85"/>' +

      // === 小尾巴（后上方小突起） ===
      '<path d="M10,38 C6,36 5,32 8,30 C10,29 12,32 10,36 Z" fill="' + color + '" opacity="0.65"/>' +

      // === 翅膀轮廓 ===
      '<path d="M20,36 C26,32 40,32 46,38 C42,42 30,44 22,42 C19,40 19,38 20,36 Z" fill="' + color + '" opacity="0.20"/>' +

    '</svg>';
  }

  // ====== 生成鸭子 ======
  function spawnDuck(msg, initial) {
    var color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
    var size = 48 + Math.random() * 20;
    var x = 30 + Math.random() * (poolW - 100);

    var duck = {
      el: null, msg: msg, color: color,
      x: x, y: 0,
      vx: 0, vy: 0,
      size: size,
      mass: 0.4 + Math.random() * 0.6,
      angle: 0, av: 0,
      splashDone: initial,
      bobPhase: Math.random() * Math.PI * 2,
      _gsapAnim: null
    };

    // 初始状态：稳稳浮在水面（底部浸入水中 30%）
    if (initial) {
      duck.y = duckSurfaceY(duck);
      duck.vx = (Math.random() - 0.5) * 0.4;
      duck.vy = 0;
      duck.angle = (Math.random() - 0.5) * 8;
    } else {
      // 新留言鸭子：从空中掉下来
      duck.y = -size - 30;
      duck.vy = 3 + Math.random() * 4;
      duck.vx = (Math.random() - 0.5) * 2;
      duck.splashDone = false;
    }

    var el = document.createElement('div');
    el.className = 'duck-sprite' + (initial ? '' : ' falling');
    el.setAttribute('data-clickable', '');
    el.style.cssText =
      'position:absolute;left:' + duck.x + 'px;top:' + duck.y + 'px;' +
      'width:' + size + 'px;height:' + (size*0.85) + 'px;' +
      'cursor:pointer;z-index:2;pointer-events:auto;' +
      'transform-origin:center center;';
    el.innerHTML = createDuckSVG(color, size);
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      showDuckCard(msg, el);
    });
    ducksLayer.appendChild(el);
    duck.el = el;

    ducks.push(duck);
    updateDuckCount();

    if (!initial) {
      setTimeout(function() { el.classList.remove('falling'); }, 700);
    }
    return duck;
  }

  // ====== 入水动画（下沉→浮起，不弹跳） ======
  function playSplashAnimation(duck) {
    var surfaceY = duckSurfaceY(duck);

    if (duck._gsapAnim) { duck._gsapAnim.kill(); duck._gsapAnim = null; }

    // 入水深度：鸭子沉入更深（底部完全入水），然后浮回正常位置
    var sinkY = surfaceY + duck.size * 0.25;  // 额外下沉 25% 身高

    duck._gsapAnim = gsap.timeline({
      onComplete: function() {
        duck.y = surfaceY;
        duck.vy = 0;
        duck.splashDone = true;
        duck.bobPhase = Math.random() * Math.PI * 2;
        duck._gsapAnim = null;
        duck.el.style.top = duck.y + 'px';
        duck.el.style.opacity = 1;
      }
    });

    duck._gsapAnim
      // ① 下沉（0 → 0.28s）：鸭子被水的阻力按入水中
      .to(duck, {
        y: sinkY,
        duration: 0.28,
        ease: 'power3.in',
        onUpdate: function() {
          duck.el.style.top = duck.y + 'px';
          var t = Math.min(1, (duck.y - surfaceY) / (duck.size * 0.25));
          duck.el.style.opacity = 1 - t * 0.45;
        }
      })
      // ② 浮回正常位置（0.28 → 0.55s）：浮力推回水面
      .to(duck, {
        y: surfaceY,
        duration: 0.27,
        ease: 'power1.out',
        onUpdate: function() {
          duck.el.style.top = duck.y + 'px';
          duck.el.style.opacity = 1;
        }
      });
  }

  // ====== 弹窗卡片 ======
  function showDuckCard(msg, el) {
    if (activeCard) { activeCard.remove(); activeCard = null; }
    var card = document.createElement('div');
    card.className = 'duck-card-popup';
    var duck = ducks.find(function(d) { return d.el === el; });
    var color = duck ? duck.color : '#00d4aa';
    var rect = el.getBoundingClientRect();
    var poolRect = pool.getBoundingClientRect();

    card.innerHTML =
      '<button class="duck-card-close">&times;</button>' +
      '<strong style="color:' + color + '">' + ((msg.name||'匿名').replace(/</g,'&lt;')) + '</strong>' +
      (msg.date ? '<span style="font-size:0.65rem;color:#555;margin-left:0.4rem">' + msg.date + '</span>' : '') +
      '<p style="margin-top:0.5rem;line-height:1.7;color:#bbb;font-size:0.82rem;word-break:break-word;">' + (msg.text||'').replace(/</g,'&lt;') + '</p>';

    var top = rect.top - poolRect.top - 120;
    if (top < 8) top = rect.bottom - poolRect.top + 10;
    var left = Math.max(8, Math.min(poolW - 270, rect.left - poolRect.left - 60));
    card.style.cssText = 'position:absolute;top:' + top + 'px;left:' + left + 'px;min-width:200px;max-width:260px;z-index:50;pointer-events:auto;';
    card.querySelector('.duck-card-close').addEventListener('click', function() { card.remove(); activeCard = null; });
    pool.appendChild(card);
    activeCard = card;
    el.classList.add('bounce');
    setTimeout(function() { el.classList.remove('bounce'); }, 350);
  }

  // ====== 物理循环 ======
  function physicsTick() {
    var waterY = WATER_LEVEL * poolH;

    ducks.forEach(function(d) {
      if (d._gsapAnim) return;  // GSAP 动画中的鸭子不参与物理

      var duckBottom = d.y + d.size * 0.85;

      if (d.splashDone) {
        // ---- 漂浮在水面 ----
        // 鸭子稳定浮在水面，底部浸入水中 SUBMERGE_RATIO
        var targetY = duckSurfaceY(d);
        // 轻柔拉回目标位置
        d.y += (targetY - d.y) * 0.08;

        // 水面微波起伏
        d.y += Math.sin(d.bobPhase + time * 1.5) * 0.5;

        // 水平漂移
        d.vx += Math.sin(time * 0.7 + d.bobPhase) * 0.01;
        d.vx += (Math.random() - 0.5) * 0.02;
        d.vx *= 0.985;

        // 缓慢旋转
        d.av += (Math.random() - 0.5) * 0.008;
        d.av *= 0.97;
        d.angle += d.av;
        if (Math.abs(d.angle) > 20) d.av *= 0.5;

      } else {
        // ---- 下落中（重力加速度） ----
        d.vy += GRAVITY;
        d.vx *= 0.98;

        // 检测入水
        if (duckBottom >= waterY - 5 && d.vy > 1) {
          // 命中水面
          d.y = waterY - d.size * 0.85;
          d.vx *= 0.3;
          // 涟漪 + 水花
          createRipple(d.x + d.size/2, waterY, d.size * 0.9);
          createRipple(d.x + d.size/2, waterY, d.size * 0.4, 0.3);
          createSplash(d.x + d.size/2, waterY, d.color, d.vy * 0.4);
          // 触发入水动画（下沉→浮起）
          playSplashAnimation(d);
          return;
        }
      }

      // 边界约束
      if (d.x < 5) { d.x = 5; d.vx *= -0.4; }
      if (d.x > poolW - d.size - 5) { d.x = poolW - d.size - 5; d.vx *= -0.4; }
      // 不允许鸭子进入"空气区域"过高的位置（上方是空气，鸭子不能飘上去）
      if (d.y < 8) { d.y = 8; d.vy = Math.abs(d.vy) * 0.3; }
      if (d.y > poolH - d.size - 5) { d.y = poolH - d.size - 5; d.vy *= -0.3; }

      d.x += d.vx;
      d.y += d.vy;

      // 漂浮时偶尔产生微涟漪
      if (d.splashDone && Math.abs(d.vx) > 0.25 && Math.random() < 0.03) {
        createRipple(d.x + d.size/2, waterY, 5 + Math.abs(d.vx)*2, 0.35);
      }
    });

    // 鸭间碰撞（仅水面漂浮的鸭子）
    for (var i = 0; i < ducks.length; i++) {
      for (var j = i + 1; j < ducks.length; j++) {
        var a = ducks[i], b = ducks[j];
        if (!a.splashDone || !b.splashDone || a._gsapAnim || b._gsapAnim) continue;
        var dx = (a.x + a.size/2) - (b.x + b.size/2);
        var dy = (a.y + a.size*0.4) - (b.y + b.size*0.4);
        var dist = Math.sqrt(dx*dx + dy*dy);
        var minDist = (a.size + b.size) * 0.38;
        if (dist < minDist && dist > 0) {
          var overlap = minDist - dist;
          var nx = dx/dist, ny = dy/dist;
          var tm = a.mass + b.mass;
          a.x += nx * overlap * b.mass/tm;
          a.y += ny * overlap * b.mass/tm;
          b.x -= nx * overlap * a.mass/tm;
          b.y -= ny * overlap * a.mass/tm;
          var relV = (a.vx-b.vx)*nx + (a.vy-b.vy)*ny;
          if (relV > 0) {
            var imp = relV * 0.4;
            a.vx -= nx*imp*b.mass/tm;
            a.vy -= ny*imp*b.mass/tm;
            b.vx += nx*imp*a.mass/tm;
            b.vy += ny*imp*a.mass/tm;
          }
          a.av += (Math.random()-0.5)*1.5;
          b.av += (Math.random()-0.5)*1.5;
        }
      }
    }
  }

  // ====== DOM 渲染 ======
  function renderDucks() {
    ducks.forEach(function(d) {
      if (d._gsapAnim) return;
      d.el.style.left = d.x + 'px';
      d.el.style.top = d.y + 'px';
      d.el.style.transform = 'rotate(' + d.angle + 'deg)';
    });
  }

  function decayEffects() {
    ripples = ripples.filter(function(r) { r.radius += 1.8; r.opacity -= 0.01; return r.opacity > 0; });
    splashes = splashes.filter(function(s) { s.x += s.vx; s.y += s.vy; s.vy += 0.12; s.opacity -= 0.02; return s.opacity > 0; });
  }

  function renderRipples() {
    rippleCtx.clearRect(0, 0, poolW, poolH);
    ripples.forEach(function(r) {
      rippleCtx.beginPath(); rippleCtx.arc(r.x, r.y, r.radius, 0, 2*Math.PI);
      rippleCtx.strokeStyle = 'rgba(0,212,170,' + r.opacity + ')'; rippleCtx.lineWidth = 1.5; rippleCtx.stroke();
    });
    splashes.forEach(function(s) {
      rippleCtx.beginPath(); rippleCtx.arc(s.x, s.y, s.size, 0, 2*Math.PI);
      rippleCtx.fillStyle = s.color + Math.floor(Math.min(255,s.opacity*255)).toString(16).padStart(2,'0'); rippleCtx.fill();
    });
  }

  function renderWaves() {
    waveCtx.clearRect(0, 0, poolW, poolH);
    var waterY = WATER_LEVEL * poolH;
    var waterGrad = waveCtx.createLinearGradient(0, waterY, 0, poolH);
    waterGrad.addColorStop(0, 'rgba(0,40,60,0.0)');
    waterGrad.addColorStop(0.12, 'rgba(0,55,75,0.06)');
    waterGrad.addColorStop(0.4, 'rgba(0,70,90,0.10)');
    waterGrad.addColorStop(1, 'rgba(0,25,45,0.18)');

    waveCtx.beginPath();
    for (var i = 0; i <= 1; i += 0.002) {
      var x = i*poolW, y = waterY;
      for (var w = 0; w < waveLayers.length; w++) {
        var L = waveLayers[w];
        y += Math.sin(i*poolW*L.freq + time*L.speed) * L.amp;
      }
      if (i===0) waveCtx.moveTo(x, y); else waveCtx.lineTo(x, y);
    }
    waveCtx.lineTo(poolW, poolH); waveCtx.lineTo(0, poolH); waveCtx.closePath();
    waveCtx.fillStyle = waterGrad; waveCtx.fill();

    for (var w = 0; w < waveLayers.length; w++) {
      var L = waveLayers[w];
      waveCtx.beginPath();
      for (var i = 0; i <= 1; i += 0.003) {
        var x = i*poolW, y = waterY + Math.sin(i*poolW*L.freq + time*L.speed)*L.amp;
        if (i===0) waveCtx.moveTo(x, y); else waveCtx.lineTo(x, y);
      }
      waveCtx.strokeStyle = L.color; waveCtx.lineWidth = L.width; waveCtx.stroke();
    }
  }

  function createRipple(x, y, maxRadius, opacity) {
    ripples.push({ x:x, y:y, radius:0, maxRadius: maxRadius||30, opacity: opacity||0.55 });
  }

  function createSplash(x, y, color, intensity) {
    var n = Math.floor(8 + intensity*3);
    for (var i=0; i<n; i++) {
      var a = -Math.PI/2 + (Math.random()-0.5)*Math.PI*1.2;
      splashes.push({
        x: x + (Math.random()-0.5)*20, y: y + (Math.random()-0.5)*4,
        vx: Math.cos(a)*(1+Math.random()*intensity),
        vy: Math.sin(a)*(1+Math.random()*intensity)-2,
        color: color, size: 1+Math.random()*3, opacity: 0.85
      });
    }
  }

  function updateDuckCount() {
    var el = document.getElementById('duckCount');
    if (el) el.textContent = ducks.length;
  }

  // ====== 主循环 ======
  function tick() {
    time += 0.016;
    physicsTick();
    renderDucks();
    decayEffects();
    renderRipples();
    renderWaves();
    animId = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (animId) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(tick);
  }

  // ====== 交互 ======
  function bindEvents() {
    ducksLayer.addEventListener('mousedown', function(e) {
      var target = e.target.closest('.duck-sprite');
      if (!target) return;
      e.preventDefault();
      var idx = ducks.findIndex(function(d) { return d.el === target; });
      if (idx < 0) return;
      dragDuck = ducks[idx];
      if (dragDuck._gsapAnim) { dragDuck._gsapAnim.kill(); dragDuck._gsapAnim = null; }
      isDragging = true;
      var rect = pool.getBoundingClientRect();
      dragOffX = e.clientX - rect.left - dragDuck.x;
      dragOffY = e.clientY - rect.top - dragDuck.y;
      dragDuck.el.style.zIndex = 20;
      dragDuck.el.style.transition = 'none';
      dragDuck.el.style.opacity = 1;
      dragDuck.splashDone = true;
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging || !dragDuck) return;
      var rect = pool.getBoundingClientRect();
      dragDuck.x = Math.max(5, Math.min(poolW - dragDuck.size - 5, e.clientX - rect.left - dragOffX));
      dragDuck.y = Math.max(5, Math.min(poolH - dragDuck.size - 5, e.clientY - rect.top - dragOffY));
      dragDuck.vx = 0; dragDuck.vy = 0; dragDuck.av = 0;
      dragDuck.el.style.left = dragDuck.x + 'px';
      dragDuck.el.style.top = dragDuck.y + 'px';
    });

    document.addEventListener('mouseup', function() {
      if (!dragDuck) return;
      var waterY = WATER_LEVEL * poolH;
      var duckBottom = dragDuck.y + dragDuck.size * 0.85;

      dragDuck.el.style.zIndex = 2;
      dragDuck.el.style.transition = '';

      if (duckBottom < waterY - 10) {
        // 拖到空中松手 → 自然下落，重力拉回水中
        dragDuck.splashDone = false;
        dragDuck.vy = 1;  // 给一点向下初速度
        dragDuck.vx = (Math.random() - 0.5) * 1.5;
      } else {
        // 近水面松手 → 轻柔放回水面
        dragDuck.y = duckSurfaceY(dragDuck);
        dragDuck.splashDone = true;
        dragDuck.vy = 0;
        dragDuck.vx = (Math.random() - 0.5) * 0.3;
        dragDuck.el.style.top = dragDuck.y + 'px';
        createRipple(dragDuck.x + dragDuck.size/2, waterY, 10, 0.45);
      }
      isDragging = false;
      dragDuck = null;
    });

    pool.addEventListener('click', function(e) {
      if (!e.target.closest('.duck-sprite') && !e.target.closest('.duck-card-popup')) {
        if (activeCard) { activeCard.remove(); activeCard = null; }
      }
    });
  }

  // ====== 提交留言 → 鸭子从天而降 ======
  window.submitDuckMessage = function(name, text) {
    var msg = { name: name||'匿名', text: text, date: new Date().toISOString().slice(0,10) };
    var local = [];
    try { local = JSON.parse(localStorage.getItem('gb_local')||'[]'); } catch(e) {}
    local.unshift(msg);
    if (local.length > 50) local = local.slice(0,50);
    localStorage.setItem('gb_local', JSON.stringify(local));

    var duck = spawnDuck(msg, false);
    duck.vy = 3 + Math.random() * 4;
    duck.vx = (Math.random() - 0.5) * 3;
    duck.splashDone = false;
  };

  // ====== 启动 ======
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
