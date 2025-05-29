# Modern Portfolio Website

A bold, brutalist portfolio website with gradient glow aesthetics, built with pure HTML, CSS, and vanilla JavaScript. This project is designed to showcase your skills, projects, and experience in a visually striking way.

![Portfolio Preview](assets/images/portfolio-preview.webp)

## Features

- **Bold Brutalist Design**: Sharp edges, bold contrasts, and strong visual hierarchy
- **Gradient Glow Color Scheme**: Vibrant gradient effects that catch the eye
- **Liquid Blob Canvas Hero**: Interactive canvas animation for the hero section
- **Card Tilt on Hover**: Dynamic micro-interaction that adds depth and engagement
- **Responsive Layout**: Fully mobile-friendly design that works on all devices
- **Scroll Reveal Animations**: Elements fade in as you scroll down the page
- **Accessibility Focused**: Semantic HTML, keyboard navigation, and proper contrast
- **Performance Optimized**: Fast loading with minimal dependencies
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Pages

1. **Home**: Main landing page with hero section and featured content
2. **About**: Personal information, background, and family context
3. **Skills**: Technical abilities, proficiency levels, and certifications
4. **Projects**: Portfolio of work with descriptions, screenshots, and links
5. **Resume**: Professional experience and downloadable PDF resume
6. **Contact**: Validated contact form and social media links

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Inter + Playfair Display)

## Local Development

To run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   ```

2. Start a local development server:
   
   Using NPX (recommended):
   ```
   npx live-server
   ```
   
   Or any other local server of your choice.

3. View the site at: http://localhost:8080

## Customization

### Personal Information

1. Replace "YOUR NAME" throughout the HTML files with your actual name
2. Update contact information (email, phone, location)
3. Add your social media links and profile pictures
4. Edit the bio and personal information sections

### Projects

1. Replace placeholder project images in `assets/images/`
2. Update project descriptions, titles, and links
3. Add or remove project cards as needed

### Resume

1. Update the resume information in `resume.html`
2. Replace `assets/resume.pdf` with your actual resume PDF

## Deployment to GitHub Pages

1. Create a GitHub repository named `my-portfolio`

2. Initialize Git in your local project folder (if not already done):
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Add your GitHub repository as remote and push:
   ```
   git remote add origin https://github.com/yourusername/my-portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. Go to your GitHub repository settings, scroll down to "GitHub Pages" section
   - Source: select "main" branch
   - Folder: select "/ (root)"
   - Click Save

5. Your site will be published at `https://yourusername.github.io/my-portfolio/`

The site automatically handles GitHub Pages path issues using the `base-path.js` script, which dynamically injects the correct base URL.

## Browser Compatibility

Tested and working in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: SVG icons from various open-source collections
- Form validation: Custom JavaScript

## License

This project is open source and available under the [MIT License](LICENSE).

---

Created with ❤️ by [Your Name]
