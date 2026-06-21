// Latte Intro — 粒子背景系统
// 基于 Canvas 2D 的轻量粒子动画

(function() {
  'use strict';

  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: null, y: null, radius: 100 };
  var isMobile = /Mobi|Android/i.test(navigator.userAgent);

  var colors = [
    'rgba(41, 144, 192, 0.7)',
    'rgba(58, 138, 191, 0.6)',
    'rgba(184, 212, 232, 0.5)',
    'rgba(160, 200, 224, 0.5)',
    'rgba(100, 160, 210, 0.45)',
    'rgba(26, 26, 26, 0.3)',
    'rgba(45, 45, 45, 0.25)'
  ];

  var particleCount = isMobile ? 80 : 150;
  var connectDist = isMobile ? 100 : 150;
  var maxSpeed = isMobile ? 0.6 : 0.8;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function Particle() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = (Math.random() - 0.5) * maxSpeed;
    this.vy = (Math.random() - 0.5) * maxSpeed;
    this.radius = Math.random() * 2.5 + 0.8;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  Particle.prototype.update = function() {
    if (mouse.x !== null) {
      var dx = this.x - mouse.x;
      var dy = this.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        var force = (mouse.radius - dist) / mouse.radius;
        var angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 0.08;
        this.vy += Math.sin(angle) * force * 0.08;
      }
    }

    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > maxSpeed * 2) {
      this.vx = (this.vx / speed) * maxSpeed * 2;
      this.vy = (this.vy / speed) * maxSpeed * 2;
    }

    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
    if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;

    this.vx *= 0.999;
    this.vy *= 0.999;
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectDist) {
          var opacity = (1 - dist / connectDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(160, 200, 224, ' + opacity + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  var animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
  }

  canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  canvas.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });

  canvas.addEventListener('touchmove', function(e) {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', function() {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', function() {
    resize();
  });

  resize();
  initParticles();
  animate();

  window.stopParticles = function() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    canvas.style.transition = 'opacity 0.8s ease';
    canvas.style.opacity = '0';
  };
})();
