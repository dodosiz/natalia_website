# Architecture Portfolio Website - Minimal Black & White

A minimal, black and white architecture portfolio website featuring clean design with rectangular elements.

## ✨ Features

### Simplified Structure

The website now contains only **4 essential sections**:

1. **Home** - Hero slider with black/white imagery
2. **About** - Biography and skills
3. **Portfolio** - Project showcase with filtering
4. **Contact** - Contact form and information

### 🎨 Design Philosophy

- **Minimal Black & White** - Pure monochrome color scheme
- **Rectangular Buttons** - Sharp, modern edges (no rounded corners)
- **Clean Typography** - Montserrat & Playfair Display
- **No Shadows** - Flat, minimal design
- **Border Focus** - Black borders define elements

## Color Scheme

```css
Primary Black: #000000
Pure White: #ffffff
Text Gray: #666666
Background: #f5f5f5
```

## Button Design

All buttons follow rectangular minimal design:

- **No border-radius** (0px)
- **2px solid black borders**
- **Black background with white text** (primary)
- **White background with black text** (hover)
- **Uppercase text** with letter-spacing

## Technologies

- HTML5
- CSS3 (Minimal, flat design)
- JavaScript ES6+
- Google Fonts

## File Structure

```
website-arch/
├── index.html       # 4 sections only
├── styles.css       # Black & white theme
├── script.js        # Core functionality
└── README.md        # This file
```

## Customization

### Update Colors

Edit in `styles.css`:

```css
:root {
  --primary-color: #000000;
  --secondary-color: #000000;
  --text-dark: #000000;
  --text-light: #666666;
  --bg-light: #f5f5f5;
}
```

### Add Portfolio Items

In `index.html`, add to `.portfolio-grid`:

```html
<div class="portfolio-item" data-category="architecture">
  <!-- Your project -->
</div>
```

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Fully responsive for mobile/tablet

---

**Minimal Design. Maximum Impact.**
