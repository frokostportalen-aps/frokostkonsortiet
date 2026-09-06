# Frontend: ét komponentsystem, tre sites

Platformen hoster tre sites — Frokost Konsortiet, Smagssans og Fra Jorden — på
hver sit domæne, ud af én Payload-instans og **ét sæt komponenter**. Ingen blok
og ingen hero findes i tre udgaver. Forskellen mellem sitene bor fire steder,
og det er dem, dette dokument beskriver: *"ét sprog, tre dialekter."*

Se også [ADR-0001](adr/0001-multi-tenant-from-single-payload.md) (multi-tenant
ud af én instans) og [ADR-0002](adr/0002-additive-per-tenant-seed.md)
(additiv seed pr. tenant).

---

## De fire lag

### 1. Paletten — CSS-variabler, injiceret pr. request

`src/themes/tenantThemes.ts` er registret: ét objekt pr. site med farver,
`radius`, `displayScale`, `textInset`, `eco` og `heroScrim`.
`src/components/TenantTheme/index.tsx` skriver dem ud som CSS-variabler i ét
`<style>`-tag med tre regler:

| Regel | Indhold |
| --- | --- |
| `[data-theme='light'], [data-theme='dark']` | brandfarver, form, skala — **holder i begge tilstande** |
| `[data-theme='light']` | de ambiente flader — **kun dagslys** |
| `[data-theme='dark']` | eventuelle mørke overrides — skrives sidst og vinder |

Det er dét, der gør, at en blok kan skrive `bg-primary` og få Fra Jordens
terracotta det ene sted og Konsortiets blæk det andet, uden at kende nogen af
dem. Familiens fælles udgangspunkt står i paletblokkene i
`src/app/(frontend)/globals.css`; tenanten overskriver kun det, der bærer
identitet.

**Reglen der ikke er til forhandling:** flader er kun-lys, brand og form holder
i begge. Lægger du en fladefarve i brand-gruppen, får du blege øer i mørk
tilstand. Lægger du form eller skala blandt fladerne, forsvinder den efter
mørkets frembrud — det var præcis fejlen med `radius`, hvor Fra Jordens
bevidst skarpe `0.25rem` blev familiens `0.625rem` om natten.

### 2. Skriften — `src/themes/fonts.ts`

Hvert site peger `--font-sans` på sin egen font og kan have en separat
overskriftsfont via `--font-heading`. Fra Jorden kører Playfair over Jost,
Smagssans det samme snit over Mulish, Konsortiet Poppins til begge.

Brug **ikke** `weight: [...]` på en variabel font. Det får `next/font` til at
hente én statisk fil pr. vægt i stedet for én variabel fil — på Mulish kostede
det 4,7 KB render-blokerende CSS, hvor tyve `@font-face`-regler pegede på fem
filer. Poppins er reelt statisk, så dens vægtliste er korrekt.

### 3. Dialekten — `src/themes/dialect.ts`

Fem akser, der ikke er farver, men **valg**:

| Akse | Hvad den styrer |
| --- | --- |
| `signature` | motivet: streg, bjælke eller skitse |
| `eyebrow` | de små labels' form: versaler, kapitæler eller almindelig |
| `heroVariant` | hvilken hero-komponent der renderes |
| `chrome` | om header og footer er faste lyse flader |
| `tagline` | sitets korte linje |

Læses med `getDialect(tenantSlug)`. Grænsen mellem tema og dialekt er
**værdier bliver CSS-variabler; opremsninger bliver i dialekten og læses i
JSX**. Det er derfor `heroScrim` ikke længere er en dialekt-akse: det var en
farve, der rejste som JSX-prop, og opskriften fandtes i tre kopier.

### 4. Brand-assets — Payload

Logo og favicon ligger i en `brand`-global, som redaktøren styrer
(`src/themes/resolveTenantBrand.ts`). Farverne bliver i koden; billederne gør
ikke.

---

## Hvordan en side bliver til

1. `src/proxy.ts` slår værtsnavnet op og finder tenanten.
2. Tenant-layoutet henter tema og skrift, sætter font-variablerne på en wrapper
   og rendrer `TenantTheme`, som lægger `<style>`-tagget ud.
3. Indholdet læses gennem **én seam**: `src/data/tenantContent.ts`. Hver
   funktion kræver et `tenantSlug`, så ingen frontend-læsning kan glemme sin
   scoping — lækagerisikoen ADR-0001 udpeger bor her og intet andet sted.
4. `src/blocks/RenderBlocks.tsx` rendrer sidens blokke og giver hver enkelt
   `tenantSlug`. Blokken bruger tokens til farve og form og kalder `getDialect`
   kun, hvis den har brug for en personlighedsakse.

---

## Hvor retter man hvad

