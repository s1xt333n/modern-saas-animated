/**
 * Modern Theme Toggle System
 * Handles dark/light mode switching with smooth animations and localStorage persistence
 */

class ThemeToggle {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    // Apply theme immediately to prevent flash
    this.applyTheme(this.currentTheme);
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.createToggleButton();
    this.bindEvents();
    this.updateToggleState();
  }

  createToggleButton() {
    // Check if toggle already exists
    if (document.querySelector('.theme-toggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.setAttribute('title', 'Switch between light and dark themes');
    
    // Add to navigation
    const nav = document.querySelector('nav .flex.items-center.gap-4');
    if (nav) {
      nav.insertBefore(toggle, nav.firstChild);
    }
  }

  bindEvents() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
    this.updateToggleState();
    this.announceThemeChange(newTheme);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    
    // Add a smooth transition class
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
    
    // Remove transition after it's complete to avoid affecting other animations
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.content = theme === 'dark' ? '#1e293b' : '#ffffff';
  }

  updateToggleState() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      if (this.currentTheme === 'dark') {
        toggle.classList.add('active');
        toggle.setAttribute('aria-label', 'Switch to light theme');
        toggle.setAttribute('title', 'Switch to light theme');
      } else {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-label', 'Switch to dark theme');
        toggle.setAttribute('title', 'Switch to dark theme');
      }
    }
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      console.warn('localStorage not available, using system theme');
      return null;
    }
  }

  storeTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Could not save theme preference');
    }
  }

  announceThemeChange(theme) {
    // Announce theme change for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${theme} theme`;
    
    document.body.appendChild(announcement);
    
    // Remove announcement after screen readers have processed it
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);

    // Optional: Show a subtle notification
    if (window.showNotification) {
      window.showNotification(
        `${theme.charAt(0).toUpperCase() + theme.slice(1)} theme activated`,
        'Theme switched successfully',
        false
      );
    }
  }
}

// Initialize theme toggle
const themeToggle = new ThemeToggle();

// Export for potential external usage
window.ThemeToggle = ThemeToggle;
window.themeToggle = themeToggle;