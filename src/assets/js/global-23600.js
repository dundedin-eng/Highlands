(function() {
  const init = () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      fadeObserver.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
      .fade-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .bottle-float {
        animation: bottleFloat 6s ease-in-out infinite;
      }
      @keyframes bottleFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(1deg); }
      }
      .hero-content {
        animation: heroFadeIn 1.2s ease forwards;
      }
      .hero-bottle {
        animation: heroBottleIn 1.5s ease forwards;
        animation-delay: 0.3s;
        opacity: 0;
      }
      @keyframes heroFadeIn {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes heroBottleIn {
        from { opacity: 0; transform: translateY(50px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .scroll-indicator {
        animation: scrollPulse 2s ease-in-out infinite;
      }
      @keyframes scrollPulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      .product-card:hover {
        transform: translateY(-8px);
      }
      .product-card {
        transition: transform 0.4s ease, border-color 0.4s ease;
      }
    `;
    document.head.appendChild(style);
    
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const nav = mobileToggle.closest('nav');
        let mobileMenu = nav.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
          mobileMenu = document.createElement('div');
          mobileMenu.className = 'mobile-menu absolute top-full left-0 right-0 bg-stone-950 border-t border-stone-800 p-6 flex flex-col gap-4 md:hidden';
          mobileMenu.innerHTML = `
            <a href="#story" class="text-stone-300 hover:text-amber-500 transition-colors text-sm tracking-widest uppercase py-2">Story</a>
            <a href="#collection" class="text-stone-300 hover:text-amber-500 transition-colors text-sm tracking-widest uppercase py-2">Collection</a>
            <a href="#process" class="text-stone-300 hover:text-amber-500 transition-colors text-sm tracking-widest uppercase py-2">Process</a>
            <a href="#sustainability" class="text-stone-300 hover:text-amber-500 transition-colors text-sm tracking-widest uppercase py-2">Tierra</a>
            <a href="#locate" class="px-5 py-3 border border-amber-600 text-amber-500 text-center text-sm tracking-widest uppercase">Find Us</a>
          `;
          nav.appendChild(mobileMenu);
        } else {
          mobileMenu.remove();
        }
      });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) mobileMenu.remove();
          }
        }
      });
    });
    
    const parallaxElements = document.querySelectorAll('.hero-section');
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach(el => {
        const bg = el.querySelector('[style*="background-image"]');
        if (bg) {
          bg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      });
    });
  };
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();