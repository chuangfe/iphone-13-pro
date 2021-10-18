<script>
let imageContainer;

export default {
  name: "CameraIntro",

  props: ["windowBottom", "isLoaded"],

  directives: {
    // 綁定在 .camera-intro-container
    "camera-sticky": {
      update(el, { value }) {
        if (!Boolean(el.dataset.flag)) return false;

        const start = Number(el.dataset.offsetTop);
        const range = Number(el.dataset.offsetHeight);
        const percentage = 1 - (value - start) / range;

        imageContainer.style.transform =
          "matrix(1, 0, 0, 1, 0, " + 80 * percentage + ")";
      },
    },
  },

  mounted() {
    imageContainer = this.$el.querySelector(".image-container");
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
