import{j as e}from"./iframe-CDQ5gkld.js";import{g as M}from"./dialect-DjMqca7u.js";import{R as j,a as C}from"./index-soa0HHcW.js";import{M as N}from"./index-KusQ6t83.js";import{s as S}from"./index-BlZVNKKG.js";import{c as d}from"./ui-Bl6YMQn_.js";import{p as t,c as f,w as A}from"./mocks-BTP3jKfO.js";import{r as n,p as a,h as r}from"./lexical-GeUn23Ki.js";import"./preload-helper-PPVm8Dsz.js";import"./button-DiJ64GNS.js";import"./index-C49bE58W.js";import"./index-pQEzLxpT.js";const c=({media:i,richText:p,links:s,imagePosition:h,mediaRatio:u,textAlign:b,tenantSlug:v})=>{const x=h==="right",o=u==="oneThird",y=b==="center",{signature:T}=M(v);return e.jsx("div",{className:"container",children:e.jsxs("div",{"data-variant":o?"inset":"flush",className:d("media-content-band grid items-stretch overflow-hidden rounded-lg","bg-accent text-accent-foreground",o?"md:grid-cols-3":"md:grid-cols-2"),children:[e.jsx("div",{className:d("relative",o?"aspect-[4/5] m-6 md:m-10 self-center":"min-h-[18rem] md:min-h-[26rem]",x&&"md:order-2"),children:i&&typeof i=="object"&&e.jsx(N,{fill:!0,imgClassName:"object-cover",resource:i,size:o?"(max-width: 768px) 100vw, (min-width: 1536px) 420px, 33vw":"(max-width: 768px) 100vw, (min-width: 1536px) 736px, 50vw"})}),e.jsxs("div",{className:d("flex flex-col justify-center gap-5 px-6 py-10 md:px-12 md:py-16",o&&"md:col-span-2",y&&"items-center text-center",x&&"md:order-1"),children:[e.jsx("span",{"aria-hidden":!0,className:d("block",S.band[T])}),p&&e.jsx(j,{className:"[&_p]:opacity-80",data:p,enableGutter:!1}),Array.isArray(s)&&s.length>0&&e.jsx("ul",{className:d("flex flex-wrap gap-4",y&&"justify-center"),children:s.map(({link:B},E)=>e.jsx("li",{children:e.jsx(C,{...B})},E))})]})]})})};try{c.displayName="MediaContentBlock",c.__docgenInfo={description:"",displayName:"MediaContentBlock",filePath:"/home/runner/work/frokostkonsortiet/frokostkonsortiet/src/blocks/MediaContent/Component.tsx",methods:[],props:{media:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"media",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!0,tags:{},type:{name:"string | Media"}},imagePosition:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"imagePosition",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!1,tags:{},type:{name:'"left" | "right" | null'}},mediaRatio:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"Halvdelen: billedet fylder sin halvdel af båndet fra kant til kant. En tredjedel: et smallere billede med luft omkring og teksten i de resterende to tredjedele – til portrætter og motiver, der ikke skal fylde halvdelen.",name:"mediaRatio",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!1,tags:{},type:{name:'"oneThird" | "half" | null'}},textAlign:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"textAlign",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!1,tags:{},type:{name:'"left" | "center" | null'}},richText:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"richText",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!1,tags:{},type:{name:'{ [k: string]: unknown; root: { type: string; children: { [k: string]: unknown; type: any; version: number; }[]; direction: "ltr" | "rtl" | null; format: "" | "left" | "start" | "center" | "right" | "end" | "justify"; indent: number; version: number; }; } | null'}},links:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"links",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!1,tags:{},type:{name:'{ link: { type?: "reference" | "custom" | null; newTab?: boolean | null; reference?: { relationTo: "pages"; value: string | Page; } | { relationTo: "posts"; value: string | Post; } | null | undefined; url?: string | ... 1 more ... | undefined; label: string; appearance?: "default" | ... 2 mor...'}},id:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"id",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!1,tags:{},type:{name:"string | null"}},blockName:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"blockName",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!1,tags:{},type:{name:"string | null"}},blockType:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"}],description:"",name:"blockType",parent:{fileName:"frokostkonsortiet/src/payload-types.ts",name:"MediaContentBlock"},required:!0,tags:{},type:{name:'"mediaContent"'}},tenantSlug:{defaultValue:null,declarations:[{fileName:"frokostkonsortiet/src/blocks/MediaContent/Component.tsx",name:"TypeLiteral"}],description:"",name:"tenantSlug",required:!1,tags:{},type:{name:"string"}}},tags:{}}}catch{}const G={title:"Blokke/Media + Content",component:c,parameters:{docs:{description:{component:"Billede i den ene side, tekst i den anden. Skift side hver gang blokken gentages ned ad en side, så den får rytme. Billedet kan fylde halvdelen eller kun en tredjedel."}}},render:A(c)},k={name:"Billede til venstre",args:{media:t.koekken(),imagePosition:"left",mediaRatio:"half",textAlign:"left",richText:n(r("h3","Mad lavet fra bunden"),a("Standardopsætningen: halv/halv, tekst venstrestillet, med plads til et par knapper.")),links:[f("Læs mere"),f("Se menuen","outline")]}},g={name:"Billede til højre",args:{media:t.anretning(),imagePosition:"right",mediaRatio:"half",textAlign:"left",richText:n(r("h3","Sæsonen bestemmer"),a("Samme blok med billedet i den anden side – sådan skabes rytmen ned ad siden.")),links:[]}},l={name:"Smalt billede, centreret tekst",args:{media:t.portraet(),imagePosition:"right",mediaRatio:"oneThird",textAlign:"center",richText:n(r("h3","Et portræt"),a("Billedet fylder en tredjedel, teksten er centreret.")),links:[]}},m={parameters:{docs:{description:{story:"Fire bånd med skiftende billedside – det mønster en indholdsside faktisk bygges af. Det sidste bånd er sat til en tredjedel, så man kan se de to bredder mødes."}}},args:{media:t.koekken()},render:(i,{globals:p})=>{const s=[{media:t.koekken(),imagePosition:"left",richText:n(r("h3","Mad lavet fra bunden"),a("Vi laver maden i vores eget køkken hver morgen – ikke pakket i forvejen dagen før.")),links:[f("Læs mere")]},{media:t.anretning(),imagePosition:"right",richText:n(r("h3","Sæsonen bestemmer"),a("Menuen følger året. Om vinteren rodfrugter og kål, om sommeren det der lige er kommet ind.")),links:[]},{media:t.raavarer(),imagePosition:"left",richText:n(r("h3","Faste avlere"),a("Vi køber hos de samme gårde år efter år, så vi ved hvad vi får – og de ved hvad vi skal bruge.")),links:[f("Mød avlerne","outline")]},{media:t.portraet(),imagePosition:"right",mediaRatio:"oneThird",richText:n(r("h3","Et smallere bånd til sidst"),a("Her fylder billedet kun en tredjedel – sådan mødes de to bredder ned ad en side.")),links:[]}];return e.jsx(e.Fragment,{children:s.map((h,u)=>e.jsx(c,{blockType:"mediaContent",mediaRatio:"half",textAlign:"left",tenantSlug:p.tenant,...h},u))})}},I=["BilledeTilVenstre","BilledeTilHøjre","SmaltBillede","Stablet"];k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Billede til venstre',
  args: {
    media: photos.koekken(),
    imagePosition: 'left',
    mediaRatio: 'half',
    textAlign: 'left',
    richText: richText(heading('h3', 'Mad lavet fra bunden'), p('Standardopsætningen: halv/halv, tekst venstrestillet, med plads til et par knapper.')),
    links: [cta('Læs mere'), cta('Se menuen', 'outline')]
  } as never
}`,...k.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Billede til højre',
  args: {
    media: photos.anretning(),
    imagePosition: 'right',
    mediaRatio: 'half',
    textAlign: 'left',
    richText: richText(heading('h3', 'Sæsonen bestemmer'), p('Samme blok med billedet i den anden side – sådan skabes rytmen ned ad siden.')),
    links: []
  } as never
}`,...g.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Smalt billede, centreret tekst',
  args: {
    media: photos.portraet(),
    imagePosition: 'right',
    mediaRatio: 'oneThird',
    textAlign: 'center',
    richText: richText(heading('h3', 'Et portræt'), p('Billedet fylder en tredjedel, teksten er centreret.')),
    links: []
  } as never
}`,...l.parameters?.docs?.source},description:{story:"Smallere billede med centreret tekst – til portrætter og motiver med luft om.",...l.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source},description:{story:`Sådan bruges blokken i praksis: flere bånd efter hinanden, hvor billedsiden
skifter for hvert. Det er vekslen, der giver siden rytme – to bånd med
billedet i samme side står tungt og læses som ét langt afsnit.

Her kan man vurdere afstanden mellem båndene og se, at teksten flugter på
tværs, hvilket ikke kan bedømmes på en enkelt blok.`,...m.parameters?.docs?.description}}};export{g as BilledeTilHøjre,k as BilledeTilVenstre,l as SmaltBillede,m as Stablet,I as __namedExportsOrder,G as default};
