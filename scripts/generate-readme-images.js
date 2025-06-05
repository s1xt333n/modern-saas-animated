/**
 * 🎨 Modern SaaS Animated - README Image Generator
 * Generates beautiful SVG images for the README.md
 */

const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../assets/images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// 🚀 Main Banner SVG
const bannerSVG = `<svg width="1200" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="300" fill="url(#bg)"/>
    
    <!-- Floating circles animation -->
    <circle cx="150" cy="100" r="20" fill="#ffffff" opacity="0.1">
        <animateTransform attributeName="transform" type="rotate" values="0 150 100;360 150 100" dur="20s" repeatCount="indefinite"/>
    </circle>
    <circle cx="300" cy="200" r="15" fill="#ffffff" opacity="0.15">
        <animateTransform attributeName="transform" type="rotate" values="360 300 200;0 300 200" dur="15s" repeatCount="indefinite"/>
    </circle>
    <circle cx="900" cy="80" r="25" fill="#ffffff" opacity="0.08">
        <animateTransform attributeName="transform" type="rotate" values="0 900 80;360 900 80" dur="25s" repeatCount="indefinite"/>
    </circle>
    <circle cx="1050" cy="220" r="18" fill="#ffffff" opacity="0.12">
        <animateTransform attributeName="transform" type="rotate" values="360 1050 220;0 1050 220" dur="18s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Main Title -->
    <text x="600" y="140" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="48" font-weight="bold" filter="url(#glow)">
        🎭 Modern SaaS Animated
    </text>
    
    <!-- Subtitle -->
    <text x="600" y="180" text-anchor="middle" fill="#e0e0e0" font-family="Arial, sans-serif" font-size="24">
        EPIC 6-Layer Floating Circles Animation
    </text>
    
    <!-- Feature highlights -->
    <text x="600" y="220" text-anchor="middle" fill="#ffeb3b" font-family="Arial, sans-serif" font-size="18" font-weight="bold">
        🚀 180+ Rotating Portraits • 60 FPS • Production Ready
    </text>
</svg>`;

// 🎯 Animation Preview SVG
const animationPreviewSVG = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="bgRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#2d1b69;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#11152d;stop-opacity:1" />
        </radialGradient>
        <filter id="blur">
            <feGaussianBlur stdDeviation="2"/>
        </filter>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="400" fill="url(#bgRadial)"/>
    
    <!-- Layer 1 - Outermost -->
    <g transform="translate(400,200)">
        <circle cx="0" cy="-120" r="8" fill="#ff6b6b" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite"/>
        </circle>
        <circle cx="104" cy="-60" r="6" fill="#4ecdc4" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite"/>
        </circle>
        <circle cx="104" cy="60" r="7" fill="#45b7d1" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="120" r="8" fill="#f9ca24" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite"/>
        </circle>
        <circle cx="-104" cy="60" r="6" fill="#f0932b" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite"/>
        </circle>
        <circle cx="-104" cy="-60" r="7" fill="#eb4d4b" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite"/>
        </circle>
    </g>
    
    <!-- Layer 2 -->
    <g transform="translate(400,200)">
        <circle cx="0" cy="-90" r="10" fill="#6c5ce7" opacity="0.9">
            <animateTransform attributeName="transform" type="rotate" values="360;0" dur="25s" repeatCount="indefinite"/>
        </circle>
        <circle cx="78" cy="-45" r="8" fill="#fd79a8" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="360;0" dur="25s" repeatCount="indefinite"/>
        </circle>
        <circle cx="78" cy="45" r="9" fill="#fdcb6e" opacity="0.9">
            <animateTransform attributeName="transform" type="rotate" values="360;0" dur="25s" repeatCount="indefinite"/>
        </circle>
    </g>
    
    <!-- Center core -->
    <circle cx="400" cy="200" r="25" fill="#ffffff" opacity="0.9" filter="url(#blur)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
    </circle>
    
    <!-- Title -->
    <text x="400" y="50" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="32" font-weight="bold">
        🎪 6-Layer Animation System
    </text>
    
    <!-- Stats -->
    <text x="400" y="350" text-anchor="middle" fill="#e0e0e0" font-family="Arial, sans-serif" font-size="18">
        180+ Floating Elements • 60 FPS • Silky Smooth
    </text>
