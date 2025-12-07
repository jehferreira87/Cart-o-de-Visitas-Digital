// script.js - Cartão de Desenvolvedor Web & UI/UX Designer com animações avançadas

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.getElementById("slides");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let slideIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    const total = slides.children.length;
    if (index < 0) slideIndex = total - 1;
    else if (index >= total) slideIndex = 0;
    else slideIndex = index;

    for (let i = 0; i < total; i++) {
      slides.children[i].classList.remove("active");
    }
    slides.children[slideIndex].classList.add("active");
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => showSlide(slideIndex + 1), 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  prevBtn.addEventListener("click", () => {
    showSlide(slideIndex - 1);
    resetAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    showSlide(slideIndex + 1);
    resetAutoSlide();
  });

  // Carrossel automático
  startAutoSlide();

  // Botão de compartilhar com animação
  const btnShare = document.getElementById("btnShare");
  btnShare.addEventListener("click", async (e) => {
    e.preventDefault();
    btnShare.style.transform = "scale(0.9)";
    setTimeout(() => (btnShare.style.transform = "scale(1)"), 150);

    if (navigator.share) {
      try {
        const cardName = document.getElementById("cardName").textContent;
        const cardJob = document.getElementById("cardJob").textContent;
        await navigator.share({
          title: cardName,
          text: `Conheça meu cartão digital: ${cardJob}`,
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro ao compartilhar:", error);
        }
      }
    } else {
      alert("Compartilhamento não suportado neste navegador");
    }
  });

  // Botão de baixar card
  const btnSave = document.getElementById("btnSaveImg");
  btnSave.addEventListener("click", (e) => {
    e.preventDefault();
    btnSave.style.transform = "scale(0.95)";
    setTimeout(() => (btnSave.style.transform = "scale(1)"), 150);

    // Placeholder para implementação futura
    console.log("Função de download será implementada em breve");
    alert("Função de download será implementada em breve.");
  });

  // QR code dinâmico para portfólio
  const qrImg = document.getElementById("qrImg");
  const portfolioURL = "https://seusite. dev";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    portfolioURL
  )}`;

  // Microinterações para links de contato
  const contactLinks = document.querySelectorAll(".contacts a");
  contactLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "scale(1.1)";
    });
    link.addEventListener("mouseleave", () => {
      link.style.transform = "scale(1)";
    });
  });

  // Validação do formulário
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    const email = contactForm.email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert("Por favor, digite um email válido");
    }
  });

  // Alternar temas
  const btnDark = document.getElementById("btnDark");
  const btnLux = document.getElementById("btnLux");
  const card = document.getElementById("card");

  btnDark.addEventListener("click", () => {
    card.classList.remove("theme-lux");
    card.classList.add("theme-dark");
    localStorage.setItem("theme", "dark");
  });

  btnLux.addEventListener("click", () => {
    card.classList.remove("theme-dark");
    card.classList.add("theme-lux");
    localStorage.setItem("theme", "lux");
  });

  // Carregar tema salvo
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "lux") {
    btnLux.click();
  }
});
