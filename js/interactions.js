// ====== 3D 卡片倾斜（移动端禁用，桌面端节流优化） ======
(function() {
  // 移动端/触摸设备直接跳过
  var isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  var cards = [];
  var ticking = false;
  var lastX = 0, lastY = 0;

  function refreshCards() {
    cards = [];
    document.querySelectorAll('.tilt-card').forEach(function(card) {
      cards.push(card);
    });
  }
  refreshCards();

  document.addEventListener('mousemove', function(e) {
    lastX = e.clientX; lastY = e.clientY;
    if (!ticking) {
      requestAnimationFrame(function() {
        cards.forEach(function(card) {
          var rect = card.getBoundingClientRect();
          var x = (lastX - rect.left) / rect.width - 0.5;
          var y = (lastY - rect.top) / rect.height - 0.5;
          card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  document.addEventListener('mouseleave', function() {
    cards.forEach(function(card) {
      card.style.transform = '';
    });
  });
})();