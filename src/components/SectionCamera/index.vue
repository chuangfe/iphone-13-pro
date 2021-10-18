<template>
  <section class="section-camera">
    <!-- 相機 sticky 區域. -->
    <CameraIntro :windowBottom="windowBottom" :isLoaded="isLoaded" />

    <!-- 相機微距離介紹. -->
    <CameraMacro :windowCenter="windowCenter" :isLoaded="isLoaded" />

    <!-- 相機低光源介紹. -->
    <CameraLowLight />

    <!-- 相機變焦介紹. -->
    <CameraZoom />

    <!-- 電影模式. -->
    <CameraMovieMode :windowBottom="windowBottom" :isLoaded="isLoaded" />

    <!-- 攝影風格. -->
    <CameraPhotographyStyles />

    <!-- 高色彩保真度. -->
    <CameraProRes />

    <!-- 色彩演算. -->
    <CameraComputationalPhotography />

    <!-- 相機硬體介紹. -->
    <CameraHardware />

    <!-- 相機真實度. -->
    <CameraTruedepth />

    <!-- 手機容量. -->
    <CameraStorage />
  </section>
</template>

<script>
import CameraIntro from "./children/CameraIntro/index";
import CameraMacro from "./children/CameraMacro/index";
import CameraLowLight from "./children/CameraLowLight/index";
import CameraZoom from "./children/CameraZoom/index";
import CameraMovieMode from "./children/CameraMovieMode/index";
import CameraPhotographyStyles from "./children/CameraPhotographyStyles/index";
import CameraProRes from "./children/CameraProRes/index";
import CameraComputationalPhotography from "./children/CameraComputationalPhotography/index";
import CameraHardware from "./children/CameraHardware/index";
import CameraTruedepth from "./children/CameraTruedepth/index";
import CameraStorage from "./children/CameraStorage/index";

export default {
  name: "SectionCamera",

  props: ["windowCenter", "windowBottom", "isLoaded"],

  components: {
    CameraIntro,
    CameraMacro,
    CameraLowLight,
    CameraZoom,
    CameraMovieMode,
    CameraPhotographyStyles,
    CameraProRes,
    CameraComputationalPhotography,
    CameraHardware,
    CameraTruedepth,
    CameraStorage,
  },
};
</script>

<style lang="scss" scoped></style>
