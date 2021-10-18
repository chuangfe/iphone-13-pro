<script>
let isPlay = false,
  pianoVideo;

export default {
  name: "CameraMacro",

  props: ["windowCenter", "isLoaded"],

  directives: {
    "video-play": {
      update(el) {
        const flag = Boolean(el.dataset.flag);

        if (flag) {
          if (isPlay === false) {
            isPlay = true;
            pianoVideo.play();
          }
        } else {
          if (isPlay === true) {
            isPlay = false;
            pianoVideo.pause();
          }
        }
      },
    },
  },

  mounted() {
    pianoVideo = this.$el.querySelector(".piano-video");
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
