import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{d as t}from"./iframe-BpMttw-a.js";import{n,t as r}from"./dialect-BVlg_JHy.js";import{n as i,t as a}from"./ui-C5C99kMD.js";import{n as o,t as s}from"./Media-EVrUR_FI.js";import{a as c,i as l,o as u,r as d}from"./Component-DjeiEEOd.js";import{n as f,t as p}from"./SignatureMark-C1zXUtNT.js";import{a as m,n as h,o as g}from"./lexical-BPtYDkFA.js";import{a as _,n as v,r as y,t as b}from"./mocks-Bgzva6MV.js";var x,S;function C(){return(C=e((()=>{x=t(),n(),l(),o(),u(),p(),i(),S=({media:e,richText:t,links:n,imagePosition:i,mediaRatio:o,textAlign:l,tenantSlug:u})=>{let p=i===`right`,m=o===`oneThird`,h=l===`center`,{signature:g}=r(u);return(0,x.jsx)(`div`,{className:`container`,children:(0,x.jsxs)(`div`,{"data-variant":m?`inset`:`flush`,className:a(`media-content-band grid items-stretch overflow-hidden rounded-lg`,`bg-accent text-accent-foreground`,m?`md:grid-cols-3`:`md:grid-cols-2`),children:[(0,x.jsx)(`div`,{className:a(`relative`,m?`aspect-[4/5] m-6 md:m-10 self-center`:`min-h-[18rem] md:min-h-[26rem]`,p&&`md:order-2`),children:e&&typeof e==`object`&&(0,x.jsx)(s,{fill:!0,imgClassName:`object-cover`,resource:e,size:m?`(max-width: 768px) 100vw, (min-width: 1536px) 420px, 33vw`:`(max-width: 768px) 100vw, (min-width: 1536px) 736px, 50vw`})}),(0,x.jsxs)(`div`,{className:a(`flex flex-col justify-center gap-5 px-6 py-10 md:px-12 md:py-16`,m&&`md:col-span-2`,h&&`items-center text-center`,p&&`md:order-1`),children:[(0,x.jsx)(`span`,{"aria-hidden":!0,className:a(`block`,f.band[g])}),t&&(0,x.jsx)(c,{className:`[&_p]:opacity-80`,data:t,enableGutter:!1}),Array.isArray(n)&&n.length>0&&(0,x.jsx)(`ul`,{className:a(`flex flex-wrap gap-4`,h&&`justify-center`),children:n.map(({link:e},t)=>(0,x.jsx)(`li`,{children:(0,x.jsx)(d,{...e})},t))})]})]})})};try{S.displayName=`MediaContentBlock`,S.__docgenInfo={description:``,displayName:`MediaContentBlock`,filePath:`/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/MediaContent/Component.tsx`,methods:[],props:{media:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`media`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!0,tags:{},type:{name:`string | Media`}},imagePosition:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`imagePosition`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!1,tags:{},type:{name:`"left" | "right" | null`}},mediaRatio:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:`Halvdelen: billedet fylder sin halvdel af båndet fra kant til kant. En tredjedel: et smallere billede med luft omkring og teksten i de resterende to tredjedele – til portrætter og motiver, der ikke skal fylde halvdelen.`,name:`mediaRatio`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!1,tags:{},type:{name:`"oneThird" | "half" | null`}},textAlign:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`textAlign`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!1,tags:{},type:{name:`"left" | "center" | null`}},richText:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`richText`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!1,tags:{},type:{name:`{ [k: string]: unknown; root: { type: string; children: { [k: string]: unknown; type: any; version: number; }[]; direction: "ltr" | "rtl" | null; format: "" | "left" | "start" | "center" | "right" | "end" | "justify"; indent: number; version: number; }; } | null`}},links:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`links`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!1,tags:{},type:{name:`{ link: { type?: "reference" | "custom" | null; newTab?: boolean | null; reference?: { relationTo: "pages"; value: string | Page; } | { relationTo: "posts"; value: string | Post; } | null | undefined; url?: string | ... 1 more ... | undefined; label: string; appearance?: "default" | ... 2 mor...`}},id:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`id`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!1,tags:{},type:{name:`string | null`}},blockName:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`blockName`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!1,tags:{},type:{name:`string | null`}},blockType:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`}],description:``,name:`blockType`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`MediaContentBlock`},required:!0,tags:{},type:{name:`"mediaContent"`}},tenantSlug:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/blocks/MediaContent/Component.tsx`,name:`TypeLiteral`}],description:``,name:`tenantSlug`,required:!1,tags:{},type:{name:`string`}}},tags:{}}}catch{}})))()}var w,T,E,D,O,k,A;function j(){return(j=e((()=>{w=t(),C(),v(),T={title:`Blokke/Media + Content`,component:S,parameters:{docs:{description:{component:`Billede i den ene side, tekst i den anden. Skift side hver gang blokken gentages ned ad en side, så den får rytme. Billedet kan fylde halvdelen eller kun en tredjedel.`}}},render:_(S)},E={name:`Billede til venstre`,args:{media:y.koekken(),imagePosition:`left`,mediaRatio:`half`,textAlign:`left`,richText:g(h(`h3`,`Mad lavet fra bunden`),m(`Standardopsætningen: halv/halv, tekst venstrestillet, med plads til et par knapper.`)),links:[b(`Læs mere`),b(`Se menuen`,`outline`)]}},D={name:`Billede til højre`,args:{media:y.anretning(),imagePosition:`right`,mediaRatio:`half`,textAlign:`left`,richText:g(h(`h3`,`Sæsonen bestemmer`),m(`Samme blok med billedet i den anden side – sådan skabes rytmen ned ad siden.`)),links:[]}},O={name:`Smalt billede, centreret tekst`,args:{media:y.portraet(),imagePosition:`right`,mediaRatio:`oneThird`,textAlign:`center`,richText:g(h(`h3`,`Et portræt`),m(`Billedet fylder en tredjedel, teksten er centreret.`)),links:[]}},k={parameters:{docs:{description:{story:`Fire bånd med skiftende billedside – det mønster en indholdsside faktisk bygges af. Det sidste bånd er sat til en tredjedel, så man kan se de to bredder mødes.`}}},args:{media:y.koekken()},render:(e,{globals:t})=>{let n=[{media:y.koekken(),imagePosition:`left`,richText:g(h(`h3`,`Mad lavet fra bunden`),m(`Vi laver maden i vores eget køkken hver morgen – ikke pakket i forvejen dagen før.`)),links:[b(`Læs mere`)]},{media:y.anretning(),imagePosition:`right`,richText:g(h(`h3`,`Sæsonen bestemmer`),m(`Menuen følger året. Om vinteren rodfrugter og kål, om sommeren det der lige er kommet ind.`)),links:[]},{media:y.raavarer(),imagePosition:`left`,richText:g(h(`h3`,`Faste avlere`),m(`Vi køber hos de samme gårde år efter år, så vi ved hvad vi får – og de ved hvad vi skal bruge.`)),links:[b(`Mød avlerne`,`outline`)]},{media:y.portraet(),imagePosition:`right`,mediaRatio:`oneThird`,richText:g(h(`h3`,`Et smallere bånd til sidst`),m(`Her fylder billedet kun en tredjedel – sådan mødes de to bredder ned ad en side.`)),links:[]}];return(0,w.jsx)(w.Fragment,{children:n.map((e,n)=>(0,w.jsx)(S,{blockType:`mediaContent`,mediaRatio:`half`,textAlign:`left`,tenantSlug:t.tenant,...e},n))})}},A=[`BilledeTilVenstre`,`BilledeTilHøjre`,`SmaltBillede`,`Stablet`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Billede til venstre',
  args: {
    media: photos.koekken(),
    imagePosition: 'left',
    mediaRatio: 'half',
    textAlign: 'left',
    richText: richText(heading('h3', 'Mad lavet fra bunden'), p('Standardopsætningen: halv/halv, tekst venstrestillet, med plads til et par knapper.')),
    links: [cta('Læs mere'), cta('Se menuen', 'outline')]
  } as never
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Billede til højre',
  args: {
    media: photos.anretning(),
    imagePosition: 'right',
    mediaRatio: 'half',
    textAlign: 'left',
    richText: richText(heading('h3', 'Sæsonen bestemmer'), p('Samme blok med billedet i den anden side – sådan skabes rytmen ned ad siden.')),
    links: []
  } as never
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Smalt billede, centreret tekst',
  args: {
    media: photos.portraet(),
    imagePosition: 'right',
    mediaRatio: 'oneThird',
    textAlign: 'center',
    richText: richText(heading('h3', 'Et portræt'), p('Billedet fylder en tredjedel, teksten er centreret.')),
    links: []
  } as never
}`,...O.parameters?.docs?.source},description:{story:`Smallere billede med centreret tekst – til portrætter og motiver med luft om.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Fire bånd med skiftende billedside – det mønster en indholdsside faktisk bygges af. Det sidste bånd er sat til en tredjedel, så man kan se de to bredder mødes.'
      }
    }
  },
  // \`media\` er påkrævet på blokken; båndene nedenfor sætter deres egne.
  args: {
    media: photos.koekken()
  } as never,
  render: (_args, {
    globals
  }) => {
    const bånd: BandArgs[] = [{
      media: photos.koekken(),
      imagePosition: 'left',
      richText: richText(heading('h3', 'Mad lavet fra bunden'), p('Vi laver maden i vores eget køkken hver morgen – ikke pakket i forvejen dagen før.')) as BandArgs['richText'],
      links: [cta('Læs mere')] as BandArgs['links']
    }, {
      media: photos.anretning(),
      imagePosition: 'right',
      richText: richText(heading('h3', 'Sæsonen bestemmer'), p('Menuen følger året. Om vinteren rodfrugter og kål, om sommeren det der lige er kommet ind.')) as BandArgs['richText'],
      links: []
    }, {
      media: photos.raavarer(),
      imagePosition: 'left',
      richText: richText(heading('h3', 'Faste avlere'), p('Vi køber hos de samme gårde år efter år, så vi ved hvad vi får – og de ved hvad vi skal bruge.')) as BandArgs['richText'],
      links: [cta('Mød avlerne', 'outline')] as BandArgs['links']
    }, {
      media: photos.portraet(),
      imagePosition: 'right',
      mediaRatio: 'oneThird',
      richText: richText(heading('h3', 'Et smallere bånd til sidst'), p('Her fylder billedet kun en tredjedel – sådan mødes de to bredder ned ad en side.')) as BandArgs['richText'],
      links: []
    }];
    return <>
        {bånd.map((b, i) => <MediaContentBlock key={i} blockType="mediaContent" mediaRatio="half" textAlign="left" tenantSlug={globals.tenant as string} {...b} />)}
      </>;
  }
}`,...k.parameters?.docs?.source},description:{story:`Sådan bruges blokken i praksis: flere bånd efter hinanden, hvor billedsiden
skifter for hvert. Det er vekslen, der giver siden rytme – to bånd med
billedet i samme side står tungt og læses som ét langt afsnit.

Her kan man vurdere afstanden mellem båndene og se, at teksten flugter på
tværs, hvilket ikke kan bedømmes på en enkelt blok.`,...k.parameters?.docs?.description}}}})))()}j();export{D as BilledeTilHøjre,E as BilledeTilVenstre,O as SmaltBillede,k as Stablet,A as __namedExportsOrder,T as default};