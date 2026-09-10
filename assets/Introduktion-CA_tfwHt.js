import{j as e}from"./iframe-CDQ5gkld.js";import{u as s,M as d}from"./blocks-CNCm9an4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cx7Hyf1J.js";function t(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Introduktion"}),`
`,e.jsx(n.h1,{id:"byggeklodserne",children:"Byggeklodserne"}),`
`,e.jsxs(n.p,{children:["Alle tre sites — ",e.jsx(n.strong,{children:"Frokost Konsortiet"}),", ",e.jsx(n.strong,{children:"Smagssans"})," og ",e.jsx(n.strong,{children:"Fra Jorden"}),` — er bygget
af de samme blokke. Det er dem, der ligger her.`]}),`
`,e.jsx(n.p,{children:`En side sættes sammen i Payload ved at vælge blokke i den rækkefølge, den skal
læses. Her kan du se hver enkelt blok for sig, med eksempeltekst, uden at skulle
lede efter den ude på en side.`}),`
`,e.jsx(n.h2,{id:"skift-site-i-toolbaren",children:"Skift site i toolbaren"}),`
`,e.jsx(n.p,{children:"Øverst finder du to knapper:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Site"})," — skifter mellem de tre køkkener."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mode"})," — skifter mellem lys og mørk baggrund."]}),`
`]}),`
`,e.jsx(n.p,{children:`Det er hele pointen med denne oversigt. Blokkene er ikke tre sæt komponenter,
men ét sæt, der taler tre dialekter: farverne, skrifttypen, formen på hjørnerne
og enkelte layoutvalg kommer fra sitets tema. Vælg en blok i menuen til venstre
og klik dig gennem de tre sites — det, der ændrer sig, er dialekten.`}),`
`,e.jsxs(n.p,{children:["Tydeligst ses det på ",e.jsx(n.strong,{children:"Hero"}),`, hvor de tre sites har hver sin opbygning:
Frokost Konsortiet lægger teksten oven på fotoet, Smagssans deler fladen i to,
og Fra Jorden sætter navnet som en stor bomærke-lockup.`]}),`
`,e.jsx(n.h2,{id:"til-redaktøren",children:"Til redaktøren"}),`
`,e.jsxs(n.p,{children:[`Blokkene hedder det samme her som i Payload. Er du i tvivl om, hvad en blok
hedder, eller hvordan den ser ud med lidt tekst i, så find den i menuen — hver
blok har en beskrivelse under fanen `,e.jsx(n.strong,{children:"Docs"}),"."]}),`
`,e.jsx(n.p,{children:`Billederne er de samme på tværs af alle tre sites med vilje: når kun temaet
skifter mellem to skærmbilleder, er forskellen du ser, temaet.`}),`
`,e.jsx(n.h2,{id:"til-udvikleren",children:"Til udvikleren"}),`
`,e.jsxs(n.p,{children:["Stories ligger ved siden af komponenterne (",e.jsx(n.code,{children:"src/blocks/*/[Blok].stories.tsx"}),`).
Temaet er ikke mocket: dekoratoren i `,e.jsx(n.code,{children:".storybook/preview.tsx"}),` bruger den rigtige
`,e.jsx(n.code,{children:"TenantTheme"})," og de rigtige ",e.jsx(n.code,{children:"next/font"}),`-klasser, præcis som
`,e.jsx(n.code,{children:"app/(frontend)/[tenant]/layout.tsx"})," gør."]}),`
`,e.jsxs(n.p,{children:[`Storybook står derimod helt frit af seed-systemet: alt hvad en story bruger —
billeder, tekst og rich text-byggerne — ligger under `,e.jsx(n.code,{children:"src/stories/"}),`. Seed-mappen
er urørt, så indhold som kunden ejer og kan flytte eller slette aldrig kan
brække komponentdokumentationen.`]}),`
`,e.jsx(n.p,{children:"Tilføjer du en blok, hører en story med — det er sådan, den bliver til at finde."})]})}function a(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{a as default};
