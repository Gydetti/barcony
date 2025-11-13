#!/usr/bin/env node

/**
 * Barcony Website Build Script
 * Industry standard component-based build process
 */

const fs = require('node:fs');
const path = require('node:path');

class BarconyBuild {
    constructor() {
        this.siteDir = path.join(__dirname, '..');
        this.componentsDir = path.join(__dirname);
    }

    async build() {
        console.log('🚀 Building Barcony Website...');

        // Load components
        const header = this.loadComponent('header.html');
        const footer = this.loadComponent('footer.html');
        const variables = this.loadCSS('variables.css');
        const components = this.loadCSS('components.css');
        const cookieBannerCSS = this.loadCSS('cookie-banner.css');

        // Process all HTML files
        const pages = ['index.html', 'gallerij/index.html', 'modellen-prijzen/index.html'];

        for (const page of pages) {
            await this.processPage(page, { header, footer, variables, components, cookieBannerCSS });
        }

        console.log('✅ Build completed successfully!');
    }

    loadComponent(name) {
        const filePath = path.join(this.componentsDir, name);
        return fs.readFileSync(filePath, 'utf8');
    }

    loadCSS(name) {
        const filePath = path.join(this.componentsDir, name);
        return fs.readFileSync(filePath, 'utf8');
    }

    async processPage(pagePath, components) {
        const fullPath = path.join(this.siteDir, pagePath);
        let content = fs.readFileSync(fullPath, 'utf8');

        // Replace CSS variables and components
        content = this.replaceCSS(content, components.variables, components.components, components.cookieBannerCSS);
        content = this.replaceComponents(content, components.header, components.footer);

        // Update active navigation based on page
        content = this.updateActiveNav(content, pagePath);

        fs.writeFileSync(fullPath, content);
        console.log(`  📄 Processed ${pagePath}`);
    }

    replaceCSS(content, variables, components, cookieBannerCSS = '') {
        // Remove existing style blocks (including multi-line ones)
        content = content.replace(/<style>[\s\S]*?<\/style>/g, '');

        // Remove any duplicate hero styles that might exist
        content = content.replace(/\.hero\s*\{[^}]*background[^}]*\}/g, '');
        content = content.replace(/\.hero__title\s*\{[^}]*\}/g, '');
        content = content.replace(/\.hero__subtitle\s*\{[^}]*\}/g, '');
        content = content.replace(/\.hero__cta\s*\{[^}]*\}/g, '');

        // Remove all duplicate navigation scripts (prevent future duplicates)
        const duplicateScriptPattern = /<script>\s*document\.addEventListener\('DOMContentLoaded', function\(\) \{\s*\/\/ Set active navigation link[\s\S]*?\}\);\s*<\/script>\s*/gi;
        content = content.replace(duplicateScriptPattern, '');

        // Remove large inline script blocks (Enhanced JavaScript)
        content = content.replace(/<!-- Enhanced JavaScript for Modern Interactions -->\s*<script>[\s\S]*?<\/script>\s*/gi, '');

        // Ensure main.js is included (add if missing)
        if (!content.includes('src="/js/main.js"')) {
            content = content.replace(/<\/body>/, '    <script src="/js/main.js" defer></script>\n</body>');
        }

        // Ensure preload hint for main.js exists
        if (!content.includes('preload href="/js/main.js"')) {
            content = content.replace(
                /(<link rel="preload" href="\/media\/logo\.png" as="image">)/,
                '$1\n    <link rel="preload" href="/js/main.js" as="script">'
            );
        }

        // Add universal CSS (no JavaScript injection - main.js handles it)
        const css = `<style>\n${variables}\n${components}\n${cookieBannerCSS}\n</style>`;
        return content.replace('</head>', `${css}\n</head>`);
    }

    replaceComponents(content, header, footer) {
        // Remove existing header and footer (more comprehensive regex)
        content = content.replace(/<!-- Universal Header Component[^>]*-->[\s\S]*?<\/nav>/g, '');
        content = content.replace(/<!-- Universal Footer Component[^>]*-->[\s\S]*?<\/footer>/g, '');
        content = content.replace(/<!-- Modern Navigation -->[\s\S]*?<\/nav>/g, '');
        content = content.replace(/<!-- Mobile Header -->[\s\S]*?<\/div>/g, '');
        content = content.replace(/<!-- Desktop Header -->[\s\S]*?<\/div>/g, '');
        content = content.replace(/<!-- Footer -->[\s\S]*?<\/footer>/g, '');

        // Add universal components (only once)
        content = content.replace('<body>', `<body>\n    ${header}`);
        content = content.replace('</body>', `    ${footer}\n</body>`);

        return content;
    }

    updateActiveNav(content, pagePath) {
        // Simple and robust active navigation detection
        if (pagePath === 'index.html') {
            // Home page - first link should be active
            content = content.replace(
                '<a href="/" class="navbar__link">Home</a>',
                '<a href="/" class="navbar__link navbar__link--active">Home</a>'
            );
        } else if (pagePath === 'gallerij/index.html') {
            // Gallery page
            content = content.replace(
                '<a href="/gallerij" class="navbar__link">Gallerij</a>',
                '<a href="/gallerij" class="navbar__link navbar__link--active">Gallerij</a>'
            );
        } else if (pagePath === 'modellen-prijzen/index.html') {
            // Models page - use page link
            content = content.replace(
                '<a href="/modellen-prijzen" class="navbar__link">Modellen</a>',
                '<a href="/modellen-prijzen" class="navbar__link navbar__link--active">Modellen</a>'
            );
        }

        return content;
    }

}

// Run build if called directly
if (require.main === module) {
    const build = new BarconyBuild();
    build.build().catch(console.error);
}

module.exports = BarconyBuild;
