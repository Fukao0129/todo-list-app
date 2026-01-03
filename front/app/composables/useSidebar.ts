export const useSidebar = () => {
  // 表示フラグ
  const isSidebarVisible = useState<boolean>("isSidebarVisible", () => true);

  /** サイドバーの表示/非表示を切り替える */
  const showSidebar = () => {
    isSidebarVisible.value = true;
  };

  const hideSidebar = () => {
    isSidebarVisible.value = false;
  };

  return {
    isSidebarVisible,
    showSidebar,
    hideSidebar,
  };
};
