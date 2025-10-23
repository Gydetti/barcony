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

        // Add universal CSS and JavaScript
        const css = `<style>\n${variables}\n${components}\n</style>`;
        const js = this.getActiveNavScript();
        return content.replace('</head>', `${css}\n${js}\n</head>`);
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

    getActiveNavScript() {
        return `<script>
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link based on current URL
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar__link');

    navLinks.forEach(link => {
        // Remove existing active class
        link.classList.remove('navbar__link--active');

        // Check if this link matches current path
        const href = link.getAttribute('href');

        if (currentPath === '/' && href === '/') {
            link.classList.add('navbar__link--active');
        } else if (currentPath === '/gallerij' || currentPath === '/gallerij/') {
            if (href === '/gallerij') {
                link.classList.add('navbar__link--active');
            }
        } else if (currentPath === '/modellen-prijzen' || currentPath === '/modellen-prijzen/') {
            if (href === '/modellen-prijzen') {
                link.classList.add('navbar__link--active');
            }
        }

        // Also handle hash links for homepage sections
        if (currentPath === '/' && href.startsWith('#')) {
            const hash = window.location.hash;
            if (href === hash) {
                link.classList.add('navbar__link--active');
            }
        }
    });
});
</script>`;
    }
}

// Run build if called directly
if (require.main === module) {
    const build = new BarconyBuild();
    build.build().catch(console.error);
}

module.exports = BarconyBuild;
