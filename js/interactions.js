// ====== 3D 卡片倾斜 ======
(function() {
  document.addEventListener('mousemove', function(e) {
    document.querySelectorAll('.tilt-card').forEach(function(card) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
  });

  document.addEventListener('mouseleave', function() {
    document.querySelectorAll('.tilt-card').forEach(function(card) {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    });
  });
})();
