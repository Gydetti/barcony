# Barcony - Modern Website

Een moderne, professionele website voor Barcony - de inklapbare bartafel voor uw balkon. Gebouwd met de nieuwste web technologieën en geoptimaliseerd voor performance en gebruikerservaring.

## 🎯 Over het Project

Barcony is een Nederlands bedrijf dat handgemaakte, inklapbare bartafels produceert voor balkons. De website toont het vakmanschap, duurzaamheid en de unieke inklapfunctie die Barcony producten zo bijzonder maken.

**Belangrijkste kenmerken:**
- ✨ **Moderne architectuur** - HTML5, CSS3, ES6+ JavaScript
- 🎨 **Professioneel design** - Clean, warm en uitnodigend
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

## 🔧 Features

### Navigation
- ✅ Sticky header met blur effect
- ✅ Smooth scroll naar secties
- ✅ Mobile hamburger menu
- ✅ Active state indicators

### Gallery
- ✅ Masonry grid layout
- ✅ Filter functionaliteit
- ✅ Advanced lightbox met navigatie
- ✅ Keyboard shortcuts (ESC, arrows)

### Contact Form
- ✅ Real-time validatie
- ✅ Loading states
- ✅ Error handling
- ✅ Success feedback

### Performance
- ✅ Lazy loading images
- ✅ Optimized fonts
- ✅ Efficient CSS
- ✅ Minimal JavaScript

### SEO
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Structured data
- ✅ XML sitemap
- ✅ robots.txt

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
