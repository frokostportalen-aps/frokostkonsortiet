import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{d as t}from"./iframe-BzuP3dJg.js";import{i as n,r}from"./react-DgUa_zLF.js";import{a as i,o as a}from"./blocks-DURXEhBs.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{title:`Introduktion`}),`
`,(0,c.jsx)(t.h1,{id:`byggeklodserne`,children:`Byggeklodserne`}),`
`,(0,c.jsxs)(t.p,{children:[`Alle tre sites — `,(0,c.jsx)(t.strong,{children:`Frokost Konsortiet`}),`, `,(0,c.jsx)(t.strong,{children:`Smagssans`}),` og `,(0,c.jsx)(t.strong,{children:`Fra Jorden`}),` — er bygget
af de samme blokke. Det er dem, der ligger her.`]}),`
`,(0,c.jsx)(t.p,{children:`En side sættes sammen i Payload ved at vælge blokke i den rækkefølge, den skal
læses. Her kan du se hver enkelt blok for sig, med eksempeltekst, uden at skulle
lede efter den ude på en side.`}),`
`,(0,c.jsx)(t.h2,{id:`skift-site-i-toolbaren`,children:`Skift site i toolbaren`}),`
`,(0,c.jsx)(t.p,{children:`Øverst finder du to knapper:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Site`}),` — skifter mellem de tre køkkener.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Mode`}),` — skifter mellem lys og mørk baggrund.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`Det er hele pointen med denne oversigt. Blokkene er ikke tre sæt komponenter,
men ét sæt, der taler tre dialekter: farverne, skrifttypen, formen på hjørnerne
og enkelte layoutvalg kommer fra sitets tema. Vælg en blok i menuen til venstre
og klik dig gennem de tre sites — det, der ændrer sig, er dialekten.`}),`
`,(0,c.jsxs)(t.p,{children:[`Tydeligst ses det på `,(0,c.jsx)(t.strong,{children:`Hero`}),`, hvor de tre sites har hver sin opbygning:
Frokost Konsortiet lægger teksten oven på fotoet, Smagssans deler fladen i to,
og Fra Jorden sætter navnet som en stor bomærke-lockup.`]}),`
`,(0,c.jsx)(t.h2,{id:`til-redaktøren`,children:`Til redaktøren`}),`
`,(0,c.jsxs)(t.p,{children:[`Blokkene hedder det samme her som i Payload. Er du i tvivl om, hvad en blok
hedder, eller hvordan den ser ud med lidt tekst i, så find den i menuen — hver
blok har en beskrivelse under fanen `,(0,c.jsx)(t.strong,{children:`Docs`}),`.`]}),`
`,(0,c.jsx)(t.p,{children:`Billederne er de samme på tværs af alle tre sites med vilje: når kun temaet
skifter mellem to skærmbilleder, er forskellen du ser, temaet.`}),`
`,(0,c.jsx)(t.h2,{id:`til-udvikleren`,children:`Til udvikleren`}),`
`,(0,c.jsxs)(t.p,{children:[`Stories ligger ved siden af komponenterne (`,(0,c.jsx)(t.code,{children:`src/blocks/*/[Blok].stories.tsx`}),`).
Temaet er ikke mocket: dekoratoren i `,(0,c.jsx)(t.code,{children:`.storybook/preview.tsx`}),` bruger den rigtige
`,(0,c.jsx)(t.code,{children:`TenantTheme`}),` og de rigtige `,(0,c.jsx)(t.code,{children:`next/font`}),`-klasser, præcis som
`,(0,c.jsx)(t.code,{children:`app/(frontend)/[tenant]/layout.tsx`}),` gør.`]}),`
`,(0,c.jsxs)(t.p,{children:[`Storybook står derimod helt frit af seed-systemet: alt hvad en story bruger —
billeder, tekst og rich text-byggerne — ligger under `,(0,c.jsx)(t.code,{children:`src/stories/`}),`. Seed-mappen
er urørt, så indhold som kunden ejer og kan flytte eller slette aldrig kan
brække komponentdokumentationen.`]}),`
`,(0,c.jsx)(t.p,{children:`Tilføjer du en blok, hører en story med — det er sådan, den bliver til at finde.`})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=t(),r(),a()})))()}l();export{s as default};