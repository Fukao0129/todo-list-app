import type { Meta, StoryObj } from "@storybook/vue3";
import {
  TEXT_SIZE_TOKENS,
  COLOR_TOKENS,
  TEXT_ALIGN_TOKENS,
} from "@/types/design-token";
import BaseText from "@/components/Base/BaseText.vue";

const DUMMY_TEXT = "いつの日もこの胸に流れているメロディー";

/** テキストの表示に使用します */
const meta: Meta<typeof BaseText> = {
  title: "Base/BaseText",
  component: BaseText,
  tags: ["autodocs"],
  argTypes: {
    tag: {
      options: ["p", "span", "label"],
      description: "HTMLタグ",
    },
    size: {
      options: TEXT_SIZE_TOKENS,
      description: "テキストサイズ",
    },
    color: {
      options: COLOR_TOKENS,
      description: "テキストカラー",
    },
    align: {
      options: TEXT_ALIGN_TOKENS,
      description: "テキスト配置",
    },
    bold: {
      description: "太字にするかどうか",
    },
    default: {
      description: "テキストの内容（Slot）",
    },
  },
  args: {
    default: DUMMY_TEXT,
    tag: "p",
    size: "default",
    color: "default",
    align: "left",
    bold: false,
  },
};

export default meta;

type Story = StoryObj<typeof BaseText>;

/** デフォルトの表示 */
export const Default: Story = {};

/**  デザイントークン「COLOR_TOKENS」に対応した色のバリエーションがあります */
export const ColorVariations: Story = {
  render: (args) => ({
    components: { BaseText },
    setup() {
      return { args, tokens: COLOR_TOKENS, DUMMY_TEXT };
    },
    template: `
      <div class="flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" v-bind="args" :color="token">
          <div :class="{'bg-neutral p-2': token === 'white'}">
            {{ DUMMY_TEXT }} ( {{ token }})
          </div>
        </BaseText>
      </div>
    `,
  }),
};

/** デザイントークン「TEXT\_SIZE\_TOKENS」に対応したサイズのバリエーションがあります */
export const Sizes: Story = {
  render: (args) => ({
    components: { BaseText },
    setup() {
      return { args, tokens: TEXT_SIZE_TOKENS, DUMMY_TEXT };
    },
    template: `
      <div class="flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" v-bind="args" :size="token" >
          {{ DUMMY_TEXT }} ( {{ token }} )
        </BaseText>
      </div>
    `,
  }),
};

/** デザイントークン「TEXT\_ALIGN\_TOKENS」に対応した配置のバリエーションがあります */
export const Alignments: Story = {
  render: () => ({
    components: { BaseText },
    setup() {
      return { DUMMY_TEXT, tokens: TEXT_ALIGN_TOKENS };
    },
    template: `
      <div class="w-full max-w-xs border border-dashed p-4 flex flex-col gap-2">
        <BaseText v-for="token in tokens" :key="token" :align="token">{{ DUMMY_TEXT }} ( {{ token }} )</BaseText>
      </div>
    `,
  }),
};

/** 太くできます (wieght=700) */
export const Bold: Story = {
  args: {
    default: DUMMY_TEXT,
    bold: true,
  },
};