| Du vil ændre | Du redigerer |
| --- | --- |
| En farve på ét site | `tenantThemes.ts` — det ene felt |
| Alle sites' fælles udgangspunkt | paletblokkene i `globals.css` |
| Overskriftsstørrelsen på ét site | `displayScale` — hele skalaen følger med |
| Et sites motiv eller hero-type | dialekt-akserne i `tenantThemes.ts` |
| Hvordan en blok ser ud **overalt** | blokkens komponent — aldrig per-tenant |
| En ny farverolle | token i `@theme inline` + felt i `ThemeVars` + linje i `TenantTheme` |
| En ny blok | `blockConfigs.ts` (config) + `RenderBlocks.tsx` (renderer) |

`blockConfigs` og `RenderBlocks` er med vilje adskilt: configen bygges i Node
til `generate:types` og migrationer, så en React-renderer i den graf trækker
`.scss`- og browser-imports med og brækker builden. Rendererens map er typet
mod den genererede blok-slug-union, så en blok uden renderer er en
compileringsfejl, ikke en tom sektion.

---

## Fælder, der har kostet os noget

**Sæt aldrig en forgrundsfarve, når fladen allerede har sat en.** Båndet
bestemmer sin tekstfarve; overskriften arver. `SectionHeader` havde en
`tone`-prop, der hardkodede `text-primary-foreground` — så da nøgletals-båndet
fik en øko-flade, blev overskriften tegnet i brandfarvens forgrund, og tallene
stod ~2,5:1 i mørk tilstand.

**Tema-registret må ikke krydse klientgrænsen.** `getDialect` importerer hele
registret, så en `'use client'`-komponent, der kalder den, sender alle tre
sites' paletter til browseren. Slå den op på serveren og send akserne videre
som props — det er sådan heroerne, headeren, ordningsvælgeren og
`SectionHeader` gør det. *Stadig åbent:* `RichText` importerer `CallToAction`,
som kalder `getDialect`, så registret (~1 KB brotli) følger med på de fleste
sider ad den vej.

**Nye tokens skal kendes af `cn()`.** `tailwind-merge` kender kun Tailwinds egne
skalaer, så `cn('rounded-lg', 'rounded-band')` beholdt begge klasser, og
kilderækkefølgen — ikke kalderen — bestemte hjørnet. Hver token i `@theme`, der
deler property med en indbygget skala, skal registreres i
`src/utilities/ui.ts`.

**Håndskrevne utility-klasser sorterer efter de genererede.** `.container` var
skrevet som en regel i `@layer utilities` og slog derfor `max-w-*` på samme
element: `container max-w-3xl` rendrede i fuld bredde. Enkeltdeklarationer, der
skal kunne overskrives, hører i `@utility`; kun sammensatte opskrifter, der
*skal* slå utilities, står ulagrede — og så med en begrundelse i filen.

**Roden er ikke bind-mountet.** `docker-compose.yml` mounter kun `./src` og
`./scripts`. Ændringer i `tailwind.config.mjs`, `next.config.ts` eller
`package.json` kræver et image-rebuild, ikke en genstart — ellers tester du den
gamle konfiguration uden at vide det.

---

## Hvor systemet stadig er shallow

Ærlige, kendte svagheder, som review har peget på og vi ikke har taget:

- **Tilstands-politikken bor i tre arrays** i `TenantTheme` i stedet for på
  feltet. Glemmer man at tilføje et nyt felt til et array, gør feltet
  ingenting — uden fejl. En spec-tabel keyed på feltnavnet ville gøre det
  umuligt.
- **Bånd bygges i hånden fem steder** (`Stats`, `CallToAction`, `IconRow`,
  `Testimonials`, `PlanPicker`), hver med sit eget valg af flade og forgrund.
  Én `Band`-wrapper ville sætte parret ét sted og lade efterkommere arve.
- **Signaturtabellen er keyed på placering**, ikke på de to ting der faktisk
  varierer (bredde, og om mærket følger tekst- eller brandfarve). Derfor er
  `pageHeader.block` det eneste `block`-mærke uden `rounded-full`, og
  `heroEyebrow` blander `bg-current` og `bg-primary` i én kontekst.
- **`opacity: 0`-værnet** skjuler dokumentet, indtil tema-scriptet stamper
  `data-theme`. Det har nu et sikkerhedsnet efter 400 ms, men rodfixet er at
  server-rendre `data-theme` fra en cookie, så der ikke er noget at skjule.
- **Formateringsdrift** i omkring 40 filer; prettier er ikke håndhævet.

---

## Historik: de fire deepening-opgaver

Dokumentet var oprindeligt en liste over fire arkitekturopgaver fra en
gennemgang med `/improve-codebase-architecture`. **Alle fire er landet**, og
det er dem, strukturen ovenfor beskriver:

| Opgave | Landede som |
| --- | --- |
| 1. Tenant-scoping mangler en seam | `src/data/tenantContent.ts` + `tenantScope.ts` |
| 2. Dialekten er prop-threading, ikke et modul | `src/themes/dialect.ts` (`getDialect`) |
| 3. Blocks genimplementerer deres skal | `blockConfigs.ts`, `RenderBlocks.tsx`, `SignatureCard` |
| 4. Hero-variant og header-tema koblet via effekt-i-render | `useHeaderThemeSync` |
