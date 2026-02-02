import type { Meta, StoryObj } from "@storybook/vue3";
import BaseToggle from "@/components/Base/BaseToggle.vue";

/** トグルスイッチに使用します。 */
const meta: Meta<typeof BaseToggle> = {
  title: "Base/BaseToggle",
  component: BaseToggle,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "ラベルテキスト",
    },
    modelValue: {
      description: "ON/OFFの状態",
      table: {
        category: "model",
      },
    },
  },
  args: {
    label: "ラベル",
    modelValue: false,
  },
};

export default meta;

type Story = StoryObj<typeof BaseToggle>;

export const Default: Story = {};
