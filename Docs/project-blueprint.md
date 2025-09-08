## Doel en context

* Doel: huidige website van Barcony 1-op-1 online krijgen op Vercel, gekoppeld aan GitHub. Zo snel mogelijk live met identieke look-and-feel en URLs, daarna een lichte opschoonstap om afhankelijkheden van de One.com sitebuilder te verwijderen en assets lokaal te hosten.
* Projectmodus: volledig uitvoerbaar door een AI agent in Cursor via terminal prompts en bestandsmanipulatie. Menselijke acties blijven beperkt tot DNS bij de registrar en het inrichten van eventuele formulierdiensten of SMTP-credentials.
* Aanlevering: 4 HTML bronbestanden zoals genoemd door de opdrachtgever. Let op een mogelijk typefoutje in de bestandsnaam voor de galerijpagina.

  * Page Sources/home\_page\_source\_barcony.html
  * Page Sources/gallerij\_page\_source\_barcyony.html  ← let op spelling. Controleren of dit fout is en consistent maken naar gallerij
  * Page Sources/modellen\_page\_source\_barcony.html
  * Page Sources/contact\_page\_source\_barcony.html
* Doelroutes op productie:

  * Home op /
  * Galerij op /gallerij
  * Modellen op /barcony-modellen
  * Contact op /contact
* Hosting: Vercel, gekoppeld aan GitHub repo. Framework preset: Other of Static Site. Build step niet vereist, tenzij we later tooling toevoegen.

## Scope en uitgangspunten

* Route A is de snelle lift-and-shift. We houden alle paden en externe resources intact voor directe parity met de huidige site. Doel is een werkende preview en vervolgens productie.
* Route B is een lichte refactor. We verwijderen One.com runtime afhankelijkheden, vervangen de Google Fonts proxy door standaard Google Fonts, en hosten afbeeldingen lokaal. HTML blijft functioneel hetzelfde, alleen opgeschoond en met snellere, stabielere assets.
* Non-goals: geen redesign, geen nieuwe content, geen complexe refactor. Alleen netter en beheerbaarder maken van exact dezelfde site.
* Formulieren: als de contactpagina een form heeft dat op One.com mailde, dan werkt dat na migratie niet automatisch. De opdrachtgever regelt zelf Formspree of Basin of levert SMTP. Wij voorzien wel een plek in de structuur en duidelijke instructies.

## Verwachte output aan het eind

1. Productie op Vercel met domein barcony.nl gekoppeld aan het Vercel project.
2. Preview deployments op elke pull request vanuit GitHub.
3. Werkende routes voor home, gallerij, barcony-modellen en contact.
4. Route A: identieke rendering als de huidige site, inclusief bestaande externe image URLs.
5. Route B: lokale hosting van CSS/JS en afbeeldingen, fonts via Google Fonts, en behouden SEO met canonical, title en description. Robots.txt en sitemap.xml aanwezig.

## Repo structuur en conventies

* Repo root bevat een map site als publieke root. Vercel bouwt en serveert direct vanuit site.
* Mapstructuur voorstel:

  * site/index.html voor home
  * site/gallerij/index.html voor galerij
  * site/barcony-modellen/index.html voor modellen
  * site/contact/index.html voor contact
  * site/onewebstatic voor CSS en JS die in de HTML naar /onewebstatic verwijzen, indien behouden in Route A
  * site/media voor lokale afbeeldingen in Route B
  * site/robots.txt
  * site/sitemap.xml
  * vercel.json in repo root met statische instellingen zoals cleanUrls, cache headers voor static assets, en redirect van /index.html naar /
* Branching: main voor productie, feature branches voor wijzigingen. Vercel koppelen aan repo zodat main naar production gaat en feature branches naar preview.

## Route A – Lift-and-shift blueprint

Doel: zo snel mogelijk 1-op-1 parity op Vercel. Geen inhoudelijke wijzigingen.

Stappen voor de agent:

1. Project initialisatie

* Maak de repo structuur aan zoals hierboven beschreven.
* Plaats de vier aangeleverde HTML bestanden op de juiste plekken. Controleer de bestandsnamen en corrigeer gallerij indien typo.
* Zorg dat de interne links in de navigatie overeenkomen met de gewenste folder based routes. Controleer of ze naar de mappen wijzen en niet naar losse .html bestanden.

2. One.com assets en externe resources intact laten

