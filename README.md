# Travel Website Clone - README

## 📋 Project Overview

This is a pixel-perfect single-page clone of a premium travel website, built with HTML5, Bootstrap 5, CSS3, and Vanilla JavaScript. The site features a modern, responsive design with smooth animations, interactive elements, and optimized performance.

**Live Demo:** Simply open `index.html` in any modern web browser.

---

## 🎨 Design Tokens

### Color Palette

```css
--color-primary-yellow: #F4D03F    /* Primary accent, buttons, highlights */
--color-dark-bg: #1a1a1a           /* Footer, dark sections */
--color-dark-bg-alt: #2a2a2a       /* Explore section background */
--color-white: #ffffff             /* Text on dark backgrounds */
--color-text-dark: #333333         /* Primary text color */
--color-text-muted: #666666        /* Secondary text */
--color-text-light: #999999        /* Tertiary text */
--color-green-accent: #4CAF50      /* Login button */
--color-overlay: rgba(0,0,0,0.5)   /* Hero overlay */
```

### Typography

| Font Family | Usage | Source |
|------------|-------|--------|
| **Kristi** | Pre-headings ("Wildlify", "Jeddah") | Google Fonts |
| **Playfair Display** | Main headings, section titles | Google Fonts |
| **Mona Sans** | Body text, navigation, UI elements | CDN Fonts |

**Fallback Stack:** Mona Sans → Inter → System UI → Sans-serif

### Spacing Scale

- `--spacing-xs`: 0.5rem (8px)
- `--spacing-sm`: 1rem (16px)
- `--spacing-md`: 2rem (32px)
- `--spacing-lg`: 4rem (64px)
- `--spacing-xl`: 6rem (96px)

---

## 📁 Project Structure

```
travel-website-clone/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles with design tokens
├── js/
│   └── scripts.js         # Interactive functionality
├── assets/
│   ├── img/
│   │   ├── hero-waterfall.jpg      # Hero background (AI-generated)
│   │   ├── cave-tunnel.jpg         # Explore section (AI-generated)
│   │   ├── video-thumbnail.jpg     # Video section (AI-generated)
│   │   ├── logo-edgeworld.png      # Partner logo (AI-generated)
│   │   ├── logo-camping.png        # Partner logo (AI-generated)
│   │   ├── logo-outdoors.png       # Partner logo (AI-generated)
│   │   ├── logo-alpina.png         # Partner logo (AI-generated)
│   │   └── logo-wildlife.png       # Partner logo (SVG placeholder)
│   └── fonts/
│       └── (empty - using CDN fonts)
└── README.md              # This file
```

---

## 🚀 How to Run Locally

**No build step required!** This project runs directly in the browser.

1. **Download/Clone** the project folder
2. **Open** `index.html` in any modern web browser:
   - Double-click the file, or
   - Right-click → Open with → Your browser, or
   - Use a local server (optional):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (http-server)
     npx http-server
     ```
3. **View** at `http://localhost:8000` (if using local server)

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🖼️ Assets & Sources

### Generated Images

All images were AI-generated to match the reference design:

| Asset | Filename | Dimensions | Description |
|-------|----------|------------|-------------|
| Hero Background | `hero-waterfall.jpg` | ~1920x1080 | Waterfall scene with people on rocks |
| Cave Tunnel | `cave-tunnel.jpg` | ~1200x800 | Warm-lit sandstone cave |
| Video Thumbnail | `video-thumbnail.jpg` | ~1200x800 | Group of people outdoors |
| Edgeworld Logo | `logo-edgeworld.png` | 200x100 | Vintage outdoor brand logo |
| Camping Logo | `logo-camping.png` | 200x100 | Script-style camping logo |
| Outdoors Logo | `logo-outdoors.png` | 200x100 | Mountain adventure logo |
| Life Alpina Logo | `logo-alpina.png` | 200x100 | Alpine outdoor logo |
| Wildlife Logo | `logo-wildlife.png` | 200x100 | **SVG placeholder** (quota limit) |

### Font Licenses

- **Kristi**: Open Font License (Google Fonts)
- **Playfair Display**: Open Font License (Google Fonts)
- **Mona Sans**: SIL Open Font License (GitHub/CDN Fonts)

---

## ✨ Features Implemented

### Navigation
- ✅ Sticky navbar with scroll effect
- ✅ Transparent → solid background on scroll
- ✅ Active link highlighting based on scroll position
- ✅ Responsive mobile menu (hamburger)
- ✅ Shopping cart badge indicator

### Sections
- ✅ Hero section with full-width background image
- ✅ 4 feature cards with hover effects
- ✅ "You Explore World" dark section with image
- ✅ "Humble Beginnings" video section with play button
- ✅ Partner logos with grayscale hover effect
- ✅ Footer with 3 columns and social icons

