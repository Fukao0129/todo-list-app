import type { Meta, StoryObj } from "@storybook/vue3";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import type { SelectOption } from "@/types/select-option";

/** セレクトボックスに使用します。 */
const meta: Meta<typeof BaseSelect> = {
  title: "Base/BaseSelect",
  component: BaseSelect,
  tags: ["autodocs"],
  argTypes: {
    options: {
      description: "選択肢のリスト",
      control: "object",
    },
    modelValue: {
      control: "number",
      description: "選択された値 (v-model)",
      table: {
        category: "model",
        type: { summary: "number | undefined" },
      },
    },
  },
  args: {
    options: [
      { id: 1, name: "選択肢 1" },
      { id: 2, name: "選択肢 2" },
      { id: 3, name: "選択肢 3" },
    ] as SelectOption[],
  },
};

export default meta;

type Story = StoryObj<typeof BaseSelect>;

/** デフォルトの表示 */
export const Default: Story = {};

/** 選択済みの表示 */
export const Selected: Story = {
  args: {
    modelValue: 2,
  },
};
