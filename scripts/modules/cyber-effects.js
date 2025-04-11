import { gsap } from 'gsap';
import VanillaTilt from 'vanilla-tilt';


export function initCyberEffects() {
    // Animate stats counters
    document.querySelectorAll('.stat-value').forEach((element) => {
      const target = +element.dataset.count;
      gsap.to(element, {
        innerText: target,
        duration: 2,
        snap: { innerText: 0.1 },
        stagger: 0.5,
        onUpdate: () => {
          element.innerText = Math.ceil(element.innerText);
        }
      });
    });
  
    // Track card interactions
    document.querySelectorAll('.track-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.3,
          background: `radial-gradient(circle at ${gsap.getProperty(card, "--x")} ${gsap.getProperty(card, "--y")}, 
            rgba(0, 243, 255, 0.2) 0%,
            rgba(0, 0, 0, 0.8) 100%)`,
          scale: 1.05
        });
      });
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        gsap.set(card, {
          "--x": ((e.clientX - rect.left) / rect.width * 100) + "%",
          "--y": ((e.clientY - rect.top) / rect.height * 100) + "%"
        });
      });
    });
  
    // Initialize Tilt.js effects
    VanillaTilt.init(document.querySelectorAll('.hologram-card'), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2
    });
  }