# Barcony Website - Component-Based Architecture

Een moderne, responsive website voor Barcony balkontafels gebouwd met een **professionele component-based architectuur** en industry-standard best practices.

## 🚀 Features

- **Component-Based Architecture** - Herbruikbare header, footer en styling componenten
- **Modern CSS** - CSS custom properties, flexbox en grid layouts
- **Responsive Design** - Mobile-first approach met breakpoints
- **Build System** - Automated component injection en styling
- **Performance Optimized** - Clean code structure en minimal dependencies
- **Accessibility** - WCAG compliant met proper semantic HTML

## 🏗️ Architecture

```
site/
├── components/           # 🔧 Reusable Components
│   ├── variables.css     # 🎨 Brand variables & design tokens
│   ├── components.css    # 🧩 Universal component styles
│   ├── header.html       # 🧭 Navigation component
│   ├── footer.html       # 🦶 Footer component
│   ├── build.js          # 🔄 Build automation script
│   └── README.md         # 📚 Component documentation
├── index.html           # 🏠 Homepage
├── gallerij/            # 🖼️ Gallery page
│   └── index.html
└── modellen-prijzen/   # 💰 Models & prices page
    └── index.html
```

## 🛠️ Development

### Prerequisites
- Node.js (v12+)
- npm

### Setup
```bash
npm install
npm run build    # Build all components
npm start        # Start development server
npm run dev      # Live development server
```

### Build Process
Het build systeem injecteert automatisch:
- **Universal CSS** styling in alle pagina's
- **Header component** met actieve navigatie links
- **Footer component** met consistente branding
- **JavaScript** voor runtime actieve navigatie detectie
- **Responsive breakpoints** voor alle devices

**Navigation Features:**
- Build-time active link detection via URL matching
- Runtime JavaScript fallback voor dynamische highlighting
- Support voor trailing slashes (`/gallerij/`)
- Hash fragment support voor homepage secties (`#contact`)

## 🌲 Natural Wood Design System

### Brand Colors
- **Primary**: `#8b5a3c` (Warm Wood Brown) - inspired by natural Douglas wood
- **Accent**: `#d4a574` (Soft Golden Wood) - reminiscent of aged timber
- **Forest**: `#4a5d3a` (Deep Forest Green) - connecting to sustainable forestry
- **Natural Neutrals**: Warm cream and soft beige tones van `#fefcf9` tot `#2a1f15`

### Typography
- **Primary Font**: Inter (clean, modern sans-serif)
- **Display Font**: Playfair Display (elegant serif for headings)
- **Natural hierarchy** with warm colors and excellent readability

### Natural Components
- **Navigation**: Clean header with subtle wood-toned accents and smooth interactions
- **Hero Sections**: Warm gradient backgrounds with natural lighting effects
- **Buttons**: Natural color scheme with gentle hover effects and wood-inspired styling
- **Cards**: Clean, consistent styling with soft shadows and natural color accents
- **Gallery**: Gentle hover effects with warm overlay gradients
- **Forms**: Natural input styling with wood-toned focus states
- **Story Cards**: Clean narrative sections with subtle accent indicators
- **Video Section**: Forest-themed dark section with natural accent colors

## 📱 Responsive Design

- **Desktop**: Multi-column layouts met hover effects, hero height 60vh
- **Tablet**: Adapted grid layouts (768px breakpoint), hero height 50vh
- **Mobile**: Single column met touch-friendly interactions (480px breakpoint), hero height 40vh

**Hero Section Features:**
- Perfect vertical centering with flexbox
- Responsive padding that scales with screen size
- Consistent visual impact across all devices
- Modern typography with fluid scaling

## ♿ Accessibility

- Semantic HTML5 elementen
- Proper heading hierarchy
- Focus management voor keyboard navigation
- Screen reader friendly content
- High contrast color ratios
- Skip links voor assistive technology

## 🔧 Component System

### Header Component
- Logo en navigatie links
- **Smart active page highlighting** met oranje indicator dot
- **URL-based detection** die werkt op alle pagina's
- Mobile hamburger menu
- Consistent across all pages

### Footer Component
- Company information
- Social media links
- Contact details
- Legal information

### CSS Variables System
- Brand colors en typography
- Consistent spacing scale
- Shadow en border radius tokens
- Easy customization zonder code wijzigingen

## 🚀 Deployment

### Local Development
```bash
npm start        # Build en serve met live reload
npm run dev      # Development server met auto-refresh
```

