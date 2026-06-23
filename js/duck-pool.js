// ====== 🦆 霓虹鸭子水池 v3.0 ======
(function() {
  var pool, canvas, ctx, ducksLayer;
  var ducks = [];
  var ripples = [];
  var splashes = [];
  var animId = null;
  var WATER_LEVEL = 0.62; // 水面在容器 62% 处（上方 38% 是空气，下方 62% 是水）
  var GRAVITY = 0.35;
  var BUOYANCY = 0.08;
  var DRAG = 0.96;
  var poolW = 0, poolH = 0;
  var isDragging = false;
  var dragDuck = null;
  var dragOffX = 0, dragOffY = 0;

  var NEON_COLORS = ['#ff3d71', '#00d4aa', '#ffb800', '#7c4dff', '#2990c0', '#ff6d3a', '#ff3d9e', '#3ad4ff'];

  function init() {
    pool = document.getElementById('duckPool');
    canvas = document.getElementById('poolRippleCanvas');
    ducksLayer = document.getElementById('poolDucksLayer');
    if (!pool || !canvas || !ducksLayer) return;

    resizePool();
    window.addEventListener('resize', resizePool);

    ctx = canvas.getContext('2d');
    loadMessages();
    bindEvents();
    startLoop();
  }

  function resizePool() {
    poolW = pool.clientWidth;
    poolH = pool.clientHeight;
    canvas.width = poolW;
    canvas.height = poolH;
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

    // 渲染鸭子
    messages.forEach(function(msg, i) {
      spawnDuck(msg, true);
    });
  }

  function spawnDuck(msg, initial) {
    var color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
    var size = 40 + Math.random() * 16;
    var x = 30 + Math.random() * (poolW - 80);
    var y = initial ? (WATER_LEVEL * poolH + Math.random() * 100) : -size;

    var el = document.createElement('div');
    el.className = 'duck-sprite';
    el.setAttribute('data-clickable', '');
    el.style.cssText = 'position:absolute;left:' + x + 'px;top:' + y + 'px;' +
      'width:' + size + 'px;height:' + (size * 0.85) + 'px;' +
      'cursor:pointer;z-index:2;pointer-events:auto;';
    el.innerHTML = createDuckSVG(color, size);

    el.addEventListener('click', function(e) {
      e.stopPropagation();
      showDuckCard(msg, el);
    });

    ducksLayer.appendChild(el);

    var duck = {
      el: el, msg: msg, color: color,
      x: x, y: y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: initial ? 0 : Math.random() * 2,
      size: size,
      mass: 0.5 + Math.random() * 0.4,
      angle: 0,
      av: 0,
      splashDone: initial
    };
    ducks.push(duck);
    return duck;
  }

  function createDuckSVG(color, size) {
    var s = size;
    return '<svg viewBox="0 0 64 52" width="' + s + '" height="' + (s*0.85) + '" style="display:block;pointer-events:none;filter:drop-shadow(0 2px 6px ' + color + '44);">' +
      '<ellipse cx="28" cy="34" rx="22" ry="15" fill="' + color + '" opacity="0.9"/>' +
      '<circle cx="45" cy="16" r="12" fill="' + color + '" opacity="0.9"/>' +
      '<polygon points="56,14 67,17 56,19" fill="' + color + '" opacity="0.8"/>' +
      '<circle cx="48" cy="13" r="1.8" fill="#0a0a0a"/>' +
      '<ellipse cx="46" cy="12" rx="0.7" ry="0.9" fill="#fff" opacity="0.6"/>' +
      '<path d="M18,30 Q30,24 38,34 Q28,40 18,34 Z" fill="' + color + '" opacity="0.3"/>' +
    '</svg>';
  }

  function showDuckCard(msg, el) {
    var existing = document.querySelector('.duck-card-popup');
    if (existing) existing.remove();

    var card = document.createElement('div');
    card.className = 'duck-card-popup';
    var rect = el.getBoundingClientRect();
    var poolRect = pool.getBoundingClientRect();

    card.innerHTML = '<button class="duck-card-close" onclick="this.parentElement.remove()">&times;</button>' +
      '<strong style="color:' + (ducks.find(function(d) { return d.el === el; }) || {}).color || NEON_COLORS[0] + '">' + (msg.name || '匿名') + '</strong>' +
      '<span style="font-size:0.65rem;color:#666;margin-left:0.4rem">' + (msg.date || '') + '</span>' +
      '<p style="margin-top:0.5rem;line-height:1.7;color:#ccc;font-size:0.82rem;">' + (msg.text || '').replace(/</g,'&lt;') + '</p>';

    var top = rect.top - poolRect.top - 100;
    if (top < 5) top = rect.bottom - poolRect.top + 8;
    var left = Math.max(5, Math.min(poolW - 220, rect.left - poolRect.left - 80));

    card.style.cssText = 'position:absolute;top:' + top + 'px;left:' + left + 'px;' +
      'width:200px;background:rgba(10,10,10,0.94);backdrop-filter:blur(16px);' +
      '-webkit-backdrop-filter:blur(16px);border-radius:12px;' +
      'border:1px solid rgba(0,212,170,0.2);box-shadow:0 8px 32px rgba(0,0,0,0.5);' +
      'padding:0.8rem;z-index:100;font-size:0.78rem;pointer-events:auto;';
    pool.appendChild(card);
    setTimeout(function() { if (card.parentElement) card.remove(); }, 6000);
  }

  // ====== 物理循环 ======
  function startLoop() {
    function loop() {
      updatePhysics();
      renderRipples();
      animId = requestAnimationFrame(loop);
    }
    loop();
  }

  function updatePhysics() {
    var waterY = WATER_LEVEL * poolH;

    ducks.forEach(function(d) {
      // 拖拽中跳过物理
      if (d === dragDuck) return;

      // 重力
      d.vy += GRAVITY * d.mass;

      // 水中浮力 + 阻力
      if (d.y + d.size * 0.6 > waterY) {
        var depth = (d.y + d.size * 0.6 - waterY) / poolH;
        d.vy -= BUOYANCY * depth * 30 * d.mass;
        d.vy *= 0.92; // 水阻
        d.vx *= 0.94;

        // 随机漂移
        d.vx += (Math.random() - 0.5) * 0.06;

        // 入水瞬间产生涟漪
        if (!d.splashDone && d.vy > 3) {
          createRipple(d.x + d.size/2, waterY, d.size * 0.8);
          createSplash(d.x + d.size/2, waterY, d.color);
          d.splashDone = true;
        }
      }

      // 边界碰撞
      d.x += d.vx;
      d.y += d.vy;

      if (d.x < 5) { d.x = 5; d.vx *= -0.4; }
      if (d.x > poolW - d.size - 5) { d.x = poolW - d.size - 5; d.vx *= -0.4; }
      if (d.y < 5) { d.y = 5; d.vy *= -0.2; }
      if (d.y > poolH - d.size - 5) { d.y = poolH - d.size - 5; d.vy *= -0.3; }

      // 持续涟漪（缓慢漂移时产生微弱波纹）
      if (d.y + d.size * 0.6 > waterY && Math.abs(d.vx) > 0.2 && Math.random() < 0.05) {
        createRipple(d.x + d.size/2, waterY, 8 + Math.abs(d.vx) * 3);
      }

      // 旋转
      d.av += (Math.random() - 0.5) * 0.02;
      d.av *= 0.97;
      d.angle += d.av;

      // 更新 DOM
      d.el.style.left = d.x + 'px';
      d.el.style.top = d.y + 'px';
      d.el.style.transform = 'rotate(' + (d.angle * 10) + 'deg)';
    });

    // 涟漪衰减
    ripples = ripples.filter(function(r) {
      r.radius += 1.5;
      r.opacity -= 0.012;
      return r.opacity > 0;
    });

    // 水花衰减
    splashes = splashes.filter(function(s) {
      s.y -= 1.5;
      s.opacity -= 0.025;
      return s.opacity > 0;
    });
  }

  function createRipple(x, y, maxRadius) {
    ripples.push({ x: x, y: y, radius: 0, maxRadius: maxRadius, opacity: 0.6 });
  }

  function createSplash(x, y, color) {
    for (var i = 0; i < 8; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = 2 + Math.random() * 4;
      splashes.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: color, size: 2 + Math.random() * 3,
        opacity: 0.8
      });
    }
  }

  function renderRipples() {
    ctx.clearRect(0, 0, poolW, poolH);

    // 涟漪
    ripples.forEach(function(r) {
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,212,170,' + r.opacity + ')';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 水花
    splashes.forEach(function(s) {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.15;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color.replace(')', ', ' + s.opacity + ')').replace('rgb', 'rgba');
      if (s.color.startsWith('#')) {
        ctx.fillStyle = s.color + Math.floor(s.opacity * 255).toString(16).padStart(2, '0');
      }
      ctx.fill();
    });
  }

  // ====== 交互事件 ======
  function bindEvents() {
    ducksLayer.addEventListener('mousedown', function(e) {
      var target = e.target.closest('.duck-sprite');
      if (!target) return;
      e.preventDefault();
      var idx = ducks.findIndex(function(d) { return d.el === target; });
      if (idx < 0) return;
      dragDuck = ducks[idx];
      isDragging = true;
      var rect = pool.getBoundingClientRect();
      dragOffX = e.clientX - rect.left - dragDuck.x;
      dragOffY = e.clientY - rect.top - dragDuck.y;
      dragDuck.el.style.zIndex = 10;
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging || !dragDuck) return;
      var rect = pool.getBoundingClientRect();
      dragDuck.x = Math.max(5, Math.min(poolW - dragDuck.size - 5, e.clientX - rect.left - dragOffX));
      dragDuck.y = Math.max(5, Math.min(poolH - dragDuck.size - 5, e.clientY - rect.top - dragOffY));
      dragDuck.vx = 0;
      dragDuck.vy = 0;
      dragDuck.el.style.left = dragDuck.x + 'px';
      dragDuck.el.style.top = dragDuck.y + 'px';
    });

    document.addEventListener('mouseup', function() {
      if (dragDuck) {
        dragDuck.el.style.zIndex = 2;
      }
      isDragging = false;
      dragDuck = null;
    });
  }

  // ====== 提交留言 ======
  window.submitDuckMessage = function(name, text) {
    var msg = { name: name || '匿名', text: text, date: new Date().toISOString().slice(0, 10) };

    // 保存到 localStorage
    var local = [];
    try { local = JSON.parse(localStorage.getItem('gb_local') || '[]'); } catch(e) {}
    local.unshift(msg);
    if (local.length > 50) local = local.slice(0, 50);
    localStorage.setItem('gb_local', JSON.stringify(local));

    // 生成鸭子从上方掉落
    var duck = spawnDuck(msg, false);
    // 给一点初始速度
    duck.vy = 1;
    duck.vx = (Math.random() - 0.5) * 2;
    duck.splashDone = false;
  };

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
