/**
 * base-path.js
 * 
 * This script dynamically injects a <base> tag to ensure all relative links work properly,
 * regardless of whether the site is served locally or from GitHub Pages.
 * 
 * For GitHub Pages deployment at https://username.github.io/my-portfolio/
 */

(function() {
  // Create the base element
  const base = document.createElement('base');
  
  // Set the href attribute to handle GitHub Pages path structure
  // If the URL ends with a file (e.g., /index.html), replace that file with empty string
  // Otherwise, keep the pathname as is
  base.href = location.pathname.match(/\/[^\/]*$/) 
    ? location.pathname.replace(/[^\/]*$/, '') 
    : location.pathname;
  
  // Insert at the beginning of the head
  document.head.prepend(base);
  
  console.log('Base path set to:', base.href);
})();
