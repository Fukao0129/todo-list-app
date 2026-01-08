/** 指定した要素にフォーカスを当てる
 *  @param selector フォーカスを当てる対象のセレクター
 */
export const focusOnElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (element) {
    element.focus();
  }
};
