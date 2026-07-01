# Frontend deepening — arkitekturopgaver

Fire deepening-muligheder fundet i en arkitekturgennemgang af frontend'en
(`/improve-codebase-architecture`). Målet er at gøre shallow moduler dybe:
mere adfærd bag mindre interface, bedre **locality** (ændringer samlet ét sted)
og bedre testbarhed.

Sproget: **modul** (interface + implementation), **interface** (alt en kalder
skal vide — inkl. invarianter), **dybde** (meget adfærd bag lille interface),
**shallow** (interface ≈ implementation), **seam** (ét sted adfærd kan ændres),
**deletion test** (forsvinder kompleksiteten hvis modulet slettes, eller dukker
den op igen spredt ud?).

Ingen af opgaverne modsiger [ADR-0001](adr/0001-multi-tenant-from-single-payload.md)
eller [ADR-0002](adr/0002-additive-per-tenant-seed.md) — de handler om
multi-tenant-strukturen og seed-strategien, ikke om læse-laget eller
frontend-komposition.

Hver opgave har sin egen branch (se nederst).

---

## 1. Tenant-scoping mangler en seam

**Branch:** `refactor/tenant-data-access-seam`
**Prioritet:** Højest — lukker ADR-0001's udpegede toprisiko.

**Filer:**
- `src/utilities/tenantPostsFilter.ts` (`getTenantPostsWhere`)
- `src/utilities/getDocument.ts` (`tenantSlug?` er valgfri)
- Kaldesteder: `app/(frontend)/[tenant]/[slug]/page.tsx:114`,
  `posts/[slug]/page.tsx:99`, `posts/page.tsx`, `search/page.tsx`,
  `blocks/ArchiveBlock/Component.tsx:40`, `(sitemaps)/…`

