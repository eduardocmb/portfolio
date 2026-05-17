/* ═══════════════════════════════════════════════
   CArlos maldonado — PORTFOLIO
   script.js — Vanilla JavaScript Premium Features
   ═══════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════
   1. PANTALLA DE CARGA
══════════════════════════════════════════════════ */
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Disparar animaciones del hero
    triggerHeroReveal();
  }, 1900);
});

// Bloquear scroll durante la carga
document.body.style.overflow = 'hidden';


/* ══════════════════════════════════════════════════
   2. CURSOR PERSONALIZADO (solo escritorio)
══════════════════════════════════════════════════ */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Follower suave
  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  // Efecto hover en elementos interactivos
  document.querySelectorAll('a, button, .skill-card, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      cursorFollower.style.transform = 'translate(-50%,-50%) scale(1.5)';
      cursorFollower.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorFollower.style.opacity = '0.5';
    });
  });
}


/* ══════════════════════════════════════════════════
   3. BARRA DE PROGRESO DE SCROLL
══════════════════════════════════════════════════ */
const scrollBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  scrollBar.style.width = pct + '%';
}, { passive: true });


/* ══════════════════════════════════════════════════
   4. NAVBAR — Scroll & Hamburger
══════════════════════════════════════════════════ */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer clic en un enlace
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Resaltar sección activa en la navbar
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNavLink, { passive: true });


/* ══════════════════════════════════════════════════
   5. ANIMACIÓN DE ESCRITURA (Hero)
══════════════════════════════════════════════════ */
const typingTarget = document.getElementById('typing-text');
const roles = [
  'Desarrollador Full Stack',
  'Desarrollador Móvil con Flutter',
  'Especialista en Laravel',
  'Ingeniero Backend .NET',
  'Creador de Experiencias Digitales'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingTarget) return;
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingTarget.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000); // pausa antes de borrar
      return;
    }
  } else {
    typingTarget.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 45 : 80);
}

// Inicia después de la carga
setTimeout(typeEffect, 2100);


/* ══════════════════════════════════════════════════
   6. PARTÍCULAS EN EL CANVAS (Hero)
══════════════════════════════════════════════════ */
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let animId;

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.size  = Math.random() * 1.8 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.life    = 0;
    this.maxLife = Math.random() * 300 + 200;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife ||
        this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
    // Parpadeo suave
    this.opacity = 0.15 + 0.15 * Math.sin((this.life / this.maxLife) * Math.PI);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 191, 255, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
  for (let i = 0; i < count; i++) {
    const p = new Particle();
    p.life = Math.floor(Math.random() * p.maxLife); // inicio aleatorio
    particles.push(p);
  }
}

function drawConnections() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        const alpha = (1 - dist / maxDist) * 0.08;
        ctx.strokeStyle = `rgba(0, 191, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  animId = requestAnimationFrame(animateParticles);
}

function startParticles() {
  resizeCanvas();
  initParticles();
  animateParticles();
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

// Iniciar partículas
startParticles();


/* ══════════════════════════════════════════════════
   7. REVEAL ANIMATIONS — Intersection Observer
══════════════════════════════════════════════════ */
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Reveal hero inmediato (sin observer)
function triggerHeroReveal() {
  document.querySelectorAll('.hero .reveal-up').forEach(el => {
    el.classList.add('visible');
  });
}


/* ══════════════════════════════════════════════════
   8. BARRAS DE HABILIDADES (animadas)
══════════════════════════════════════════════════ */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const level = fill.dataset.level;
      fill.style.width = level + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ══════════════════════════════════════════════════
   9. RIPPLE en botones
══════════════════════════════════════════════════ */
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.classList.add('ripple-wave');
    const size = Math.max(rect.width, rect.height);
    wave.style.width  = size + 'px';
    wave.style.height = size + 'px';
    wave.style.left   = (e.clientX - rect.left - size / 2) + 'px';
    wave.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
    this.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  });
});


/* ══════════════════════════════════════════════════
   10. FORMULARIO DE CONTACTO — Validación
══════════════════════════════════════════════════ */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function showError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById('error-' + fieldId);
  input.classList.add('error');
  error.textContent = msg;
}

function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById('error-' + fieldId);
  input.classList.remove('error');
  error.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  // Validación en tiempo real
  ['nombre', 'email', 'mensaje'].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => clearError(id));
    input.addEventListener('blur', () => validateField(id));
  });

  function validateField(id) {
    const val = document.getElementById(id).value.trim();
    if (id === 'nombre') {
      if (val.length < 2) { showError('nombre', 'Por favor ingresa tu nombre completo.'); return false; }
    }
    if (id === 'email') {
      if (!validateEmail(val)) { showError('email', 'Ingresa un correo electrónico válido.'); return false; }
    }
    if (id === 'mensaje') {
      if (val.length < 10) { showError('mensaje', 'El mensaje debe tener al menos 10 caracteres.'); return false; }
    }
    clearError(id);
    return true;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const v1 = validateField('nombre');
    const v2 = validateField('email');
    const v3 = validateField('mensaje');

    if (!v1 || !v2 || !v3) return;

    // Simular envío
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1200);
  });
}


/* ══════════════════════════════════════════════════
   11. BOTÓN VOLVER ARRIBA
══════════════════════════════════════════════════ */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ══════════════════════════════════════════════════
   12. SMOOTH SCROLL para anclas
══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ══════════════════════════════════════════════════
   13. PARALLAX SUTIL en el Hero
══════════════════════════════════════════════════ */
const heroGlow1 = document.querySelector('.hero-glow-1');
const heroGlow2 = document.querySelector('.hero-glow-2');

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (heroGlow1) heroGlow1.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    if (heroGlow2) heroGlow2.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
  });
}


/* ══════════════════════════════════════════════════
   14. ANIMACIÓN NÚMEROS (stat cards)
══════════════════════════════════════════════════ */
function animateNumber(el, target) {
  let count = 0;
  const step = Math.ceil(target / 40);
  const prefix = el.textContent.includes('+') ? '+' : '';
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = prefix + count;
  }, 40);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const raw    = el.textContent.replace('+', '');
      const target = parseInt(raw);
      if (!isNaN(target)) animateNumber(el, target);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.8 });

statNums.forEach(el => statsObserver.observe(el));
