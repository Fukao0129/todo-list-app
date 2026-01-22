import type { Meta, StoryObj } from "@storybook/vue3";
import { fn } from "@storybook/test";
import { COLOR_TOKENS } from "@/types/design-token";
import BaseIcon from "@/components/Base/BaseIcon.vue";

const DUMMY_ICON = "star";

/** アイコンの表示に使用します。FontAwesomeIconのラッパーです。 */
/** サイズは Tailwind CSS のユーティリティクラスが適応されます。 */
const meta: Meta<typeof BaseIcon> = {
  title: "Base/BaseIcon",
  component: BaseIcon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "FontAwesomeのアイコン名",
    },
    color: {
      options: COLOR_TOKENS,
      description: "アイコンカラー",
    },
    isClickable: {
      description: "クリック可能かどうか",
    },
    // @ts-expect-error
    click: {
      description: "クリックイベント",
      table: {
        type: { summary: "function" },
      },
    },
  },
  args: {
    icon: DUMMY_ICON,
    color: "default",
    isClickable: false,
  },
};

export default meta;

type Story = StoryObj<typeof BaseIcon>;

/** デフォルトの表示 */
export const Default: Story = {};

/** デザイントークン「COLOR_TOKENS」に対応した色のバリエーションがあります */
export const ColorVariations: Story = {
  render: (args) => ({
    components: { BaseIcon },
    setup() {
      return { args, tokens: COLOR_TOKENS };
    },
    template: `
      <div class="flex gap-4 p-4 text-2xl">
        <div v-for="token in tokens" :key="token" class="flex flex-col items-center gap-2">
           <div :class="{'bg-neutral p-1 rounded': token === 'white'}">
              <BaseIcon v-bind="args" :color="token" />
           </div>
           <span class="text-xs text-neutral-muted">{{ token }}</span>
        </div>
      </div>
    `,
  }),
};

/** クリック可能なアイコン */
export const Clickable: Story = {
  args: {
    isClickable: true,
  },
};
