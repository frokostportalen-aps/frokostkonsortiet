import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./react-Z7gd5LxR.js";import{d as n}from"./iframe-DzWsalHF.js";import{n as r,t as i}from"./dialect-Dk4mGT6I.js";import{n as a,t as o}from"./ui-C5C99kMD.js";import{n as s,t as c}from"./Media-CnaFSkCY.js";import{n as l,t as u}from"./SectionHeader-DzSudi3V.js";import{a as d,n as f,r as p}from"./mocks-DlTV5qJi.js";import{n as m,t as h}from"./createLucideIcon-DADtaHEv.js";import{n as g,t as _}from"./icons-DmOIvfYL.js";import{a as v,c as y,d as b,i as x,l as S,n as C,o as w,r as T,s as E,t as D,u as O}from"./Rail-CdezbOrd.js";var k,A;function j(){return(j=e((()=>{m(),k={name:`rotate-cw`,size:24,node:[[`path`,{d:`M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8`,key:`1p45f6`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}]]},k.node,A=h(k)})))()}var M,N,P,F,I;function L(){return(L=e((()=>{M=n(),N=t(),j(),g(),S(),y(),s(),l(),C(),a(),P=`relative col-start-1 row-start-1 flex flex-col overflow-hidden rounded-lg backface-hidden`,F=({card:e,index:t,eyebrowStyle:n,imageSizes:r,railDragging:i})=>{let[a,s]=(0,N.useState)(`auto`),l=b[O(e.tone,t)],u=e.icon?_[e.icon]:void 0,d=e.front===`icon`;return(0,M.jsxs)(`div`,{className:`group perspective-distant relative h-full`,children:[(0,M.jsxs)(`div`,{className:o(`grid h-full transform-3d transition-transform duration-500 ease-(--ease-settle) motion-reduce:transition-none`,a===`pinned`&&`rotate-y-180`,a===`auto`&&!i&&`group-hover:rotate-y-180`),children:[(0,M.jsxs)(`div`,{className:o(P,d&&`bg-secondary text-secondary-foreground`),children:[d?(0,M.jsxs)(`div`,{className:`flex flex-1 flex-col items-center justify-center gap-6 p-8`,children:[u&&(0,M.jsx)(u,{className:`size-20`,strokeWidth:1}),(0,M.jsx)(E,{eyebrowStyle:n,children:e.label})]}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`div`,{className:`relative aspect-[4/5] bg-secondary`,children:e.image&&typeof e.image==`object`&&(0,M.jsx)(c,{fill:!0,imgClassName:`object-cover`,resource:e.image,size:r})}),(0,M.jsx)(w,{eyebrowStyle:n,tone:l,children:e.label})]}),(0,M.jsx)(v,{icon:A})]}),(0,M.jsxs)(`div`,{className:o(P,`justify-center rotate-y-180 p-6 text-center md:p-7`,l),children:[(0,M.jsx)(`h3`,{className:`font-heading text-xl font-semibold uppercase tracking-tight`,children:e.title}),e.subtitle&&(0,M.jsx)(`p`,{className:`mt-1 text-sm opacity-80`,children:e.subtitle}),e.body&&(0,M.jsx)(`p`,{className:`mt-4 text-sm leading-relaxed opacity-90`,children:e.body}),e.lines&&e.lines.length>0&&(0,M.jsx)(`ul`,{className:`mt-5 flex flex-col gap-3 text-left text-sm`,children:e.lines.map((e,t)=>(0,M.jsxs)(`li`,{className:`flex items-baseline gap-2`,children:[(0,M.jsxs)(`span`,{className:`leading-snug`,children:[e.name,e.note&&(0,M.jsx)(`span`,{className:`block text-xs opacity-70`,children:e.note})]}),(0,M.jsx)(`span`,{"aria-hidden":!0,className:`min-w-4 flex-1 -translate-y-0.5 border-b border-dotted border-current opacity-40`}),(0,M.jsx)(`span`,{className:`font-heading whitespace-nowrap font-semibold`,children:e.price})]},t))}),e.note&&(0,M.jsx)(`p`,{className:`mt-6 text-xs opacity-70`,children:e.note})]})]}),(0,M.jsx)(`button`,{"aria-label":`Vend kortet: ${e.label}`,"aria-pressed":a===`pinned`,className:x,onClick:()=>s(e=>e===`pinned`?`suppressed`:`pinned`),onPointerLeave:()=>s(e=>e===`suppressed`?`auto`:e),type:`button`})]})},I=({heading:e,eyebrow:t,intro:n,cards:r,eyebrowStyle:i})=>{let a=T(r?.length??0);return r?.length?(0,M.jsxs)(`div`,{className:`container`,children:[(0,M.jsx)(u,{heading:e,eyebrow:t,intro:n,eyebrowStyle:i}),(0,M.jsx)(`ul`,{"aria-label":a.isRail?`Kort – rul til siden for at se flere`:void 0,...a.listProps,children:r.map((e,t)=>(0,M.jsx)(`li`,{className:a.itemClassName,children:(0,M.jsx)(F,{card:e,eyebrowStyle:i,imageSizes:a.imageSizes,index:t,railDragging:a.dragging})},e.id??t))}),a.isRail&&(0,M.jsx)(D,{labels:{prev:`Forrige kort`,next:`Næste kort`},rail:a})]}):null};try{I.displayName=`FlipCardsClient`,I.__docgenInfo={description:"A row of cards that turn over. Up to three stand side by side as drawn; from\nthe fourth the row becomes a scroll-snapped rail (see `useRail`).",displayName:`FlipCardsClient`,filePath:`/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/FlipCards/Component.client.tsx`,methods:[],props:{heading:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`heading`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},eyebrow:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:`Kort linje under overskriften, sat i sitets versaler – fx "Her er 3 regnestykker". Til den halve overskrift, ikke til en sætning.`,name:`eyebrow`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},intro:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`intro`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},cards:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:`Op til tre kort står side om side. Fra det fjerde bliver rækken en slider, man kan swipe eller pile sig igennem. Hvert kort har en forside (billede eller ikon) og en bagside, der vendes frem.`,name:`cards`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`{ front: "image" | "icon"; image?: string | Media | null; icon?: "leaf" | "sprout" | "wheat" | "milk" | "ham" | "beef" | "fish" | "egg" | "carrot" | "salad" | "soup" | ... 7 more ...; ... 7 more ...; id?: string | ... 1 more ... | undefined; }[] | null | undefined`}},id:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`id`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},blockName:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`blockName`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},blockType:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`blockType`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!0,tags:{},type:{name:`"flipCards"`}},eyebrowStyle:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/blocks/FlipCards/Component.client.tsx`,name:`TypeLiteral`}],description:``,name:`eyebrowStyle`,required:!1,tags:{},type:{name:`enum`,raw:`EyebrowStyle`,value:[{value:`"smallcaps"`},{value:`"uppercase"`},{value:`"plain"`}]}}},tags:{}}}catch{}})))()}var R,z;function B(){return(B=e((()=>{R=n(),r(),L(),z=({tenantSlug:e,...t})=>{let{eyebrow:n}=i(e);return(0,R.jsx)(I,{...t,eyebrowStyle:n})};try{z.displayName=`FlipCardsBlock`,z.__docgenInfo={description:`The cards turn on hover and press, so the block itself is a client
component — but the dialect is resolved here, on the server, and passed
down. \`getDialect\` reaches the tenant registry, and importing it from a
\`'use client'\` module would ship every site's palette to the browser of any
page holding a card row. The plan picker draws the boundary the same way.`,displayName:`FlipCardsBlock`,filePath:`/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/FlipCards/Component.tsx`,methods:[],props:{heading:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`heading`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},eyebrow:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:`Kort linje under overskriften, sat i sitets versaler – fx "Her er 3 regnestykker". Til den halve overskrift, ikke til en sætning.`,name:`eyebrow`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},intro:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`intro`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},cards:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:`Op til tre kort står side om side. Fra det fjerde bliver rækken en slider, man kan swipe eller pile sig igennem. Hvert kort har en forside (billede eller ikon) og en bagside, der vendes frem.`,name:`cards`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`{ front: "image" | "icon"; image?: string | Media | null; icon?: "leaf" | "sprout" | "wheat" | "milk" | "ham" | "beef" | "fish" | "egg" | "carrot" | "salad" | "soup" | ... 7 more ...; ... 7 more ...; id?: string | ... 1 more ... | undefined; }[] | null | undefined`}},id:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`id`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},blockName:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`blockName`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!1,tags:{},type:{name:`string | null`}},blockType:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`}],description:``,name:`blockType`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`FlipCardsBlock`},required:!0,tags:{},type:{name:`"flipCards"`}},tenantSlug:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/blocks/FlipCards/Component.tsx`,name:`TypeLiteral`}],description:``,name:`tenantSlug`,required:!1,tags:{},type:{name:`string`}}},tags:{}}}catch{}})))()}var V,H,U,W,G;function K(){return(K=e((()=>{B(),f(),V={title:`Blokke/Vendekort`,component:z,parameters:{docs:{description:{component:`Kort med en forside, man ser, og en bagside, man vender frem: markøren over kortet viser bagsiden, et tryk holder den. Op til tre kort står side om side; fra det fjerde bliver rækken en slider, man kan swipe i. Farverne er sitets egne toner, så den samme række ser forskellig ud fra site til site.`}}},render:d(z)},H={args:{eyebrow:`Først skal du vælge den bedste løsning for jeres arbejdsplads`,heading:`Hvad koster det hos jer?`,cards:[{front:`image`,image:p.anretning(),label:`Small – 63,-`,tone:`auto`,title:`450 gram`,subtitle:`Pr. person`,body:`Arbejdspladsen med et overtal af personer, som spiser begrænset.`},{front:`image`,image:p.buffet(),label:`Medium – 66,-`,tone:`auto`,title:`500 gram`,subtitle:`Pr. person`,body:`Arbejdspladsen med et bredt gennemsnit i alder og køn.`},{front:`image`,image:p.raavarer(),label:`Large – 69,-`,tone:`auto`,title:`550 gram`,subtitle:`Pr. person`,body:`Arbejdspladsen, hvor mange betragter frokosten som dagens hovedmåltid.`}]}},U={args:{heading:`Vil I have mere med?`,intro:`Vend kortene for at se, hvad der ligger i hver kategori.`,cards:[{front:`icon`,icon:`milk`,label:`Mælk`,tone:`sand`,title:`Vores mest populære`,lines:[{name:`Mælk pr. liter`,note:`Min- og skummetmælk`,price:`13,-`},{name:`Let- og sødmælk`,note:null,price:`16,-`},{name:`Økologisk mælk pr. liter`,note:`Min- og skummetmælk`,price:`16,-`},{name:`Let- og sødmælk`,note:null,price:`17,-`},{name:`Minimælk – laktosefri`,note:null,price:`22,-`},{name:`Letmælk – laktosefri`,note:null,price:`24,-`},{name:`Havre-, soja-, mandel- eller rismælk`,note:null,price:`26,-`}],note:`Alle priser er ex moms`},{front:`icon`,icon:`croissant`,label:`Brød`,tone:`brand`,title:`Bagt om morgenen`,body:`Rugbrød, surdejsboller og et sødt stykke – leveret samtidig med frokosten.`,lines:[{name:`Rugbrød pr. stk.`,note:null,price:`28,-`},{name:`Surdejsboller pr. stk.`,note:null,price:`9,-`}],note:`Alle priser er ex moms`}]}},W={args:{heading:`Ugens retter`,cards:[{front:`image`,image:p.anretning(),label:`Mandag`,tone:`auto`,title:`Stegt flæsk`,body:`Persillesovs og nye kartofler.`},{front:`image`,image:p.buffet(),label:`Tirsdag`,tone:`auto`,title:`Grøn lasagne`,body:`Spinat, ricotta og ovnbagte tomater.`},{front:`image`,image:p.raavarer(),label:`Onsdag`,tone:`auto`,title:`Dampet torsk`,body:`Brunet smør, kapers og dild.`},{front:`image`,image:p.koekken(),label:`Torsdag`,tone:`auto`,title:`Kylling i karry`,body:`Ris, syltet agurk og ristede nødder.`},{front:`icon`,icon:`salad`,label:`Fredag`,tone:`auto`,title:`Salatbar`,body:`Otte skåle, du selv sætter sammen.`}]}},G=[`Portionsstoerrelser`,`Tilkoeb`,`Slider`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Først skal du vælge den bedste løsning for jeres arbejdsplads',
    heading: 'Hvad koster det hos jer?',
    cards: [{
      front: 'image',
      image: photos.anretning(),
      label: 'Small – 63,-',
      tone: 'auto',
      title: '450 gram',
      subtitle: 'Pr. person',
      body: 'Arbejdspladsen med et overtal af personer, som spiser begrænset.'
    }, {
      front: 'image',
      image: photos.buffet(),
      label: 'Medium – 66,-',
      tone: 'auto',
      title: '500 gram',
      subtitle: 'Pr. person',
      body: 'Arbejdspladsen med et bredt gennemsnit i alder og køn.'
    }, {
      front: 'image',
      image: photos.raavarer(),
      label: 'Large – 69,-',
      tone: 'auto',
      title: '550 gram',
      subtitle: 'Pr. person',
      body: 'Arbejdspladsen, hvor mange betragter frokosten som dagens hovedmåltid.'
    }]
  } as never
}`,...H.parameters?.docs?.source},description:{story:`Layout 1: portionsstørrelserne – foto på forsiden, gramvægt og forklaring bagpå.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    heading: 'Vil I have mere med?',
    intro: 'Vend kortene for at se, hvad der ligger i hver kategori.',
    cards: [{
      front: 'icon',
      icon: 'milk',
      label: 'Mælk',
      tone: 'sand',
      title: 'Vores mest populære',
      lines: [{
        name: 'Mælk pr. liter',
        note: 'Min- og skummetmælk',
        price: '13,-'
      }, {
        name: 'Let- og sødmælk',
        note: null,
        price: '16,-'
      }, {
        name: 'Økologisk mælk pr. liter',
        note: 'Min- og skummetmælk',
        price: '16,-'
      }, {
        name: 'Let- og sødmælk',
        note: null,
        price: '17,-'
      }, {
        name: 'Minimælk – laktosefri',
        note: null,
        price: '22,-'
      }, {
        name: 'Letmælk – laktosefri',
        note: null,
        price: '24,-'
      }, {
        name: 'Havre-, soja-, mandel- eller rismælk',
        note: null,
        price: '26,-'
      }],
      note: 'Alle priser er ex moms'
    }, {
      front: 'icon',
      icon: 'croissant',
      label: 'Brød',
      tone: 'brand',
      title: 'Bagt om morgenen',
      body: 'Rugbrød, surdejsboller og et sødt stykke – leveret samtidig med frokosten.',
      lines: [{
        name: 'Rugbrød pr. stk.',
        note: null,
        price: '28,-'
      }, {
        name: 'Surdejsboller pr. stk.',
        note: null,
        price: '9,-'
      }],
      note: 'Alle priser er ex moms'
    }]
  } as never
}`,...U.parameters?.docs?.source},description:{story:`Layout 2: tilkøbet – stregtegning på forsiden, lille prisskilt bagpå.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    heading: 'Ugens retter',
    cards: [{
      front: 'image',
      image: photos.anretning(),
      label: 'Mandag',
      tone: 'auto',
      title: 'Stegt flæsk',
      body: 'Persillesovs og nye kartofler.'
    }, {
      front: 'image',
      image: photos.buffet(),
      label: 'Tirsdag',
      tone: 'auto',
      title: 'Grøn lasagne',
      body: 'Spinat, ricotta og ovnbagte tomater.'
    }, {
      front: 'image',
      image: photos.raavarer(),
      label: 'Onsdag',
      tone: 'auto',
      title: 'Dampet torsk',
      body: 'Brunet smør, kapers og dild.'
    }, {
      front: 'image',
      image: photos.koekken(),
      label: 'Torsdag',
      tone: 'auto',
      title: 'Kylling i karry',
      body: 'Ris, syltet agurk og ristede nødder.'
    }, {
      front: 'icon',
      icon: 'salad',
      label: 'Fredag',
      tone: 'auto',
      title: 'Salatbar',
      body: 'Otte skåle, du selv sætter sammen.'
    }]
  } as never
}`,...W.parameters?.docs?.source},description:{story:`Fra det fjerde kort bliver rækken en slider – swipe på touch, pile på mus.`,...W.parameters?.docs?.description}}}})))()}K();export{H as Portionsstoerrelser,W as Slider,U as Tilkoeb,G as __namedExportsOrder,V as default};