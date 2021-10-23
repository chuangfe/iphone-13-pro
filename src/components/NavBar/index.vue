<script>
let listContainer;

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
    setMenuHandler() {
      this.$emit("setMenu", !this.isMenu);
      listContainer.classList.remove("overflow-auto");
    },

    positionContainerTransitionendHandler(e) {
      if (e.propertyName === "height") {
        listContainer.classList.add("overflow-auto");
      }
    },

    searchFocusHandler() {
      listContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      this.$emit("setFocus", true);
    },
  },

  mounted() {
    listContainer = this.$el.querySelector(".mobile-container .list-container");
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
