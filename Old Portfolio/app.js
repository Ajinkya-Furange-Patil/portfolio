// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu a");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("active");
      mobileMenu.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", !isOpen);
    });

    // Close menu when link clicked
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove("active");
      }
    });
  }
});

// ==========================================
// SMOOTH SCROLL & NAVIGATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[data-section]");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));
      // Add to current
      link.classList.add("active");

      // Scroll to section
      const sectionId = link.getAttribute("data-section");
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  });
});

// ==========================================
// FORM VALIDATION & SUBMISSION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Let Formspree handle submission
      // But add client-side validation
      const name = contactForm.querySelector("#name");
      const email = contactForm.querySelector("#email");
      const message = contactForm.querySelector("#message");

      // Validate
      if (!validateForm(name, email, message)) {
        e.preventDefault();
        showError("Please fill in all fields correctly");
        return false;
      }

      // Show success feedback
      showSuccess("Message sent! I'll get back to you soon.");
    });
  }
});

function validateForm(name, email, message) {
  const nameRegex = /^[a-zA-Z\s]{2,100}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    nameRegex.test(name.value) &&
    emailRegex.test(email.value) &&
    message.value.length >= 10
  );
}

function showError(message) {
  const alert = document.createElement("div");
  alert.className = "form-alert error";
  alert.textContent = message;
  alert.setAttribute("role", "alert");

  const form = document.getElementById("contact-form");
  form.parentNode.insertBefore(alert, form);

  setTimeout(() => alert.remove(), 5000);
}

function showSuccess(message) {
  const alert = document.createElement("div");
  alert.className = "form-alert success";
  alert.textContent = message;
  alert.setAttribute("role", "status");

  const form = document.getElementById("contact-form");
  form.parentNode.insertBefore(alert, form);

  setTimeout(() => alert.remove(), 5000);
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    }
  );

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all cards and sections
  document
    .querySelectorAll(".project-card, .skill-category, .internship-card")
    .forEach((el) => {
      observer.observe(el);
    });
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if ("PerformanceObserver" in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("Performance:", entry.name, entry.duration + "ms");
      }
    });

    observer.observe({ entryTypes: ["measure", "navigation"] });
  } catch (e) {
    console.log("Performance monitoring not available");
  }
}

// ==========================================
// ANALYTICS EVENT TRACKING
// ==========================================
function trackEvent(category, action, label) {
  if (window.gtag) {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

// Track project clicks
document.querySelectorAll(".project-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    trackEvent("Projects", "Click", link.textContent);
  });
});

// Track navigation
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const section = link.getAttribute("data-section") || link.textContent;
    trackEvent("Navigation", "Click", section);
  });
});

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener("keydown", (e) => {
  // Skip to main content (Ctrl + Alt + M)
  if (e.ctrlKey && e.altKey && e.key === "m") {
    document.getElementById("main-content").focus();
  }

  // Close mobile menu (Escape)
  if (e.key === "Escape") {
    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu?.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      document
        .querySelector(".hamburger")
        .setAttribute("aria-expanded", "false");
    }
  }
});

// ==========================================
// DARK MODE TOGGLE (Optional)
// ==========================================
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setColorScheme(scheme) {
  document.documentElement.setAttribute("data-color-scheme", scheme);
  localStorage.setItem("theme", scheme);
}

// Check for saved preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setColorScheme(savedTheme);
} else if (prefersDark.matches) {
  setColorScheme("dark");
}

// Listen for system preference changes
prefersDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setColorScheme(e.matches ? "dark" : "light");
  }
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log(
  "%cWelcome to my portfolio! 🚀",
  "font-size: 20px; color: #21808d; font-weight: bold;"
);
console.log(
  "%cInterested in working together? Get in touch! 📧",
  "font-size: 14px; color: #21808d;"
);
console.log(
  "%cGitHub: github.com/yourprofile | LinkedIn: linkedin.com/in/yourprofile",
  "font-size: 12px; color: #666;"
);

// ==========================================
// ERROR HANDLING
// ==========================================
window.addEventListener("error", (event) => {
  console.error("Error:", event.error);
  // Send to error tracking service (e.g., Sentry)
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled rejection:", event.reason);
  // Send to error tracking service
});

// ==========================================
// DOCUMENT READY COMPLETE
// ==========================================
console.log("Portfolio loaded successfully ✅");
