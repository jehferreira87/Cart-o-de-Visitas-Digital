// ============================================================
// PORTFOLIO - Jefferson Goncalves
// Desenvolvedor Web & Designer UI/UX
// Script principal com animacoes, temas, filtros e interacoes
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ========== LOADER ==========
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 800);
  });
  // Fallback: hide loader after 3s max
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 3000);

  // ========== AOS INIT ==========
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }

  // ========== TYPED TEXT EFFECT ==========
  const typedElement = document.getElementById("typedText");
  if (typedElement) {
    const phrases = [
      "Desenvolvedor Web Frontend",
      "Designer Grafico",
      "Designer UI/UX",
      "Freelancer Criativo",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typedElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typedElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        typeSpeed = 2000; // pause before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // pause before next phrase
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // ========== HEADER SCROLL EFFECT ==========
  const header = document.getElementById("header");
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  // ========== ACTIVE NAV LINK ON SCROLL ==========
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });

  // ========== MOBILE MENU ==========
  const menuToggle = document.getElementById("menuToggle");
  const menuIcon = document.getElementById("menuIcon");
  const navMobile = document.getElementById("navMobile");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMobile.classList.toggle("open");
      if (navMobile.classList.contains("open")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
      } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });
  }

  // Close mobile menu function (used in onclick)
  window.closeMobileMenu = function () {
    if (navMobile) {
      navMobile.classList.remove("open");
      if (menuIcon) {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    }
  };

  // ========== THEME TOGGLE ==========
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  const themes = ["theme-dark", "theme-light", "theme-lux"];
  let currentThemeIndex = 0;

  // Load saved theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme && themes.includes(savedTheme)) {
    currentThemeIndex = themes.indexOf(savedTheme);
    body.className = savedTheme;
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const theme = themes[currentThemeIndex];
    themeIcon.className = "";
    if (theme === "theme-dark") {
      themeIcon.classList.add("fas", "fa-moon");
    } else if (theme === "theme-light") {
      themeIcon.classList.add("fas", "fa-sun");
    } else if (theme === "theme-lux") {
      themeIcon.classList.add("fas", "fa-crown");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      body.className = themes[currentThemeIndex];
      localStorage.setItem("portfolio-theme", themes[currentThemeIndex]);
      updateThemeIcon();

      // Animate button
      themeToggle.style.transform = "rotate(360deg) scale(1.2)";
      setTimeout(() => {
        themeToggle.style.transform = "";
      }, 300);
    });
  }

  // ========== PROJECT FILTERS ==========
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projectCards.forEach((card, index) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
          card.style.animation = "fadeInUp 0.5s ease forwards";
          card.style.animationDelay = index * 0.05 + "s";
        } else {
          card.classList.add("hidden");
          card.style.animation = "";
        }
      });
    });
  });

  // ========== SKILL BARS ANIMATION ==========
  const skillBars = document.querySelectorAll(".skill-progress");
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      skillsAnimated = true;
      skillBars.forEach((bar, index) => {
        const progress = bar.dataset.progress;
        setTimeout(() => {
          bar.style.width = progress + "%";
        }, index * 100);
      });
    }
  }

  window.addEventListener("scroll", animateSkills, { passive: true });
  animateSkills(); // Check on load

  // ========== COUNTER ANIMATION ==========
  const counters = document.querySelectorAll(".stat-number[data-count]");
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        countersAnimated = true;
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function updateCounter() {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        updateCounter();
      }
    });
  }

  window.addEventListener("scroll", animateCounters, { passive: true });
  animateCounters(); // Check on load

  // ========== PARTICLES BACKGROUND ==========
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 6 + "s";
      particle.style.animationDuration = 4 + Math.random() * 4 + "s";
      particle.style.width = 1 + Math.random() * 3 + "px";
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ========== BACK TO TOP ==========
  const backToTop = document.getElementById("backToTop");

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", handleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const email = contactForm.querySelector('input[name="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !emailRegex.test(email.value)) {
        e.preventDefault();
        email.style.borderColor = "#e84393";
        email.style.boxShadow = "0 0 0 3px rgba(232, 67, 147, 0.2)";
        setTimeout(() => {
          email.style.borderColor = "";
          email.style.boxShadow = "";
        }, 3000);
        return;
      }

      // Add loading state to button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
      }
    });
  }

  // ========== FOOTER YEAR ==========
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ========== TILT EFFECT ON PROJECT CARDS ==========
  const tiltCards = document.querySelectorAll(".project-card, .service-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // ========== INTERSECTION OBSERVER FOR FADE-IN ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section-header, .about-content, .about-image").forEach((el) => {
    fadeObserver.observe(el);
  });
});
