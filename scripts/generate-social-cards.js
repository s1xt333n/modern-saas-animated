const fs = require('fs').promises;
const path = require('path');

/**
 * 🎨 Social Media Card Generator for Modern SaaS Animated
 * Creates stunning social media assets highlighting the animation
 */

const SOCIAL_CARDS = {
  twitter: {
    width: 1200,
    height: 630,
    title: '🌟 EPIC Floating Circles Animation',
    subtitle: '6 Layers • 180+ Portraits • Mind-Blowing Experience',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  linkedin: {
    width: 1200,
    height: 627,
    title: 'Modern SaaS Animated: Revolutionary Animation Technology',
    subtitle: 'Showcasing cutting-edge web animation with mathematical precision',
    background: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)'
  },
  facebook: {
    width: 1200,
    height: 630,
    title: 'The Most Mesmerizing Web Animation Ever Created',
    subtitle: 'Experience the future of interactive design',
    background: 'linear-gradient(135deg, #4267b2 0%, #898f9c 100%)'
  }
};

async function generateSocialCards() {
  console.log('🎨 Generating social media cards...');
  
  // Create social media assets directory
  await fs.mkdir('assets/social', { recursive: true });
  
  // Generate HTML template for each card
  for (const [platform, config] of Object.entries(SOCIAL_CARDS)) {
    const cardHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: ${config.width}px;
      height: ${config.height}px;
      background: ${config.background};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .card-container {
      text-align: center;
      z-index: 2;
      padding: 40px;
    }
    
    .title {
      font-size: 48px;
      font-weight: 900;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      letter-spacing: -1px;
    }
    
    .subtitle {
      font-size: 24px;
      opacity: 0.9;
      font-weight: 400;
      margin-bottom: 30px;
    }
    
    .brand {
      font-size: 32px;
      font-weight: 700;
      color: #ffd700;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    
    .animation-preview {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      z-index: 1;
    }
    
    .floating-circles {
      position: absolute;
      width: 600px;
      height: 600px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .circle {
      position: absolute;
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      animation: rotate 10s linear infinite;
    }
    
    .circle:nth-child(1) { width: 100px; height: 100px; top: 250px; left: 250px; }
    .circle:nth-child(2) { width: 200px; height: 200px; top: 200px; left: 200px; animation-direction: reverse; }
    .circle:nth-child(3) { width: 300px; height: 300px; top: 150px; left: 150px; }
    .circle:nth-child(4) { width: 400px; height: 400px; top: 100px; left: 100px; animation-direction: reverse; }
    .circle:nth-child(5) { width: 500px; height: 500px; top: 50px; left: 50px; }
    .circle:nth-child(6) { width: 600px; height: 600px; top: 0px; left: 0px; animation-direction: reverse; }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .stats {
      display: flex;
      gap: 40px;
      margin-top: 20px;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-number {
      font-size: 28px;
      font-weight: 900;
      color: #ffd700;
    }
    
    .stat-label {
      font-size: 14px;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="animation-preview">
    <div class="floating-circles">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
  
  <div class="card-container">
    <div class="title">${config.title}</div>
    <div class="subtitle">${config.subtitle}</div>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-number">6</div>
        <div class="stat-label">Layers</div>
      </div>
      <div class="stat">
        <div class="stat-number">180+</div>
        <div class="stat-label">Portraits</div>
      </div>
      <div class="stat">
        <div class="stat-number">60</div>
        <div class="stat-label">FPS</div>
      </div>
    </div>
    
    <div class="brand">LeadGenius</div>
  </div>
</body>
</html>
    `;
    
    await fs.writeFile(`assets/social/${platform}-card.html`, cardHtml);
    console.log(`✅ Generated ${platform} social card`);
  }
  
  // Generate Open Graph meta tags
  const ogTags = `
<!-- LeadGenius Open Graph Meta Tags -->
<meta property="og:title" content="🎯 LeadGenius - Epic Floating Circles Animation">
<meta property="og:description" content="The most mesmerizing 6-layer rotating animation with 180+ floating portraits. Experience the future of web design!">
<meta property="og:image" content="https://your-domain.com/assets/social/twitter-card.png">
<meta property="og:url" content="https://your-domain.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="LeadGenius">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="🌟 EPIC Floating Circles Animation - LeadGenius">
<meta name="twitter:description" content="Mind-blowing 6-layer rotating animation with 180+ portraits! 🔥">
<meta name="twitter:image" content="https://your-domain.com/assets/social/twitter-card.png">
<meta name="twitter:creator" content="@leadgenius">

<!-- LinkedIn Meta Tags -->
<meta property="linkedin:title" content="LeadGenius: Revolutionary Animation Technology">
<meta property="linkedin:description" content="Showcasing cutting-edge web animation with mathematical precision and hypnotic visual effects.">
<meta property="linkedin:image" content="https://your-domain.com/assets/social/linkedin-card.png">
  `;
  
  await fs.writeFile('assets/social/meta-tags.html', ogTags);
  
  console.log('🎯 Social media cards generated successfully!');
  console.log('📱 Files created:');
  console.log('  - assets/social/twitter-card.html');
  console.log('  - assets/social/linkedin-card.html');  
  console.log('  - assets/social/facebook-card.html');
  console.log('  - assets/social/meta-tags.html');
}

// Run the generator
generateSocialCards().catch(error => {
  console.error('❌ Error generating social cards:', error);
  process.exit(1);
});
