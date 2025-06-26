# Modern SaaS Animated - Theme System & Liquify Effects

## 🎨 Theme System

### Features
- **Automatic dark/light mode detection** based on system preferences
- **Manual toggle** with persistent storage in localStorage
- **Smooth transitions** between themes (0.3s minimum)
- **Accessibility support** with high contrast and reduced motion options
- **Keyboard shortcut**: `Ctrl/Cmd + Shift + T` for quick toggle

### CSS Variables
The theme system uses CSS custom properties for consistent theming:

```css
/* Light Mode (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #64748b;
  --color-accent: #000000;
  --color-accent-text: #ffffff;
}

/* Dark Mode */
[data-theme="dark"] {
  --bg-primary: #1e293b;
  --bg-secondary: #334155;
  --bg-tertiary: #475569;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --color-accent: #ffffff;
  --color-accent-text: #000000;
}
```

### Usage
The theme toggle is automatically initialized and creates a toggle button in the navigation. You can also control it programmatically:

```javascript
// Toggle theme
window.themeToggle.toggleTheme();

// Apply specific theme
window.themeToggle.applyTheme('dark');
window.themeToggle.applyTheme('light');

// Get current theme
const currentTheme = window.themeToggle.currentTheme;
```

## ✨ Liquify Effects

### Features
- **Dynamic border-radius** morphing on hover
- **Blob animations** with infinite morphing
- **Ripple effects** on button clicks
- **Scroll-responsive** animations
- **3D transformations** with perspective
- **GPU-accelerated** animations for smooth performance

### Available Classes

#### `.liquify-hover`
Adds subtle morphing effects on hover:
```html
<div class="liquify-hover">Morphs on hover</div>
```

#### `.blob-morph`
Continuous morphing animation:
```html
<div class="blob-morph">Always morphing</div>
```

#### `.cta-btn-liquify`
Enhanced button with liquify effects:
```html
<button class="cta-btn-liquify">Liquid Button</button>
```

#### `.glass-card`
Glassmorphism card with liquify hover:
```html
<div class="glass-card">Glass morphism card</div>
```

### CSS Variables for Liquify
```css
:root {
  --liquify-hover-scale: 1.05;
  --liquify-border-radius: 20px;
  --liquify-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --transition-elastic: all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
```

## 🎛️ Customization

### Adding New Theme Colors
Add new CSS variables to both light and dark mode:
```css
:root {
  --my-custom-color: #ff6b6b;
}

[data-theme="dark"] {
  --my-custom-color: #ff8e8e;
}
```

### Creating Custom Liquify Effects
Use the base liquify classes and extend:
```css
.my-liquify-element {
  transition: var(--liquify-transition);
  border-radius: var(--liquify-border-radius);
}

.my-liquify-element:hover {
  transform: scale(var(--liquify-hover-scale)) rotate(5deg);
  border-radius: calc(var(--liquify-border-radius) * 1.5);
}
```

## ♿ Accessibility

### Automatic Adaptations
- **`prefers-color-scheme`**: Auto-detects system theme preference
- **`prefers-reduced-motion`**: Disables animations for users who prefer reduced motion
- **`prefers-contrast: high`**: Increases contrast for better visibility
- **Focus states**: All interactive elements have visible focus indicators
- **Screen reader support**: Theme changes are announced to screen readers

### Testing Accessibility
Visit `/theme-test.html` to test all theme and liquify features.

## 📱 Responsive Design

All theme and liquify effects are fully responsive and work across all device sizes. The system automatically adapts:
- Touch-friendly interactions on mobile
- Reduced animation complexity on smaller screens
- Optimized performance for low-power devices

## 🚀 Performance

### Optimizations
- **GPU acceleration** with `transform` and `will-change`
- **Efficient animations** using `requestAnimationFrame`
- **Minimal reflow/repaint** with transform-based animations
- **Lazy loading** of non-critical animations
- **Reduced motion** support for better performance

### Browser Support
- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Progressive enhancement approach

## 🔧 Development

### Files Structure
```
css/
  └── styles.css          # Main styles with theme variables
js/
  ├── theme-toggle.js     # Theme switching logic
  └── liquify-effects.js  # Liquify animations system
theme-test.html           # Testing page for all features
```

### Adding New Components
1. Use CSS variables for all colors
2. Add `liquify-hover` class for interactive elements
3. Use `glass-card` for card-style components
4. Test in both light and dark modes

This system provides a modern, accessible, and performant theming solution with beautiful liquify effects that enhance the user experience without compromising functionality.