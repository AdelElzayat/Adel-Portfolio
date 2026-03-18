const themeSwitch = document.getElementById("theme-toggle");
const body = document.body;

function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (!savedTheme || savedTheme === "light") {
    body.classList.add("light-mode");
    themeSwitch.checked = false;
  } else {
    body.classList.remove("light-mode");
    themeSwitch.checked = true;
  }
}

initTheme();

themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
});

const text = ["Web Developer", "Software Engineer", "Full-Stack Developer"];

const textElement = document.querySelector(".typing");

const typeSpeed = 100;
const eraseSpeed = 50;
const pauseBeforeErase = 2000;
const pauseBeforeType = 800;

let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < text[textIndex].length) {
    textElement.textContent += text[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typeSpeed);
  } else {
    setTimeout(eraseText, pauseBeforeErase);
  }
}

function eraseText() {
  if (textElement.textContent.length > 0) {
    textElement.textContent = textElement.textContent.slice(0, -1);
    setTimeout(eraseText, eraseSpeed);
  } else {
    textIndex = (textIndex + 1) % text.length;
    charIndex = 0;
    setTimeout(type, pauseBeforeType);
  }
}

function startTyping() {
  type();
}

window.onload = startTyping;

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    !hamburger.contains(e.target) &&
    !navMenu.contains(e.target) &&
    navMenu.classList.contains("active")
  ) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("reveal");
  });
  reveal();
});

window.addEventListener("scroll", reveal);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

(function () {
  emailjs.init("fBaF5ONGVG6Xp3Q5u");
})();

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Sending... <i class="fas fa-paper-plane"></i>';
    submitBtn.disabled = true;

    emailjs
      .sendForm("service_portfolio", "template_sptxotc", this)
      .then(
        function () {
          alert("Message sent successfully!");
          contactForm.reset();
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Failed to send: " + JSON.stringify(error));
        },
      )
      .finally(function () {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

const select = document.querySelector(".select");
const selected = document.querySelector(".selected");
const optionInputs = document.querySelectorAll(".options input[type='radio']");
const certificateCards = document.querySelectorAll(".certificate-card");
const certificatesGrid = document.querySelector(".certificates-grid");

function filterCertificates(optionId) {
  certificateCards.forEach((card, index) => {
    if (optionId === "all") {
      if (index === 0) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    } else if (optionId === "option-1") {
      if (index === 1) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    } else if (optionId === "option-2") {
      if (index === 2) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }
  });
  certificatesGrid.style.justifyContent = "center";
}

function showAllCertificates() {
  certificateCards.forEach((card) => {
    card.style.display = "flex";
  });
  certificatesGrid.style.justifyContent = "flex-start";
}

if (select && selected) {
  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    select.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove("active");
    }
  });

  const isMobile = window.matchMedia("(max-width: 995px)").matches;
  
  if (isMobile) {
    filterCertificates("all");
  }

  optionInputs.forEach((input) => {
    input.addEventListener("change", () => {
      select.classList.remove("active");
      const selectedValue = input.id;
      
      if (selectedValue === "all") {
        const isMobileNow = window.matchMedia("(max-width: 995px)").matches;
        if (isMobileNow) {
          filterCertificates("all");
        } else {
          showAllCertificates();
        }
      } else {
        filterCertificates(selectedValue);
      }
    });
  });
}

const modal = document.getElementById("cert-modal");
const modalImg = document.getElementById("cert-modal-img");
const closeModal = document.querySelector(".close-modal");
const certButtons = document.querySelectorAll(".certificate-btn");

if (modal && modalImg && closeModal && certButtons) {
  certButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const imgSrc = btn.getAttribute("data-cert-src");
      if (imgSrc) {
        modalImg.src = imgSrc;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const contactCards = document.querySelectorAll(".contact-card");

  const toast = document.createElement("div");
  toast.className = "copied-toast";
  toast.innerHTML = '<i class="fas fa-check-circle"></i> Copied!';
  document.body.appendChild(toast);

  const copyTextMap = {
    Email: "adelelzayat2005@gmail.com",
    GitHub: "https://github.com/AdelElzayat",
    LinkedIn: "www.linkedin.com/in/adel-elzayat",
  };

  let toastTimeout;
  function showToast() {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toast.classList.add("show");

    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }

  contactCards.forEach((card) => {
    card.addEventListener("click", async () => {
      const titleElement = card.querySelector(".contact-details h3");
      if (!titleElement) return;

      const title = titleElement.textContent.trim();
      const textToCopy = copyTextMap[title];

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);

        card.classList.add("copied");

        showToast();

        setTimeout(() => {
          card.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    });
  });
});