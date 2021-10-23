<template>
  <div id="app">
    <transition name="mask">
      <div
        class="mask-local"
        v-show="isMask"
        @click="isMask = isMenu = isFocus = isLocal = false"
      ></div>
    </transition>

    <NavBar
      :isMenu="isMenu"
      :isFocus="isFocus"
      @setMenu="setMenuHandler"
      @setFocus="setFocusHandler"
    />

    <NavLocal :isLocal="isLocal" @setLocal="setLocalHandler" />

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
import NavBar from "./components/NavBar/index";
import NavLocal from "./components/NavLocal/index";

export default {
  name: "App",

  data() {
    return {
      isMask: false,
      isMenu: false,
      isFocus: false,
      isLocal: false,

      // 等所有 el 樣式固定後, 再次修改值.
      isLoaded: 0,

      windowInnerWidth: 0,
      windowTop: 0,
      windowCenter: 0,
      windowBottom: 0,
    };
  },

  methods: {
    setMenuHandler(val) {
      this.isMask = this.isMenu = val;
    },
    setFocusHandler(val) {
      this.isFocus = val;
    },

    setLocalHandler(val) {
      this.isMask = this.isLocal = val;
    },

    windowScrollHandler(e) {
      if (e.currentTarget !== window) return false;

      this.isMask = this.isMenu = this.isFocus = this.isLocal = false;
      this.windowTop = window.scrollY;
      this.windowCenter = window.scrollY + Math.floor(window.innerHeight / 2);
      this.windowBottom = window.scrollY + window.innerHeight;
    },
  },

  components: {
    SectionCamera,
    NavBar,
    NavLocal,
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

<style lang="scss">
/**
* z-index 順序.
* NavBar, 1000.
* NavLocal, 100.
* mask-local, 10.
*/

@import "./assets/style/variable.scss";
@import "./assets/style/class.scss";

#app {
  height: 500vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  // 因為 NavBar NavLocal .mask-local 需要 body 的 height: 100%; 所以不能讓 #app 有 position: relative;
  .mask-local {
    width: 100%;
    height: 100%;
    background-color: rgba($black-000000, 0.4);
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 10;
  }
}

// 進場前的樣式.
.mask-enter,
// 離場結束的樣式.
.mask-leave-to {
  opacity: 0;
}
// 進場結束的樣式.
.mask-enter-to,
// 離場前的樣式.
.mask-leave {
  opacity: 1;
}
// 進場動畫.
.mask-enter-active,
// 離場動畫.
.mask-leave-active {
  transition: opacity 0.4s ease;
}
</style>
