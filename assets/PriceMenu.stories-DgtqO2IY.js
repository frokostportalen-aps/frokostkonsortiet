import{j as e}from"./iframe-CDQ5gkld.js";import{g as x}from"./dialect-DjMqca7u.js";import{S as y}from"./index-DXTUCLuY.js";import{S as h}from"./index-dmPHgF3_.js";import{c as l}from"./ui-Bl6YMQn_.js";import{w as N}from"./mocks-BTP3jKfO.js";import"./preload-helper-PPVm8Dsz.js";import"./index-pQEzLxpT.js";import"./index-BlZVNKKG.js";const s=({heading:a,eyebrow:d,intro:c,sections:i,note:o,tenantSlug:m})=>{if(!i?.length)return null;const{signature:p,eyebrow:u}=x(m),k=i.length===1;return e.jsxs("div",{className:"container",children:[e.jsx(y,{heading:a,eyebrow:d,intro:c,eyebrowStyle:u}),e.jsx("div",{className:l("grid items-start gap-6 md:gap-8",k?"mx-auto max-w-[44rem]":"md:grid-cols-2"),children:i.map((n,f)=>e.jsxs(h,{signature:p,children:[e.jsx("h3",{className:"font-heading text-2xl font-semibold tracking-tight",children:n.title}),n.description&&e.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:n.description}),e.jsx("ul",{className:"mt-6 flex flex-col gap-5",children:(n.items||[]).map((r,g)=>e.jsxs("li",{className:l(r.featured&&"-mx-3 rounded-lg bg-accent px-3 py-3 text-accent-foreground md:-mx-4 md:px-4"),children:[e.jsxs("div",{className:"flex items-baseline gap-3",children:[e.jsx("span",{className:"font-semibold leading-snug",children:r.name}),r.featured&&e.jsx("span",{className:"hidden shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-smallcaps text-primary-foreground sm:inline-block",children:"Anbefalet"}),e.jsx("span",{"aria-hidden":!0,className:"min-w-8 flex-1 -translate-y-0.5 border-b border-dotted border-foreground/30"}),e.jsx("span",{className:"font-heading whitespace-nowrap text-lg font-semibold leading-none text-primary",children:r.price})]}),(r.description||r.unit)&&e.jsxs("div",{className:"mt-1 flex items-baseline gap-4",children:[r.description&&e.jsx("p",{className:"max-w-[34rem] text-sm leading-relaxed text-muted-foreground",children:r.description}),r.unit&&e.jsx("span",{className:"ml-auto shrink-0 text-xs text-muted-foreground",children:r.unit})]})]},g))})]},f))}),o&&e.jsx("p",{className:"mt-6 text-center text-sm text-muted-foreground",children:o})]})};try{s.displayName="PriceMenuBlock",s.__docgenInfo={description:`A restaurant-style menu with prices: sections as signature cards, each line
with a dotted leader running from dish to price — the classic menukort
gesture. Prices render in the tenant's heading face, so a serif site gets
elegant figures and a sans site confident ones.`,displayName:"PriceMenuBlock",filePath:"/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/PriceMenu/Component.tsx",methods:[],props:{heading:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:"",name:"heading",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!1,tags:{},type:{name:"string | null"}},eyebrow:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:'Kort linje under overskriften, sat i sitets versaler – fx "Her er 3 regnestykker". Til den halve overskrift, ikke til en sætning.',name:"eyebrow",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!1,tags:{},type:{name:"string | null"}},intro:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:"",name:"intro",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!1,tags:{},type:{name:"string | null"}},sections:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:'Et menukort i sektioner – fx "Frokostordning", "Tilkøb", "Drikkevarer". Hver sektion har sine egne linjer med pris.',name:"sections",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!1,tags:{},type:{name:"{ title: string; description?: string | null; items?: { name: string; description?: string | null; price: string; unit?: string | null | undefined; featured?: boolean | null | undefined; id?: string | ... 1 more ... | undefined; }[] | null | undefined; id?: string | ... 1 more ... | undefined..."}},note:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:'Fx "Alle priser er ekskl. moms og levering."',name:"note",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!1,tags:{},type:{name:"string | null"}},id:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:"",name:"id",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!1,tags:{},type:{name:"string | null"}},blockName:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:"",name:"blockName",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!1,tags:{},type:{name:"string | null"}},blockType:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"}],description:"",name:"blockType",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"PriceMenuBlock"},required:!0,tags:{},type:{name:'"priceMenu"'}},tenantSlug:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/blocks/PriceMenu/Component.tsx",name:"TypeLiteral"}],description:"",name:"tenantSlug",required:!1,tags:{},type:{name:"string"}}},tags:{}}}catch{}const _={title:"Blokke/Menukort med priser",component:s,parameters:{docs:{description:{component:"Retter med priser og prikkede linjer, som på en spisekarte. Priserne sættes i sitets overskriftsskrift, så et serif-site får elegante tal og et sans-site kontante."}}},render:N(s)},t={args:{eyebrow:"Priser",heading:"Hvad koster det",intro:"Alle priser er ekskl. moms og pr. kuvert.",sections:[{title:"Frokostordning",description:"Leveret færdiglavet hver morgen.",items:[{name:"Klassisk",description:"Varm ret, salater, pålæg og sødt",price:"63",unit:"kr.",featured:!0},{name:"Grøn",description:"Samme opstilling, uden kød",price:"58",unit:"kr."}]},{title:"Mødeforplejning",items:[{name:"Morgenbord",price:"45",unit:"kr."},{name:"Sandwich",price:"75",unit:"kr."},{name:"Eftermiddagskage",price:"25",unit:"kr."}]}],note:"Minimum 15 kuverter. Levering er med i prisen."}},q=["Standard"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as Standard,q as __namedExportsOrder,_ as default};
