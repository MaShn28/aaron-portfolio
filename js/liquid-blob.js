/**
 * liquid-blob.js
 * 
 * Creates an animated liquid blob canvas effect for the hero section
 * Implements the "Liquid blob canvas" hero flair option
 */

class LiquidBlob {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.points = [];
    this.numPoints = 8;
    this.centerX = 0;
    this.centerY = 0;
    this.radius = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.animationFrame = null;
    
    // Gradient colors from CSS variables
    this.colorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
    this.colorSecondary = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim();
    this.colorAccent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    
    this.init();
  }
  
  init() {
    // Set canvas to full window size
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Track mouse movement for interactivity
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    // Initialize points around a circle
    this.initPoints();
    
    // Start animation
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.canvas.closest('.hero') ? 
                        this.canvas.closest('.hero').offsetHeight : 
                        window.innerHeight;
    
    // Recalculate center and radius
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = Math.min(this.canvas.width, this.canvas.height) * 0.25;
    
    // Reinitialize points after resize
    if (this.points.length > 0) {
      this.initPoints();
    }
  }
  
  initPoints() {
    this.points = [];
    
    for (let i = 0; i < this.numPoints; i++) {
      const angle = (i / this.numPoints) * Math.PI * 2;
      // Add some randomness to initial position
      const randRadius = this.radius * (0.9 + Math.random() * 0.2);
      
      this.points.push({
        x: this.centerX + Math.cos(angle) * randRadius,
        y: this.centerY + Math.sin(angle) * randRadius,
        angle: angle,
        speed: 0.01 + Math.random() * 0.02,
        amplitude: 15 + Math.random() * 30,
        originalRadius: randRadius
      });
    }
  }
  
  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Calculate mouse influence
    const mouseDistX = this.mouseX - this.centerX;
    const mouseDistY = this.mouseY - this.centerY;
    const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
    const mouseInfluence = Math.min(mouseDist / (this.canvas.width / 2), 1);
    
    // Update point positions
    this.points.forEach((point, i) => {
      // Oscillate points with time
      const time = Date.now() * 0.001;
      point.angle += point.speed;
      
      // Apply mouse influence - points move slightly toward mouse
      if (mouseDist > 0) {
        const mouseAngle = Math.atan2(mouseDistY, mouseDistX);
        const angleDiff = mouseAngle - point.angle;
        point.angle += angleDiff * 0.02 * mouseInfluence;
      }
      
      // Calculate new position
      const noiseFactor = Math.sin(time * point.speed * 2) * point.amplitude;
      const currentRadius = point.originalRadius + noiseFactor;
      
      point.x = this.centerX + Math.cos(point.angle) * currentRadius;
      point.y = this.centerY + Math.sin(point.angle) * currentRadius;
    });
    
    // Draw the blob
    this.drawBlob();
    
    // Continue animation
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
  
  drawBlob() {
    // Create gradient
    const gradient = this.ctx.createLinearGradient(
      this.centerX - this.radius, 
      this.centerY - this.radius, 
      this.centerX + this.radius, 
      this.centerY + this.radius
    );
    
    gradient.addColorStop(0, this.colorPrimary);
    gradient.addColorStop(0.5, this.colorSecondary);
    gradient.addColorStop(1, this.colorAccent);
    
    // Begin drawing path
    this.ctx.beginPath();
    
    // Move to first point
    const firstPoint = this.points[0];
    this.ctx.moveTo(firstPoint.x, firstPoint.y);
    
    // Create smooth curve through all points
    for (let i = 0; i < this.points.length; i++) {
      const currentPoint = this.points[i];
      const nextPoint = this.points[(i + 1) % this.points.length];
      
      // Calculate control points for curve
      const controlX = (currentPoint.x + nextPoint.x) / 2;
      const controlY = (currentPoint.y + nextPoint.y) / 2;
      
      // Draw curve to next point
      this.ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, controlX, controlY);
    }
    
    // Close the path
    this.ctx.closePath();
    
    // Fill with gradient
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
  
  // Clean up resources when no longer needed
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  const liquidBlob = new LiquidBlob('hero-canvas');
});
