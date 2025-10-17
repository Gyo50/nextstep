// 사이트 헤더 메뉴바 인터렉션
const menu = document.querySelector(".menu");
const ipadInteractionHeader = document.querySelector(
  ".ipad-interaction-header"
);

menu.addEventListener("mouseenter", (e) => {
  e.preventDefault();
  ipadInteractionHeader.classList.add("show");
});

ipadInteractionHeader.addEventListener("mouseenter", (e) => {
  e.preventDefault();
  ipadInteractionHeader.classList.add("show");
});

menu.addEventListener("mouseleave", () => {
  ipadInteractionHeader.classList.remove("show");
});

// 메인 섹션1 동영상 플레이
const video = document.querySelector(".video-parent video");
const playButton = document.querySelector(".play-bt-bg");

playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.classList.add("hide");
  } else {
    video.pause();
    playButton.classList.remove("hide");
  }
});

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.classList.add("hide");
  } else {
    video.pause();
    playButton.classList.remove("hide");
  }
});
