import{T as i,C as d,a as p}from"./FDlfRI6O.js";import{_ as a}from"./CADcuymq.js";import"./BhoS_8da.js";import"./PPVm8Dsz.js";const r="いつの日もこの胸に流れているメロディー",u={title:"Base/BaseText",component:a,tags:["autodocs"],argTypes:{tag:{control:"select",options:["p","span","label"],description:"HTMLタグ"},size:{control:"select",options:p,description:"テキストサイズ"},color:{control:"select",options:d,description:"テキストカラー"},align:{control:"select",options:i,description:"テキスト配置"},bold:{control:"boolean",description:"太字にするかどうか"},default:{control:"text",description:"テキストの内容（Slot）"}},args:{default:r,tag:"p",size:"default",color:"default",align:"left",bold:!1},parameters:{docs:{description:{component:"テキストの表示に使用します"}}}},e={},t={render:c=>({components:{BaseText:a},setup(){return{args:c,tokens:d,DUMMY_TEXT:r}},template:`
      <div class="flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" v-bind="args" :color="token">
          <div :class="{'bg-neutral p-2': token === 'white'}">
            {{ DUMMY_TEXT }} ( {{ token }})
          </div>
        </BaseText>
      </div>
    `})},o={render:c=>({components:{BaseText:a},setup(){return{args:c,tokens:p,DUMMY_TEXT:r}},template:`
      <div class="flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" v-bind="args" :size="token" >
          {{ DUMMY_TEXT }} ( {{ token }} )
        </BaseText>
      </div>
    `})},s={render:()=>({components:{BaseText:a},setup(){return{DUMMY_TEXT:r,tokens:i}},template:`
      <div class="w-full max-w-xs border border-dashed p-4 flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" :align="token">{{ DUMMY_TEXT }} ( {{ token }} )</BaseText>
      </div>
    `})},n={args:{default:r,bold:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source},description:{story:"デフォルトの表示",...e.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      BaseText
    },
    setup() {
      return {
        args,
        tokens: COLOR_TOKENS,
        DUMMY_TEXT
      };
    },
    template: \`
      <div class="flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" v-bind="args" :color="token">
          <div :class="{'bg-neutral p-2': token === 'white'}">
            {{ DUMMY_TEXT }} ( {{ token }})
          </div>
        </BaseText>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source},description:{story:"デザイントークン「COLOR_TOKENS」に対応した色のバリエーションがあります",...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      BaseText
    },
    setup() {
      return {
        args,
        tokens: TEXT_SIZE_TOKENS,
        DUMMY_TEXT
      };
    },
    template: \`
      <div class="flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" v-bind="args" :size="token" >
          {{ DUMMY_TEXT }} ( {{ token }} )
        </BaseText>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source},description:{story:"デザイントークン「TEXT\\_SIZE\\_TOKENS」に対応したサイズのバリエーションがあります",...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BaseText
    },
    setup() {
      return {
        DUMMY_TEXT,
        tokens: TEXT_ALIGN_TOKENS
      };
    },
    template: \`
      <div class="w-full max-w-xs border border-dashed p-4 flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" :align="token">{{ DUMMY_TEXT }} ( {{ token }} )</BaseText>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source},description:{story:"デザイントークン「TEXT\\_ALIGN\\_TOKENS」に対応した配置のバリエーションがあります",...s.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    default: DUMMY_TEXT,
    bold: true
  }
}`,...n.parameters?.docs?.source},description:{story:"太くできます (wieght=700)",...n.parameters?.docs?.description}}};const x=["Default","ColorVariations","Sizes","Alignments","Bold"];export{s as Alignments,n as Bold,t as ColorVariations,e as Default,o as Sizes,x as __namedExportsOrder,u as default};
