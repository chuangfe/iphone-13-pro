import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 唯一樣式.
import "./assets/style/main.scss";

// 計算 el 的各項矩形值.
function getOffsetPosition(el) {
  const position = {
    offsetTop: el.offsetTop,
    offsetLeft: el.offsetLeft,
    offsetCenter: 0,
    offsetBottom: 0,
    offsetWidth: 0,
    offsetHeight: 0,
  };
  let parent = el.offsetParent;

  while (parent) {
    position.offsetTop += parent.offsetTop;
    position.offsetLeft += parent.offsetLeft;
    parent = parent.offsetParent;
  }

  position.offsetCenter = position.offsetTop + Math.floor(el.offsetHeight / 2);
  position.offsetBottom = position.offsetTop + Math.floor(el.offsetHeight);

  position.offsetWidth = Math.floor(el.offsetWidth);
  position.offsetHeight = Math.floor(el.offsetHeight);

  return position;
}
// 使用 dataset 將各項矩形值綁給 el 元素.
function offsetRectHandler(el) {
  const clientRect = getOffsetPosition(el);

  el.dataset.offsetTop = clientRect.offsetTop;
  el.dataset.offsetLeft = clientRect.offsetLeft;

  el.dataset.offsetCenter = clientRect.offsetCenter;
  el.dataset.offsetBottom = clientRect.offsetBottom;

  el.dataset.offsetWidth = clientRect.offsetWidth;
  el.dataset.offsetHeight = clientRect.offsetHeight;
}

// 自訂指令, 獲取 el 的相關座標
Vue.directive("offset-rect", {
  // 畫面繪製後執行.
  inserted: offsetRectHandler,
  update: offsetRectHandler,
});

// 自訂指令, 判斷 view 是否進入 el 範圍.
Vue.directive("view-flag", {
  /**
   * value 值改變時執行.
   * value 可能是瀏覽器可視區的 top center bottom, 在網頁中的座標.
   * value 使用 view center 可以偷懶.
   */
  update(el, { value }) {
    const flag =
      value > Number(el.dataset.offsetTop) &&
      value < Number(el.dataset.offsetBottom)
        ? "true"
        : "";

    el.dataset.flag = flag;
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
