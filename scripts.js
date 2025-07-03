// ------------------------ DOM ELEMENTS ------------------------
const typedText = document.querySelector(".typing-text");
const progressBars = document.querySelectorAll(".progress-fill");
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");

// ------------------------ SMOOTH SCROLL ------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ------------------------ PARALLAX BACKGROUND ------------------------
document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  document.querySelectorAll(".gradient-sphere").forEach((sphere, index) => {
    const speed = (index + 1) * 0.03;
    const x = (clientX - centerX) * speed;
    const y = (clientY - centerY) * speed;
    sphere.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ------------------------ TYPING EFFECT ------------------------
const TEXTS = [
  "Computer Engineering Student",
  "Web Developer",
  "AI Expert",
  "Tech Enthusiast",
  "Freelancer",
  "Startup Enthusiast",
  "Problem Solver",
];

let textIndex = 0;
let charIndex = 0;
let typingInterval;
const typingElement = document.querySelector("#text");
const cursor = document.querySelector("#cursor");

function type() {
  const currentText = TEXTS[textIndex].substring(0, charIndex + 1);
  typingElement.innerHTML = currentText;
  charIndex++;

  if (currentText === TEXTS[textIndex]) {
    cursor.style.display = "none";
    clearInterval(typingInterval);
    setTimeout(() => {
      typingInterval = setInterval(deleteText, 50);
    }, 1000);
  }
}

function deleteText() {
  const currentText = TEXTS[textIndex].substring(0, charIndex - 1);
  typingElement.innerHTML = currentText;
  charIndex--;

  if (currentText === "") {
    clearInterval(typingInterval);
    textIndex = (textIndex + 1) % TEXTS.length;
    charIndex = 0;
    setTimeout(() => {
      cursor.style.display = "inline-block";
      typingInterval = setInterval(type, 100);
    }, 200);
  }
}

typingInterval = setInterval(type, 100);

// ------------------------ INTERSECTION OBSERVER ------------------------
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");

      if (entry.target.classList.contains("skill-category")) {
        const bars = entry.target.querySelectorAll(".progress-fill");
        bars.forEach((bar) => {
          const percentage = bar.parentElement.previousElementSibling.querySelector(".skill-percentage")?.textContent || "0%";
          bar.style.width = percentage;
        });
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-category, .section-title, .typing-text").forEach((el) => {
  observer.observe(el);
});

// ------------------------ THEME INITIALIZATION ------------------------
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("light-mode");
  themeToggle?.classList.add("active");
}

// ------------------------ FORM SUBMISSION ------------------------
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Form submitted:", Object.fromEntries(formData));
  e.target.reset();
  alert("Message sent successfully!");
});

// ------------------------ PROJECT CARD HOVER ------------------------
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    const { left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// ------------------------ NAVIGATION CLASS ------------------------
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    hamburger?.addEventListener("click", () => this.toggleMenu());

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleLinkClick(e, link));
    });

    document.addEventListener("click", (e) => this.closeOnClickOutside(e));
    window.addEventListener("scroll", () => {
      this.handleScroll();
      this.highlightSection();
    });
  }

  toggleMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("menu-open");
  }

  closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("menu-open");
  }

  handleLinkClick(e, link) {
    this.closeMenu();
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");
  }

  closeOnClickOutside(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      this.closeMenu();
    }
  }

  handleScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }

  highlightSection() {
    const sections = document.querySelectorAll("section");
    let currentId = "";

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.clientHeight;
      if (window.scrollY >= top - height / 3) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }
}

// ------------------------ INITIALIZE ------------------------
new Navigation();
