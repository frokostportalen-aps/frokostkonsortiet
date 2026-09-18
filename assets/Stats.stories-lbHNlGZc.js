import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{d as t}from"./iframe-BpMttw-a.js";import{n,t as r}from"./ui-C5C99kMD.js";import{n as i,t as a}from"./SectionHeader-V1DKFZre.js";import{a as o,n as s}from"./mocks-Bgzva6MV.js";var c,l,u,d;function f(){return(f=e((()=>{c=t(),i(),n(),l={brand:{band:`bg-primary text-primary-foreground`},eco:{band:`bg-eco text-eco-foreground`},sand:{band:`bg-secondary text-secondary-foreground`,value:`text-primary`}},u={2:`sm:grid-cols-2`,3:`sm:grid-cols-3`,4:`sm:grid-cols-2 lg:grid-cols-4`},d=({heading:e,intro:t,items:n,tone:i})=>{if(!n?.length)return null;let o=l[i??`brand`],s=u[n.length]??`sm:grid-cols-2 lg:grid-cols-4`;return(0,c.jsx)(`div`,{className:`container`,children:(0,c.jsxs)(`div`,{className:r(`rounded-band px-6 py-10 md:px-12 md:py-14`,o.band),children:[(0,c.jsx)(a,{heading:e,intro:t,muted:!1}),(0,c.jsx)(`dl`,{className:r(`grid grid-cols-1 gap-x-8 gap-y-10 lg:gap-y-0`,s),children:n.map((e,t)=>(0,c.jsxs)(`div`,{className:r(`flex flex-col items-center px-6 text-center`,t>0&&`lg:border-l lg:border-current/20`),children:[(0,c.jsx)(`dt`,{className:r(`font-heading text-4xl leading-none tracking-tight md:text-5xl`,o.value),children:e.value}),(0,c.jsx)(`dd`,{className:`mt-4 max-w-[32ch] text-xs font-semibold uppercase leading-[1.5] tracking-label opacity-75`,children:e.label})]},t))})]})})};try{d.displayName=`StatsBlock`,d.__docgenInfo={description:``,displayName:`StatsBlock`,filePath:`/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/Stats/Component.tsx`,methods:[],props:{heading:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`}],description:``,name:`heading`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`},required:!1,tags:{},type:{name:`string | null`}},intro:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`}],description:``,name:`intro`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`},required:!1,tags:{},type:{name:`string | null`}},tone:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`}],description:`Brandfarve er sitets stærkeste flade. Klima bruger sitets øko-farve – vælg den, når tallene handler om CO2, økologi eller sæson. Sand er den rolige variant, når båndet ikke skal råbe.`,name:`tone`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`},required:!1,tags:{},type:{name:`"brand" | "eco" | "sand" | null`}},items:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`}],description:`Vises som store nøgletal i et bånd – fx "1980", "5 køkkener", "100% grøn strøm".`,name:`items`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`},required:!1,tags:{},type:{name:`{ value: string; label: string; id?: string | null; }[] | null`}},id:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`}],description:``,name:`id`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`},required:!1,tags:{},type:{name:`string | null`}},blockName:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`}],description:``,name:`blockName`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`},required:!1,tags:{},type:{name:`string | null`}},blockType:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`}],description:``,name:`blockType`,parent:{fileName:`frokostkonsortiet/src/payload-types.ts`,name:`StatsBlock`},required:!0,tags:{},type:{name:`"stats"`}},tenantSlug:{defaultValue:null,declarations:[{fileName:`frokostkonsortiet/src/blocks/Stats/Component.tsx`,name:`TypeLiteral`}],description:``,name:`tenantSlug`,required:!1,tags:{},type:{name:`string`}}},tags:{}}}catch{}})))()}var p,m,h,g,_;function v(){return(v=e((()=>{f(),s(),p={title:`Blokke/Nøgletal`,component:d,parameters:{docs:{description:{component:`To til fire tal der skal huskes. Findes i tre toner: brandfarve, klima (sitets grønne) og sand. Overskrift og underrubrik er valgfri.`}}},render:o(d)},m={args:{heading:`Tallene der tæller`,intro:`Underrubrikken er valgfri.`,tone:`brand`,items:[{value:`98%`,label:`Leveret til tiden`},{value:`14`,label:`Allergener mærket`},{value:`12`,label:`Faste avlere`}]}},h={args:{tone:`eco`,items:[{value:`100%`,label:`Økologi`},{value:`0,9 kg`,label:`CO2e pr. kuvert`}]}},g={args:{tone:`sand`,items:[{value:`2014`,label:`Første køkken`},{value:`3`,label:`Køkkener i dag`},{value:`450`,label:`Kuverter om dagen`},{value:`1`,label:`Hverdag til svar`}]}},_=[`Brandfarve`,`Klima`,`Sand`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}}})))()}v();export{m as Brandfarve,h as Klima,g as Sand,_ as __namedExportsOrder,p as default};