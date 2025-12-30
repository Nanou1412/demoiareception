#!/usr/bin/env node
// ============================================
// BUILD SCRIPT - Production Build
// ============================================
// Run: node scripts/build.js
// Or: npm run build:prod

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DIST = path.join(ROOT, 'dist');

// Colors for console
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

const log = (msg, color = 'reset') => console.log(`${colors[color]}${msg}${colors.reset}`);

// ============================================
// 1. Build Industries
// ============================================
function buildIndustries() {
    log('\n📦 Building industries.js...', 'cyan');

    const industriesDir = path.join(ROOT, 'industries');
    const outputFile = path.join(PUBLIC, 'js', 'industries.js');

    const files = fs
        .readdirSync(industriesDir)
        .filter(f => f.endsWith('.js') && f !== 'index.js')
        .sort();

    let output = `// AUTO-GENERATED - DO NOT EDIT\n// Generated: ${new Date().toISOString()}\n\nconst Industries = {\n`;

    files.forEach((file, index) => {
        const filePath = path.join(industriesDir, file);
        // Clear require cache to get fresh data
        delete require.cache[require.resolve(filePath)];
        const industry = require(filePath);
        const id = file.replace('.js', '');

        const frontendConfig = {
            icon: industry.icon,
            customerIcon: industry.customerIcon,
            voice: industry.voice,
            color: industry.color,
            cardIcon: industry.cardIcon,
            quickActions: industry.quickActions,
            menuItems: industry.menuItems,
            stepInfos: industry.stepInfos,
            demoScript: industry.demoScript,
            en: industry.en
        };

        const json = JSON.stringify(frontendConfig, null, 4)
            .replace(/"([^"]+)":/g, '$1:')
            .split('\n')
            .map((line, i) => (i === 0 ? line : '    ' + line))
            .join('\n');

        output += `    ${id}: ${json}${index < files.length - 1 ? ',' : ''}\n`;
    });

    output += `};\n\nconst getIndustry = () => Industries[window.AppState?.State?.currentIndustry] || Industries.restaurant;\nconst getIndustryLang = () => getIndustry().en;\nconst getCurrency = () => '$';\n\nwindow.Industries = Industries;\nwindow.getIndustry = getIndustry;\nwindow.getIndustryLang = getIndustryLang;\nwindow.getCurrency = getCurrency;\n`;

    fs.writeFileSync(outputFile, output);
    log(`   ✅ ${files.length} industries → ${outputFile}`, 'green');

    return files.length;
}

// ============================================
// 2. Minify JS (simple minification)
// ============================================
function minifyJS() {
    log('\n⚡ Minifying JavaScript...', 'cyan');

    const jsDir = path.join(PUBLIC, 'js');
    const distJsDir = path.join(DIST, 'js');

    if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
    if (!fs.existsSync(distJsDir)) fs.mkdirSync(distJsDir, { recursive: true });

    const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    let totalOriginal = 0;
    let totalMinified = 0;

    files.forEach(file => {
        const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
        totalOriginal += content.length;

        // Simple minification (remove comments, extra whitespace)
        let minified = content
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
            .replace(/\/\/.*$/gm, '') // Remove line comments
            .replace(/^\s+/gm, '') // Remove leading whitespace
            .replace(/\s+$/gm, '') // Remove trailing whitespace
            .replace(/\n\s*\n/g, '\n') // Remove empty lines
            .trim();

        totalMinified += minified.length;
        fs.writeFileSync(path.join(distJsDir, file), minified);
    });

    const savings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
    log(`   ✅ ${files.length} files minified (${savings}% smaller)`, 'green');
}

// ============================================
// 3. Minify CSS
// ============================================
function minifyCSS() {
    log('\n🎨 Minifying CSS...', 'cyan');

    const cssFile = path.join(PUBLIC, 'style.css');
    const distCssFile = path.join(DIST, 'style.css');

    if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

    const content = fs.readFileSync(cssFile, 'utf8');
    const originalSize = content.length;

    // Simple CSS minification
    let minified = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove space around special chars
        .replace(/;}/g, '}') // Remove last semicolon
        .trim();

    fs.writeFileSync(distCssFile, minified);

    const savings = ((1 - minified.length / originalSize) * 100).toFixed(1);
    log(`   ✅ style.css minified (${savings}% smaller)`, 'green');
}

// ============================================
// 4. Copy HTML with updated paths
// ============================================
function copyHTML() {
    log('\n📄 Processing HTML...', 'cyan');

    const htmlFile = path.join(PUBLIC, 'index.html');
    const distHtmlFile = path.join(DIST, 'index.html');

    let content = fs.readFileSync(htmlFile, 'utf8');

    // For production, you might want to combine all JS files
    // For now, just copy as-is
    fs.writeFileSync(distHtmlFile, content);

    log(`   ✅ index.html copied`, 'green');
}

// ============================================
// 5. Generate build info
// ============================================
function generateBuildInfo() {
    const info = {
        version: require(path.join(ROOT, 'package.json')).version,
        buildTime: new Date().toISOString(),
        node: process.version
    };

    fs.writeFileSync(path.join(DIST, 'build-info.json'), JSON.stringify(info, null, 2));

    log(`\n📋 Build info: v${info.version}`, 'blue');
}

// ============================================
// MAIN
// ============================================
function main() {
    const startTime = Date.now();

    log('🚀 Starting production build...', 'yellow');
    log('================================', 'yellow');

    const industriesCount = buildIndustries();
    minifyJS();
    minifyCSS();
    copyHTML();
    generateBuildInfo();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    log('\n================================', 'yellow');
    log(`✨ Build complete in ${duration}s`, 'green');
    log(`   📁 Output: ./dist/`, 'blue');
    log(`   🏭 Industries: ${industriesCount}`, 'blue');
}

main();
