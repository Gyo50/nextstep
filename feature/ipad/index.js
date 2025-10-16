// 사이트 헤더 메뉴바 인터렉션
const ipadMenu = document.querySelector(".ipad-menu");
const ipadInteractionMenu = document.querySelector(".ipad-interaction-menu");

ipadMenu.addEventListener("mouseenter", (e) => {
  e.preventDefault();
  ipadInteractionMenu.classList.add("show");
});

ipadInteractionMenu.addEventListener("mouseenter", (e) => {
  e.preventDefault();
  ipadInteractionMenu.classList.add("show");
});

ipadMenu.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!ipadInteractionMenu.matches(":hover")) {
      ipadInteractionMenu.classList.remove("show");
    }
  }, 100);
});

ipadInteractionMenu.addEventListener("mouseleave", () => {
  ipadInteractionMenu.classList.remove("show");
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
