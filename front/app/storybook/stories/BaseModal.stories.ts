import type { Meta, StoryObj } from "@storybook/vue3";
import BaseModal from "@/components/Base/BaseModal.vue";
import BaseButton from "@/components/Base/BaseButton.vue";

/** モーダルに使用します。 */
const meta: Meta<typeof BaseModal> = {
  title: "Base/BaseModal",
  component: BaseModal,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "モーダルのタイトル",
    },
    modelValue: {
      description: "表示状態",
      table: {
        category: "model",
      },
    },
    content: {
      description: "メインコンテンツ (Slot: content)",
    },
    footer: {
      description: "フッターコンテンツ (Slot: footer)",
    },
  },
  args: {
    title: "モーダルのタイトル",
    modelValue: false,
    content: "ここにモーダルのメインコンテンツが表示されます。",
  },
};

export default meta;

type Story = StoryObj<typeof BaseModal>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      const isOpen = ref(args.modelValue);
      watch(
        () => args.modelValue,
        (val) => {
          isOpen.value = val;
        },
      );

      return { args, isOpen };
    },
    template: `
      <div>
        <BaseButton 
          text="モーダルを開く" 
          color="info" 
          @click="isOpen = true" 
        />

        <BaseModal
          v-bind="args"
          v-model="isOpen"
        >
          <template #content>
            {{ args.content }}
          </template>
          <template #footer>
            <div class="flex justify-end gap-2">
              <BaseButton text="キャンセル" color="secondary" @click="isOpen = false" />
              <BaseButton text="OK" color="info" @click="isOpen = false" />
            </div>
          </template>
        </BaseModal>
      </div>
    `,
  }),
};