### Production Build
```bash
npm run build    # Generate production-ready files
```

### Static Hosting
Upload de `site/` directory naar elke static hosting provider:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📈 Performance

- **Minimal Dependencies** - Pure HTML, CSS, JavaScript
- **Optimized CSS** - Single stylesheet per page
- **Efficient Images** - Proper sizing en formats
- **Fast Loading** - Component-based architecture reduces redundancy

## 🔄 Updates & Maintenance

### Adding New Pages
1. Create HTML file in appropriate directory
2. Add component placeholder comments
3. Run `npm run build`
4. Navigation wordt automatisch bijgewerkt

### Styling Changes
1. Update `components.css` of `variables.css`
2. Run `npm run build`
3. Changes worden toegepast op alle pagina's

### Content Updates
1. Edit component HTML files in `components/`
2. Run `npm run build`
3. Content wordt bijgewerkt site-wide

## 🎯 Over het Project

Barcony is een Nederlands bedrijf dat handgemaakte, inklapbare bartafels produceert voor balkons. De website toont het vakmanschap, duurzaamheid en de unieke inklapfunctie die Barcony producten zo bijzonder maken.

### 🌲 Recent Transformation

Deze website heeft een complete natuurlijke make-over gekregen met:
- **Natuurlijke kleuren** geïnspireerd op Douglas hout en bos thema
- **Zachte, organische styling** die de handgemaakte kwaliteit weerspiegelt
- **Verbeterde leesbaarheid** met natuurlijke contrasten en zachte effecten
- **Authentieke storytelling** die de Barcony beleving op een warme manier presenteert
- **Clean responsive design** dat werkt op alle apparaten

**Belangrijkste kenmerken:**
- 🌲 **Natuurlijke kleuren** - Geïnspireerd op Douglas hout en bos
- 🎨 **Authentiek design** - Warm, handgemaakt en uitnodigend
- 📱 **Responsive design** - Perfect op alle apparaten
- ⚡ **Performance geoptimaliseerd** - Snelle laadtijden
- ♿ **Toegankelijk** - WCAG 2.1 compliant
- 🔍 **SEO geoptimaliseerd** - Voor zoekmachines

## 🚀 Live Website

