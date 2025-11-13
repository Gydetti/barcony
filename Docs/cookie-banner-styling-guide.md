# Cookie Banner Styling Guide voor AI Agents

## Overzicht
Deze guide beschrijft hoe je de CopyCoffee cookie banner exact kunt namaken met alle styling details: glassmorphism effecten, schaduwen, animaties en Google Consent Mode v2 integratie.

## Kern Styling Principes

### 1. Glassmorphism Effect (Frosted Glass)
De banner gebruikt een glassmorphism effect met backdrop blur voor een moderne, elegante uitstraling:

```tsx
<Card className="relative overflow-hidden rounded-xl border-primary-200/50 bg-warm-white/90 text-brand-primary backdrop-blur-xl shadow-2xl ring-1 ring-black/5">
```

**Belangrijke classes:**
- `bg-warm-white/90` - Semi-transparante achtergrond (90% opacity)
- `backdrop-blur-xl` - Sterke blur van achterliggende content
- `border-primary-200/50` - Subtiele border met 50% opacity
- `ring-1 ring-black/5` - Zeer subtiele ring shadow (5% opacity)

### 2. Shadow Systeem
Multi-layer shadow approach voor diepte:

**Hoofd container:**
- `shadow-2xl` - Grote, zachte schaduw voor diepte

**Buttons:**
- `shadow-lg` - Standaard button shadow
- `hover:shadow-xl` - Versterkte shadow bij hover
- `transition-all duration-200` - Smooth shadow transitions

### 3. Positionering & Layout

```tsx
<motion.div
  className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
  style={{ transform: "translateZ(0)", willChange: "transform" }}
>
  <div className="mx-auto max-w-7xl pointer-events-auto">
```

**Belangrijk:**
- `fixed bottom-0` - Vastgezet onderaan viewport
- `z-[9999]` - Zeer hoge z-index voor overlay
- `max-w-7xl` - Maximale breedte container
- `pointer-events-auto` - Zorgt dat clicks werken binnen de banner
- `transform: translateZ(0)` - Hardware acceleration voor smooth animaties

### 4. Framer Motion Animaties

```tsx
<motion.div
  initial={{ y: "100%", opacity: 1 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: "100%", opacity: 1 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
>
```

**Animatie details:**
- **Initial**: Banner start 100% naar beneden (buiten beeld)
- **Animate**: Schuift omhoog naar y: 0
- **Exit**: Schuift terug naar beneden bij sluiten
- **Transition**: Spring physics voor natuurlijke beweging
  - `damping: 25` - Controleert bounce
  - `stiffness: 300` - Snelheid van animatie

### 5. Color Palette

**Custom Tailwind kleuren (uit tailwind.config.js):**
```js
"warm-white": "#F9F4EC",  // Warme off-white achtergrond
"primary": {
  200: "#e6c085",  // Border kleur
  // ... andere primary shades
}
"brand-primary": "#4A2E2A",  // Diepe koffie bruin voor tekst
```

**Gebruik in banner:**
- `bg-warm-white/90` - Achtergrond
- `text-brand-primary` - Hoofdtekst kleur
- `text-slate-600` - Secundaire tekst
- `text-slate-500` - Tertiaire tekst

### 6. Icon & Badge Styling

**Icon container:**
```tsx
<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white">
  <Shield className="h-6 w-6" />
</div>
```

**GDPR Badge:**
```tsx
<Badge
  variant="secondary"
  className="mt-1 border-emerald-500/30 bg-emerald-500/20 text-emerald-700"
>
  GDPR Compliant
</Badge>
```

### 7. Button Variants

**Primary (Accept All):**
```tsx
<Button
  variant="brand"
  className="shadow-lg hover:shadow-xl transition-all duration-200"
>
```

**Secondary (Reject All):**
```tsx
<Button
  variant="outline"
  className="border-primary-700/50 text-slate-800 hover:bg-transparent"
>
```

**Ghost (Customize):**
```tsx
<Button
  variant="ghost"
  className="text-slate-600 hover:text-slate-900"
>
```

### 8. Responsive Design

**Padding:**
- `p-4 sm:p-6` - Kleiner op mobile, groter op desktop

**Layout:**
- `flex-col lg:flex-row` - Stack op mobile, side-by-side op desktop
- `lg:items-end` - Align items aan onderkant op desktop

**Text sizing:**
- Emoji in title: `text-4xl` met `sm:ml-3 sm:-translate-y-0.5` voor positioning

### 9. Preferences Panel Styling

**Category cards:**
```tsx
<div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
```

**Grid layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

## Complete Component Structuur

```tsx
<AnimatePresence>
  <motion.div
    // Animation props
    className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
    style={{ transform: "translateZ(0)", willChange: "transform" }}
  >
    <div className="mx-auto max-w-7xl pointer-events-auto">
      <Card className="relative overflow-hidden rounded-xl border-primary-200/50 bg-warm-white/90 text-brand-primary backdrop-blur-xl shadow-2xl ring-1 ring-black/5">
        <CardContent className="relative p-6 sm:p-8">
          {/* Content */}
        </CardContent>
      </Card>
    </div>
  </motion.div>
</AnimatePresence>
```

## Google Consent Mode v2 Integratie

De banner werkt samen met `ConsentManager.tsx` die Google Consent Mode v2 implementeert:

**Belangrijke functies:**
- `initializeGoogleConsentMode()` - Initialiseert consent defaults
- `updateGoogleConsentMode()` - Update consent state naar Google
- `getGoogleConsentMode()` - Mapt preferences naar Google format

**Consent types:**
- `ad_storage`
- `analytics_storage`
- `functionality_storage`
- `personalization_storage`
- `ad_user_data`
- `ad_personalization`
- `security_storage`

## Checklist voor Implementatie

1. ✅ Installeer dependencies:
   - `framer-motion` voor animaties
   - `lucide-react` voor icons
   - shadcn/ui components (Card, Button, Badge, Switch)

2. ✅ Voeg custom colors toe aan tailwind.config.js:
   - `warm-white: "#F9F4EC"`
   - `brand-primary` en `brand-orange` palettes

3. ✅ Implementeer ConsentManager context:
   - State management voor preferences
   - Google Consent Mode v2 integratie
   - LocalStorage persistence

4. ✅ Styling classes toepassen:
   - Glassmorphism: `backdrop-blur-xl bg-warm-white/90`
   - Shadows: `shadow-2xl` op card, `shadow-lg` op buttons
   - Borders: `border-primary-200/50`
   - Rings: `ring-1 ring-black/5`

5. ✅ Framer Motion setup:
   - AnimatePresence wrapper
   - Spring transition met damping: 25, stiffness: 300
   - Slide-up animatie van bottom

6. ✅ Responsive breakpoints:
   - Mobile-first approach
   - `sm:` en `lg:` breakpoints voor layout changes

## Best Practices

- **Performance**: Gebruik `transform: translateZ(0)` voor hardware acceleration
- **Accessibility**: Zorg voor goede contrast ratios en focus states
- **UX**: Smooth animaties zonder jarring movements
- **Consistency**: Gebruik dezelfde shadow/ring systemen door hele app

## Referentie Bestanden

- Component: `apps/web/src/components/consent/CookieBanner.tsx`
- Manager: `apps/web/src/components/consent/ConsentManager.tsx`
- Config: `apps/web/tailwind.config.js`
- Text config: `apps/web/src/lib/config/site.ts`

