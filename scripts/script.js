// NAVBAR SHRINK
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const navbar = document.querySelector('.navbar');
      navbar.classList.toggle('shrink', window.scrollY > 50);
      ticking = false;
    });
    ticking = true;
  }
});

// HAMBURGER TOGGLE
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMenu() {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Prevent body scrolling when menu is open
  if (navLinks.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'auto';
  }
}

hamburger.addEventListener('click', toggleMenu);

// CLOSE MENU ON LINK CLICK
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// SCROLL ANIMATION FOR ABOUT SECTION
const aboutImage = document.querySelector('.about-image img');
const aboutContent = document.querySelector('.about-content');

// Remove initial opacity/transform to fix image display
aboutImage.style.opacity = '1';
aboutImage.style.transform = 'translateX(0)';
aboutContent.style.opacity = '1';
aboutContent.style.transform = 'translateX(0)';

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;
  
  const aboutTop = aboutSection.getBoundingClientRect().top;

  if (aboutTop < windowHeight - 100) {
    aboutImage.classList.add('animated');
    aboutContent.classList.add('animated');
  }
}

// Use Intersection Observer for better performance
const aboutObserverOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutImage.classList.add('animated');
      aboutContent.classList.add('animated');
      aboutObserver.unobserve(entry.target);
    }
  });
}, aboutObserverOptions);

// Observe the about section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
});