# Barcony Website - Component Architecture

## Overview
This website uses a modern component-based architecture for maintainability and consistency across all pages.

## Structure
```
site/
├── components/           # Reusable components
│   ├── variables.css     # CSS custom properties (brand colors, spacing, etc.)
│   ├── components.css    # Universal component styles
│   ├── header.html       # Navigation header component
│   ├── footer.html       # Footer component
│   ├── build.js          # Build script for component injection
│   └── README.md         # This file
├── index.html           # Homepage
├── gallerij/
│   └── index.html       # Gallery page
└── modellen-prijzen/
    └── index.html       # Models & prices page
```

## Components

### CSS Variables (variables.css)
- Brand colors and typography
- Consistent spacing scale
- Border radius and shadow definitions
- Layout dimensions

### Universal Components (components.css)
- Modern CSS reset
- Navigation styling
- Button components
- Form styling
- Gallery components
- Footer styling
- Responsive design

### Header Component (header.html)
- Logo and navigation links
- Responsive mobile menu
- Active page indication

### Footer Component (footer.html)
- Company information
- Social media links
- Contact details
- Legal information

## Build Process

### Development
```bash
npm run build    # Build all components
npm start        # Build and serve with live reload
npm run dev      # Development server (live-server)
```

### How It Works
1. The build script (`build.js`) processes all HTML files
2. Injects universal CSS variables and component styles
3. Replaces placeholder comments with actual component HTML
4. Updates active navigation based on current page

## Benefits

### Consistency
- All pages use identical navigation and footer
- Consistent styling across all components
- Unified color scheme and typography

### Maintainability
- Single source of truth for styling
- Easy to update components across all pages
- Modular architecture

### Performance
- Optimized CSS with minimal redundancy
- Consistent loading across all pages
- Efficient component injection

### Developer Experience
- Clear component boundaries
- Easy to add new pages
- Simple build process

## Adding New Pages

1. Create new HTML file in appropriate directory
2. Add placeholder comments for header/footer injection
3. Run `npm run build` to process components
4. Navigation will automatically update

## Customization

### Colors & Branding
Edit `variables.css` to update:
- Brand colors (`--color-primary`, `--color-accent`)
- Typography settings
- Spacing scale
- Component dimensions

### Component Styling
Edit `components.css` to modify:
- Button styles
- Navigation appearance
- Form styling
- Layout components

### Content
Edit `header.html` and `footer.html` to update:
- Navigation menu items
- Footer content and links
- Social media links
