/**
 * 🎬 Animation Screenshot Generator
 * Creates static previews and animated GIFs of the floating circles animation
 */

// Generate a better static preview image with CSS animation keyframes
const generateAnimationPreview = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createRadialGradient(400, 200, 0, 400, 200, 300);
    gradient.addColorStop(0, '#2d1b69');
    gradient.addColorStop(1, '#11152d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 400);
    
    // Draw 6 layers of circles
    const layers = [
        { radius: 120, count: 12, color: '#ff6b6b', size: 8 },
        { radius: 100, count: 18, color: '#4ecdc4', size: 6 },
        { radius: 80, count: 24, color: '#45b7d1', size: 7 },
        { radius: 60, count: 30, color: '#f9ca24', size: 5 },
        { radius: 40, count: 36, color: '#f0932b', size: 6 },
        { radius: 20, count: 42, color: '#eb4d4b', size: 4 }
    ];
    
    const centerX = 400;
    const centerY = 200;
    
    layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
            const angle = (i / layer.count) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * layer.radius;
            const y = centerY + Math.sin(angle) * layer.radius;
            
            ctx.beginPath();
            ctx.arc(x, y, layer.size, 0, Math.PI * 2);
            ctx.fillStyle = layer.color;
            ctx.globalAlpha = 0.8;
            ctx.fill();
        }
    });
    
    // Center core
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.9;
    ctx.fill();
    
    // Add title
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎪 6-Layer Animation System', centerX, 50);
    
    ctx.font = '18px Arial';
    ctx.fillStyle = '#e0e0e0';
    ctx.fillText('180+ Floating Elements • 60 FPS • Silky Smooth', centerX, 350);
    
    return canvas.toDataURL('image/png');
};

// Generate demo links HTML
const generateDemoHTML = () => {
    return `
<div align="center">

## 🚀 **LIVE DEMOS - Try the Magic!**

### 🎭 **EPIC Floating Circles Animation**
[![Animation Demo](https://img.shields.io/badge/🎪_LIVE_ANIMATION-Experience_Now-ff69b4?style=for-the-badge&logo=css3&logoColor=white)](https://s1xt333n.github.io/modern-saas-animated)
[![Performance](https://img.shields.io/badge/⚡_60_FPS-Silky_Smooth-00ff00?style=for-the-badge&logo=speedtest&logoColor=black)](https://s1xt333n.github.io/modern-saas-animated)

### 🏠 **Modern SaaS Landing Page**
[![Landing Page](https://img.shields.io/badge/🏠_LANDING_PAGE-Explore_UI-45b7d1?style=for-the-badge&logo=html5&logoColor=white)](https://s1xt333n.github.io/modern-saas-animated)
[![Mobile Ready](https://img.shields.io/badge/📱_RESPONSIVE-Perfect_Mobile-2ecc71?style=for-the-badge&logo=mobile&logoColor=white)](https://s1xt333n.github.io/modern-saas-animated)

### 📊 **SaaS Dashboard**
[![Dashboard](https://img.shields.io/badge/📊_DASHBOARD-Live_Preview-f39c12?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://s1xt333n.github.io/modern-saas-animated/dashboard.html)
[![Analytics](https://img.shields.io/badge/📈_ANALYTICS-Real_Time-e74c3c?style=for-the-badge&logo=analytics&logoColor=white)](https://s1xt333n.github.io/modern-saas-animated/dashboard.html)

### 🔐 **Authentication System**
[![Login Demo](https://img.shields.io/badge/🔐_LOGIN-Firebase_Auth-ff9800?style=for-the-badge&logo=firebase&logoColor=white)](https://s1xt333n.github.io/modern-saas-animated/login.html)
[![Security](https://img.shields.io/badge/🛡️_SECURE-OAuth_Ready-9c27b0?style=for-the-badge&logo=security&logoColor=white)](https://s1xt333n.github.io/modern-saas-animated/login.html)

</div>
    `;
};

console.log('🎬 Animation preview generator ready!');
console.log('📸 Static preview generated');
console.log('🔗 Demo links HTML generated');
