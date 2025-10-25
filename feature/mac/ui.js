// 돔 랜더 시
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("#menuButton");
  const navigationBox = document.querySelector("#navigationBox");
  const navItems = document.querySelectorAll(".gnb_list>li>a");
  const header = document.querySelector("#header");
  const mediaQuery = window.matchMedia("(min-width: 833px)");
  const headerBox = document.querySelector("#headerBox");
  const swiper = document.querySelector("#swiper");

  function handleDeviceChange(e) {
    const isDesktop = e.matches;
    if (isDesktop) {
      // 데스크탑 영역
      console.log("데스크탑");
      navigationBox.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.removeEventListener("click", navigationToggleSwitch);
      navItems.forEach((item) => item.addEventListener("mouseover", mouseOverHandler));
      headerBox.addEventListener("mouseleave", mouseLeaveHandler);
    } else {
      // 모바일 영역
      console.log("모바일");
      navItems.forEach((item) => item.removeEventListener("mouseover", mouseOverHandler));
      headerBox.removeEventListener("mouseleave", mouseLeaveHandler);
      menuButton.addEventListener("click", navigationToggleSwitch);
    }
    quickMenuSwiperActive();
  }
  handleDeviceChange(mediaQuery);

  mediaQuery.addEventListener("change", handleDeviceChange);

  function mouseOverHandler() {
    navigationSubListShow();
    const headerGnbBgElement = makeHeaderBg();
    setNavigationHeight(headerGnbBgElement);
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

  function navigationSubListShow() {
    header.classList.add("show");
  }

  function navigationSubListHide() {
    header.classList.remove("show");
  }

  const headerBgStyleOption = {
    className: "headerGnbBgElement",
    initialStyle: {
      height: "0px",
      opacity: 0,
      transition: "height 0.4s ease, opacity 0.4s ease",
    },
    activeStyle: {
      height: () => {
        const subGnb = document.querySelector(".gnb_sub_list");
        return subGnb ? `${subGnb.offsetHeight}px` : "0px";
      },
      opacity: 1,
    },
  };

  function setNavigationHeight(headerGnbBgElement) {
    requestAnimationFrame(() => {
      headerGnbBgElement.style.height = headerBgStyleOption.activeStyle.height();
      headerGnbBgElement.style.opacity = headerBgStyleOption.activeStyle.opacity;
    });
  }

  function makeHeaderBg() {
    const headerGnbBg = document.querySelector(".headerGnbBgElement");
    if (!headerGnbBg) {
      const headerGnbBgElement = document.createElement("div");
      headerGnbBgElement.className = headerBgStyleOption.className;
      headerGnbBgElement.style.height = headerBgStyleOption.initialStyle.height;
      headerGnbBgElement.style.opacity = headerBgStyleOption.initialStyle.opacity;
      headerGnbBgElement.style.transition = headerBgStyleOption.initialStyle.transition;
      headerBox.appendChild(headerGnbBgElement);

      return headerGnbBgElement;
    }
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
    new Swiper(swiper, {
      slidesPerView: 11,
      slidesPerView: "auto",
      allowTouchMove: false,
      slidesPerGroup: 4,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
});
