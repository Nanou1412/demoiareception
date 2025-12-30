#!/usr/bin/env node
// ============================================
// BUILD SCRIPT - Generate frontend industries.js
// ============================================
// Run: node scripts/build-industries.js

const fs = require('fs');
const path = require('path');

const industriesDir = path.join(__dirname, '..', 'industries');
const outputFile = path.join(__dirname, '..', 'public', 'js', 'industries.js');

// Get all industry files except index.js
const files = fs.readdirSync(industriesDir)
    .filter(f => f.endsWith('.js') && f !== 'index.js')
    .sort();

console.log(`📦 Building industries.js from ${files.length} industry files...`);

let output = `// ============================================
// AUTO-GENERATED - DO NOT EDIT DIRECTLY
// Generated from /industries/*.js files
// Run: node scripts/build-industries.js
// ============================================

const Industries = {
`;

files.forEach((file, index) => {
    const filePath = path.join(industriesDir, file);
    const industry = require(filePath);
    const id = file.replace('.js', '');
    
    // Only include frontend-relevant properties (exclude prompt)
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
        .replace(/"([^"]+)":/g, '$1:')  // Remove quotes from keys
        .split('\n')
        .map((line, i) => i === 0 ? line : '    ' + line)  // Indent
        .join('\n');
    
    output += `    ${id}: ${json}${index < files.length - 1 ? ',' : ''}\n`;
});

output += `};

// ============================================
// HELPER FUNCTIONS
// ============================================
const getIndustry = () => Industries[window.AppState?.State?.currentIndustry] || Industries.restaurant;
const getIndustryLang = () => getIndustry().en;
const getCurrency = () => '$';

// Make available globally
window.Industries = Industries;
window.getIndustry = getIndustry;
window.getIndustryLang = getIndustryLang;
window.getCurrency = getCurrency;
`;

fs.writeFileSync(outputFile, output);
console.log(`✅ Generated: ${outputFile}`);
console.log(`   ${files.length} industries included`);

// Calculate size reduction
const originalSize = 136064; // Original script.js size
const newSize = Buffer.byteLength(output, 'utf8');
console.log(`   Size: ${(newSize / 1024).toFixed(1)}KB (was ~133KB inline)`);
