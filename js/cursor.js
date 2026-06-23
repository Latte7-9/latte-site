// ====== 霓虹光标 + 拖尾（仅纯触屏设备跳过） ======
(function() {
  // 只用 pointer:coarse 检测真正手机/平板，触屏笔记本不受影响
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  var cursor = document.createElement('div');
  cursor.id = 'neon-cursor';
  document.body.appendChild(cursor);

  // 拖尾点
  var trails = [];
  var trailCount = 8;
  for (var i = 0; i < trailCount; i++) {
    var t = document.createElement('div');
    t.className = 'cursor-trail';
    t.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;' +
      'width:4px;height:4px;border-radius:50%;opacity:0;' +
      'background:#ff3d71;box-shadow:0 0 6px #ff3d71;' +
      'transition:opacity 0.2s;';
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
  }

  var mouseX = 0, mouseY = 0;
  var trailIdx = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    trails[trailIdx].x = mouseX;
    trails[trailIdx].y = mouseY;
    trails[trailIdx].el.style.opacity = '0.6';

    for (var i = 0; i < trailCount; i++) {
      var idx = (trailIdx - i + trailCount) % trailCount;
      var t = trails[idx];
      t.el.style.left = t.x + 'px';
      t.el.style.top = t.y + 'px';
      t.el.style.opacity = Math.max(0, 0.5 - i * 0.06);
      t.el.style.width = Math.max(2, 4 - i * 0.3) + 'px';
      t.el.style.height = t.el.style.width;
    }

    trailIdx = (trailIdx + 1) % trailCount;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover 效果
  document.querySelectorAll('a, button, [data-clickable], .intro-hint').forEach(function(el) {
    el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
  });
})();