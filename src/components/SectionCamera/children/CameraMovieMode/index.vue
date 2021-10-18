<script>
const verticalData = {
    imageContentWidth: 622,
    imageContentHeight: 893,
    paddingTop: 179,
    paddingBottom: 352,
    paddingLeft: 41,
    paddingRight: 41,
    videoFit: "cover",
    backgroundImageSrc:
      "./images/section-camera-cinematic-mode-screen-small-2x.png",
    videoSrc: "./videos/section-camera-mode-screen-small-2x.mp4",
  },
  horizontalData = {
    imageContentWidth: 1211,
    imageContentHeight: 461,
    paddingTop: 101,
    paddingBottom: 165,
    paddingLeft: 80,
    paddingRight: 186,
    videoFit: "cover",
    backgroundImageSrc:
      "./images/section-camera-cinematic-mode-hardware-zoomed-large.png",
    videoSrc: "./videos/section-camera-mode-screen-large-2x.mp4",
  };

let isPlay, movieScaleContainer, movieContainer, movieVideo;

/**
 * el 是 video 的 container 容器.
 * imageContentWidth imageContentHeight 是背景圖片中間顯示影片的區域.
 * padding 是背景圖片顯示影片區域以外的背景.
 */
function setPadding(
  el,
  {
    imageContentWidth,
    imageContentHeight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    videoFit,
    backgroundImageSrc,
    videoSrc,
  }
) {
  const video = el.querySelector("video");

  // 計算 videoContainer 顯示影片的區域的寬高.
  el.style.width = "100vw";
  el.style.height = "100vh";
  el.style.aspectRatio = imageContentWidth + "/" + imageContentHeight;
  el.style.backgroundImage = "url(" + backgroundImageSrc + ")";

  video.style.objectFit = videoFit;
  video.src = videoSrc;

  // 判斷顯示影片區與 100vw 100vh 的差距.
  if (
    window.innerWidth / imageContentWidth >
    window.innerHeight / imageContentHeight
  ) {
    // 寬度不夠, 高度剛好.
    el.style.width = "100vw";
    el.style.height = "auto";
  }
  // 高度不夠, 寬度剛好.
  else {
    el.style.width = "auto";
    el.style.height = "100vh";
  }

  // 顯示影片區需要大於 100vw 100vh 的值.
  const offsetWidth = el.offsetWidth,
    offsetHeight = el.offsetHeight;

  el.style.width = offsetWidth + "px";
  el.style.height = offsetHeight + "px";
  el.style.aspectRatio = "auto";

  // 使用 padding 把顯示影片區以外的背景圖片推出去.
  // 使用 background-origin: border-box; 樣式.
  const topCalc = (paddingTop / imageContentHeight) * offsetHeight,
    bottomCalc = (paddingBottom / imageContentHeight) * offsetHeight,
    leftCalc = (paddingLeft / imageContentWidth) * offsetWidth,
    rightCalc = (paddingRight / imageContentWidth) * offsetWidth;

  el.style.paddingLeft = leftCalc + "px";
  el.style.paddingRight = rightCalc + "px";

  el.style.paddingTop = topCalc + "px";
  el.style.paddingBottom = bottomCalc + "px";

  // 讓影片顯示區靠在最上方, 水平置中使用 style 調整.
  el.style.marginTop = `-${topCalc}px`;
}

export default {
  name: "CameraMovieMode",

  props: ["windowBottom", "isLoaded"],

  directives: {
    // 綁定在 .movie-section
    "movie-play": {
      update(el, { value }) {
        const flag = Boolean(el.dataset.flag);

        if (flag) {
          if (!isPlay) {
            isPlay = true;
            movieVideo.play();
          }
        } else {
          if (isPlay) {
            isPlay = false;
            movieVideo.pause();
          }
        }
      },
    },

    // 綁定在 .movie-section
    "movie-scale": {
      update(el, { value }) {
        if (!Boolean(el.dataset.flag)) return false;
        const height = Number(el.dataset.offsetHeight);
        const top = Number(el.dataset.offsetTop);
        const cneter = Number(el.dataset.offsetCenter);
        const end = Number(el.dataset.offsetBottom);
        const viewBottom = value - top - height / 2;
        const range = height / 2;

        let percentage = 0,
          scale = 0;

        if (value > cneter && value < end) {
          percentage = 1 - viewBottom / range;

          scale = 40 + Math.ceil(60 * percentage);

          movieScaleContainer.style.transform = "scale(" + scale + "%)";
        } else if (value < cneter) {
          movieScaleContainer.style.transform = "scale(100%)";
        }
      },
    },
  },

  mounted() {
    // 電影的 scale 容器.
    movieScaleContainer = this.$el.querySelector(".movie-scale-container");
    // 電影的容器.
    movieContainer = this.$el.querySelector(".movie-container");
    // 電影影片.
    movieVideo = this.$el.querySelector(".movie");

    setPadding(movieContainer, verticalData);
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
