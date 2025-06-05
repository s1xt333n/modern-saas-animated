/**
 * 🎭 Modern SaaS Animated Animation Performance Monitor
 * Real-time monitoring of the 6-layer floating circles animation
 */

class AnimationPerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.startTime = performance.now();
    this.lastFrameTime = performance.now();
    this.fpsHistory = [];
    this.isMonitoring = false;
    this.performanceData = {
      averageFPS: 0,
      minFPS: Infinity,
      maxFPS: 0,
      frameDrops: 0,
      totalFrames: 0,
      animationLayers: 6,
      portraitCount: 180
    };
    
    this.initializeMonitor();
  }
  
  initializeMonitor() {
    // Create performance overlay UI
    this.createPerformanceOverlay();
    
    // Start monitoring when animation begins
    this.startMonitoring();
    
    // Monitor memory usage
    this.monitorMemoryUsage();
    
    console.log('🎭 Animation Performance Monitor initialized');
  }
  
  createPerformanceOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'animation-performance-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff88;
      padding: 10px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      z-index: 10000;
      min-width: 200px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 255, 136, 0.3);
      display: none;
    `;
    
    overlay.innerHTML = `
      <div style="color: #ffd700; font-weight: bold; margin-bottom: 5px;">
        🎭 ANIMATION MONITOR
      </div>
      <div id="fps-display">FPS: --</div>
      <div id="frame-drops">Drops: 0</div>
      <div id="memory-usage">Memory: --</div>
      <div id="layer-status">Layers: 6/6 ✅</div>
      <div id="performance-grade">Grade: A+</div>
      <div style="margin-top: 5px; font-size: 10px; opacity: 0.7;">
        Press 'P' to toggle monitor
      </div>
    `;
    
    document.body.appendChild(overlay);
    this.overlay = overlay;
    
    // Toggle monitor with 'P' key
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'p' && e.ctrlKey) {
        this.toggleMonitor();
        e.preventDefault();
      }
    });
  }
  
  startMonitoring() {
    this.isMonitoring = true;
    this.monitorFrame();
  }
  
  monitorFrame() {
    if (!this.isMonitoring) return;
    
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    const fps = 1000 / deltaTime;
    
    this.frameCount++;
    this.performanceData.totalFrames++;
    this.fpsHistory.push(fps);
    
    // Keep only last 60 frames for rolling average
    if (this.fpsHistory.length > 60) {
      this.fpsHistory.shift();
    }
    
    // Calculate performance metrics
    this.calculatePerformanceMetrics(fps);
    
    // Update display every 10 frames for better readability
    if (this.frameCount % 10 === 0) {
      this.updateDisplay();
    }
    
    this.lastFrameTime = currentTime;
    requestAnimationFrame(() => this.monitorFrame());
  }
  
  calculatePerformanceMetrics(currentFPS) {
    // Calculate average FPS
    this.performanceData.averageFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
    
    // Track min/max FPS
    this.performanceData.minFPS = Math.min(this.performanceData.minFPS, currentFPS);
    this.performanceData.maxFPS = Math.max(this.performanceData.maxFPS, currentFPS);
    
    // Count frame drops (FPS below 55)
    if (currentFPS < 55) {
      this.performanceData.frameDrops++;
    }
  }
  
  updateDisplay() {
    if (!this.overlay || this.overlay.style.display === 'none') return;
    
    const fps = Math.round(this.performanceData.averageFPS);
    const grade = this.getPerformanceGrade(fps);
    const gradeColor = this.getGradeColor(grade);
    
    document.getElementById('fps-display').textContent = `FPS: ${fps}`;
    document.getElementById('frame-drops').textContent = `Drops: ${this.performanceData.frameDrops}`;
    document.getElementById('performance-grade').innerHTML = `Grade: <span style="color: ${gradeColor}">${grade}</span>`;
    
    // Update FPS color based on performance
    const fpsElement = document.getElementById('fps-display');
    if (fps >= 55) {
      fpsElement.style.color = '#00ff88'; // Green
    } else if (fps >= 30) {
      fpsElement.style.color = '#ffaa00'; // Orange
    } else {
      fpsElement.style.color = '#ff4444'; // Red
    }
  }
  
  getPerformanceGrade(fps) {
    if (fps >= 58) return 'A+';
    if (fps >= 50) return 'A';
    if (fps >= 40) return 'B+';
    if (fps >= 30) return 'B';
    if (fps >= 20) return 'C';
    return 'D';
  }
  
  getGradeColor(grade) {
    const colors = {
      'A+': '#00ff88',
      'A': '#88ff00',
      'B+': '#ffff00',
      'B': '#ffaa00',
      'C': '#ff6600',
      'D': '#ff4444'
    };
    return colors[grade] || '#ffffff';
  }
  
  monitorMemoryUsage() {
    if (!performance.memory) return;
    
    setInterval(() => {
      const memory = performance.memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      
      const memoryElement = document.getElementById('memory-usage');
      if (memoryElement) {
        memoryElement.textContent = `Memory: ${usedMB}/${totalMB}MB`;
        
        // Color code memory usage
        const usagePercent = usedMB / totalMB;
        if (usagePercent > 0.8) {
          memoryElement.style.color = '#ff4444';
        } else if (usagePercent > 0.6) {
          memoryElement.style.color = '#ffaa00';
        } else {
          memoryElement.style.color = '#00ff88';
        }
      }
    }, 2000);
  }
  
  toggleMonitor() {
    if (this.overlay.style.display === 'none') {
      this.overlay.style.display = 'block';
      console.log('🎭 Performance monitor enabled');
    } else {
      this.overlay.style.display = 'none';
      console.log('🎭 Performance monitor disabled');
    }
  }
  
  getPerformanceReport() {
    const runTime = (performance.now() - this.startTime) / 1000;
    
    return {
      ...this.performanceData,
      runTime: Math.round(runTime),
      fpsStability: this.calculateFPSStability(),
      recommendation: this.getOptimizationRecommendation()
    };
  }
  
  calculateFPSStability() {
    if (this.fpsHistory.length < 10) return 'N/A';
    
    const avg = this.performanceData.averageFPS;
    const variance = this.fpsHistory.reduce((sum, fps) => sum + Math.pow(fps - avg, 2), 0) / this.fpsHistory.length;
    const stability = Math.max(0, 100 - Math.sqrt(variance));
    
    return Math.round(stability) + '%';
  }
  
  getOptimizationRecommendation() {
    const fps = this.performanceData.averageFPS;
    const drops = this.performanceData.frameDrops;
    
    if (fps >= 55 && drops < 5) {
      return '🎉 Perfect! Animation is running beautifully!';
    } else if (fps >= 40) {
      return '⚡ Good performance. Consider reducing portrait count on lower-end devices.';
    } else if (fps >= 30) {
      return '🔧 Moderate performance. Disable some layers on mobile devices.';
    } else {
      return '🚨 Poor performance. Implement performance mode with reduced effects.';
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if animation elements exist
  if (document.getElementById('sphere-ring')) {
    window.animationMonitor = new AnimationPerformanceMonitor();
    
    // Global access for debugging
    window.getAnimationReport = () => {
      const report = window.animationMonitor.getPerformanceReport();
      console.table(report);
      return report;
    };
    
    console.log('🎭 Modern SaaS Animated Animation Monitor ready!');
    console.log('💡 Press Ctrl+P to toggle performance overlay');
    console.log('💡 Run getAnimationReport() in console for detailed metrics');
  }
});
