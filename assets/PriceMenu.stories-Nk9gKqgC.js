import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{d as t}from"./iframe-BpMttw-a.js";import{n,t as r}from"./dialect-BVlg_JHy.js";import{n as i,t as a}from"./ui-C5C99kMD.js";import{n as o,t as s}from"./SectionHeader-V1DKFZre.js";import{a as c,n as l}from"./mocks-Bgzva6MV.js";import{n as u,t as d}from"./SignatureCard-DAvRJYPP.js";var f,p;function m(){return(m=e((()=>{f=t(),n(),o(),u(),i(),p=({heading:e,eyebrow:t,intro:n,sections:i,note:o,tenantSlug:c})=>{if(!i?.length)return null;let{signature:l,eyebrow:u}=r(c),p=i.length===1;return(0,f.jsxs)(`div`,{className:`container`,children:[(0,f.jsx)(s,{heading:e,eyebrow:t,intro:n,eyebrowStyle:u}),(0,f.jsx)(`div`,{className:a(`grid items-start gap-6 md:gap-8`,p?`mx-auto max-w-[44rem]`:`md:grid-cols-2`),children:i.map((e,t)=>(0,f.jsxs)(d,{signature:l,children:[(0,f.jsx)(`h3`,{className:`font-heading text-2xl font-semibold tracking-tight`,children:e.title}),e.description&&(0,f.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:e.description}),(0,f.jsx)(`ul`,{className:`mt-6 flex flex-col gap-5`,children:(e.items||[]).map((e,t)=>(0,f.jsxs)(`li`,{className:a(e.featured&&`-mx-3 rounded-lg bg-accent px-3 py-3 text-accent-foreground md:-mx-4 md:px-4`),children:[(0,f.jsxs)(`div`,{className:`flex items-baseline gap-3`,children:[(0,f.jsx)(`span`,{className:`font-semibold leading-snug`,children:e.name}),e.featured&&(0,f.jsx)(`span`,{className:`hidden shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-smallcaps text-primary-foreground sm:inline-block`,children:`Anbefalet`}),(0,f.jsx)(`span`,{"aria-hidden":!0,className:`min-w-8 flex-1 -translate-y-0.5 border-b border-dotted border-foreground/30`}),(0,f.jsx)(`span`,{className:`font-heading whitespace-nowrap text-lg font-semibold leading-none text-primary`,children:e.price})]}),(e.description||e.unit)&&(0,f.jsxs)(`div`,{className:`mt-1 flex items-baseline gap-4`,children:[e.description&&(0,f.jsx)(`p`,{className:`max-w-[34rem] text-sm leading-relaxed text-muted-foreground`,children:e.description}),e.unit&&(0,f.jsx)(`span`,{className:`ml-auto shrink-0 text-xs text-muted-foreground`,children:e.unit})]})]},t))})]},t))}),o&&(0,f.jsx)(`p`,{className:`mt-6 text-center text-sm text-muted-foreground`,children:o})]})};try{p.displayName=`PriceMenuBlock`,p.__docgenInfo={description:`A restaurant-style menu with prices: sections as signature cards, each line
with a dotted leader running from dish to price — the classic menukort
gesture. Prices render in the tenant's heading face, so a serif site gets
elegant figures and a sans site confident ones.`,displayName:`PriceMenuBlock`,filePath:`/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/PriceMenu/Component.tsx`,methods:[],props:{heading:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:``,name:`heading`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!1,tags:{},type:{name:`string | null`}},eyebrow:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:`Kort linje under overskriften, sat i sitets versaler – fx "Her er 3 regnestykker". Til den halve overskrift, ikke til en sætning.`,name:`eyebrow`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!1,tags:{},type:{name:`string | null`}},intro:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:``,name:`intro`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!1,tags:{},type:{name:`string | null`}},sections:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:`Et menukort i sektioner – fx "Frokostordning", "Tilkøb", "Drikkevarer". Hver sektion har sine egne linjer med pris.`,name:`sections`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!1,tags:{},type:{name:`{ title: string; description?: string | null; items?: { name: string; description?: string | null; price: string; unit?: string | null | undefined; featured?: boolean | null | undefined; id?: string | ... 1 more ... | undefined; }[] | null | undefined; id?: string | ... 1 more ... | undefined...`}},note:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:`Fx "Alle priser er ekskl. moms og levering."`,name:`note`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!1,tags:{},type:{name:`string | null`}},id:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:``,name:`id`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!1,tags:{},type:{name:`string | null`}},blockName:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:``,name:`blockName`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!1,tags:{},type:{name:`string | null`}},blockType:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`}],description:``,name:`blockType`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`PriceMenuBlock`},required:!0,tags:{},type:{name:`"priceMenu"`}},tenantSlug:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/blocks/PriceMenu/Component.tsx`,name:`TypeLiteral`}],description:``,name:`tenantSlug`,required:!1,tags:{},type:{name:`string`}}},tags:{}}}catch{}})))()}var h,g,_;function v(){return(v=e((()=>{m(),l(),h={title:`Blokke/Menukort med priser`,component:p,parameters:{docs:{description:{component:`Retter med priser og prikkede linjer, som på en spisekarte. Priserne sættes i sitets overskriftsskrift, så et serif-site får elegante tal og et sans-site kontante.`}}},render:c(p)},g={args:{eyebrow:`Priser`,heading:`Hvad koster det`,intro:`Alle priser er ekskl. moms og pr. kuvert.`,sections:[{title:`Frokostordning`,description:`Leveret færdiglavet hver morgen.`,items:[{name:`Klassisk`,description:`Varm ret, salater, pålæg og sødt`,price:`63`,unit:`kr.`,featured:!0},{name:`Grøn`,description:`Samme opstilling, uden kød`,price:`58`,unit:`kr.`}]},{title:`Mødeforplejning`,items:[{name:`Morgenbord`,price:`45`,unit:`kr.`},{name:`Sandwich`,price:`75`,unit:`kr.`},{name:`Eftermiddagskage`,price:`25`,unit:`kr.`}]}],note:`Minimum 15 kuverter. Levering er med i prisen.`}},_=[`Standard`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    eyebrow: 'Priser',
    heading: 'Hvad koster det',
    intro: 'Alle priser er ekskl. moms og pr. kuvert.',
    sections: [{
      title: 'Frokostordning',
      description: 'Leveret færdiglavet hver morgen.',
      items: [{
        name: 'Klassisk',
        description: 'Varm ret, salater, pålæg og sødt',
        price: '63',
        unit: 'kr.',
        featured: true
      }, {
        name: 'Grøn',
        description: 'Samme opstilling, uden kød',
        price: '58',
        unit: 'kr.'
      }]
    }, {
      title: 'Mødeforplejning',
      items: [{
        name: 'Morgenbord',
        price: '45',
        unit: 'kr.'
      }, {
        name: 'Sandwich',
        price: '75',
        unit: 'kr.'
      }, {
        name: 'Eftermiddagskage',
        price: '25',
        unit: 'kr.'
      }]
    }],
    note: 'Minimum 15 kuverter. Levering er med i prisen.'
  } as never
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as Standard,_ as __namedExportsOrder,h as default};