 // NAVBAR SHRINK
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      navbar.classList.toggle('shrink', window.scrollY > 50);
    });

    // HAMBURGER TOGGLE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') toggleMenu();
    });

    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('touchstart', () => link.classList.add('touch'), {passive: true});
      link.addEventListener('touchend', () => setTimeout(() => link.classList.remove('touch'), 150));
      // keyboard accessibility
      link.addEventListener('focus', () => link.classList.add('touch'));
      link.addEventListener('blur', () => link.classList.remove('touch'));
    });

   
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          toggleMenu();
        }
      });
    });