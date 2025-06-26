/**
 * Liquify Effects System
 * Advanced liquid-like animations and morphing effects
 */

class LiquifyEffects {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.enhanceButtons();
    this.enhanceCards();
    this.addBlobEffects();
    this.initMorphingElements();
    this.bindScrollEffects();
  }

  enhanceButtons() {
    // Enhance existing CTA buttons with liquify effects
    const buttons = document.querySelectorAll('.cta-btn-custom, .btn-primary, button[type="submit"]');
    
    buttons.forEach(button => {
      if (!button.classList.contains('liquify-enhanced')) {
        button.classList.add('liquify-hover', 'liquify-enhanced');
        this.addButtonRippleEffect(button);
      }
    });
  }

  addButtonRippleEffect(button) {
    button.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
      `;
      
      button.appendChild(ripple);
      
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  }

  enhanceCards() {
    const cards = document.querySelectorAll('.feature-card, .glass-card, .bg-white');
    
    cards.forEach(card => {
      if (!card.classList.contains('liquify-enhanced')) {
        card.classList.add('liquify-hover', 'liquify-enhanced');
        this.addCardMorphEffect(card);
      }
    });
  }

  addCardMorphEffect(card) {
    let morphTimeout;
    
    card.addEventListener('mouseenter', () => {
      clearTimeout(morphTimeout);
      card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.borderRadius = this.generateRandomBorderRadius();
    });
    
    card.addEventListener('mouseleave', () => {
      morphTimeout = setTimeout(() => {
        card.style.borderRadius = '';
      }, 200);
    });
  }

  generateRandomBorderRadius() {
    const values = [];
    for (let i = 0; i < 8; i++) {
      values.push(Math.random() * 30 + 10);
    }
    return `${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}% / ${values[4]}% ${values[5]}% ${values[6]}% ${values[7]}%`;
  }

  addBlobEffects() {
    // Add floating blob elements
    this.createFloatingBlobs();
    
    // Enhance existing floating spheres with blob morphing
    const spheres = document.querySelectorAll('.floating-sphere');
    spheres.forEach(sphere => {
      if (!sphere.classList.contains('blob-morph')) {
        sphere.classList.add('blob-morph');
      }
    });
  }

  createFloatingBlobs() {
    const blobContainer = document.createElement('div');
    blobContainer.className = 'blob-container';
    blobContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    `;
    
    // Create multiple blobs
    for (let i = 0; i < 3; i++) {
      const blob = this.createBlob(i);
      blobContainer.appendChild(blob);
    }
    
    document.body.appendChild(blobContainer);
  }

  createBlob(index) {
    const blob = document.createElement('div');
    const size = Math.random() * 200 + 100;
    const colors = [
      'rgba(59, 130, 246, 0.1)',
      'rgba(139, 92, 246, 0.1)',
      'rgba(236, 72, 153, 0.1)'
    ];
    
    blob.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[index % colors.length]};
      border-radius: 50%;
      filter: blur(40px);
      animation: floatBlob ${15 + index * 5}s infinite ease-in-out;
      animation-delay: ${index * 2}s;
    `;
    
    // Random starting position
    blob.style.left = Math.random() * 100 + '%';
    blob.style.top = Math.random() * 100 + '%';
    
    return blob;
  }

  initMorphingElements() {
    // Add morphing effects to profile images and icons
    const images = document.querySelectorAll('img, .icon-wrapper');
    
    images.forEach(img => {
      if (!img.classList.contains('morph-enhanced')) {
        img.classList.add('morph-enhanced');
        this.addMorphOnHover(img);
      }
    });
  }

  addMorphOnHover(element) {
    let originalBorderRadius = window.getComputedStyle(element).borderRadius;
    
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'all 0.3s ease';
      element.style.borderRadius = this.generateRandomBorderRadius();
      element.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.borderRadius = originalBorderRadius;
      element.style.transform = '';
    });
  }

  bindScrollEffects() {
    let ticking = false;
    
    const updateLiquifyOnScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / maxScroll;
      
      // Morph elements based on scroll position
      const morphElements = document.querySelectorAll('.blob-morph');
      morphElements.forEach((element, index) => {
        const offset = (index + 1) * 0.1;
        const progress = Math.sin((scrollProgress + offset) * Math.PI * 2);
        const scale = 1 + progress * 0.05;
        const rotation = progress * 5;
        
        element.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      });
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateLiquifyOnScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Utility method to create custom morphing animations
  createMorphKeyframes(name, morphPoints) {
    const keyframes = morphPoints.map((point, index) => {
      const percentage = (index / (morphPoints.length - 1)) * 100;
      return `${percentage}% { border-radius: ${point}; }`;
    }).join(' ');
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${name} {
        ${keyframes}
      }
    `;
    
    document.head.appendChild(style);
  }
}

// CSS Animations for liquify effects
const liquifyCSS = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  @keyframes floatBlob {
    0%, 100% {
      transform: translateY(0px) translateX(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-20px) translateX(10px) rotate(90deg);
    }
    50% {
      transform: translateY(0px) translateX(-10px) rotate(180deg);
    }
    75% {
      transform: translateY(10px) translateX(5px) rotate(270deg);
    }
  }
  
  @keyframes morphBorderRadius {
    0%, 100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    25% {
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    }
  }
  
  .blob-container {
    mix-blend-mode: multiply;
  }
  
  [data-theme="dark"] .blob-container {
    mix-blend-mode: screen;
  }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = liquifyCSS;
document.head.appendChild(style);

// Initialize liquify effects
const liquifyEffects = new LiquifyEffects();

// Export for external usage
window.LiquifyEffects = LiquifyEffects;
window.liquifyEffects = liquifyEffects;