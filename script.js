// =========================================
// script.js — Portfolio JavaScript
// Connected in index.html via:
// <script src="script.js"></script>
// =========================================


// =========================================
// 1. HAMBURGER MENU (mobile ke liye)
//    Nav links ko toggle karta hai
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open'); // 'open' class add/remove karta hai
  });
}

// Agar koi nav link click kare toh menu band ho jaye (mobile)
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});


// =========================================
// 2. NAVBAR SCROLL EFFECT
//    Scroll karne par navbar ka background thoda change ho
// =========================================
const nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    // Thoda zyada dark karo jab scroll ho
    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.boxShadow = 'none';
  }
});


// =========================================
// 3. ACTIVE NAV LINK HIGHLIGHT
//    Jo section visible ho, uska nav link highlight hoga
// =========================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  let currentSection = '';

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 80; // 80px = navbar height
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navAnchors.forEach(function (anchor) {
    anchor.style.color = '';        // pehle sab reset karo
    anchor.style.fontWeight = '';

    if (anchor.getAttribute('href') === '#' + currentSection) {
      // Active section ka link highlight
      anchor.style.color = '#c9a84c';      // gold color
      anchor.style.fontWeight = '500';
    }
  });
});


// =========================================
// 4. SCROLL REVEAL ANIMATION
//    Cards aur sections smoothly appear hon scroll karne par
// =========================================
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .highlight, .about-grid, .contact-grid'
);

// Pehle sab invisible karo
revealElements.forEach(function (el) {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// IntersectionObserver — check karta hai kab element screen pe aaya
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Element visible hua — animate karo
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // ek baar animate ho toh stop karo
    }
  });
}, {
  threshold: 0.12 // 12% element visible hone par trigger hoga
});

revealElements.forEach(function (el) {
  observer.observe(el);
});


// =========================================
// 5. PROFILE IMAGE ERROR HANDLING
//    Agar profile.jpg nahi mili toh fallback icon dikhao
// =========================================
const profileImg = document.getElementById('profile-img');

if (profileImg) {
  profileImg.addEventListener('error', function () {
    // Image load nahi hui — use hide karo, fallback dikhega
    this.style.display = 'none';
  });
}


// =========================================
// 6. CONTACT FORM VALIDATION
//    Basic validation aur success/error message
// =========================================
const contactForm = document.getElementById('contact-form');
const formMsg     = document.getElementById('form-msg');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Page reload rokta hai

    // Form fields ki values lo
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      formMsg.textContent  = 'Please fill in all fields.';
      formMsg.className    = 'form-msg error';
      return;
    }

    // Email format check karo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.className   = 'form-msg error';
      return;
    }

    // ✅ Validation pass — success message dikhao
    // NOTE: Real email bhejna ho toh EmailJS ya backend use karo
    formMsg.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
    formMsg.className   = 'form-msg success';

    // Form reset karo
    contactForm.reset();

    // 5 second baad message hide karo
    setTimeout(function () {
      formMsg.textContent = '';
      formMsg.className   = 'form-msg';
    }, 5000);
  });
}


// =========================================
// 7. CURRENT YEAR IN FOOTER
//    Footer mein year manually update na karna pade
// =========================================
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// =========================================
// FUTURE IDEAS (baad mein add kar sakte ho):
// - Dark mode toggle
// - Typing animation in hero
// - EmailJS for real form submission
// - Project filter by technology
// =========================================
