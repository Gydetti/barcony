# Barcony Vercel Migration Plan - Uitvoering

## 📋 Uitgangssituatie Analyse

**Blueprint assessment: ✅ Grotendeels haalbaar**
- Route A (lift-and-shift): ⚠️ Uitdagend door complexe One.com afhankelijkheden
- Route B (refactor): ✅ Uitstekend plan voor duurzame oplossing
- **Aanbeveling**: Begin met Route B voor sneller, stabieler eindresultaat

**Kritische bevindingen:**
- **Typefout bevestigd**: `gallerij_page_source_barcyony.html` → moet zijn `gallerij_page_source_barcony.html`
- **34+ externe referenties** per HTML bestand naar One.com assets
- **Complexe HTML structuur** met One.com-specifieke classes en scripts
- **Font proxy afhankelijkheid** via `/onewebstatic/google-fonts.php`

## 🎯 Uitvoeringsstrategie

### Fase 1: Basis Setup (Route B - Directe aanpak)
**Doel**: Snelle, schone implementatie zonder One.com afhankelijkheden

#### 1.1 Project structuur aanmaken
```bash
# Repository root
├── site/                    # Public root voor Vercel
│   ├── index.html          # Home (/)
│   ├── gallerij/
│   │   └── index.html      # Gallerij (/gallerij)
│   ├── barcony-modellen/
│   │   └── index.html      # Modellen (/barcony-modellen)
│   ├── contact/
│   │   └── index.html      # Contact (/contact)
│   ├── media/              # Lokale afbeeldingen
│   ├── onewebstatic/       # Lokaal CSS/JS (indien nodig)
│   ├── robots.txt
│   └── sitemap.xml
├── vercel.json             # Vercel configuratie
└── README.md
```

#### 1.2 Assets inventory & download
**Prioriteit assets om te downloaden:**
- Logo: `picture-1200.png`
- Favicon: `faviconV2.png`
- Galerij afbeeldingen: `P 1 1.jpeg` t/m `P 1 6.jpeg`
- Achtergrond: `picture-2600_.png`
- Decoratie: `Screen Shot 2023-09-06 at 15.08.51.png`

**Download strategy:**
```bash
# Download alle unieke images naar site/media/
curl -L "https://impro.usercontent.one/appid/hostnetWsb/domain/barcony.nl/media/barcony.nl/onewebmedia/picture-1200.png" -o site/media/logo.png
# ... voor alle assets
```

#### 1.3 HTML opschoning per pagina
**Voor elke pagina (home, gallerij, modellen, contact):**
1. ✅ Verwijder One.com proxy fonts: `/onewebstatic/google-fonts.php*`
2. ✅ Vervang door directe Google Fonts links
3. ✅ Update image src naar lokale `/media/` paden
4. ✅ Verwijder One.com-specifieke scripts (privacy policy, etc.)
5. ✅ Bewaar functioneel noodzakelijke CSS voor layout
6. ✅ Controleer navigatie links (folder-based routing)

### Fase 2: Vercel Configuratie

#### 2.1 vercel.json
```json
{
  "functions": {},
  "redirects": [
    { "source": "/index.html", "destination": "/", "permanent": true }
  ],
  "headers": [
    {
      "source": "/media/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

#### 2.2 Build setup
- **Framework preset**: "Other"
- **Root directory**: `site/`
- **Build command**: geen (static files)
- **Output directory**: `site/` (zelfde als root)

### Fase 3: Content & SEO

#### 3.1 SEO essentials
- ✅ Robots.txt: permissief voor alle crawlers
- ✅ Sitemap.xml: absolute URLs naar productie domein
- ✅ Canonical tags: naar folder-based routes
- ✅ Meta tags: behoud bestaande titles/descriptions

#### 3.2 Content verificatie
- ✅ Folder-based routing: `/gallerij` i.p.v. `/gallerij.html`
- ✅ Interne links controleren
- ✅ Image alt-tags behouden
- ✅ Button/link functionaliteit verifiëren

## 🛠️ Uitvoeringsstappen (Concrete acties)

### Stap 1: Repo setup
```bash
mkdir -p site/{gallerij,barcony-modellen,contact,media}
git checkout -b migration-route-b
```

### Stap 2: Assets download
```bash
# Download alle images naar site/media/
# Controleer en normaliseer gallerij bestandsnaam
mv "Page Sources/gallerij_page_source_barcyony.html" "Page Sources/gallerij_page_source_barcony.html"
```

### Stap 3: HTML processing (per pagina)
1. **Font migratie**: One.com proxy → directe Google Fonts
2. **Image migratie**: externe URLs → lokale `/media/` paden
3. **Script cleanup**: verwijder One.com-specifieke scripts
4. **Link verificatie**: folder-based routing

### Stap 4: SEO & meta
- Maak robots.txt en sitemap.xml
- Controleer meta tags en Open Graph data

### Stap 5: Vercel deployment
- Push naar GitHub
- Vercel automatisch deployment
- Preview testen, dan productie

## 📊 Tijdlijn & Effort

### Route A (Lift-and-shift) - ⚠️ Complex
- **Voordeel**: Snelle parity
- **Nadeel**: 34+ externe afhankelijkheden per pagina
- **Effort**: 4-6 uur voor troubleshooting
- **Risico**: Assets verdwijnen, performance issues

### Route B (Clean refactor) - ✅ Aanbevolen
- **Voordeel**: Onafhankelijk, sneller, stabieler
- **Nadeel**: Meer werk upfront
- **Effort**: 2-3 uur totaal
- **Risico**: Laag (alles onder eigen controle)

## 🔍 Kwaliteit Checks

### Pre-deployment
- [ ] Alle images lokaal gedownload
- [ ] Font links werken (geen proxy)
- [ ] Navigatie links kloppen
- [ ] Geen 404 errors in console
- [ ] Mobile/desktop responsive

### Post-deployment
- [ ] Vercel preview deployment test
- [ ] Lighthouse score ≥ 90
- [ ] SEO tools (rich results test)
- [ ] Cross-browser test

## 🚀 Go-live Checklist

- [ ] DNS naar Vercel (door opdrachtgever)
- [ ] SSL certificaat actief
- [ ] Alle routes functioneel (/, /gallerij, /barcony-modellen, /contact)
- [ ] Contactformulier functioneel (indien aanwezig)
- [ ] Google Analytics/Search Console ingesteld

## 📋 Risico's & Mitigaties

1. **Asset download fails**: Alternatieve bronnen zoeken of placeholder images
2. **Font rendering verschil**: Testen op verschillende browsers
3. **Formulier verlies**: Documenteren voor handmatige heropbouw
4. **SEO impact**: Canonical tags en redirects implementeren

---

**Aanbeveling**: Start direct met Route B. Dit geeft sneller en stabieler resultaat met volledige controle over assets en dependencies.
