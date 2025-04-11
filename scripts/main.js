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

  // Number counters
  document.querySelectorAll(".stat-value").forEach(element => {
    const target = parseFloat(element.dataset.count);
    gsap.to(element, {
      innerText: target,
      duration: 2.5,
      snap: { innerText: 0.1 },
      delay: 0.7,
      onUpdate: function() {
        const value = parseFloat(this.targets()[0].innerText).toFixed(1);
        element.innerText = value % 1 === 0 ? `${value}+` : value;
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