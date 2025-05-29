/**
 * card-tilt.js
 * 
 * Implements the "Card tilt on hover" micro-interaction
 * Applies a 3D tilt effect to cards when hovered, creating a dynamic
 * and interactive experience consistent with Bold Brutalist design.
 */

class CardTilt {
  constructor(selector = '.card', options = {}) {
    // Default options
    this.options = {
      maxTilt: 10,           // Maximum tilt rotation in degrees
      perspective: 1000,     // Perspective value for 3D space
      scale: 1.05,           // Scale on hover
      speed: 300,            // Speed of the transition
      easing: 'cubic-bezier(.03,.98,.52,.99)',  // Easing for the transition
      ...options
    };
    
    // Select all cards
    this.cards = document.querySelectorAll(selector);
    
    this.init();
  }
  
  init() {
    // Apply tilt effect to each card
    this.cards.forEach(card => {
      // Skip if already initialized
      if (card.classList.contains('tilt-initialized')) return;
      
      // Add flag to prevent re-initialization
      card.classList.add('tilt-initialized');
      
      // Set transition
      card.style.transition = `transform ${this.options.speed}ms ${this.options.easing}`;
      
      // Add event listeners
      card.addEventListener('mouseenter', e => this.onMouseEnter(e));
      card.addEventListener('mousemove', e => this.onMouseMove(e));
      card.addEventListener('mouseleave', e => this.onMouseLeave(e));
    });
  }
  
  onMouseEnter(event) {
    const card = event.currentTarget;
    
    // Set transform origin to center
    card.style.transformOrigin = 'center center';
    
    // Apply perspective to container
    card.style.perspective = `${this.options.perspective}px`;
    
    // Add scale effect
    card.style.transform = `scale3d(${this.options.scale}, ${this.options.scale}, ${this.options.scale})`;
  }
  
  onMouseMove(event) {
    const card = event.currentTarget;
    const cardRect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const mouseX = event.clientX - cardRect.left;
    const mouseY = event.clientY - cardRect.top;
    
    // Calculate position in percentage
    const percentX = mouseX / cardRect.width;
    const percentY = mouseY / cardRect.height;
    
    // Calculate tilt rotation
    const tiltX = (this.options.maxTilt / 2 - percentY * this.options.maxTilt).toFixed(2);
    const tiltY = (percentX * this.options.maxTilt - this.options.maxTilt / 2).toFixed(2);
    
    // Apply transform
    card.style.transform = `scale3d(${this.options.scale}, ${this.options.scale}, ${this.options.scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }
  
  onMouseLeave(event) {
    const card = event.currentTarget;
    
    // Reset transform
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
  
  // Method to refresh cards (useful when adding new cards dynamically)
  refresh() {
    this.init();
  }
  
  // Method to destroy and clean up
  destroy() {
    this.cards.forEach(card => {
      card.removeEventListener('mouseenter', this.onMouseEnter);
      card.removeEventListener('mousemove', this.onMouseMove);
      card.removeEventListener('mouseleave', this.onMouseLeave);
      card.classList.remove('tilt-initialized');
      card.style.transform = '';
      card.style.transition = '';
    });
  }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get tilt amount from CSS variable
  const tiltAmountStr = getComputedStyle(document.documentElement)
    .getPropertyValue('--card-tilt-amount')
    .trim();
  
  // Parse the value (remove 'deg' if present)
  const tiltAmount = parseFloat(tiltAmountStr.replace('deg', '')) || 10;
  
  // Initialize with the value from CSS
  const cardTilt = new CardTilt('.card', {
    maxTilt: tiltAmount
  });
  
  // Make available globally for potential reuse
  window.cardTilt = cardTilt;
});
