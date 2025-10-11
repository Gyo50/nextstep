// 사이트 인터렉션 헤더 toggle
const ipadMenu = document.querySelector("#ipad-menu");
const ipadInteractionMenu = document.querySelector("#ipad-interaction-menu");

ipadMenu.addEventListener("click", (e) => {
  e.preventDefault();
  ipadInteractionMenu.classList.toggle("show");
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