* Inventariseer in de HTML referenties naar /onewebstatic en naar externe images op impro.usercontent.one of vergelijkbaar.
* Voor Route A: laat deze URLs staan zodat de pagina meteen rendert. Als de HTML verwijst naar /onewebstatic paden die niet publiek bereikbaar zijn buiten One.com, maak dan lokaal de map site/onewebstatic aan en vul die met de noodzakelijke CSS en JS door ze rechtstreeks op te halen van de originele site. Doel is dat alle referenties in de HTML resolven zonder 404.

3. Basis SEO bestanden

* Maak robots.txt met een permissieve policy en een verwijzing naar de sitemap.
* Maak sitemap.xml met de vier URL’s. Gebruik absolute URLs met https en het productiedomein.

4. Vercel configuratie

* vercel.json toevoegen met: clean URLs aan, cache headers voor static assets, en een redirect van /index.html naar /.
* Stel in Vercel via GitHub integratie in dat de output directory site is. Er is geen build command nodig.

5. Kwaliteitscontrole

* Controleer rendering op desktop en mobiel in een Vercel preview deployment.
* Klikpad: menu links, hero sectie, galerijweergave, knop naar modellen en de contactpagina.
* Controleer console errors en 404’s. Los ontbrekende assets op door ze alsnog lokaal te plaatsen of referenties te corrigeren.

6. Productie livezetten

* Merge naar main en laat Vercel automatisch een production deployment maken.
* De opdrachtgever wijzigt DNS bij de registrar naar Vercel.
* Controleer SSL, canonical tag op home en basis performance.

## Route B – Light refactor blueprint

Doel: dezelfde site behouden, maar zonder One.com runtime en met lokale assets voor snelheid en controle.

Stappen voor de agent, na succesvolle Route A of direct indien haalbaar:

1. Fonts

* Verwijder de One.com Google Fonts proxy linktag uit de HTML.
* Voeg reguliere Google Fonts preload en stylesheet tags toe voor de gebruikte families en gewichten, gelijkwaardig aan de huidige typografie. Doel is visueel identieke fonts.

2. One.com scripts en CSS opruimen

* Verwijder alle One.com specifieke runtime scripts die niet nodig zijn voor de weergave. Laat alleen de functioneel noodzakelijke onderdelen staan, bijvoorbeeld een lightbox als die aantoonbaar wordt gebruikt en geen betere vervanger krijgt.
* Bewaar de styling die het visuele resultaat bepaalt. Als die styling in onewebstatic CSS zit, neem die dan lokaal op onder site/onewebstatic of vervang het door een minimale, equivalent werkende stylesheet. Visuele gelijkwaardigheid is leidend.

3. Afbeeldingen lokaal hosten

* Inventariseer alle img src die naar externe hosts verwijzen. Download deze assets en plaats ze in site/media met een logisch mappenplan.
* Werk alle img src in de HTML bij naar de lokale paden. Let op varianten met queryparameters voor resizing bij de externe host. Kies vaste afmetingen of optimale formaten per breakpoints indien nodig, maar houd het eenvoudig en behoud visuele kwaliteit.

4. Linkopruiming en paden

* Zorg dat interne navigatielinks verwijzen naar de folder based routes. Vermijd .html in de URLs.
* Verwijder dode of overbodige scripts en link tags. Beperk het aantal requests waar mogelijk zonder visuele regressie.

5. SEO check

* Laat bestaande title en meta description per pagina intact of maak ze identiek aan de huidige site.
* Canonical op home naar de root. Overweeg canonical per subpagina naar de definitieve folder URL.
* Behoud of voeg Open Graph tags toe indien ze in de huidige HTML aanwezig zijn.
* Robots.txt en sitemap.xml blijven actief en up-to-date.

6. Performance en kwaliteit

* Doe een basis Lighthouse check in de preview deployment.
* Controleer CLS en LCP op de homepagina.
* Kijk naar lazy loading voor zware images als dit zonder layoutverschuiving kan en geen codecomplexiteit toevoegt. Alleen doen als eenvoudig en veilig.

7. Contactformulier

* Indien er een formulier is: parameteriseer endpoint via environment variables op Vercel of via een externe dienst. De opdrachtgever regelt de dienst en credentials. Wij voorzien in een POST endpoint of in het updaten van het form action attribuut zodra gegevens beschikbaar zijn.

8. Herverificatie inhoud

* Vergelijk de Route B rendering pixel-voor-pixel met Route A of de originele site op de kritische secties. Marges, fontgewicht, afstanden en image ratio’s moeten gelijkwaardig zijn.
* Controleer lightbox of galerijinteractie als die bestond. Vervang eventueel door een kleine, dependency-arme lightbox wanneer de One.com variant niet wenselijk is.

