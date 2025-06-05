const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

/**
 * 🎬 Modern SaaS Animated Animation Preview Generator
 * Creates stunning screenshots of the 6-layer floating circles animation
 */

const ANIMATION_CONFIG = {
  width: 1200,
  height: 1200,
  frames: 120, // 4 seconds at 30fps
  outputDir: 'animation-frames',
  screenshotDelay: 100 // ms between frames
};

async function generateAnimationPreview() {
  console.log('🎭 Starting Modern SaaS Animated Animation Showcase Generator...');
  
  // Create output directory
  await fs.mkdir(ANIMATION_CONFIG.outputDir, { recursive: true });
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for optimal animation capture
  await page.setViewport({
    width: ANIMATION_CONFIG.width,
    height: ANIMATION_CONFIG.height,
    deviceScaleFactor: 2
  });
  
  console.log('🌐 Loading Modern SaaS Animated page...');
  
  // Load the local HTML file
  const htmlPath = path.resolve(__dirname, '../index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  // Wait for animation to start
  await page.waitForSelector('#sphere-ring', { timeout: 10000 });
  
  console.log('🔥 Capturing animation frames...');
  
  // Inject CSS to focus on animation area
  await page.addStyleTag({
    content: `
      body { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        overflow: hidden;
      }
      .hero-section {
        padding: 50px 0 !important;
        min-height: 100vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .sphere-ring {
        animation: glow 2s ease-in-out infinite alternate !important;
      }
      @keyframes glow {
        from { filter: drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
        to { filter: drop-shadow(0 0 40px rgba(255,255,255,0.6)); }
      }
      /* Hide everything except the animation */
      .navbar, .features-section, .pricing-section, footer, .cta-section {
        display: none !important;
      }
    `
  });
  
  // Capture frames
  for (let frame = 0; frame < ANIMATION_CONFIG.frames; frame++) {
    const filename = `frame_${frame.toString().padStart(3, '0')}.png`;
    const filepath = path.join(ANIMATION_CONFIG.outputDir, filename);
    
    await page.screenshot({
      path: filepath,
      type: 'png',
      quality: 90,
      clip: {
        x: 0,
        y: 0,
        width: ANIMATION_CONFIG.width,
        height: ANIMATION_CONFIG.height
      }
    });
    
    // Let animation continue
    await page.waitForTimeout(ANIMATION_CONFIG.screenshotDelay);
    
    if (frame % 10 === 0) {
      console.log(`📸 Captured frame ${frame}/${ANIMATION_CONFIG.frames}`);
    }
  }
  
  await browser.close();
  
  console.log('✅ Animation showcase generated successfully!');
  console.log(`🎬 ${ANIMATION_CONFIG.frames} frames saved to ${ANIMATION_CONFIG.outputDir}/`);
  
  // Generate frame list for ffmpeg
  const frameList = Array.from({ length: ANIMATION_CONFIG.frames }, (_, i) => 
    `file '${ANIMATION_CONFIG.outputDir}/frame_${i.toString().padStart(3, '0')}.png'`
  ).join('\n');
  
  await fs.writeFile('frame-list.txt', frameList);
  
  console.log('🎯 Ready to create GIF with:');
  console.log('ffmpeg -f concat -safe 0 -i frame-list.txt -vf "scale=600:600,fps=30" -loop 0 floating-circles-animation.gif');
}

// Run the generator
generateAnimationPreview().catch(error => {
  console.error('❌ Error generating animation preview:', error);
  process.exit(1);
});