**Problem:** ADR-0001 udpeger cross-tenant-lækage som den vigtigste invariant,
men den håndhæves kun ved konvention. `getTenantPostsWhere()` bliver hånd-flettet
ind i `where`-klausuler 5+ steder; andre steder er `{ 'tenant.slug': { equals } }`
hårdkodet inline. Læse-interfacet gør tenant *valgfri* (`getDocument(..., tenantSlug?)`,
`ArchiveBlock`'s `tenantSlug?`) — glemmer man den, lækker ét køkkens indhold til et
andet, og intet fanger det ved compile-tid eller i test.

**Løsning:** Saml al indholdslæsning bag ét tenant-scoped data-access-modul, hvor
man ikke kan hente pages/posts *uden* at angive en tenant (tenant bliver påkrævet
del af interfacet). Aggregator-undtagelsen for main-tenanten bor så ét sted.

**Gevinst:**
- **Locality:** Hele lækage-risikoen samler sig ét sted; en reviewer læser ét modul.
- **Leverage:** Nye features arver scoping gratis.
- **Test:** Interfacet bliver testfladen — "køkken A ser aldrig køkken B" og
  aggregator-adfærd kan enhedstestes. **Deletion test: består klart.**

---

## 2. Tenant-personligheden (dialekten) er prop-threading, ikke et modul

**Branch:** `refactor/tenant-dialect-module`
**Prioritet:** Høj — flugter tættest med kerne-modellen "ét sprog, tre dialekter".

**Filer:**
- `src/themes/tenantThemes.ts` (`getTenantDesign`)
- `src/blocks/RenderBlocks.tsx:41`, `app/(frontend)/[tenant]/[slug]/page.tsx`
  (resolves 2. gang)
- `src/heros/RenderHero.tsx`, `blocks/Content/Component.tsx`,
  `blocks/MediaContent/Component.tsx`

**Problem:** `getTenantDesign(tenant)` resolves uafhængigt mindst to gange pr. side.
`design` prop-threades til *alle* blocks, men kun 2 af ~10 læser den. Personligheden
lever tre steder på én gang: som CSS (`TenantTheme`), som return-værdi der threades,
og som React-context (kun lys/mørk + header-tema). Der er ikke ét "dialekt"-koncept.

**Løsning:** Gør tenant-dialekten (eyebrow/heroVariant/signature/tagline) til ét
modul med én seam — resolvet én gang pr. request, læst af de komponenter der faktisk
bruger den, i stedet for båret gennem props af dem der ikke gør.

**Gevinst:**
- **Locality:** "Hvad er dette køkkens dialekt?" besvares ét sted; ligeglade blocks
  nævner den ikke i deres signatur.
- **Leverage:** En ny dialekt-akse tilføjes ét sted.
- **Test:** "smagssans → split-hero + sketch-signature" testes mod dialekt-modulet.

---

## 3. Blocks genimplementerer deres skal; registrering har tre sandheder

**Branch:** `refactor/block-registration-shell`
**Prioritet:** Mellem — bred oprydning, høj berøringsflade.

**Filer:**
- `src/blocks/RenderBlocks.tsx:18-29` (dispatcher-map) og `:59` (`my-16`)
- `src/collections/Pages/index.ts:82-93` (config-array)
- `src/payload-types.ts` (genereret union)
- Hver block der selv skriver `<div className="container">`

**Problem:** (a) **Skallen gentages** — næsten hver block genimplementerer
`<div className="container">`, og den ydre `my-16`-margin er hårdkodet i
dispatcheren; en site-bred spacing-ændring kræver 7+ filer. (b) **Tre sandheder
skal synkroniseres manuelt** for at tilføje en block: dispatcher-map, Payload-config,
typer. Glemmer man dispatcheren, renderer blocken bare ikke — uden fejl (præcis det
der er sket med Banner, der kun virker inde i RichText). Blocks er overvejende
**shallow**; kun `ArchiveBlock` har rigtig logik.

**Løsning:** Én block-registrering som er kilden til både editor-config og
render-dispatch, plus en fælles block-skal (container/spacing/data-attribut) så
blocks kun leverer deres indhold.

**Gevinst:**
- **Locality:** Spacing og skal ét sted; tilføj en block = én registrering.
- **Leverage:** "Missing dispatcher"-fælden forsvinder.
- **Test:** Den fælles skal testes én gang i stedet for pr. block.

---

## 4. Hero-variant og header-tema koblet via context + effekt-i-render

**Branch:** `refactor/hero-header-theme-seam`
**Prioritet:** Lav — mindst i omfang, men fjerner en konkret bug-kilde.

**Filer:**
- `src/heros/HighImpact/index.tsx:40-133`
- `src/providers/HeaderTheme/index.tsx`
- `src/Header/Component.client.tsx:20`

**Problem:** `HighImpactHero` vælger `SplitHero`/`OverlayHero` på `design.heroVariant`
og signalerer samtidig headerens tema via `useHeaderTheme()` inde i et `useEffect`
med utilstrækkelig dependency-array (maskeret af en ESLint-disable). Hero (i
`<article>`) og header (i layout) sidder i hver sin del af træet og kommunikerer via
en context der opdateres under render — skrøbeligt hvis hero-typen skifter.

**Løsning:** Gør header/hero-tema-koordineringen til én eksplicit seam i stedet for
en effekt-baseret sidekanal.

**Gevinst:**
- **Locality:** Tema-overgangen bor ét sted.
- **Test:** Variant-valget kan testes uden at køre effekter.

---

## Branches

| Opgave | Branch |
| --- | --- |
| 1. Tenant-scoping seam | `refactor/tenant-data-access-seam` |
| 2. Dialekt-modul | `refactor/tenant-dialect-module` |
| 3. Block-registrering + skal | `refactor/block-registration-shell` |
| 4. Hero/header-tema seam | `refactor/hero-header-theme-seam` |

Alle branches er oprettet fra `main` @ `c5c95ac`.
