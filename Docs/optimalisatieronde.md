# Optimalisatieronde Blueprint

Doel: De huidige site naar (minimaal) de kwaliteit van de oude, beeldrijke variant tillen. Focus op snelle, kleine, veilige edits met duidelijk meetbare verbeteringen.

## 0. Werkwijze
- Werk in kleine commits per sectie (hero, video, modellen, formulier, etc.).
- Test lokaal met een throttled netwerk (Fast 3G) en mobiel viewport.
- Houd code minimalistisch en verwijder geen functionaliteit zonder vervanging.

## 1. Hero-sectie (boven de vouw)
- Herstel 6-foto grid direct onder H1.
- Voeg primaire CTA toe: "Modellen bekijken" (ankers naar modellen-sectie).
- Techniek:
  - Gebruik `<picture>` met WebP/AVIF fallback naar JPEG/PNG.
  - Elke `<img>`: `loading="lazy"` (behalve eerste), `decoding="async"`, `width/height` ingevuld, zinnige `alt`.
  - Eerste zichtbare afbeelding: `fetchpriority="high"`.

## 2. Video
- Voeg `poster="/site/media/video-poster.jpg"` toe, `preload="metadata"`, `playsinline`, `controls`.
- Lazy-load via `loading="lazy"` op een omhullende `iframe` of intersection observer als eigen player.

## 3. Modellen (rond-cirkels)
- Maak een consistent grid met 5 items (responsive: 5 kolommen → 3 → 2 → 1).
- Elke cirkel klikbaar naar `site/modellen/` of lightbox.
- Voeg korte introductie-paragraaf boven grid.

## 4. Afbeeldingen en bestandsnamen
- Hernoem bestanden met spaties: `P 1 9.jpeg` → `p-1-9.jpg` (kebab-case).
- Genereer WebP/AVIF varianten; plaats naast originelen.
- Gebruik `<picture>` overal waar grote afbeeldingen staan.

## 5. Typografie en hiërarchie
- Versterk H2/H3 (gewicht/maat), reduceer verticale witruimte rond decoratieve lijnen.
- Beperk decorative separators tot sectie-overgangen.

## 6. Formulier UX
- Labels boven inputs; placeholders aanvullend.
- Voeg `autocomplete`-attributen, duidelijke validatie-teksten en states (error/success).
- Vergroot contrast en affordance van verzendknop. Micro-CTA: "Reactie binnen 24 uur".

## 7. Navigatie
- Duidelijke active-state; focus-states voor keyboard.
- Overweeg sticky nav met subtiele schaduw.

## 8. Toegankelijkheid (A11y)
- Alt-teksten en beschrijvende `aria-label`s voor icon links.
- Contrast ≥ WCAG AA, focus-styling zichtbaar.

## 9. Performance
- Lazy-load alle niet-kritische afbeeldingen en iframes.
- Preload/logo `fetchpriority="high"`. Preconnect naar fonts, of host fonts lokaal.
- Inline critical CSS voor above-the-fold; deferr niet-kritische JS.

## 10. SEO
- Eén H1; semantische H2 per sectie.
- Unieke `title` en `meta description` per pagina.
- Open Graph/Twitter cards en `canonical` URL.
- Structured data: `Organization` en `Product` voor modellen.

## 11. Gallery/Lightbox
- Eenvoudige, dependency-light lightbox (CSS + klein JS) voor alle foto’s.

## 12. Sitemap/Robots
- Update `site/sitemap.xml` als paden wijzigen. Controleer `robots.txt` op allow/deny.

## 13. Testlijst (gereed-check)
- CLS < 0.1, LCP < 2.5s (lokaal gemeten), geen 404 media.
- Alle afbeeldingen hebben `alt`; keyboard-nav volledig mogelijk.
- Cirkels-grid toont 5 items in één nette layout.
- Video toont poster en speelt inline op mobiel.

## Uitvoering: taken
1) Hero grid + CTA (HTML/CSS).  
2) Video poster + lazy.  
3) Modellen 5-cirkel grid klikbaar.  
4) Media hernoemen + `<picture>` implementeren.  
5) Typografie/spacing opschonen.  
6) Formulier UX.  
7) Navigatie states/sticky.  
8) A11y + performance optimalisaties.  
9) SEO + meta/OG.  
10) Lightbox.  
11) Sitemap/robots.