De website draait op [Vercel](https://vercel.com) en is bereikbaar via:
- **Productie**: `https://barcony.nl`
- **Preview**: Automatische deployments bij elke push naar GitHub

## 📁 Project Structuur

```
Barcony/
├── Docs/                    # Project documentatie
│   ├── project-blueprint.md    # Origineel project plan
│   ├── project-plan-action.md  # Uitvoeringsplan
│   └── optimalisatieronde.md   # Optimalisatie blueprint
├── Page Sources/            # Originele One.com bronbestanden
│   ├── home_page_source_barcony.html
│   ├── gallerij_page_source_barcony.html
│   ├── modellen_page_source_barcony.html
│   └── contact_page_source_barcony.html
├── site/                    # Productie website (Vercel root)
│   ├── index.html              # Homepagina
│   ├── gallerij/
│   │   └── index.html          # Gallerij pagina
│   ├── modellen-prijzen/
│   │   └── index.html          # Modellen & prijzen pagina
│   ├── media/                  # Alle assets (images, video, etc.)
│   │   ├── logo.png
│   │   ├── favicon.png
│   │   ├── background.png
│   │   ├── gallery-*.jpeg      # Product afbeeldingen
│   │   ├── p-1-*.jpg           # Extra product afbeeldingen
│   │   ├── video.mp4           # Product demonstratie
│   │   ├── video-poster.jpg    # Video thumbnail
│   │   └── sustainability-logo.png
│   ├── robots.txt              # SEO configuratie
│   └── sitemap.xml             # Sitemap voor zoekmachines
├── vercel.json                 # Vercel deployment configuratie
└── README.md                   # Dit bestand
```

## 🎨 Design Systeem

### Kleuren
- **Primair**: `#4d6b81` (Blauw-grijs)
- **Accent**: `#fd7057` (Warm oranje)
- **Warm**: `#ffa24d` (Goud-geel)
- **Neutraal**: Grijs schalen van 50-900

### Typografie
- **Display font**: Playfair Display (voor headings)
- **Body font**: Inter (voor body text)
- **Systeem fonts**: Fallback naar systeem fonts voor performance

### Componenten
- Moderne navigatie met smooth scroll
- Responsive gallery met lightbox
- Interactieve product cards
- Geavanceerd contact formulier
- Social media integratie

## 🛠 Technische Stack

### Frontend
- **HTML5** - Semantische markup
- **CSS3** - Modern CSS met custom properties
- **JavaScript ES6+** - Moderne JavaScript features
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Animations** - Smooth micro-interactions

### Performance
- **Lazy loading** - Voor images en video
- **Optimized assets** - Gecomprimeerde images
- **Efficient fonts** - Google Fonts met preconnect
- **Caching strategy** - Geoptimaliseerde cache headers

### Toegankelijkheid
- **ARIA labels** - Voor screen readers
- **Keyboard navigation** - Volledige keyboard support
- **Focus management** - Proper focus handling
- **Color contrast** - WCAG AA compliant

## 🚀 Deployment & Development

### Vercel Deployment
1. **Automatisch**: Push naar `main` branch → Vercel deployt automatisch
2. **Preview**: Feature branches → Preview deployments
3. **Production**: `main` branch → Production deployment

### Lokale Development
```bash
# Start development server
npm run dev

# Of voor basic server (zonder live reload)
npm start
```

### Development URLs
- `http://localhost:8000/` - Homepagina
- `http://localhost:8000/gallerij/` - Gallerij
- `http://localhost:8000/modellen-prijzen/` - Modellen & prijzen

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1400px

## 🌿 Natural Design Features

### Clean Animations & Interactions
- ✅ Intersection Observer scroll animations with gentle staggered effects
- ✅ Subtle hover transformations and smooth micro-interactions
- ✅ Natural scroll behavior with offset calculations
- ✅ Loading animations for images and content
- ✅ Clean form interactions with natural focus states

### Natural Visual Design
- ✅ Wood-inspired gradient backgrounds with soft lighting effects
- ✅ Natural shadow system with warm undertones
- ✅ Clean typography with improved readability
- ✅ Gentle gallery hover effects with natural color overlays
- ✅ Consistent card designs with soft, organic styling

### User Experience
- ✅ Clean navigation with natural color accents
- ✅ Smooth scroll with proper offset calculations
- ✅ Responsive mobile menu with touch-friendly interactions
- ✅ Excellent accessibility with natural contrast ratios
- ✅ Clean form styling with natural validation feedback

### Performance & Technical
- ✅ Natural CSS custom properties system
- ✅ Optimized font loading with clean fallbacks
- ✅ Responsive breakpoints for all devices
- ✅ Modern JavaScript with ES6+ features
- ✅ Optimized loading performance

### SEO & Accessibility
- ✅ Enhanced meta tags and Open Graph
- ✅ Clean semantic HTML structure
- ✅ Natural color contrast and excellent readability
- ✅ Proper keyboard navigation
- ✅ Screen reader optimizations

## 🎯 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance Metrics

**Target Scores:**
- Lighthouse Performance: ≥95
- Lighthouse Accessibility: ≥100
- Lighthouse Best Practices: ≥100
- Lighthouse SEO: ≥100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

## 🧪 Testing

### Manual Testing
- [ ] Alle links werken correct
- [ ] Formulier validatie functioneert
- [ ] Gallery lightbox werkt op alle devices
- [ ] Mobile menu toggle functioneert
- [ ] Animaties spelen smooth af

### Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Edge (desktop)

### Performance Testing
- [ ] Lighthouse audit
- [ ] WebPageTest
- [ ] GTmetrix
- [ ] PageSpeed Insights

## 🔄 Updates & Onderhoud

### Content Updates
1. Edit HTML files in `/site/`
2. Update images in `/site/media/`
3. Test locally
4. Commit & push to trigger deployment

### Adding New Pages
1. Create new folder in `/site/`
2. Add `index.html` file
3. Update navigation in all pages
4. Update sitemap.xml
5. Test locally

### SEO Updates
1. Update meta descriptions
2. Check Open Graph tags
3. Update sitemap.xml
4. Test with Google Rich Results Test

## 📞 Contact & Support

**Website eigenaar**: Robin (Barcony)
**Email**: barconyamsterdam@gmail.com
**Telefoon**: +31 6 57 37 78 73

**Technische support**: Via GitHub issues of Vercel dashboard

## 📜 Licentie

© 2024 Barcony. Alle rechten voorbehouden.

---

**Laatste update**: Oktober 2024
**Built with**: ❤️ Modern web technologies
**Hosted on**: Vercel
