# Barcony Website Migration

Website migratie van One.com naar Vercel met behoud van identieke look-and-feel.

## 🎯 Project Doelstelling

- ✅ Identieke look-and-feel behouden
- ✅ Folder-based routing: `/`, `/gallerij`, `/barcony-modellen`, `/contact`
- ✅ Alle assets lokaal hosten (geen One.com afhankelijkheden)
- ✅ Snelle Vercel deployment via GitHub integration

## 📁 Project Structuur

```
Barcony/
├── Page Sources/          # Originele HTML bronbestanden van One.com
│   ├── home_page_source_barcony.html
│   ├── gallerij_page_source_barcony.html
│   ├── modellen_page_source_barcony.html
│   └── contact_page_source_barcony.html
├── site/                  # Vercel deployment root
│   ├── index.html         # Home page
│   ├── gallerij/
│   │   └── index.html     # Gallerij page
│   ├── barcony-modellen/
│   │   └── index.html     # Modellen page
│   ├── contact/
│   │   └── index.html     # Contact page
│   ├── media/             # Lokale assets
│   │   ├── logo.png
│   │   ├── favicon.png
│   │   ├── background.png
│   │   ├── decorative-line.png
│   │   ├── gallery-1.jpeg
│   │   ├── gallery-2.jpeg
│   │   ├── gallery-3.jpeg
│   │   ├── gallery-4.jpeg
│   │   ├── gallery-5.jpeg
│   │   ├── gallery-6.jpeg
│   │   ├── gallery-placeholder.jpg
│   │   ├── sustainability-logo.png
│   │   └── video.mp4
│   ├── robots.txt
│   └── sitemap.xml
├── vercel.json            # Vercel configuratie
└── README.md
```

## 🚀 Deployment naar Vercel

### Stap 1: Repository Setup
1. Push deze repository naar GitHub
2. Ga naar [Vercel Dashboard](https://vercel.com/dashboard)
3. Klik "New Project"
4. Import je GitHub repository

### Stap 2: Vercel Configuratie
Vercel detecteert automatisch de configuratie via `vercel.json`:

- **Root Directory**: `./site` (deployment root)
- **Build Command**: Geen (static hosting)
- **Output Directory**: `./site` (static files)

### Stap 3: Domain Setup
1. Ga naar Project Settings > Domains
2. Voeg `barcony.nl` toe
3. Update DNS records bij je registrar:
   - Type: CNAME
   - Name: `www` (voor www.barcony.nl)
   - Value: `cname.vercel-dns.com`
   - Of voor root domain: A record naar Vercel IP

### Stap 4: SSL Certificate
Vercel voorziet automatisch HTTPS certificaten voor alle domains.

## 🔧 Technische Details

### Folder-based Routing
Het `vercel.json` bestand zorgt voor proper routing:
- `/` → `/site/index.html`
- `/gallerij` → `/site/gallerij/index.html`
- `/barcony-modellen` → `/site/barcony-modellen/index.html`
- `/contact` → `/site/contact/index.html`

### Asset Optimalisatie
- Alle images zijn lokaal gedownload naar `/site/media/`
- Cache headers geconfigureerd voor optimale performance
- Media assets: 1 jaar cache (`max-age=31536000`)
- HTML files: 1 uur cache (`max-age=3600`)
- SEO files: 24 uur cache (`max-age=86400`)

### Fonts
Directe Google Fonts integratie (geen One.com proxy):
- IBM Plex Sans
- Cormorant
- Hind Guntur
- Open Sans
- Montserrat

## 🛠 Onderhoud

### Content Updates
1. Edit de HTML files in `/site/`
2. Commit en push naar GitHub
3. Vercel deployt automatisch

### Asset Updates
1. Upload nieuwe images naar `/site/media/`
2. Update HTML referenties naar nieuwe bestanden
3. Commit en push

### Font Updates
1. Update Google Fonts links in alle HTML files
2. Test op alle pages

## 📊 SEO & Performance

### SEO Optimalisaties
- ✅ Meta descriptions per pagina
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Structured data (JSON-LD)

### Performance Metrics
- Lighthouse score target: ≥90
- Core Web Vitals optimalisatie
- Image optimalisatie
- Font loading optimalisatie

## 🔍 Testing Checklist

### Pre-deployment
- [ ] Alle routes functioneel (`/`, `/gallerij`, `/barcony-modellen`, `/contact`)
- [ ] Alle images laden correct
- [ ] Fonts werken (geen fallback fonts zichtbaar)
- [ ] Navigatie werkt op desktop en mobile
- [ ] Contact formulier functioneel
- [ ] Geen console errors
- [ ] Mobile responsive design

### Post-deployment
- [ ] Vercel preview deployment test
- [ ] HTTPS actief
- [ ] Domain correct ingesteld
- [ ] SEO tools kunnen site crawlen
- [ ] Social media links werken
- [ ] Contact formulier verzendt emails

## 📞 Support

Bij problemen:
1. Check Vercel deployment logs
2. Controleer browser console voor errors
3. Test in incognito mode (cache problemen)
4. Controleer DNS propagation (kan 24-48 uur duren)

## 📝 Opmerkingen

- Contact formulier heeft momenteel geen backend integratie
- Video bestand (`video.mp4`) is groot - overweeg compressie
- Gallery images kunnen worden geoptimaliseerd voor web
- Overweeg lazy loading voor images
- Social media links verwijzen naar bestaande accounts

---

**Laatste update**: Januari 2024
**Deployment status**: Ready for Vercel
