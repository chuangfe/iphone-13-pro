<script>
// video 是否正在播放.
let playing = false;

export default {
  name: "SectionManifesto",

  props: ["windowTop", "windowCenter"],

  directives: {
    active: {
      update: (el, { value }) => {
        const offsetTop = Number(el.dataset.offsetTop);
        const offsetBottom = Number(el.dataset.offsetBottom);

        if (value > offsetTop && value < offsetBottom) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      },
    },

    "video-play": {
      update(el) {
        // 影片.
        const video = el.querySelector(".video");
        // 影片是否進入可視區範圍.
        const flag = Boolean(el.dataset.flag);

        // 影片在可視區範圍外.
        if (!flag) {
          if (playing) {
            // 停止播放.
            playing = false;
            video.pause();
          }
        }
        // 影片在可視區範圍內.
        else {
          // 尚未播放影片, 才能播放.
          if (!playing) {
            playing = true;
            video.play();
          }
        }
      },
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
