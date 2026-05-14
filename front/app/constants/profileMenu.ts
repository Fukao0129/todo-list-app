/** 設定のメニュー */
export const SETTING_MENU = [
  {
    key: "user",
    name: "ユーザー情報",
    icon: "user",
    component: "SettingsUserUpdateForm",
  },
  {
    key: "password",
    name: "パスワード変更",
    icon: "key",
    component: "SettingsPasswordUpdateForm",
  },
  {
    key: "delete",
    name: "アカウント削除",
    icon: "user-slash",
    component: "SettingsUserDeleteForm",
  },
] as const;
