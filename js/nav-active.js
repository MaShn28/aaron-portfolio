/**
 * nav-active.js
 * 
 * Handles navigation highlighting for active page and mobile menu toggling.
 * Automatically marks the current page link as active in the navigation.
 * Provides smooth responsive mobile menu functionality.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('nav a');
  
  // Get current page path
  const currentPath = window.location.pathname;
  
  // Extract page name from path (e.g., /about.html -> about.html)
  const pageName = currentPath.split('/').pop();
  
  // Function to determine if a link should be active
  function shouldBeActive(link) {
    const linkPath = link.getAttribute('href');
    
    // For home page/index
    if (pageName === '' || pageName === 'index.html') {
      return linkPath === 'index.html' || linkPath === './';
    }
    
    // For other pages
    return linkPath.includes(pageName);
  }
  
  // Set active class on the appropriate link
  navLinks.forEach(link => {
    if (shouldBeActive(link)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Mobile menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;
  
  if (menuToggle && nav) {
    // Toggle menu when clicked
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      body.classList.toggle('menu-open'); // Optional: prevent scrolling when menu is open
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) { // Only on mobile
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          body.classList.remove('menu-open');
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }
});
