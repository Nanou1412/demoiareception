// ============================================
// SHARED PROMPTS - Now imports from industries
// ============================================
// This file is kept for backward compatibility
// All prompts are now defined in /industries/{industry}.js

const {
    getSystemPrompt,
    getIndustry,
    INDUSTRIES,
    getVoice,
    getIndustryIds
} = require('../industries/index');

// Re-export for backward compatibility
module.exports = {
    getSystemPrompt,
    getIndustry,
    INDUSTRIES,
    getVoice,
    getIndustryIds
};
