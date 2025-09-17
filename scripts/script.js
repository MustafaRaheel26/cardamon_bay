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
const aboutImage = document.querySelector('.about-image');
const aboutContent = document.querySelector('.about-content');

// Use Intersection Observer for better performance
const aboutObserverOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutImage.classList.add('animate');
      aboutContent.classList.add('animate');
      aboutObserver.unobserve(entry.target);
    }
  });
}, aboutObserverOptions);

// Observe the about section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// MENU CATEGORY FILTERING
const categoryButtons = document.querySelectorAll('.category-btn');
const menuCategories = document.querySelectorAll('.menu-category');

// Show all categories by default
function showAllCategories() {
  menuCategories.forEach(category => {
    category.style.display = 'block';
    setTimeout(() => {
      category.classList.add('visible');
    }, 50);
  });
}

// Filter menu categories
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const category = button.getAttribute('data-category');
    
    // Filter menu categories
    menuCategories.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
        // Add animation for visible items
        setTimeout(() => {
          item.classList.add('visible');
        }, 50);
      } else {
        item.style.display = 'none';
        item.classList.remove('visible');
      }
    });
  });
});

// ANIMATE MENU CATEGORIES ON SCROLL
const menuObserverOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const menuObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      menuObserver.unobserve(entry.target);
    }
  });
}, menuObserverOptions);

// Observe menu categories
menuCategories.forEach(category => {
  menuObserver.observe(category);
});

// Show all categories by default on page load
document.addEventListener('DOMContentLoaded', () => {
  showAllCategories();
});

// GALLERY FUNCTIONALITY
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.querySelector('.gallery-modal');
const modalImg = document.getElementById('modal-image');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let currentIndex = 0;

// Open modal with clicked image
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    openModal();
  });
});

function openModal() {
  modal.style.display = 'block';
  modalImg.src = galleryItems[currentIndex].querySelector('img').src;
  modalCaption.textContent = galleryItems[currentIndex].querySelector('img').alt;
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Navigation between images
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navigate(-1);
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navigate(1);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    } else if (e.key === 'ArrowLeft') {
      navigate(-1);
    } else if (e.key === 'ArrowRight') {
      navigate(1);
    }
  }
});

function navigate(direction) {
  currentIndex += direction;
  
  // Loop around if at the beginning or end
  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  } else if (currentIndex >= galleryItems.length) {
    currentIndex = 0;
  }
  
  modalImg.src = galleryItems[currentIndex].querySelector('img').src;
  modalCaption.textContent = galleryItems[currentIndex].querySelector('img').alt;
  
  // Add animation
  modalImg.style.animation = 'none';
  setTimeout(() => {
    modalImg.style.animation = 'zoom 0.3s ease';
  }, 10);
}

// REVIEWS CAROUSEL (if needed in the future)
// This can be expanded to create a rotating carousel for reviews

// CONTACT FORM VALIDATION
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    if (!nameInput.value.trim()) {
      highlightError(nameInput);
      isValid = false;
    }
    
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      highlightError(emailInput);
      isValid = false;
    }
    
    if (!messageInput.value.trim()) {
      highlightError(messageInput);
      isValid = false;
    }
    
    if (isValid) {
      // Form is valid - in a real application, you would send the data to a server here
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    }
  });
}

function highlightError(input) {
  input.style.borderColor = '#ff6b6b';
  setTimeout(() => {
    input.style.borderColor = '#e1ab5e';
  }, 2000);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// LAZY LOADING FOR IMAGES
if ('IntersectionObserver' in window) {
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove('lazy');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(lazyImage => {
    lazyImageObserver.observe(lazyImage);
  });
}

// Fallback for browsers that don't support Intersection Observer
if (!('IntersectionObserver' in window)) {
  function checkScroll() {
    const windowHeight = window.innerHeight;
    
    // About section animation fallback
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
      const aboutTop = aboutSection.getBoundingClientRect().top;
      if (aboutTop < windowHeight - 100) {
        aboutImage.classList.add('animate');
        aboutContent.classList.add('animate');
      }
    }
    
    // Menu categories animation fallback
    menuCategories.forEach(category => {
      const categoryTop = category.getBoundingClientRect().top;
      if (categoryTop < windowHeight - 100) {
        category.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll);
  // Check on page load
  document.addEventListener('DOMContentLoaded', checkScroll);
}