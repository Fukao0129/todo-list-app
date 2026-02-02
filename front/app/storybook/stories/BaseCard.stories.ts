import type { Meta, StoryObj } from "@storybook/vue3";
import BaseCard from "@/components/Base/BaseCard.vue";
import { CARD_VARIANT_TOKENS } from "@/types/design-token";

const DUMMY_TEXT = "いつの日もこの胸に流れているメロディー";
const slotTemplate = (content: string) => `<div class="p-4">${content}</div>`;

/** カードの表示に使用します。 */
const meta: Meta<typeof BaseCard> = {
  title: "Base/BaseCard",
  component: BaseCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: CARD_VARIANT_TOKENS,
      description: "カードの種類",
    },
    hasShadow: {
      description: "影の有無",
    },
    default: {
      description: "カードの内容（Slot）",
    },
  },
  args: {
    default: DUMMY_TEXT,
    variant: "default",
    hasShadow: true,
  },
};

export default meta;

type Story = StoryObj<typeof BaseCard>;

/** デフォルトの表示 */
export const Default: Story = {
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args };
    },
    template: `
      <BaseCard v-bind="args">
        ${slotTemplate("{{ args.default }}")}
      </BaseCard>
    `,
  }),
};

/** デザイントークン「CARD\_VARIANT\_TOKENS」に対応した種類のバリエーションがあります */
export const Variants: Story = {
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args, tokens: CARD_VARIANT_TOKENS };
    },
    template: `
      <div class="flex flex-col gap-4">
        <BaseCard v-for="token in tokens" :key="token" v-bind="args" :variant="token">
          ${slotTemplate("{{ token }}")}
        </BaseCard>
      </div>
    `,
  }),
};
