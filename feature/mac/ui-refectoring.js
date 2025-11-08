// 돔 랜더 시
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("#menuButton");
  const navigationBox = document.querySelector("#navigationBox");
  const navItems = document.querySelectorAll(".gnb_list>li>a");
  const header = document.querySelector("#header");
  const mediaQuery = window.matchMedia("(min-width: 833px)");
  const headerBox = document.querySelector("#headerBox");
  const quickMnueBarSwiper = document.querySelector("#quickMnueBarSwiper");

  // 현재 기기 상태저장
  const uiState = {
    device: window.innerWidth >= 833 ? "desktop" : "mobile",
  };

  // 기기 상태 변경 함수
  function getDeviceType(e) {
    return e.matches ? "desktop" : "mobile";
  }

  // 기기 상태 별 DOM조작: UI 조작 함수
  function applyDeviceType(device, { menuButton, navigationBox, navItems, headerBox }) {
    if (device === "desktop") {
      console.log("데스크탑");
      navigationBox.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.removeEventListener("click", navigationToggleSwitch);
      navItems.forEach((item) => item.addEventListener("mouseover", mouseOverHandler));
      headerBox.addEventListener("mouseleave", mouseLeaveHandler);
    } else {
      console.log("모바일");
      navItems.forEach((item) => item.removeEventListener("mouseover", mouseOverHandler));
      headerBox.removeEventListener("mouseleave", mouseLeaveHandler);
      menuButton.addEventListener("click", navigationToggleSwitch);
    }
  }

  // 기기상태, DOM 조작 실행 함수
  function handleDeviceChange(e) {
    const device = getDeviceType(e);
    uiState.device = device;
    applyDeviceType(device, { menuButton, navigationBox, navItems, headerBox });

    quickMenuSwiperActive();
    macProductSwiperActive();
  }
  handleDeviceChange(mediaQuery);
  mediaQuery.addEventListener("change", handleDeviceChange);

  function mouseOverHandler(item) {
    const target = item.currentTarget;
    navigationSubListShow(target);
    const headerGnbBgElement = makeHeaderBg();
    setNavigationHeight(headerGnbBgElement, target);
    makeNavigationFilter();
  }

  function mouseLeaveHandler() {
    navigationSubListHide();
    removeHeaderBg();
    removeNavigationFilter();
  }

  function navigationToggleSwitch(e) {
    const target = e.target;
    target.classList.toggle("active");
    navigationBox.classList.toggle("open");
  }

  function navigationSubListShow(target) {
    header.classList.add("show");
    navItems.forEach((item) => {
      item.classList.remove("open");
    });
    target.classList.add("open");
  }

  function navigationSubListHide() {
    header.classList.remove("show");
    navItems.forEach((item) => {
      item.classList.remove("open");
    });
  }

  // headerGnbBgElement를 동적으로 넣어 순간 애니메이션을 주려면,,

  // ***실행 순서***
  // 1. headerGnbBgElement를 만든다.
  // 2. style을 입혀준다.
  // 3. 바로(requestAnimationFrame) 애니메이션을 발생시킨다.

  // ***css로 스타일을 입히지 않는 이유***
  // 만약 css로 transition을 넣었다면 css는 js보다 파싱이 느려 transition속성 없이(애니메이션 없이) 높이 값이 채워지게 됨.

  function setNavigationHeight(headerGnbBgElement, target) {
    // requestAnimationFrame: 브라우저가 화면을 다시 그리기 직전에 실행
    requestAnimationFrame(() => {
      headerGnbBgElement.style.height = headerBgStyleOption.activeStyle.height(target);
      headerGnbBgElement.style.opacity = headerBgStyleOption.activeStyle.opacity;
    });
  }
  const headerBgStyleOption = {
    className: "headerGnbBgElement",
    initialStyle: {
      height: "0px",
      opacity: 0,
      transition: "height 0.4s ease, opacity 0.4s ease",
    },
    activeStyle: {
      height: (target) => {
        const subGnb = target.nextElementSibling;
        return subGnb ? `${subGnb.offsetHeight}px` : "0px";
      },
      opacity: 1,
    },
  };

  function makeHeaderBg() {
    let bg = document.querySelector(".headerGnbBgElement");
    if (!bg) {
      bg = document.createElement("div");
      bg.className = headerBgStyleOption.className;
      // Object.assign(대상객체, 복사할객체)
      // 복사할 객체의 모든 프로퍼티를 대상에 한 번에 덮어쓰기
      Object.assign(bg.style, headerBgStyleOption.initialStyle);
    }
    headerBox.appendChild(bg);

    return bg;
  }

  function removeHeaderBg() {
    const headerGnbBg = document.querySelector(".headerGnbBgElement");
    headerGnbBg ? headerGnbBg.remove() : "";
  }

  function makeNavigationFilter() {
    const navigationFilter = document.querySelector(".navigationFilter");
    if (!navigationFilter) {
      const navigationFilter = document.createElement("div");
      navigationFilter.className = "navigationFilter";
      header.appendChild(navigationFilter);
      navigationFilter.classList.add("show");
      return navigationFilter;
    }
  }

  function removeNavigationFilter() {
    const navigationFilter = document.querySelector(".navigationFilter");
    navigationFilter ? navigationFilter.remove() : "";
  }

  function quickMenuSwiperActive() {
    new Swiper(quickMnueBarSwiper, {
      slidesPerView: 11,
      slidesPerView: "auto",
      allowTouchMove: false,
      slidesPerGroup: 4,
      navigation: {
        nextEl: "#quickMenuBar .swiper-button-next",
        prevEl: "#quickMenuBar .swiper-button-prev",
      },
    });
  }

  const ProductMnueButtons = document.querySelectorAll(".product_menu>button");

  ProductMnueButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      productMenuActive(e);
      showSwiper(e);
    });
  });

  function productMenuActive(item) {
    const button = item.currentTarget;

    document.querySelector(".product_menu button.active")?.classList.remove("active");
    button.classList.add("active");

    updateActiveButtonBox(button);
  }

  function updateActiveButtonBox(button) {
    const ACTIVE_BOX_MARGIN = 4;
    const ProductMnueActiveBox = document.querySelector(".active_button_box");
    if (!ProductMnueActiveBox) return;

    const buttonWidth = button.offsetWidth - ACTIVE_BOX_MARGIN * 2;
    const buttonLeft = button.offsetLeft + ACTIVE_BOX_MARGIN;

    ProductMnueActiveBox.style.width = `${buttonWidth}px`;
    ProductMnueActiveBox.style.transform = `translateX(${buttonLeft}px)`;
    console.log(`${buttonWidth}px`, `translateX(${buttonLeft}px)`);
  }

  function showSwiper(item) {
    const target = item.currentTarget.dataset.target;
    const productSwipers = document.querySelectorAll(".product_swiper_wrap .swiper");

    const activeSwiper = Array.from(productSwipers).find((swiperEl) => swiperEl.dataset.swiper === target);

    productSwipers.forEach((el) => el.classList.remove("active"));
    if (activeSwiper) activeSwiper.classList.add("active");

    macProductSwiperActive(activeSwiper);
  }

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      const activeButton = document.querySelector(".product_menu button.active");
      if (activeButton) updateActiveButtonBox(activeButton);
    }, 100);
  });

  function macProductSwiperActive(activeSwiper = null) {
    const macProductSwiperAll = document.querySelector("#macProductSwiperAll");
    const activeSwiperEl = document.querySelector(".product_swiper_wrap .swiper.active") || macProductSwiperAll;
    const productSwipers = document.querySelectorAll(".product_swiper_wrap .swiper");

    productSwipers.forEach((swiperEl) => {
      if (swiperEl.swiper) swiperEl.swiper.destroy(true, true);
    });
    const swiperTarget = activeSwiper || activeSwiperEl;
    const swiperCurrent = new Swiper(swiperTarget, {
      slidesPerView: "auto",
      allowTouchMove: false,
      spaceBetween: 40,
      breakpoints: {
        834: {
          spaceBetween: 20,
        },
      },
      navigation: {
        nextEl: ".product_mac_swiper_box .swiper-button-next",
        prevEl: ".product_mac_swiper_box .swiper-button-prev",
      },
    });
  }
});
