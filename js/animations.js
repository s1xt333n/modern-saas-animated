document.addEventListener('DOMContentLoaded', function() {
  // Reset animations when the page is loaded
  const title = document.querySelector('.line-1');
  const subtitle = document.querySelector('.line-2');
  const button = document.querySelector('.button-container');
  
  // Force reflow/repaint to ensure animations work on page load
  void title.offsetWidth;
  
  // Add animation classes
  title.style.animation = 'typewriter 2s steps(40, end) 0.5s 1 normal both, blink-caret 0.75s step-end 8';
  subtitle.style.animation = 'typewriter 2s steps(40, end) 1.5s 1 normal both, blink-caret 0.75s step-end 6';
  button.style.animation = 'fadeIn 0.8s ease-out 2.5s forwards';
});
