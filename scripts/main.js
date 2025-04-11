// Imports
import '../styles/main.scss';
import { createParticleSystem } from './modules/particle-system.js';
import { initCyberEffects } from './modules/cyber-effects.js';
import VanillaTilt from 'vanilla-tilt';
import { gsap } from 'gsap';

// Initialize Tilt.js globally
VanillaTilt.init(document.querySelectorAll('.track-card'), {
  max: 15,
  speed: 300,
  glare: true,
  'max-glare': 0.2,
  gyroscope: true
});

// Font loading detection
const initializeAfterFonts = () => {
  Promise.all([
    document.fonts.load('1rem "Orbitron"'),
    document.fonts.load('1rem "Font Awesome 6 Brands"')
  ]).then(() => {
    document.body.classList.add('fonts-loaded');
  });
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core systems
  createParticleSystem();
  initializeAfterFonts();

  // Set GSAP defaults
  gsap.defaults({ ease: "power3.out" });

  // Particle system interaction
  document.addEventListener('mousemove', (e) => {
    gsap.to('.webgl', {
      duration: 0.5,
      x: e.clientX * 0.01,
      y: e.clientY * 0.01,
      ease: "power2.out"
    });
  });

  // Navigation effects
  document.querySelectorAll('.holographic-link').forEach(link => {
    link.addEventListener('mouseenter', () => gsap.to(link, {
      duration: 0.3,
      color: '#00f3ff',
      textShadow: '0 0 10px #00f3ff'
    }));
    
    link.addEventListener('mouseleave', () => gsap.to(link, {
      duration: 0.3,
      color: 'white',
      textShadow: 'none'
    }));
  });

  // Register button effects
  const registerBtn = document.querySelector('.hologram-button');
  if (registerBtn) {
    registerBtn.addEventListener('mousemove', (e) => {
      const rect = registerBtn.getBoundingClientRect();
      gsap.to(registerBtn, {
        duration: 0.5,
        '--x': (e.clientX - rect.left) / rect.width,
        '--y': (e.clientY - rect.top) / rect.height,
        ease: "power2.out"
      });
    });
  }

  // Social icons animation
  gsap.from(".social-icon", {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power4.out",
    delay: 1,
    onComplete: () => {
      document.querySelectorAll(".social-icon").forEach(icon => {
        icon.addEventListener("mouseenter", () => gsap.to(icon, {
          duration: 0.3,
          scale: 1.2,
          y: -10,
          filter: "drop-shadow(0 0 20px rgba(0, 243, 255, 0.7))"
        }));
        
        icon.addEventListener("mouseleave", () => gsap.to(icon, {
          duration: 0.3,
          scale: 1,
          y: 0,
          filter: "drop-shadow(0 0 10px rgba(0, 243, 255, 0.5))"
        }));
      });
    }
  });

  // Update the number counters section in main.js
document.querySelectorAll(".stat-value").forEach(element => {
    const target = parseFloat(element.dataset.count);
    const isInteger = Number.isInteger(target);
    
    gsap.to(element, {
      innerText: target,
      duration: 2.5,
      snap: { innerText: isInteger ? 1 : 0.1 },
      delay: 0.7,
      ease: "power2.out",
      onUpdate: function() {
        const current = parseFloat(this.targets()[0].innerText);
        element.innerText = isInteger ? 
          `${Math.floor(current)}+` : 
          current.toFixed(1);
      },
      onStart: () => {
        element.innerText = isInteger ? "0+" : "0.0";
      }
    });
  });

  // Track card interactions
  document.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      gsap.to(card, {
        '--x': `${e.clientX - rect.left}px`,
        '--y': `${e.clientY - rect.top}px`,
        duration: 0.3
      });
    });

    card.addEventListener('mouseleave', () => gsap.to(card, {
      '--x': `-100px`,
      '--y': `-100px`,
      duration: 0.5
    }));
  });

  // Initialize cyber effects last
  initCyberEffects();
});

// Add to main.js
// Timeline Interactions
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mousemove', (e) => {
      const rect = content.getBoundingClientRect();
      gsap.set(content, {
        '--x': `${e.clientX - rect.left}px`,
        '--y': `${e.clientY - rect.top}px`
      });
    });
  
    content.addEventListener('mouseleave', () => {
      gsap.to(content, {
        '--x': `-100px`,
        '--y': `-100px`,
        duration: 0.5
      });
    });
  });
  
// Timeline Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
      // Main timeline animation
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        // Animate the content boxes
        gsap.from(item.querySelector('.timeline-content'), {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          },
          opacity: 0,
          x: 50,
          duration: 0.8,
          delay: i * 0.2
        });
        
        // Animate the nodes
        gsap.from(item.querySelector('.timeline-node'), {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          },
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          delay: i * 0.2 + 0.2
        });
        
        // Animate the dates
        gsap.from(item.querySelector('.timeline-date'), {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          },
          opacity: 0,
          x: -50,
          duration: 0.8,
          delay: i * 0.2 + 0.1
        });
      });
      
      // Additional animation for the vertical line
      gsap.from('.vertical-timeline::before', {
        scrollTrigger: {
          trigger: '.vertical-timeline',
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none none"
        },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power2.out"
      });
    }
  });

  // Add to main.js
// Prize Card Interactions
document.querySelectorAll('.prize-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      gsap.to(card, {
        '--x': `${e.clientX - rect.left}px`,
        '--y': `${e.clientY - rect.top}px`,
        duration: 0.3
      });
    });
  
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        '--x': `-100px`,
        '--y': `-100px`,
        duration: 0.5
      });
    });
  });
  
  // Initialize Tilt.js for prize cards
  VanillaTilt.init(document.querySelectorAll('.prize-card'), {
    max: 15,
    speed: 300,
    glare: true,
    'max-glare': 0.2,
    gyroscope: true
  });

// Add to main.js
// FAQ Interactions
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      
      // Toggle active class
      faqItem.classList.toggle('active');
      
      // Animate answer
      gsap.to(answer, {
        maxHeight: faqItem.classList.contains('active') ? '500px' : 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
      
      // Animate icon
      gsap.to(button.querySelector('.faq-icon'), {
        rotation: faqItem.classList.contains('active') ? 45 : 0,
        duration: 0.3
      });
    });
  });

  // Add to main.js
// More Card Interactions
document.querySelectorAll('.more-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(card, {
        '--x': x,
        '--y': y,
        duration: 0.3
      });
    });
  
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        '--x': '50%',
        '--y': '50%',
        duration: 0.5
      });
    });
  });

  // Add to main.js
// About Card Interactions
document.querySelectorAll('.about-card').forEach(card => {
    // Mouse move effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(card, {
        '--x': x,
        '--y': y,
        duration: 0.3
      });
    });
  
    // Counter animation
    const counter = card.querySelector('.counter');
    if(counter) {
      gsap.to(counter, {
        innerText: counter.dataset.count,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: card,
          start: 'top center'
        }
      });
    }
  });