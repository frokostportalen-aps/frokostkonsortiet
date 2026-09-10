import{j as e}from"./iframe-CDQ5gkld.js";import{S as u}from"./index-DXTUCLuY.js";import{c as a}from"./ui-Bl6YMQn_.js";import{w as g}from"./mocks-BTP3jKfO.js";import"./preload-helper-PPVm8Dsz.js";import"./index-pQEzLxpT.js";const f={brand:{band:"bg-primary text-primary-foreground"},eco:{band:"bg-eco text-eco-foreground"},sand:{band:"bg-secondary text-secondary-foreground",value:"text-primary"}},y={2:"sm:grid-cols-2",3:"sm:grid-cols-3",4:"sm:grid-cols-2 lg:grid-cols-4"},n=({heading:o,intro:m,items:l,tone:p})=>{if(!l?.length)return null;const i=f[p??"brand"],k=y[l.length]??"sm:grid-cols-2 lg:grid-cols-4";return e.jsx("div",{className:"container",children:e.jsxs("div",{className:a("rounded-band px-6 py-10 md:px-12 md:py-14",i.band),children:[e.jsx(u,{heading:o,intro:m,muted:!1}),e.jsx("dl",{className:a("grid grid-cols-1 gap-x-8 gap-y-10 lg:gap-y-0",k),children:l.map((d,c)=>e.jsxs("div",{className:a("flex flex-col items-center px-6 text-center",c>0&&"lg:border-l lg:border-current/20"),children:[e.jsx("dt",{className:a("font-heading text-4xl leading-none tracking-tight md:text-5xl",i.value),children:d.value}),e.jsx("dd",{className:"mt-4 max-w-[32ch] text-xs font-semibold uppercase leading-[1.5] tracking-label opacity-75",children:d.label})]},c))})]})})};try{n.displayName="StatsBlock",n.__docgenInfo={description:"",displayName:"StatsBlock",filePath:"/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/Stats/Component.tsx",methods:[],props:{heading:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"}],description:"",name:"heading",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"},required:!1,tags:{},type:{name:"string | null"}},intro:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"}],description:"",name:"intro",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"},required:!1,tags:{},type:{name:"string | null"}},tone:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"}],description:"Brandfarve er sitets stærkeste flade. Klima bruger sitets øko-farve – vælg den, når tallene handler om CO2, økologi eller sæson. Sand er den rolige variant, når båndet ikke skal råbe.",name:"tone",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"},required:!1,tags:{},type:{name:'"brand" | "eco" | "sand" | null'}},items:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"}],description:'Vises som store nøgletal i et bånd – fx "1980", "5 køkkener", "100% grøn strøm".',name:"items",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"},required:!1,tags:{},type:{name:"{ value: string; label: string; id?: string | null; }[] | null"}},id:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"}],description:"",name:"id",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"},required:!1,tags:{},type:{name:"string | null"}},blockName:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"}],description:"",name:"blockName",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"},required:!1,tags:{},type:{name:"string | null"}},blockType:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"}],description:"",name:"blockType",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"StatsBlock"},required:!0,tags:{},type:{name:'"stats"'}},tenantSlug:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/blocks/Stats/Component.tsx",name:"TypeLiteral"}],description:"",name:"tenantSlug",required:!1,tags:{},type:{name:"string"}}},tags:{}}}catch{}const B={title:"Blokke/Nøgletal",component:n,parameters:{docs:{description:{component:"To til fire tal der skal huskes. Findes i tre toner: brandfarve, klima (sitets grønne) og sand. Overskrift og underrubrik er valgfri."}}},render:g(n)},t={args:{heading:"Tallene der tæller",intro:"Underrubrikken er valgfri.",tone:"brand",items:[{value:"98%",label:"Leveret til tiden"},{value:"14",label:"Allergener mærket"},{value:"12",label:"Faste avlere"}]}},r={args:{tone:"eco",items:[{value:"100%",label:"Økologi"},{value:"0,9 kg",label:"CO2e pr. kuvert"}]}},s={args:{tone:"sand",items:[{value:"2014",label:"Første køkken"},{value:"3",label:"Køkkener i dag"},{value:"450",label:"Kuverter om dagen"},{value:"1",label:"Hverdag til svar"}]}},_=["Brandfarve","Klima","Sand"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    heading: 'Tallene der tæller',
    intro: 'Underrubrikken er valgfri.',
    tone: 'brand',
    items: [{
      value: '98%',
      label: 'Leveret til tiden'
    }, {
      value: '14',
      label: 'Allergener mærket'
    }, {
      value: '12',
      label: 'Faste avlere'
    }]
  } as never
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'eco',
    items: [{
      value: '100%',
      label: 'Økologi'
    }, {
      value: '0,9 kg',
      label: 'CO2e pr. kuvert'
    }]
  } as never
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'sand',
    items: [{
      value: '2014',
      label: 'Første køkken'
    }, {
      value: '3',
      label: 'Køkkener i dag'
    }, {
      value: '450',
      label: 'Kuverter om dagen'
    }, {
      value: '1',
      label: 'Hverdag til svar'
    }]
  } as never
}`,...s.parameters?.docs?.source}}};export{t as Brandfarve,r as Klima,s as Sand,_ as __namedExportsOrder,B as default};
