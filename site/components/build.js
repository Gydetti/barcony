#!/usr/bin/env node

/**
 * Barcony Website Build Script
 * Industry standard component-based build process
 */

const fs = require('fs');
const path = require('path');

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

        // Process all HTML files
        const pages = ['index.html', 'gallerij/index.html', 'modellen-prijzen/index.html'];

        for (const page of pages) {
            await this.processPage(page, { header, footer, variables, components });
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
        content = this.replaceCSS(content, components.variables, components.components);
        content = this.replaceComponents(content, components.header, components.footer);

        // Update active navigation based on page
        content = this.updateActiveNav(content, pagePath);

        fs.writeFileSync(fullPath, content);
        console.log(`  📄 Processed ${pagePath}`);
    }

    replaceCSS(content, variables, components) {
        // Remove existing style blocks (including multi-line ones)
        content = content.replace(/<style>[\s\S]*?<\/style>/g, '');

        // Add universal CSS
        const css = `<style>\n${variables}\n${components}\n</style>`;
        return content.replace('</head>', `${css}\n</head>`);
    }

    replaceComponents(content, header, footer) {
        // Remove existing header and footer
        content = content.replace(/<!-- Modern Navigation -->[\s\S]*?<\/nav>/, '');
        content = content.replace(/<!-- Mobile Header -->[\s\S]*?<\/div>/, '');
        content = content.replace(/<!-- Desktop Header -->[\s\S]*?<\/div>/, '');
        content = content.replace(/<!-- Footer -->[\s\S]*?<\/footer>/, '');

        // Add universal components
        content = content.replace('<body>', `<body>\n    ${header}`);
        content = content.replace('</body>', `    ${footer}\n</body>`);

        return content;
    }

    updateActiveNav(content, pagePath) {
        if (pagePath === 'index.html') {
            content = content.replace(
                'class="navbar__link"',
                'class="navbar__link navbar__link--active"'
            );
        } else if (pagePath === 'gallerij/index.html') {
            content = content.replace(
                '<a href="/gallerij" class="navbar__link">',
                '<a href="/gallerij" class="navbar__link navbar__link--active">'
            );
        } else if (pagePath === 'modellen-prijzen/index.html') {
            content = content.replace(
                '<a href="/modellen-prijzen" class="navbar__link">',
                '<a href="/modellen-prijzen" class="navbar__link navbar__link--active">'
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
