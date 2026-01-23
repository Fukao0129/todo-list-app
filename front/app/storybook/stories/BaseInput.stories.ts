import type { Meta, StoryObj } from "@storybook/vue3";
import BaseInput from "@/components/Base/BaseInput.vue";

/** 入力フィールドに使用します。 */
const meta: Meta<typeof BaseInput> = {
  title: "Base/BaseInput",
  component: BaseInput,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "ラベルテキスト",
    },
    errorMessage: {
      description: "エラーメッセージ",
    },
    modelValue: {
      control: "text",
      description: "入力値",
      table: {
        category: "model",
        type: { summary: "string" },
      },
    },
  },
  args: {
    label: "ラベル",
  },
};

export default meta;

type Story = StoryObj<typeof BaseInput>;

/** デフォルトの表示 */
export const Default: Story = {};

/** エラーがある場合の表示 */
export const WithError: Story = {
  args: {
    label: "メールアドレス",
    modelValue: "invalid-email@",
    errorMessage: ["メールアドレスの形式が正しくありません"],
  },
};