## Automatisering in Cursor – uitvoeringstactiek

* Eerst een inventory pass: de agent leest alle HTML, inventariseert stylesheets, scripts, fonts en images, en maakt een dependency lijst per pagina.
* Voor Route A: resolve alle paden. Als een pad naar /onewebstatic verwijst en publiek niet bestaat, kopieer dan de tegenhanger uit de originele site naar site/onewebstatic en update zo min mogelijk.
* Voor Route B: verwijder of vervang One.com resources. Fonts via Google Fonts, images lokaal. HTML herschrijven met minimale ingreep en behoud van layout.
* Automatische checks:

  * Linkchecker over de site map.
  * HTML validator op de vier pagina’s.
  * Asset existence check.
  * Screenshot diff tussen Route A en B per pagina om regressies te vangen.
* Git workflow: commit per stap met duidelijke messages, PR openen naar main, Vercel preview controleren, daarna merge.

## Kwaliteits- en acceptatiecriteria

* Visuele parity: de verschillen tussen Route A en originele site zijn nihil. Route B mag hooguit microverschillen in rendering geven die niet opvallen voor eindgebruikers.
* Functionele parity: navigatie, knoppen en eventueel galerijgedrag werken gelijkwaardig.
* Geen 404’s of console errors.
* SEO basis op orde: titels, descriptions, canonical, robots en sitemap.
* Pages laden zonder externe One.com runtime afhankelijkheden na Route B.
* Alle afbeeldingen worden lokaal geserveerd na Route B tenzij er een bewuste uitzondering is, vastgelegd in de README.

## Redirects en 404 beleid

* Clean URLs actief. Directe toegang tot /index.html redirect naar /.
* Als er historisch verkeer is naar .html paden, configureer dan redirect rules van .html naar de folder route. Dit kan in vercel.json worden vastgelegd.
* 404 pagina optioneel toevoegen als index.html in een 404 map of via Vercel fallback. Niet verplicht voor deze migratie, wel netjes voor later.

## Beveiliging en privacy

* Zorg dat er geen gevoelige data in de repo staat.
* Environment variables voor formulieren of SMTP alleen in Vercel, niet in source control.
* Respecteer auteursrechten van afbeeldingen. We gaan ervan uit dat de huidige beelden eigendom zijn van de site-eigenaar en mogen worden hergehost.

## Deploystrategie en roll-back

* Elke feature branch naar preview. Controles uitvoeren en resultaten in PR documenteren met korte checklist.
* Productie via merge naar main.
* Bij incidenten prod terugrollen door een eerdere deployment te promoten of PR te revert-en. Vercel ondersteunt snelle rollbacks.

## Documentatie en overdracht

* Voeg een README toe met:

  * Korte uitleg over structuur en build-free hosting op Vercel.
  * Hoe nieuwe pagina’s toe te voegen met folder based routing.
  * Hoe afbeeldingen toe te voegen onder site/media.
  * Hoe environment variables te beheren op Vercel voor het contactformulier.
  * Hoe redirects en headers in vercel.json te wijzigen.

## Bekende risico’s en mitigaties

* Externe assets die later verdwijnen. Route B lost dit op door lokaal te hosten.
* Lightbox of galerij afhankelijk van One.com scripts. Oplossing is een kleine, dependency-arme vervanger of statische weergave.
* Typos in padnamen. Controleer en normaliseer gallerij consistent naar gallerij.
* DNS overgang. Dit is door de opdrachtgever geregeld. Na cutover testen we nogmaals SSL en canonical.

## Checklist voor de agent

Route A

* Repo en map site opzetten, vier pagina’s plaatsen, paden controleren.
* One.com assets oplossen zodat alle referenties resolven.
* Robots.txt en sitemap.xml toevoegen.
* vercel.json met clean URLs, cache headers en redirect voor index.html.
* Vercel koppelen aan GitHub, output directory site.
* Preview check en vervolgens productie.

Route B

* Fonts via Google Fonts, One.com proxy verwijderen.
* Onnodige One.com scripts verwijderen, noodzakelijke styling lokaal behouden.
* Alle externe images downloaden, onder site/media plaatsen, HTML bijwerken naar lokale paden.
* Interne links verifiëren, .html links vermijden.
* SEO double check.
* Lighthouse sanity check.
* Merge en live.

Eindresultaat

* Barcony site draait op Vercel onder barcony.nl met identieke look-and-feel en snellere, stabielere assets.
* Repo is schoon, beheersbaar en klaar voor kleine toekomstige uitbreidingen zonder afhankelijkheid van de oorspronkelijke sitebuilder.