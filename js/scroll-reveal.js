/**
 * scroll-reveal.js
 * 
 * Uses IntersectionObserver to add .active class to elements with .reveal class
 * when they enter the viewport, creating a smooth scroll reveal animation effect.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the 'reveal' class
  const revealElements = document.querySelectorAll('.reveal');
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    // Create options for the observer
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.15 // Trigger when at least 15% of the element is visible
    };
    
    // Create the observer
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        // If the element is intersecting (visible)
        if (entry.isIntersecting) {
          // Add the 'active' class
          entry.target.classList.add('active');
          
          // Stop observing the element after it's been revealed
          // Comment this line if you want elements to hide again when scrolled out of view
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Start observing each element
    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    // Simply show all elements
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }
});
