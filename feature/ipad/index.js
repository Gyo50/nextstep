// Swiper CDN import
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// 사이트 첫번째 헤더 메뉴바 인터렉션
const interactionMenu = document.querySelector(".interaction-menu");

const NAV_TO_PANEL = [
  { nav: ".main-header #mac", panel: ".interaction-menu .mac" },
  { nav: ".main-header #ipad", panel: ".interaction-menu .ipad" },
  { nav: ".main-header #iphone", panel: ".interaction-menu .iphone" },
  { nav: ".main-header #watch", panel: ".interaction-menu .watch" },
  { nav: ".main-header #airPods", panel: ".interaction-menu .airPods" },
  { nav: ".main-header #support", panel: ".interaction-menu .support" },
];

const panels = NAV_TO_PANEL.map((m) => document.querySelector(m.panel)).filter(
  Boolean
);

function showPanel(targetPanel) {
  if (!interactionMenu) return;
  interactionMenu.classList.add("show");
  panels.forEach((p) => p && p.classList.remove("show"));
  if (targetPanel) targetPanel.classList.add("show");
}

function hideAllPanels() {
  if (!interactionMenu) return;
  interactionMenu.classList.remove("show");
  panels.forEach((p) => p && p.classList.remove("show"));
}

NAV_TO_PANEL.forEach(({ nav, panel }) => {
  const navEl = document.querySelector(nav);
  const panelEl = document.querySelector(panel);
  if (!navEl || !panelEl) return;
  navEl.addEventListener("mouseenter", (e) => {
    e.preventDefault();
    showPanel(panelEl);
  });
});

if (interactionMenu) {
  interactionMenu.addEventListener("mouseleave", (e) => {
    e.preventDefault();
    hideAllPanels();
  });
}

// 헤더 메뉴바 활성화 시, 스크롤 인식

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
