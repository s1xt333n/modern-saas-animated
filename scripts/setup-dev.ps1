# 🎭 Modern SaaS Animated Animation Development Setup
# Quick setup script for new contributors

Write-Host "🎯 Welcome to Modern SaaS Animated Animation Development!" -ForegroundColor Cyan
Write-Host "Setting up your development environment..." -ForegroundColor Yellow
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if Python is installed (for local server)
try {
    $pythonVersion = python --version
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Python not found. Installing Python 3..." -ForegroundColor Yellow
    # You may want to install Python via winget or chocolatey
    Write-Host "Please install Python from https://python.org/downloads/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Install npm dependencies
if (Test-Path "package.json") {
    npm install
    Write-Host "✅ NPM packages installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎭 Setting up animation development tools..." -ForegroundColor Cyan

# Create necessary directories
$directories = @("animation-frames", "assets/social", "assets/previews")
foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "📁 Created directory: $dir" -ForegroundColor Blue
    }
}

Write-Host ""
Write-Host "🔥 Testing animation preview generation..." -ForegroundColor Yellow

# Test if we can generate animation preview
try {
    npm run animation:preview
    Write-Host "✅ Animation preview generation working!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Animation preview generation needs manual setup" -ForegroundColor Yellow
    Write-Host "Install Puppeteer manually: npm install puppeteer" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
Write-Host "Your LeadGenius animation will be available at:" -ForegroundColor White
Write-Host "http://localhost:8000" -ForegroundColor Yellow -BackgroundColor Black
Write-Host ""
Write-Host "🎭 Animation Development Tips:" -ForegroundColor Magenta
Write-Host "• Press Ctrl+P in browser to toggle performance monitor" -ForegroundColor White
Write-Host "• Use F12 → Performance tab to analyze frame rate" -ForegroundColor White
Write-Host "• Run 'getAnimationReport()' in console for detailed metrics" -ForegroundColor White
Write-Host "• Animation code is in js/main.js (lines 259-340)" -ForegroundColor White
Write-Host ""
Write-Host "🌟 Ready to create animation magic! 🌟" -ForegroundColor Green -BackgroundColor Black
Write-Host ""

# Start the development server
try {
    Start-Process "http://localhost:8000"
    python -m http.server 8000
} catch {
    Write-Host "❌ Failed to start server. Try running manually: python -m http.server 8000" -ForegroundColor Red
}
