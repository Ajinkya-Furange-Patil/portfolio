// DOM Elements
const typedText = document.querySelector(".typing-text");
const progressBars = document.querySelectorAll(".progress-fill");

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Parallax Effect for Background
document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const gradientSpheres = document.querySelectorAll(".gradient-sphere");
  gradientSpheres.forEach((sphere, index) => {
    const speed = (index + 1) * 0.03;
    const x = (clientX - centerX) * speed;
    const y = (clientY - centerY) * speed;
    sphere.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Typing Effect

// List of sentences
var _CONTENT = [
  "Computer Engineering Student",
  "Web Developer",
  "AI Expert",
  "Tech Enthusiast",
  "Freelancer",
  "Startup Enthusiast",
  "Problem Solver",
];

var _PART = 0;
var _PART_INDEX = 0;
var _INTERVAL_VAL;
var _ELEMENT = document.querySelector("#text");
var _CURSOR = document.querySelector("#cursor");
function Type() {
  var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX++;
  if (text === _CONTENT[_PART]) {
    _CURSOR.style.display = "none";
    clearInterval(_INTERVAL_VAL);
    setTimeout(function () {
      _INTERVAL_VAL = setInterval(Delete, 50);
    }, 1000);
  }
}
function Delete() {
  var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX--;
  if (text === "") {
    clearInterval(_INTERVAL_VAL);
    if (_PART == _CONTENT.length - 1) _PART = 0;
    else _PART++;
    _PART_INDEX = 0;
    setTimeout(function () {
      _CURSOR.style.display = "inline-block";
      _INTERVAL_VAL = setInterval(Type, 100);
    }, 200);
  }
}
_INTERVAL_VAL = setInterval(Type, 100);

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");

      // Handle progress bars
      if (entry.target.classList.contains("skill-category")) {
        const progressBars = entry.target.querySelectorAll(".progress-fill");
        progressBars.forEach((bar) => {
          const percentage =
            bar.parentElement.previousElementSibling.querySelector(
              ".skill-percentage"
            ).textContent;
          bar.style.width = percentage;
        });
      }

      // Handle typing effect
      if (entry.target.classList.contains("typing-text")) {
        typeWriter(
          entry.target,
          entry.target.dataset.text || entry.target.textContent
        );
      }
    }
  });
}, observerOptions);

// Observe elements
document
  .querySelectorAll(
    ".project-card, .skill-category, .section-title, .typing-text"
  )
  .forEach((element) => observer.observe(element));

// Initialize theme from saved preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("light-mode");
  themeToggle.classList.add("active");
}

// Form Submission
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Add your form submission logic here
  const formData = new FormData(e.target);
  console.log("Form submitted:", Object.fromEntries(formData));

  // Reset form
  e.target.reset();

  // Show success message
  alert("Message sent successfully!");
});

// Project Card Hover Effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    const { left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// DOM Elements
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const body = document.body;

class Navigation {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Toggle mobile menu
    hamburger.addEventListener("click", () => this.toggleMobileMenu());

    // Handle navigation link clicks
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavLinkClick(e, link));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => this.handleOutsideClick(e));

    // Handle scroll events
    window.addEventListener("scroll", () => {
      this.handleNavbarScroll();
      this.highlightActiveSection();
    });
  }

  toggleMobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("menu-open");
  }

  closeMobileMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("menu-open");
  }

  handleNavLinkClick(e, clickedLink) {
    this.closeMobileMenu();

    // Update active link
    navLinks.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  }

  handleOutsideClick(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      this.closeMobileMenu();
    }
  }

  handleNavbarScroll() {
    const scrollThreshold = 50;
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  highlightActiveSection() {
    const sections = document.querySelectorAll("section");
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.scrollY;

      // Consider a section active when we've scrolled 1/3 into it
      if (scrollPosition >= sectionTop - sectionHeight / 3) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }
}

// Initialize navigation
const navigation = new Navigation();
