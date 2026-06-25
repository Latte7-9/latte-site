// ====== 霓虹橡皮鸭蓄水池 v6.1 ======
(function() {
  var pool, rippleCanvas, rippleCtx, waveCanvas, waveCtx, ducksLayer;
  var ducks = [];
  var ripples = [];
  var splashes = [];
  var animId = null;
  var WATER_LEVEL = 0.60;
  var GRAVITY = 0.50;
  var SUBMERGE_RATIO = 0.30;
  var poolW = 0, poolH = 0;
  var isDragging = false, hasMoved = false;
  var dragDuck = null;
  var dragOffX = 0, dragOffY = 0, dragStartX = 0, dragStartY = 0;
  var time = 0;
  var activeCard = null;

  var NEON_COLORS = [
    '#ff3d71','#00d4aa','#ffb800','#7c4dff','#2990c0','#ff6d3a','#ff3d9e','#3ad4ff','#ff5e99','#00e5bf','#ffcc33','#9d6eff'
  ];

  var waveLayers = [
    {amp:7,freq:0.008,speed:0.7,color:'rgba(0,212,170,0.12)',width:2},
    {amp:4,freq:0.013,speed:1.1,color:'rgba(0,180,160,0.07)',width:1.5},
    {amp:2,freq:0.019,speed:1.6,color:'rgba(0,140,120,0.04)',width:1}
  ];

  function duckSurfaceY(duck) {
    return WATER_LEVEL * poolH - duck.size * 0.85 * (1 - SUBMERGE_RATIO);
  }

  function init() {
    pool = document.getElementById('duckPool');
    rippleCanvas = document.getElementById('poolRippleCanvas');
    waveCanvas = document.getElementById('poolWaveCanvas');
    ducksLayer = document.getElementById('poolDucksLayer');
    if (!pool || !rippleCanvas || !waveCanvas || !ducksLayer) { console.warn('duck-pool: missing elements'); return; }
    resizePool();
    window.addEventListener('resize', resizePool);
    rippleCtx = rippleCanvas.getContext('2d');
    waveCtx = waveCanvas.getContext('2d');
    loadMessages();
    bindEvents();
    startLoop();
    console.log('duck-pool: initialized, pool=', poolW, 'x', poolH);
  }

  function resizePool() {
    poolW = pool.clientWidth;
    poolH = pool.clientHeight;
    rippleCanvas.width = poolW;
    rippleCanvas.height = poolH;
    waveCanvas.width = poolW;
    waveCanvas.height = poolH;
  }

  async function loadMessages() {
    var messages = [];
    try {
      var res = await fetch('data/comments.json?v=' + Date.now());
      if (res.ok) messages = await res.json();
    } catch(e) { console.warn('duck-pool: comments.json fetch failed', e); }
    try {
      var local = JSON.parse(localStorage.getItem('gb_local') || '[]');
      local.forEach(function(c) {
        if (!messages.some(function(m){return m.text===c.text&&m.name===c.name;})) messages.unshift(c);
      });
    } catch(e) {}
    console.log('duck-pool: loaded', messages.length, 'messages');
    messages.forEach(function(msg){ spawnDuck(msg, true); });
    updateDuckCount();
  }

  function createDuckCanvas(size, color) {
    var canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 2;
    var ctx = canvas.getContext('2d');
    var cx = size, cy = size;
    var bodyColor = '#FFD700';
    var wingColor1 = '#FFB833';
    var wingColor2 = '#FF9500';
    var beakColor = '#FF8C00';
    var eyeColor = '#0a0a0a';
    var whiteStroke = '#FFFFFF';
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = whiteStroke;
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(0, 8, 30, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(22, -18, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(12, -5);
    ctx.quadraticCurveTo(18, -12, 22, -18);
    ctx.quadraticCurveTo(26, -12, 16, -5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var wingGrad = ctx.createLinearGradient(-25, 0, -10, 15);
    wingGrad.addColorStop(0, wingColor1);
    wingGrad.addColorStop(1, wingColor2);
    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    ctx.moveTo(-18, -2);
    ctx.quadraticCurveTo(-28, -10, -22, 8);
    ctx.quadraticCurveTo(-18, 18, -10, 12);
    ctx.quadraticCurveTo(-14, 2, -18, -2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = whiteStroke;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = beakColor;
    ctx.beginPath();
    ctx.moveTo(35, -20);
    ctx.quadraticCurveTo(48, -26, 50, -22);
    ctx.quadraticCurveTo(50, -18, 42, -18);
    ctx.quadraticCurveTo(36, -16, 35, -20);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = whiteStroke;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.quadraticCurveTo(-36, -8, -32, -14);
    ctx.quadraticCurveTo(-30, -6, -28, 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = whiteStroke;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(28, -22, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(29.5, -23.5, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 150, 150, 0.3)';
    ctx.beginPath();
    ctx.ellipse(32, -14, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return canvas;
  }

  function spawnDuck(msg, initial) {
    var color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
    var size = 48 + Math.random() * 20;
    var x = 30 + Math.random() * (poolW - 100);
    var duck = {
      el: null, msg: msg, color: color,
      x: x, y: 0, vx: 0, vy: 0,
      size: size, mass: 0.4 + Math.random() * 0.6,
      angle: 0, av: 0,
      splashDone: initial, bobPhase: Math.random() * Math.PI * 2,
      _gsapAnim: null
    };
    if (initial) {
      duck.y = duckSurfaceY(duck);
      duck.vx = (Math.random() - 0.5) * 0.4;
      duck.angle = (Math.random() - 0.5) * 8;
    } else {
      duck.y = -size - 30;
      duck.vy = 3 + Math.random() * 4;
      duck.vx = (Math.random() - 0.5) * 2;
    }
    var el = document.createElement('div');
    var canvas = createDuckCanvas(size, color);
    el.className = 'duck-sprite';
    el.setAttribute('data-clickable', '');
    el.style.cssText = 'position:absolute;left:'+duck.x+'px;top:'+duck.y+'px;width:'+size+'px;height:'+size+'px;cursor:pointer;z-index:2;pointer-events:auto;transform-origin:center center;background-size:contain;background-repeat:no-repeat;background-position:center;';
    el.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
    ducksLayer.appendChild(el);
    duck.el = el;
    ducks.push(duck);
    updateDuckCount();
    console.log('duck-pool: spawned duck #' + ducks.length, initial ? '(initial)' : '(new)');
    return duck;
  }

  function playSplashAnimation(duck) {
    var surfaceY = duckSurfaceY(duck);
    if (duck._gsapAnim) { duck._gsapAnim.kill(); duck._gsapAnim = null; }
    var sinkY = surfaceY + duck.size * 0.25;
    duck._gsapAnim = gsap.timeline({
      onComplete: function() {
        duck.y = surfaceY; duck.vy = 0; duck.splashDone = true;
        duck.bobPhase = Math.random() * Math.PI * 2; duck._gsapAnim = null;
        duck.el.style.top = duck.y + 'px'; duck.el.style.opacity = 1;
      }
    });
    duck._gsapAnim
      .to(duck, { y: sinkY, duration: 0.28, ease: 'power3.in',
        onUpdate: function() {
          duck.el.style.top = duck.y + 'px';
          var t = Math.min(1, (duck.y - surfaceY) / (duck.size * 0.25));
          duck.el.style.opacity = 1 - t * 0.45;
        }
      })
      .to(duck, { y: surfaceY, duration: 0.27, ease: 'power1.out',
        onUpdate: function() { duck.el.style.top = duck.y + 'px'; duck.el.style.opacity = 1; }
      });
  }

  function showDuckCard(msg, el) {
    if (activeCard) { activeCard.remove(); activeCard = null; }
    var card = document.createElement('div');
    card.className = 'duck-card-popup';
    var duck = ducks.find(function(d){return d.el===el;});
    var color = duck ? duck.color : '#00d4aa';
    var rect = el.getBoundingClientRect(), poolRect = pool.getBoundingClientRect();
    var nameEsc = (msg.name||'匿名').replace(/</g,'&lt;');
    var textEsc = (msg.text||'').replace(/</g,'&lt;');
    card.innerHTML = '<button class="duck-card-close">&times;</button>' +
      '<strong style="color:'+color+'">'+nameEsc+'</strong>' +
      (msg.date ? '<span style="font-size:0.65rem;color:#555;margin-left:0.4rem">'+msg.date+'</span>' : '') +
      '<p style="margin-top:0.5rem;line-height:1.7;color:#bbb;font-size:0.82rem;word-break:break-word;">'+textEsc+'</p>';
    var top = rect.top - poolRect.top - 120;
    if (top < 8) top = rect.bottom - poolRect.top + 10;
    var left = Math.max(8, Math.min(poolW - 270, rect.left - poolRect.left - 60));
    card.style.cssText = 'position:absolute;top:'+top+'px;left:'+left+'px;min-width:200px;max-width:260px;z-index:50;pointer-events:auto;';
    card.querySelector('.duck-card-close').addEventListener('click', function(){card.remove();activeCard=null;});
    pool.appendChild(card); activeCard = card;
    el.classList.add('bounce');
    setTimeout(function(){el.classList.remove('bounce');}, 350);
  }

  function physicsTick() {
    var waterY = WATER_LEVEL * poolH;
    ducks.forEach(function(d) {
      if (d._gsapAnim) return;
      var duckBottom = d.y + d.size * 0.85;
      if (d.splashDone) {
        var targetY = duckSurfaceY(d);
        d.y += (targetY - d.y) * 0.06;
        d.y += Math.sin(d.bobPhase + time * 1.5) * 0.4;
        d.vx += Math.sin(time * 0.6 + d.bobPhase) * 0.008;
        d.vx += (Math.random() - 0.5) * 0.015;
        d.vx *= 0.988;
        d.av += (Math.random() - 0.5) * 0.005;
        d.av *= 0.97;
        d.angle += d.av;
        if (Math.abs(d.angle) > 15) d.av *= 0.5;
      } else {
        d.vy += GRAVITY;
        d.vx *= 0.98;
        if (duckBottom >= waterY - 5 && d.vy > 1) {
          d.y = waterY - d.size * 0.85;
          d.vx *= 0.25;
          createRipple(d.x + d.size/2, waterY, d.size * 0.85);
          createRipple(d.x + d.size/2, waterY, d.size * 0.35, 0.25);
          createSplash(d.x + d.size/2, waterY, d.color, d.vy * 0.35);
          playSplashAnimation(d);
          return;
        }
      }
      if (d.x < 5) { d.x = 5; d.vx *= -0.3; }
      if (d.x > poolW - d.size - 5) { d.x = poolW - d.size - 5; d.vx *= -0.3; }
      if (d.y < 8) { d.y = 8; d.vy = Math.abs(d.vy) * 0.3; }
      if (d.y > poolH - d.size - 5) { d.y = poolH - d.size - 5; d.vy *= -0.3; }
      d.x += d.vx;
      d.y += d.vy;
      if (d.splashDone && Math.abs(d.vx) > 0.2 && Math.random() < 0.02) {
        createRipple(d.x + d.size/2, waterY, 4 + Math.abs(d.vx)*1.5, 0.25);
      }
    });
    for (var i = 0; i < ducks.length; i++) {
      for (var j = i + 1; j < ducks.length; j++) {
        var a = ducks[i], b = ducks[j];
        if (!a.splashDone || !b.splashDone || a._gsapAnim || b._gsapAnim) continue;
        var dx = (a.x + a.size/2) - (b.x + b.size/2);
        var dy = (a.y + a.size*0.35) - (b.y + b.size*0.35);
        var dist = Math.sqrt(dx*dx + dy*dy);
        var minDist = (a.size + b.size) * 0.35;
        if (dist < minDist && dist > 0.1) {
          var overlap = minDist - dist;
          var nx = dx/dist, ny = dy/dist;
          var tm = a.mass + b.mass;
          a.x += nx*overlap*b.mass/tm*0.5; a.y += ny*overlap*b.mass/tm*0.5;
          b.x -= nx*overlap*a.mass/tm*0.5; b.y -= ny*overlap*a.mass/tm*0.5;
          a.vx *= 0.85; a.vy *= 0.85;
          b.vx *= 0.85; b.vy *= 0.85;
          a.av += (Math.random()-0.5)*0.6;
          b.av += (Math.random()-0.5)*0.6;
          if (overlap > 3) createRipple((a.x+b.x)/2+a.size/4, WATER_LEVEL*poolH, 6+overlap*0.8, 0.25);
        }
      }
    }
  }

  function renderDucks() {
    ducks.forEach(function(d) {
      if (d._gsapAnim) return;
      d.el.style.left = d.x + 'px';
      d.el.style.top = d.y + 'px';
      d.el.style.transform = 'rotate(' + d.angle + 'deg)';
    });
  }

  function decayEffects() {
    ripples = ripples.filter(function(r) {
      r.radius += 1.5 + r.radius * 0.002;
      r.opacity -= 0.008;
      return r.opacity > 0 && r.radius < r.maxRadius;
    });
    splashes = splashes.filter(function(s) {
      s.x += s.vx; s.y += s.vy; s.vy += 0.12;
      s.opacity -= 0.018;
      return s.opacity > 0;
    });
  }

  function renderRipples() {
    rippleCtx.clearRect(0, 0, poolW, poolH);
    ripples.forEach(function(r) {
      rippleCtx.beginPath();
      rippleCtx.arc(r.x, r.y, r.radius, 0, 2*Math.PI);
      rippleCtx.strokeStyle = 'rgba(0,212,170,'+(r.opacity*0.7)+')';
      rippleCtx.lineWidth = Math.max(0.8, 3*(1-r.radius/r.maxRadius));
      rippleCtx.stroke();
      var innerR = r.radius * 0.55;
      if (innerR > 2) {
        rippleCtx.beginPath();
        rippleCtx.arc(r.x, r.y, innerR, 0, 2*Math.PI);
        rippleCtx.strokeStyle = 'rgba(0,212,170,'+(r.opacity*0.35)+')';
        rippleCtx.lineWidth = Math.max(0.5, 2*(1-r.radius/r.maxRadius));
        rippleCtx.stroke();
      }
      var outerR = r.radius * 1.35;
      if (outerR < r.maxRadius) {
        rippleCtx.beginPath();
        rippleCtx.arc(r.x, r.y, outerR, 0, 2*Math.PI);
        rippleCtx.strokeStyle = 'rgba(0,180,160,'+(r.opacity*0.18)+')';
        rippleCtx.lineWidth = Math.max(0.3, 1.2*(1-r.radius/r.maxRadius));
        rippleCtx.stroke();
      }
    });
    splashes.forEach(function(s) {
      rippleCtx.beginPath();
      rippleCtx.arc(s.x, s.y, s.size, 0, 2*Math.PI);
      var alpha = Math.floor(Math.min(255, s.opacity*255)).toString(16).padStart(2,'0');
      rippleCtx.fillStyle = s.color + alpha;
      rippleCtx.fill();
    });
  }

  function renderWaves() {
    waveCtx.clearRect(0, 0, poolW, poolH);
    var waterY = WATER_LEVEL * poolH;
    var waterGrad = waveCtx.createLinearGradient(0, waterY, 0, poolH);
    waterGrad.addColorStop(0, 'rgba(0,40,60,0.0)');
    waterGrad.addColorStop(0.12, 'rgba(0,55,75,0.05)');
    waterGrad.addColorStop(0.4, 'rgba(0,70,90,0.08)');
    waterGrad.addColorStop(1, 'rgba(0,25,45,0.15)');
    waveCtx.beginPath();
    for (var i = 0; i <= 1; i += 0.002) {
      var x = i*poolW, y = waterY;
      for (var w = 0; w < waveLayers.length; w++) {
        var L = waveLayers[w];
        y += Math.sin(i*poolW*L.freq + time*L.speed) * L.amp;
      }
      if (i === 0) waveCtx.moveTo(x, y);
      else waveCtx.lineTo(x, y);
    }
    waveCtx.lineTo(poolW, poolH);
    waveCtx.lineTo(0, poolH);
    waveCtx.closePath();
    waveCtx.fillStyle = waterGrad;
    waveCtx.fill();
    for (var w = 0; w < waveLayers.length; w++) {
      var L = waveLayers[w];
      waveCtx.beginPath();
      for (var i = 0; i <= 1; i += 0.003) {
        var x = i*poolW, y = waterY + Math.sin(i*poolW*L.freq + time*L.speed)*L.amp;
        if (i === 0) waveCtx.moveTo(x, y);
        else waveCtx.lineTo(x, y);
      }
      waveCtx.strokeStyle = L.color;
      waveCtx.lineWidth = L.width;
      waveCtx.stroke();
    }
  }

  function createRipple(x, y, maxRadius, opacity) {
    ripples.push({x:x, y:y, radius:0, maxRadius:maxRadius||30, opacity:opacity||0.55});
  }

  function createSplash(x, y, color, intensity) {
    var n = Math.floor(8 + intensity * 3);
    for (var i = 0; i < n; i++) {
      var a = -Math.PI/2 + (Math.random()-0.5)*Math.PI*1.2;
      splashes.push({
        x: x+(Math.random()-0.5)*20, y: y+(Math.random()-0.5)*4,
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

  var _tickLast = 0, _tickAccum = 0;
  function tick(ts) {
    if (document.hidden) { animId = requestAnimationFrame(tick); return; }
    if (!_tickLast) _tickLast = ts;
    _tickAccum += ts - _tickLast;
    _tickLast = ts;
    if (_tickAccum < 33) { animId = requestAnimationFrame(tick); return; }
    _tickAccum = 0;
    time += 0.033;
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
    console.log('duck-pool: animation loop started');
  }

  function bindEvents() {
    ducksLayer.addEventListener('mousedown', onDragStart);
    ducksLayer.addEventListener('touchstart', onDragStart, {passive:false});
    function onDragStart(e) {
      var target = e.target.closest('.duck-sprite');
      if (!target) return;
      if (e.touches) e.preventDefault();
      var idx = ducks.findIndex(function(d){return d.el===target;});
      if (idx < 0) return;
      dragDuck = ducks[idx];
      if (dragDuck._gsapAnim) { dragDuck._gsapAnim.kill(); dragDuck._gsapAnim = null; }
      isDragging = false; hasMoved = false;
      var rect = pool.getBoundingClientRect();
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      var cy = e.touches ? e.touches[0].clientY : e.clientY;
      dragOffX = cx - rect.left - dragDuck.x;
      dragOffY = cy - rect.top - dragDuck.y;
      dragStartX = cx; dragStartY = cy;
      dragDuck.el.style.zIndex = 20;
      dragDuck.el.style.transition = 'none';
      dragDuck.el.style.opacity = 1;
    }
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('touchmove', onDragMove, {passive:false});
    function onDragMove(e) {
      if (!dragDuck) return;
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      var cy = e.touches ? e.touches[0].clientY : e.clientY;
      if (!isDragging) {
        var dx = cx - dragStartX, dy = cy - dragStartY;
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        isDragging = true; hasMoved = true;
        if (e.cancelable) e.preventDefault();
      }
      var rect = pool.getBoundingClientRect();
      dragDuck.x = Math.max(5, Math.min(poolW - dragDuck.size - 5, cx - rect.left - dragOffX));
      dragDuck.y = Math.max(5, Math.min(poolH - dragDuck.size - 5, cy - rect.top - dragOffY));
      dragDuck.vx = 0; dragDuck.vy = 0; dragDuck.av = 0;
      dragDuck.el.style.left = dragDuck.x + 'px';
      dragDuck.el.style.top = dragDuck.y + 'px';
    }
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchend', onDragEnd);
    function onDragEnd() {
      if (!dragDuck) return;
      dragDuck.el.style.zIndex = 2;
      dragDuck.el.style.transition = '';
      if (!hasMoved) {
        dragDuck.el.click();
        isDragging = false; dragDuck = null; return;
      }
      var waterY = WATER_LEVEL * poolH;
      var duckBottom = dragDuck.y + dragDuck.size * 0.85;
      if (duckBottom < waterY - 10) {
        dragDuck.splashDone = false;
        dragDuck.vy = 0; dragDuck.vx = 0;
        if (dragDuck._gsapAnim) { dragDuck._gsapAnim.kill(); dragDuck._gsapAnim = null; }
        var sinkTarget = poolH - dragDuck.size - 5;
        dragDuck._gsapAnim = gsap.timeline({
          onComplete: function() {
            dragDuck.y = duckSurfaceY(dragDuck);
            dragDuck.vy = 0; dragDuck.splashDone = true;
            dragDuck.bobPhase = Math.random() * Math.PI * 2;
            dragDuck._gsapAnim = null;
            dragDuck.el.style.top = dragDuck.y + 'px';
            dragDuck.el.style.opacity = 1;
          }
        });
        dragDuck._gsapAnim
          .to(dragDuck, {y:waterY-dragDuck.size*0.85, duration:0.2, ease:'power2.in',
            onUpdate:function(){dragDuck.el.style.top=dragDuck.y+'px';dragDuck.el.style.opacity=1;}})
          .to(dragDuck, {y:sinkTarget, duration:0.4, ease:'power2.in',
            onUpdate:function(){
              dragDuck.el.style.top=dragDuck.y+'px';
              var t=Math.max(0,Math.min(1,(dragDuck.y-(waterY-dragDuck.size*0.85))/(sinkTarget-(waterY-dragDuck.size*0.85))));
              dragDuck.el.style.opacity=Math.max(0.3,1-t*0.6);
            }})
          .to(dragDuck, {y:duckSurfaceY(dragDuck), duration:0.5, ease:'power2.out',
            onUpdate:function(){dragDuck.el.style.top=dragDuck.y+'px';dragDuck.el.style.opacity=1;}});
      } else {
        dragDuck.y = duckSurfaceY(dragDuck);
        dragDuck.splashDone = true;
        dragDuck.vy = 0;
        dragDuck.vx = (Math.random()-0.5)*0.3;
        dragDuck.el.style.top = dragDuck.y + 'px';
        createRipple(dragDuck.x+dragDuck.size/2, waterY, 10, 0.35);
      }
      isDragging = false;
      dragDuck = null;
    }
    pool.addEventListener('click', function(e) {
      if (!e.target.closest('.duck-sprite') && !e.target.closest('.duck-card-popup')) {
        if (activeCard) { activeCard.remove(); activeCard = null; }
      }
    });
  }

  window.submitDuckMessage = function(name, text) {
    var msg = {name:name||'匿名', text:text, date:new Date().toISOString().slice(0,10)};
    var local = [];
    try { local = JSON.parse(localStorage.getItem('gb_local')||'[]'); } catch(e) {}
    local.unshift(msg);
    if (local.length > 50) local = local.slice(0,50);
    localStorage.setItem('gb_local', JSON.stringify(local));
    var duck = spawnDuck(msg, false);
    duck.vy = 3 + Math.random() * 4;
    duck.vx = (Math.random()-0.5) * 3;
    duck.splashDone = false;
    console.log('duck-pool: new message from', msg.name, '-> duck falling from sky');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