### Interactive Elements
- ✅ Smooth scrolling to anchor links
- ✅ Video modal (Bootstrap modal)
- ✅ Scroll-to-top floating button
- ✅ Hover animations on cards and buttons
- ✅ Lazy loading for images
- ✅ Intersection Observer for logo animations

### Accessibility
- ✅ ARIA labels on interactive elements
- ✅ Alt text for all images
- ✅ Semantic HTML5 structure
- ✅ Keyboard navigation support
- ✅ Sufficient color contrast (WCAG AA)

### Performance
- ✅ Native lazy loading (`loading="lazy"`)
- ✅ Deferred JavaScript loading
- ✅ Minified Bootstrap CDN
- ✅ CSS custom properties for efficiency
- ✅ No external analytics/tracking

---

## 🧪 Test Plan

### Manual Testing Checklist

#### Desktop (1440px)
- [ ] Navigation menu displays horizontally
- [ ] Hero section is 600px height
- [ ] Feature cards display in 4 columns
- [ ] Explore section image is 600px height
- [ ] All text is readable and properly sized
- [ ] Hover effects work on buttons and cards

#### Tablet (768px)
- [ ] Navigation collapses to hamburger menu
- [ ] Feature cards display in 2 columns
- [ ] Explore section stacks vertically
- [ ] Video section stacks vertically
- [ ] Footer columns adjust appropriately

#### Mobile (375px)
- [ ] All content displays in single column
- [ ] Text is readable without zooming
- [ ] Buttons are touch-friendly (min 44px)
- [ ] Images scale properly
- [ ] No horizontal scrolling

#### Interactive Elements
- [ ] Click hamburger menu → opens/closes
- [ ] Click nav link → smooth scrolls to section
- [ ] Click video play button → opens modal
- [ ] Click scroll-to-top → scrolls to top
- [ ] Scroll down → navbar becomes solid
- [ ] Hover partner logo → color appears

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modal
- [ ] Focus indicators visible

---

## 🔍 Known Differences from Reference

1. **Wildlife Logo**: Due to image generation quota limits, this logo is a simple SVG placeholder. Can be replaced with a proper logo image.

2. **Video URL**: The modal uses a placeholder YouTube URL. Replace with actual video URL in `index.html` line 232.

3. **Lorem Ipsum Text**: All content uses placeholder text. Replace with actual copy as needed.

4. **Social Media Links**: All links point to `#` placeholders. Update with actual URLs.

---

## 📊 Performance Metrics

Expected Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

---

## 🛠️ Customization Guide

### Changing Colors

Edit CSS variables in `css/styles.css` (lines 1-20):

```css
:root {
    --color-primary-yellow: #YOUR_COLOR;
    --color-dark-bg: #YOUR_COLOR;
    /* etc. */
}
```

### Changing Fonts

1. Update Google Fonts link in `index.html` (line 17)
2. Update CSS variables in `css/styles.css`:
   ```css
   --font-script: 'YourFont', cursive;
   --font-serif: 'YourFont', serif;
   --font-sans: 'YourFont', sans-serif;
   ```

### Adding Sections

1. Add HTML in `index.html`
2. Add corresponding styles in `css/styles.css`
3. Update navigation links if needed

---

## 📝 Development Notes

### Bootstrap Customization

This project uses Bootstrap 5.3.2 for:
- Grid system (`.container`, `.row`, `.col-*`)
- Navbar component
- Modal component
- Utility classes (spacing, display, flex)

Custom styles override Bootstrap defaults where needed.

### JavaScript Architecture

All JavaScript is vanilla (no jQuery or frameworks):
- IIFE pattern for encapsulation
- Event delegation where appropriate
- Intersection Observer API for animations
- Native `scrollTo()` for smooth scrolling

---

## 🐛 Troubleshooting

**Issue**: Fonts not loading
- **Solution**: Check internet connection (fonts load from CDN)

**Issue**: Images not displaying
- **Solution**: Verify file paths are correct and images exist in `assets/img/`

**Issue**: Navbar not sticky
- **Solution**: Ensure Bootstrap CSS is loaded before custom CSS

**Issue**: Smooth scrolling not working
- **Solution**: Check that JavaScript file is loaded with `defer` attribute

---

## 📄 License

This project is for educational/demonstration purposes. 

- **Code**: Free to use and modify
- **Fonts**: See individual font licenses above
- **Images**: AI-generated, free to use

---

## 👨‍💻 Credits

**Built with:**
- HTML5
- Bootstrap 5.3.2
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Bootstrap Icons 1.11.1

**Fonts:**
- Kristi (Google Fonts)
- Playfair Display (Google Fonts)
- Mona Sans (CDN Fonts)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all files are in correct locations
3. Test in a different browser
4. Check browser console for errors (F12)

---

**Last Updated**: November 26, 2025  
**Version**: 1.0.0
