/* ============================================================
   CARLOS MALDONADO — PORTFOLIO JS
   Clean, modular, vanilla JavaScript
   ============================================================ */

"use strict";

/* ---- LOADER ---- */
(function initLoader() {
  window.addEventListener("load", () => {
    // Wait for loader bar animation (2s) then a brief hold
    setTimeout(() => {
      const loader = document.getElementById("loader");
      if (!loader) return;
      loader.classList.add("fade-out");
      // Remove from DOM after transition
      loader.addEventListener("transitionend", () => loader.remove(), { once: true });
    }, 2600);
  });
})();

/* ---- CUSTOM CURSOR (desktop only) ---- */
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursor-dot");
  if (!cursor || !dot) return;
  if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch devices

  let mx = -100, my = -100, cx = -100, cy = -100;
  const speed = 0.12;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  function animateCursor() {
    cx += (mx - cx) * speed;
    cy += (my - cy) * speed;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale up on interactive elements
  const interactiveEls = document.querySelectorAll("a, button, .skill-card, .project-card, .service-card");
  interactiveEls.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "58px";
      cursor.style.height = "58px";
      cursor.style.borderColor = "rgba(191,95,255,0.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "36px";
      cursor.style.height = "36px";
      cursor.style.borderColor = "var(--neon)";
    });
  });
})();

/* ---- SCROLL PROGRESS BAR ---- */
(function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight * 100) + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
})();

/* ---- NAVBAR ---- */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!navbar) return;

  // Scrolled state
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  let overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  function openMenu() {
    navLinks.classList.add("open");
    hamburger.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburger && hamburger.addEventListener("click", () => {
    navLinks.classList.contains("open") ? closeMenu() : openMenu();
  });
  overlay.addEventListener("click", closeMenu);

  // Close on nav link click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll("section[id]");
  function highlightActive() {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle("active", scrollY >= top && scrollY < bottom);
      }
    });
  }
  window.addEventListener("scroll", highlightActive, { passive: true });
})();

/* ---- BACK TO TOP ---- */
(function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ---- TYPING ANIMATION ---- */
(function initTyping() {
  const el = document.getElementById("typing-text");
  if (!el) return;

  const words = [
    "Laravel & PHP",
    "Flutter & Dart",
    "Desarrollo Full Stack",
    "APIs RESTful",
    "Aplicaciones Móviles",
    "C# y .NET",
    "Bases de Datos SQL"
  ];

  let wordIdx = 0, charIdx = 0, deleting = false;
  const typeSpeed = 80, deleteSpeed = 45, pause = 2000;

  function type() {
    const current = words[wordIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, deleteSpeed);
    } else {
      el.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, pause);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }
  setTimeout(type, 1200);
})();

/* ---- PARTICLE CANVAS ---- */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  const COUNT = 70;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = rand(0, W);
      this.y = rand(0, H);
      this.r = rand(0.5, 2.5);
      this.vx = rand(-0.3, 0.3);
      this.vy = rand(-0.4, -0.1);
      this.alpha = rand(0.1, 0.55);
      this.life = 0;
      this.maxLife = rand(120, 280);
      // purple tones
      const hue = rand(260, 300);
      this.color = `hsla(${hue}, 80%, 70%, `;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      const progress = this.life / this.maxLife;
      const fade = progress < 0.1
        ? progress / 0.1
        : progress > 0.8
          ? 1 - (progress - 0.8) / 0.2
          : 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + (this.alpha * fade) + ")";
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) {
    const p = new Particle();
    p.life = Math.floor(Math.random() * p.maxLife); // stagger start
    particles.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ---- SCROLL REVEAL (Intersection Observer) ---- */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  revealEls.forEach(el => observer.observe(el));
})();

/* ---- SKILL BARS ---- */
(function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = (bar.dataset.width || 0) + "%";
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ---- CONTACT FORM VALIDATION ---- */
(function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = {
    nombre: { el: form.querySelector("#nombre"), errEl: form.querySelector("#error-nombre"), validate: v => v.trim().length >= 2 ? "" : "El nombre debe tener al menos 2 caracteres." },
    correo: { el: form.querySelector("#correo"), errEl: form.querySelector("#error-correo"), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Ingresa un correo electrónico válido." },
    mensaje: { el: form.querySelector("#mensaje"), errEl: form.querySelector("#error-mensaje"), validate: v => v.trim().length >= 10 ? "" : "El mensaje debe tener al menos 10 caracteres." }
  };

  function validateField(key) {
    const f = fields[key];
    const error = f.validate(f.el.value);
    f.errEl.textContent = error;
    f.el.classList.toggle("invalid", !!error);
    return !error;
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener("blur", () => validateField(key));
    fields[key].el.addEventListener("input", () => {
      if (fields[key].el.classList.contains("invalid")) validateField(key);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    Object.keys(fields).forEach(key => { if (!validateField(key)) valid = false; });
    if (!valid) return;

    // Simulate send
    const btn = form.querySelector(".form-submit");
    const submitText = btn.querySelector(".submit-text");
    btn.disabled = true;
    submitText.textContent = "Enviando…";

    setTimeout(() => {
      btn.disabled = false;
      submitText.textContent = "Enviar Mensaje";
      form.reset();
      Object.keys(fields).forEach(key => { fields[key].el.classList.remove("invalid"); });
      const success = document.getElementById("form-success");
      if (success) {
        success.classList.add("show");
        setTimeout(() => success.classList.remove("show"), 5000);
      }
    }, 1800);
  });
})();

/* ---- RIPPLE EFFECT ---- */
(function initRipple() {
  document.querySelectorAll(".ripple").forEach(btn => {
    btn.addEventListener("click", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.18);
        width: 8px; height: 8px;
        left: ${x - 4}px; top: ${y - 4}px;
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
        pointer-events: none;
      `;
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject keyframe
  if (!document.getElementById("ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `@keyframes rippleAnim { to { transform: scale(30); opacity: 0; } }`;
    document.head.appendChild(style);
  }
})();

/* ---- SMOOTH SCROLL for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById("navbar")?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ---- PROJECT CARD TILT (subtle, desktop) ---- */
(function initCardTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const cards = document.querySelectorAll(".project-card, .service-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.4s ease";
    });
  });
})();

/* ---- STAGGER children reveal ---- */
(function initStagger() {
  const grids = document.querySelectorAll(".projects-grid, .certs-grid, .skills-grid, .services-grid");
  grids.forEach(grid => {
    const children = grid.querySelectorAll(".reveal-up");
    children.forEach((child, i) => {
      const base = i % 3; // 3 columns max
      child.style.transitionDelay = (base * 0.12 + Math.floor(i / 3) * 0.06) + "s";
    });
  });
})();