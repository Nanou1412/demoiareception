/**
 * PostCSS Configuration
 * =====================
 * 
 * Plugins pour le traitement CSS
 */

export default {
    plugins: {
        // Ajoute les préfixes vendeurs automatiquement
        autoprefixer: {},
        
        // Minifie le CSS en production
        ...(process.env.NODE_ENV === 'production' ? {
            cssnano: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    },
                    normalizeWhitespace: true
                }]
            }
        } : {})
    }
};
