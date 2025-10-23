# Shimmer Wave Effect - Complete Handleiding

## 📋 Wat is dit effect?
Het **Shimmer Wave Effect** is een moderne hover animatie waarbij een lichtgolf door een button beweegt, gecombineerd met achtergrondkleurverandering en lift effect.

## 🎯 CSS Code (Direct Kopiëren)

### 1. Basis Button Styling
```css
.btn-shimmer {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: #your-primary-color;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    min-width: 140px;
    text-align: center;
}
```

### 2. Shimmer Wave Effect
```css
.btn-shimmer::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.btn-shimmer:hover::before {
    left: 100%;
}
```

### 3. Hover Effecten
```css
.btn-shimmer:hover {
    background: #your-hover-color;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.btn-shimmer:active {
    transform: translateY(0);
}
```

## 🚀 HTML Gebruik
```html
<a href="#contact" class="btn-shimmer">Bestel Nu</a>
<button class="btn-shimmer">Click Me</button>
```

## ⚙️ Brand Kleuren Adaptatie

### Voor Barcony (Huidige Styling)
```css
.navbar__cta.btn-shimmer {
    background: transparent;
    color: #8b5a3c;
    border: 2px solid #8b5a3c;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 500;
    transition: all 0.15s ease;
}

.navbar__cta.btn-shimmer:hover {
    background: #8b5a3c;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Voor Andere Brands (Universeel)
```css
/* Vervang deze kleuren met je eigen brand kleuren */
--brand-primary: #your-primary-color;
--brand-primary-hover: #your-hover-color;
--brand-shimmer: rgba(255, 255, 255, 0.2);

.btn-shimmer {
    background: var(--brand-primary);
    color: white;
}

.btn-shimmer:hover {
    background: var(--brand-primary-hover);
}

.btn-shimmer::before {
    background: linear-gradient(90deg, transparent, var(--brand-shimmer), transparent);
}
```

## 🎨 Geavanceerde Varianten

### Met Gradient Achtergrond
```css
.btn-shimmer-gradient {
    background: linear-gradient(135deg, #color1 0%, #color2 100%);
}

.btn-shimmer-gradient:hover {
    background: linear-gradient(135deg, #hover-color1 0%, #hover-color2 100%);
}
```

### Met Custom Timing
```css
.btn-shimmer-slow::before {
    transition: left 1s ease;
}

.btn-shimmer-fast::before {
    transition: left 0.2s ease;
}
```

### Met Custom Shimmer Intensity
```css
.btn-shimmer-subtle::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.btn-shimmer-strong::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}
```

## 🔧 AI Agent Instructies

**Voor AI Agents die dit effect implementeren:**

1. **Analyseer de brand kleuren** uit het CSS bestand
2. **Identificeer de button class** die het effect nodig heeft
3. **Voeg de shimmer CSS toe** met de juiste brand kleuren
4. **Test hover effecten** in verschillende browsers

**Automatische implementatie commando:**
```bash
# Zoek brand kleuren
grep -r "color-primary\|--color-" css/

# Voeg shimmer effect toe aan bestaande buttons
sed -i.bak '/\.btn {/a\    position: relative;\n    overflow: hidden;' css/buttons.css
```

## 📱 Responsive & Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile friendly
- ✅ Touch devices compatible

## 🎯 Direct Implementeren

**Stap 1:** Kopieer de CSS naar je stylesheet
**Stap 2:** Voeg class `btn-shimmer` toe aan je buttons
**Stap 3:** Pas de kleuren aan je brand aan

**Klaar!** Het effect werkt direct zonder JavaScript.
