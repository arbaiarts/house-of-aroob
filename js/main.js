'use strict';

(function() {
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // --- Config & State ---
  const state = {
    isLoaded: false,
    animationsInitialized: false,
    isMobileMenuOpen: false,
    isLightboxOpen: false,
    currentGalleryIndex: 0,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    hasFinePointer: window.matchMedia('(pointer: fine)').matches,
    galleryData: [], // Array of {src, caption}
    cursor: { x: 0, y: 0, targetX: 0, targetY: 0 }
  };

  // --- Utility Functions ---
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length === 0) return;
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
  }

  // --- Loader ---
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) {
      document.body.classList.add('loaded');
      state.isLoaded = true;
      return;
    }

    const hideLoader = () => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
        document.body.classList.add('loaded');
        state.isLoaded = true;
      }, 300);
    };

    let skipped = false;
    const skipLoader = () => {
      if (!skipped) {
        skipped = true;
        hideLoader();
      }
    };

    loader.addEventListener('click', skipLoader);
    loader.addEventListener('touchstart', skipLoader, { passive: true });

    if (typeof gsap !== 'undefined' && !state.reducedMotion) {
      const tl = gsap.timeline({
        onComplete: skipLoader,
        defaults: { ease: 'power2.inOut' }
      });
      tl.fromTo('.loader-rect', { scaleX: 0 }, { scaleX: 1, duration: 0.6 })
        .fromTo('.loader-logo', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.2');
      
      // Fallback timeout just in case
      setTimeout(skipLoader, 1200);
    } else {
      setTimeout(skipLoader, state.reducedMotion ? 100 : 1200);
    }
  }

  // --- Custom Cursor ---
  function initCursor() {
    if (!state.hasFinePointer || state.reducedMotion) return;

    const cursorEl = document.getElementById('cursor');
    if (!cursorEl) return;

    cursorEl.style.display = 'block';

    window.addEventListener('mousemove', (e) => {
      state.cursor.targetX = e.clientX;
      state.cursor.targetY = e.clientY;
    }, { passive: true });

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const render = () => {
      state.cursor.x = lerp(state.cursor.x, state.cursor.targetX, 0.2);
      state.cursor.y = lerp(state.cursor.y, state.cursor.targetY, 0.2);
      cursorEl.style.transform = `translate(${state.cursor.x}px, ${state.cursor.y}px)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .gallery-frame, .material-sample');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('hovering'));
    });
  }

  // --- Navigation ---
  function initNav() {
    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (!nav || !navToggle || !navMobile) return;

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          nav.classList.toggle('nav-scrolled', window.scrollY > 50);
          scrollTicking = false;
        });
      }
    }, { passive: true });

    const toggleMenu = () => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      navMobile.classList.toggle('is-open', state.isMobileMenuOpen);
      navToggle.classList.toggle('is-open', state.isMobileMenuOpen);
      navToggle.setAttribute('aria-expanded', state.isMobileMenuOpen);
      navToggle.setAttribute('aria-label', state.isMobileMenuOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = state.isMobileMenuOpen ? 'hidden' : '';
      if (state.isMobileMenuOpen) {
        navMobile.focus();
      }
    };

    navToggle.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isMobileMenuOpen) {
        toggleMenu();
        navToggle.focus();
      }
    });

    const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (state.isMobileMenuOpen) toggleMenu();
      });
    });

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));

    trapFocus(navMobile);
  }

  // --- Materials Interaction ---
  function initMaterials() {
    const materials = document.querySelectorAll('.material-sample');
    if (!materials.length) return;

    materials.forEach(material => {
      if (state.hasFinePointer) {
        material.addEventListener('mouseenter', () => {
          materials.forEach(m => m.classList.remove('active'));
          material.classList.add('active');
        });
      }

      const toggleActive = (e) => {
        e.preventDefault();
        const isActive = material.classList.contains('active');
        materials.forEach(m => m.classList.remove('active'));
        if (!isActive) material.classList.add('active');
      };

      material.addEventListener('click', toggleActive);
      material.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleActive(e);
        }
      });
    });
  }

  // --- Gallery & Lightbox ---
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    if (!galleryItems.length || !lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const imgWrap = lightbox.querySelector('.lightbox-img-wrap');
    
    let triggerElement = null;

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('.gallery-img');
      const caption = item.querySelector('figcaption');
      if (img && caption) {
        state.galleryData.push({
          src: img.getAttribute('src'),
          caption: caption.textContent
        });
      }

      const openLightboxHandler = (e) => {
        e.preventDefault();
        openLightbox(index, item);
      };

      item.addEventListener('click', openLightboxHandler);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.key === ' ') e.preventDefault();
          openLightboxHandler(e);
        }
      });
    });

    const updateLightbox = (index) => {
      const dataLength = state.galleryData.length;
      state.currentGalleryIndex = (index + dataLength) % dataLength;
      const data = state.galleryData[state.currentGalleryIndex];
      lightboxImg.src = data.src;
      lightboxImg.alt = data.caption;
      lightboxCaption.textContent = data.caption;
    };

    const openLightbox = (index, triggerEl) => {
      state.isLightboxOpen = true;
      triggerElement = triggerEl;
      updateLightbox(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeLightbox = () => {
      state.isLightboxOpen = false;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.removeAttribute('aria-modal');
      document.body.style.overflow = '';
      if (triggerElement) triggerElement.focus();
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    const showPrev = () => updateLightbox(state.currentGalleryIndex - 1);
    const showNext = () => updateLightbox(state.currentGalleryIndex + 1);

    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!state.isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      
      if (e.key === 'Tab') {
        const focusable = lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { 
            last.focus(); 
            e.preventDefault(); 
          } else if (!e.shiftKey && document.activeElement === last) { 
            first.focus(); 
            e.preventDefault(); 
          }
        }
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    imgWrap.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imgWrap.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) showNext();
      if (touchEndX - touchStartX > 50) showPrev();
    }, { passive: true });
  }

  // --- Contact Form ---
  function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formGroups = form.querySelectorAll('.form-group');
      formGroups.forEach(group => group.classList.remove('error'));

      const nameEl = document.getElementById('name');
      const phoneEl = document.getElementById('phone');
      const projectEl = document.getElementById('project');
      const messageEl = document.getElementById('message');

      const name = nameEl.value.trim();
      const phone = phoneEl.value.replace(/[\s\-\+]/g, '');
      const project = projectEl.value;
      const message = messageEl.value.trim();

      let isValid = true;

      if (!name) {
        nameEl.closest('.form-group').classList.add('error');
        isValid = false;
      }
      if (!phone || phone.length < 10) {
        phoneEl.closest('.form-group').classList.add('error');
        isValid = false;
      }
      if (!project) {
        projectEl.closest('.form-group').classList.add('error');
        isValid = false;
      }

      if (isValid) {
        const text = `Hi, I'm ${name}. I'm interested in ${project}. ${message ? message + '. ' : ''}Phone: ${phoneEl.value.trim()}`;
        const url = `https://wa.me/918884329455?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        form.reset();
      }
    });
  }

  // --- Footer ---
  function initFooter() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // --- WhatsApp nudge tooltip ---
  // Fires once after the user scrolls 400px, briefly shows the tooltip
  function initWhatsAppNudge() {
    // Skip if user prefers reduced motion or no WhatsApp button exists
    if (state.reducedMotion) return;
    const waBtn = document.querySelector('.whatsapp-float');
    if (!waBtn) return;

    let nudgeFired = false;

    const onScroll = () => {
      if (nudgeFired) return;
      if (window.scrollY < 400) return;

      nudgeFired = true;
      window.removeEventListener('scroll', onScroll);

      // Add nudge class — CSS animation runs for 4s
      document.body.classList.add('wa-nudge');

      // Remove class after animation completes so it can't interfere with hover
      setTimeout(() => {
        document.body.classList.remove('wa-nudge');
      }, 5000);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- GSAP Animations ---
  function initAnimations() {
    if (state.animationsInitialized) return;
    state.animationsInitialized = true;

    const isGSAPAvailable = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    
    if (!isGSAPAvailable || state.reducedMotion) {
      // Fallback: make everything visible immediately
      document.querySelectorAll('.reveal-line').forEach(el => el.classList.add('is-visible'));
      document.querySelectorAll('.service-card').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      document.querySelectorAll('.process-step').forEach(el => el.classList.add('is-visible'));
      const lineFill = document.querySelector('.process-line-fill');
      if (lineFill) lineFill.style.transform = 'scaleY(1)';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // a. HERO ZOOM
    gsap.fromTo('.hero-img', 
      { scale: 1 }, 
      { scale: 1.08, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } }
    );

    // b. HERO SVG FLOOR PLAN DRAWING
    const planElements = document.querySelectorAll('.plan-lines rect, .plan-lines line');
    planElements.forEach((el) => {
      let totalLength;
      if (el.tagName.toLowerCase() === 'rect') {
        const w = parseFloat(el.getAttribute('width'));
        const h = parseFloat(el.getAttribute('height'));
        totalLength = (w + h) * 2;
      } else if (el.tagName.toLowerCase() === 'line') {
        const x1 = parseFloat(el.getAttribute('x1'));
        const y1 = parseFloat(el.getAttribute('y1'));
        const x2 = parseFloat(el.getAttribute('x2'));
        const y2 = parseFloat(el.getAttribute('y2'));
        totalLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      }
      
      if (totalLength) {
        el.style.strokeDasharray = totalLength;
        el.style.strokeDashoffset = totalLength;
      }
    });

    if (planElements.length > 0) {
      gsap.to(planElements, {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
      });
    }

    // c. SCROLL CUE FADE
    gsap.to('.scroll-cue', {
      opacity: 0,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '100px top', scrub: true }
    });

    // d. REVEAL LINES
    ScrollTrigger.batch('.reveal-line', {
      start: 'top 85%',
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' })
    });

    // e. PHILOSOPHY PARALLAX
    const pxSpeed = window.innerWidth < 768 ? 15 : 30;
    gsap.to('.philosophy-bg', {
      yPercent: pxSpeed,
      ease: 'none',
      scrollTrigger: { trigger: '.philosophy', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    // f. PHILOSOPHY WORDS DRIFT
    document.querySelectorAll('.philosophy-word').forEach(word => {
      const speed = parseFloat(word.getAttribute('data-speed')) || 1;
      gsap.to(word, {
        y: -100 * speed,
        ease: 'none',
        scrollTrigger: { trigger: '.philosophy', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // g. SERVICES DEPTH
    const isDesktopMouse = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
    if (isDesktopMouse) {
      gsap.set('.service-card', { z: -200, opacity: 0 });
      ScrollTrigger.batch('.service-card', {
        start: 'top 90%',
        once: true,
        onEnter: batch => gsap.to(batch, { z: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power2.out' })
      });
    } else {
      gsap.set('.service-card', { opacity: 1, z: 0 });
    }

    // h. PROCESS LINE DRAW
    gsap.fromTo('.process-line-fill', 
      { scaleY: 0 }, 
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process', start: 'top center', end: 'bottom center', scrub: true } }
    );

    // i. PROCESS STEPS
    ScrollTrigger.batch('.process-step', {
      start: 'top 85%',
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' })
    });
  }

  // --- Init ---
  function init() {
    try {
      initLoader();
      initCursor();
      initNav();
      initMaterials();
      initGallery();
      initForm();
      initFooter();
      initWhatsAppNudge();
    } catch (error) {
      console.warn('Initialization error:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', initAnimations);

})();
