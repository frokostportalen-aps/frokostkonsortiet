import{C as n}from"./index-soa0HHcW.js";import{c as t,w as s}from"./mocks-BTP3jKfO.js";import{r as a,p as o,h as i}from"./lexical-GeUn23Ki.js";import"./iframe-CDQ5gkld.js";import"./preload-helper-PPVm8Dsz.js";import"./ui-Bl6YMQn_.js";import"./button-DiJ64GNS.js";import"./dialect-DjMqca7u.js";import"./index-C49bE58W.js";import"./index-pQEzLxpT.js";import"./index-BlZVNKKG.js";import"./index-KusQ6t83.js";const T={title:"Blokke/Call to Action",component:n,parameters:{docs:{description:{component:"Den afsluttende opfordring. Båndet står i sitets primærfarve i fuld styrke, så siden ender på brandet i stedet for at fade ud. Hører typisk nederst på en side."}}},render:s(n)},r={args:{richText:a(i("h3","Skal vi tage en snak?"),o("Vi vender tilbage inden for én hverdag med et tilbud, der passer til jer.")),links:[t("Få et tilbud"),t("Ring til os","outline")]}},e={name:"Én knap",args:{richText:a(i("h3","Klar til at smage?")),links:[t("Book en prøvedag")]}},b=["Standard","ÉnKnap"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    richText: richText(heading('h3', 'Skal vi tage en snak?'), p('Vi vender tilbage inden for én hverdag med et tilbud, der passer til jer.')),
    links: [cta('Få et tilbud'), cta('Ring til os', 'outline')]
  } as never
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Én knap',
  args: {
    richText: richText(heading('h3', 'Klar til at smage?')),
    links: [cta('Book en prøvedag')]
  } as never
}`,...e.parameters?.docs?.source},description:{story:"Med én knap – når der kun er én rigtig næste handling.",...e.parameters?.docs?.description}}};export{r as Standard,b as __namedExportsOrder,T as default,e as ÉnKnap};
