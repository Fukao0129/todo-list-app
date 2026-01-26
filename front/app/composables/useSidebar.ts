export const useSidebar = () => {
  // 表示フラグ
  const isSidebarVisible = useState<boolean>("isSidebarVisible", () => false);

  /** サイドバーを表示する */
  const showSidebar = () => {
    isSidebarVisible.value = true;
  };

  /** サイドバーを非表示にする */
  const hideSidebar = () => {
    isSidebarVisible.value = false;
  };

  return {
    isSidebarVisible,
    showSidebar,
    hideSidebar,
  };
};
