<template>
  <div id="app">
    <main class="main">
      <SectionCamera
        :windowCenter="windowCenter"
        :windowBottom="windowBottom"
        :isLoaded="isLoaded"
      />
    </main>
  </div>
</template>

<script>
import SectionCamera from "./components/SectionCamera/index";

export default {
  name: "App",

  data() {
    return {
      // 等所有 el 樣式固定後, 再次修改值.
      isLoaded: 0,

      windowInnerWidth: 0,
      windowTop: 0,
      windowCenter: 0,
      windowBottom: 0,
    };
  },

  methods: {
    windowScrollHandler(e) {
      if (e.currentTarget !== window) return false;

      this.isLocal = false;
      this.windowTop = window.scrollY;
      this.windowCenter = window.scrollY + Math.floor(window.innerHeight / 2);
      this.windowBottom = window.scrollY + window.innerHeight;
    },
  },

  components: {
    SectionCamera,
  },

  mounted() {
    this.windowInnerWidth = window.innerWidth;

    window.addEventListener("scroll", this.windowScrollHandler);

    window.addEventListener("load", () => {
      this.isLoaded += 1;
    });

    window.addEventListener("resize", () => {
      if (this.windowInnerWidth !== window.innerWidth) {
        this.windowInnerWidth = window.innerWidth;
        this.isLoaded += 1;
      }
    });
  },
};
</script>

<style lang="scss"></style>
