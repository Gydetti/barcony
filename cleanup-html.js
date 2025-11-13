const fs = require('fs');
const path = require('path');

function cleanHTMLFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove all duplicate navigation scripts
    const duplicateScriptPattern = /<script>\s*document\.addEventListener\('DOMContentLoaded', function\(\) \{\s*\/\/ Set active navigation link based on current URL[\s\S]*?\}\);\s*<\/script>\s*/g;
    const matches = content.match(duplicateScriptPattern);
    
    if (matches && matches.length > 1) {
        content = content.replace(duplicateScriptPattern, (match, offset) => {
            const firstMatchIndex = content.indexOf(match);
            return offset === firstMatchIndex ? match : '';
        });
        content = content.replace(/\n\s*\n\s*\n\s*\n+/g, '\n\n');
    }
    
    // Remove large inline script blocks (Enhanced JavaScript)
    content = content.replace(/<!-- Enhanced JavaScript for Modern Interactions -->\s*<script>[\s\S]*?<\/script>\s*/g, '');
    
    // Add preload hint if not present
    if (!content.includes('preload href="/js/main.js"')) {
        content = content.replace(
            /(<link rel="preload" href="\/media\/logo\.png" as="image">)/,
            '$1\n    <link rel="preload" href="/js/main.js" as="script">'
        );
    }
    
    // Add main.js script before closing body tag if not present
    if (!content.includes('src="/js/main.js"')) {
        content = content.replace(
            /<\/body>/,
            '    <script src="/js/main.js" defer></script>\n</body>'
        );
    }
    
    fs.writeFileSync(filePath, content);
    console.log('Cleaned:', filePath);
}

cleanHTMLFile('site/gallerij/index.html');
cleanHTMLFile('site/modellen-prijzen/index.html');
console.log('Done cleaning HTML files');

