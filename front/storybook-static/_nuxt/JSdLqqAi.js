import{C as t}from"./FDlfRI6O.js";import{_ as r}from"./Dv_JhIDu.js";import"./BhoS_8da.js";import"./PPVm8Dsz.js";const n="star",d={title:"Base/BaseIcon",component:r,tags:["autodocs"],argTypes:{icon:{control:"text",description:"FontAwesomeのアイコン名"},color:{control:"select",options:t,description:"アイコンカラー"},isClickable:{control:"boolean",description:"クリック可能かどうか"}},args:{icon:n,color:"default",isClickable:!1},parameters:{docs:{description:{component:`アイコンの表示に使用します。FontAwesomeIconのラッパーです。
サイズは Tailwind CSS のユーティリティクラスが適応されます。`}}}},e={},o={render:a=>({components:{BaseIcon:r},setup(){return{args:a,tokens:t}},template:`
      <div class="flex gap-4 p-4 text-2xl">
        <div v-for="token in tokens" :key="token" class="flex flex-col items-center gap-2">
           <div :class="{'bg-neutral p-1 rounded': token === 'white'}">
              <BaseIcon v-bind="args" :color="token" />
           </div>
           <span class="text-xs text-neutral-muted">{{ token }}</span>
        </div>
      </div>
    `})},s={args:{isClickable:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source},description:{story:"デフォルトの表示",...e.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      BaseIcon
    },
    setup() {
      return {
        args,
        tokens: COLOR_TOKENS
      };
    },
    template: \`
      <div class="flex gap-4 p-4 text-2xl">
        <div v-for="token in tokens" :key="token" class="flex flex-col items-center gap-2">
           <div :class="{'bg-neutral p-1 rounded': token === 'white'}">
              <BaseIcon v-bind="args" :color="token" />
           </div>
           <span class="text-xs text-neutral-muted">{{ token }}</span>
        </div>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source},description:{story:"デザイントークン「COLOR_TOKENS」に対応した色のバリエーションがあります",...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isClickable: true
  }
}`,...s.parameters?.docs?.source},description:{story:"クリック可能なアイコン",...s.parameters?.docs?.description}}};const m=["Default","ColorVariations","Clickable"];export{s as Clickable,o as ColorVariations,e as Default,m as __namedExportsOrder,d as default};
