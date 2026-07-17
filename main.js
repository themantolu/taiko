// Main JS file for Taiko Food & Beverage Website

document.addEventListener('DOMContentLoaded', () => {

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initialise Lenis Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/br64hsrnws
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Hook ScrollTrigger to Lenis scroll event
  lenis.on('scroll', ScrollTrigger.update);

  // Integrate Lenis with GSAP ScrollTrigger
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);


  // 2. Navigation Shrink & Backdrop Change on Scroll
  const header = document.getElementById('header-nav');
  const checkScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }
  };
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check on load


  // 3. GSAP Entrance Load Animations for Hero
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
  
  // Slide header down
  heroTl.from('#header-nav', {
    yPercent: -100,
    opacity: 0,
    duration: 1.2
  });

  // Slide hero content up
  heroTl.from('#hero-title', {
    y: 50,
    opacity: 0,
    duration: 1.2
  }, '-=0.8');

  heroTl.from('#hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1.0
  }, '-=0.9');

  heroTl.from('#hero-actions', {
    y: 30,
    opacity: 0,
    duration: 1.0
  }, '-=0.8');


  // 4. GSAP ScrollTrigger Parallax animations

  // Hero Background Parallax
  gsap.to('#hero-bg-img', {
    scrollTrigger: {
      trigger: 'section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 15,
    ease: 'none'
  });

  // Section heading reveals (scroll-anim utility)
  const scrollAnims = document.querySelectorAll('.scroll-anim');
  scrollAnims.forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // About Section Cards Reveal
  gsap.from('.pillar-card', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    x: -50,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Cargo ship dock image scale parallax
  gsap.to('#dock-ship-img', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    scale: 1.15,
    ease: 'none'
  });

  // Why Choose Taiko cards staggered reveal
  gsap.from('.why-card', {
    scrollTrigger: {
      trigger: '#why-us',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    y: 40,
    opacity: 0,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out'
  });

  // 3D orange shipping container parallax
  gsap.to('#orange-container-img', {
    scrollTrigger: {
      trigger: '#why-us',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    yPercent: -15,
    rotation: 6,
    scale: 1.05,
    ease: 'none'
  });

  // Desktop Categories Showcase revealing animation
  gsap.from('#categories-desktop-grid .category-card', {
    scrollTrigger: {
      trigger: '#categories',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Process Section Steps cards reveal
  gsap.from('.process-card', {
    scrollTrigger: {
      trigger: '#process',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out'
  });
  // 5. Initialize Swiper.js for Categories on Mobile
  if (document.querySelector('.categories-swiper')) {
    const categoriesSwiper = new Swiper('.categories-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: false,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2.2,
          spaceBetween: 24,
        }
      }
    });
  }


  // 6. Smooth anchor scrolling (integrating with Lenis)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, {
          offset: -80, // Offset for sticky navbar
          duration: 1.2,
        });
      }
    });
  });

});
