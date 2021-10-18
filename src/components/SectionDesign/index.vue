<script>
let proMaxContainer, proMaxTitle, proContainer, proTitle;
let isPlay = false;

function setStyle(percentage) {
  if (percentage > 0.8) {
    proMaxContainer.style.transform = `translateX(25%)`;
    proContainer.style.transform = `translateX(-25%)`;
  } else {
    proMaxContainer.style.transform = `translateX(${40 -
      (15 * percentage) / 0.8}%)`;
    proContainer.style.transform = `translateX(${-40 +
      (15 * percentage) / 0.8}%)`;
  }

  if (percentage > 0.6) {
    if (percentage > 0.8) {
      proMaxTitle.style.opacity = proTitle.style.opacity = 1;
    } else {
      proMaxTitle.style.opacity = proTitle.style.opacity =
        (percentage - 0.6) / 0.2;
    }
  } else {
    proMaxTitle.style.opacity = proTitle.style.opacity = 0;
  }
}

export default {
  name: "SectionDesign",

  props: ["windowCenter"],

  data() {
    return {
      index: 0,
    };
  },

  computed: {
    translateX() {
      return "translateX(" + this.index * -100 + "%)";
    },
  },

  mounted() {
    proMaxContainer = this.$el.querySelector(
      ".pro-max-container .content-container"
    );
    proMaxTitle = proMaxContainer.querySelector(".spec-container");

    proContainer = this.$el.querySelector(".pro-container .content-container");
    proTitle = proContainer.querySelector(".spec-container");
  },

  directives: {
    variable: {
      update(el, { value }) {
        const flag = Boolean(el.dataset.flag);

        // 可視區中線沒有進入 .section-design 元素.
        if (!flag) return false;

        const start = Number(el.dataset.offsetTop);
        // 執行動畫的範圍.
        const showHeight = Math.floor(el.dataset.offsetHeight / 8);
        // 執行動畫的範圍的一半, 中線完全顯示元素.
        const halfHeight = Math.floor(showHeight / 2);
        const cneter = Math.floor(start + halfHeight);
        // 執行動畫的範圍結尾.
        const end = start + showHeight;

        // 有夠難算.
        const percentage = Number(
          (
            Math.abs(Math.abs(value - cneter) - halfHeight) / halfHeight
          ).toFixed(2)
        );

        if (value > end) return false;

        setStyle(percentage);
      },
    },

    "video-play": {
      update(el, { value }) {
        const flag = Boolean(el.dataset.flag);

        // 影片在可視區範圍外.
        if (!flag) {
          if (isPlay) {
            // 停止播放.
            isPlay = false;
            el.pause();
          }
        }
        // 影片在可視區範圍內.
        else {
          // 尚未播放影片, 才能播放.
          if (!isPlay) {
            isPlay = true;
            el.play();
          }
        }
      },
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