</svg>`;

// 📊 Features Overview SVG
const featuresOverviewSVG = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="featureBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e3c72;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2a5298;stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="600" fill="url(#featureBg)"/>
    
    <!-- Title -->
    <text x="400" y="50" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
        🏆 Template Features
    </text>
    
    <!-- Feature boxes -->
    <!-- Animation Feature -->
    <rect x="50" y="100" width="200" height="150" rx="15" fill="rgba(255,255,255,0.1)" stroke="#4ecdc4" stroke-width="2"/>
    <text x="150" y="130" text-anchor="middle" fill="#4ecdc4" font-family="Arial, sans-serif" font-size="20" font-weight="bold">🎭 Animation</text>
    <text x="150" y="155" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">6-Layer System</text>
    <text x="150" y="175" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">180+ Elements</text>
    <text x="150" y="195" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">60 FPS Smooth</text>
    <text x="150" y="215" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Mobile Ready</text>
    
    <!-- UI/UX Feature -->
    <rect x="300" y="100" width="200" height="150" rx="15" fill="rgba(255,255,255,0.1)" stroke="#ff6b6b" stroke-width="2"/>
    <text x="400" y="130" text-anchor="middle" fill="#ff6b6b" font-family="Arial, sans-serif" font-size="20" font-weight="bold">🎨 Modern UI</text>
    <text x="400" y="155" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">SaaS Design</text>
    <text x="400" y="175" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Responsive</text>
    <text x="400" y="195" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Dark/Light Mode</text>
    <text x="400" y="215" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Accessible</text>
    
    <!-- Backend Feature -->
    <rect x="550" y="100" width="200" height="150" rx="15" fill="rgba(255,255,255,0.1)" stroke="#f9ca24" stroke-width="2"/>
    <text x="650" y="130" text-anchor="middle" fill="#f9ca24" font-family="Arial, sans-serif" font-size="20" font-weight="bold">🔒 Firebase</text>
    <text x="650" y="155" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Authentication</text>
    <text x="650" y="175" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Real-time DB</text>
    <text x="650" y="195" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Cloud Functions</text>
    <text x="650" y="215" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Analytics</text>
    
    <!-- Performance Feature -->
    <rect x="175" y="300" width="200" height="150" rx="15" fill="rgba(255,255,255,0.1)" stroke="#45b7d1" stroke-width="2"/>
    <text x="275" y="330" text-anchor="middle" fill="#45b7d1" font-family="Arial, sans-serif" font-size="20" font-weight="bold">⚡ Performance</text>
    <text x="275" y="355" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Optimized Code</text>
    <text x="275" y="375" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Lazy Loading</text>
    <text x="275" y="395" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Fast Deploy</text>
    <text x="275" y="415" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">SEO Ready</text>
    
    <!-- Developer Experience -->
    <rect x="425" y="300" width="200" height="150" rx="15" fill="rgba(255,255,255,0.1)" stroke="#6c5ce7" stroke-width="2"/>
    <text x="525" y="330" text-anchor="middle" fill="#6c5ce7" font-family="Arial, sans-serif" font-size="20" font-weight="bold">🛠️ Dev Tools</text>
    <text x="525" y="355" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Easy Setup</text>
    <text x="525" y="375" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Documentation</text>
    <text x="525" y="395" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">Hot Reload</text>
    <text x="525" y="415" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="14">TypeScript</text>
    
    <!-- Bottom message -->
    <text x="400" y="550" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        🚀 Everything you need for your next SaaS project!
    </text>
</svg>`;

// Write SVG files
fs.writeFileSync(path.join(imagesDir, 'banner.svg'), bannerSVG);
fs.writeFileSync(path.join(imagesDir, 'animation-preview.svg'), animationPreviewSVG);
fs.writeFileSync(path.join(imagesDir, 'features-overview.svg'), featuresOverviewSVG);

console.log('✅ README images generated successfully!');
console.log('📁 Files created:');
console.log('   - assets/images/banner.svg');
console.log('   - assets/images/animation-preview.svg');
console.log('   - assets/images/features-overview.svg');
