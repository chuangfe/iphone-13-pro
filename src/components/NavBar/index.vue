<script>
export default {
  name: "NavBar",

  props: {
    isMenu: {
      type: Boolean,
      required: true,
    },

    isFocus: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    searchFocusHandler() {
      // 好看很多.
      const listContainer = this.$el.querySelector(".list-container");
      listContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      this.$emit("setFocus", true);
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
