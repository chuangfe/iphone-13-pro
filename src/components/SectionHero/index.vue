<script>
let video;

export default {
  name: "SectionHero",

  data() {
    return {
      isEnded: false,
      isRunning: false,
    };
  },

  computed: {
    getRunning() {
      return this.isRunning ? "running" : "paused";
    },
  },

  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // document.body.style.overflow = "hidden";

    video = this.$el.querySelector(".video");

    video.addEventListener("canplay", () => {
      video.play();
      this.isRunning = true;
    });

    video.addEventListener("ended", () => {
      document.body.style.overflow = "auto";
      this.isEnded = true;
    });

    video.src = "./videos/section-hero-large.mp4";
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
