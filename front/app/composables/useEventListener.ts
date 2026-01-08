/**
 * イベントリスナーの登録・解除を行う
 * @param type イベントの種類 keydown | click を Genericで指定
 * @param callback 登録するコールバック関数
 * @returns void
 */
export const useEventListener = <T extends keyof DocumentEventMap>(
  type: T,
  callback: (event: DocumentEventMap[T]) => void
) => {
  onMounted(() => {
    document.addEventListener(type, callback);
  });
  onUnmounted(() => {
    document.removeEventListener(type, callback);
  });
};
