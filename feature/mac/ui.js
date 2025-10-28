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

  function setNavigationHeight(headerGnbBgElement, target) {
    requestAnimationFrame(() => {
      headerGnbBgElement.style.height = headerBgStyleOption.activeStyle.height(target);
      headerGnbBgElement.style.opacity = headerBgStyleOption.activeStyle.opacity;
    });
  }

  function makeHeaderBg() {
    const existingBg = document.querySelector(".headerGnbBgElement");
    if (existingBg) return existingBg;

    const headerGnbBgElement = document.createElement("div");
    headerGnbBgElement.className = headerBgStyleOption.className;
    headerGnbBgElement.style.height = headerBgStyleOption.initialStyle.height;
    headerGnbBgElement.style.opacity = headerBgStyleOption.initialStyle.opacity;
    headerGnbBgElement.style.transition = headerBgStyleOption.initialStyle.transition;

    headerBox.appendChild(headerGnbBgElement);

    return headerGnbBgElement;
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

  const ProductMnueButtons = document.querySelectorAll(".product_menu >button");
  const ProductMnueActiveBox = document.querySelector(".active_button_box");

  ProductMnueButtons.forEach((button) => {
    button.addEventListener("click", productMenuActive);
  });

  function productMenuActive(item) {
    const button = item.currentTarget;
    const ACTIVE_BOX_MARGIN = 4;

    document.querySelector(".product_menu button.active")?.classList.remove("active");
    button.classList.add("active");

    const buttonWidth = button.offsetWidth - ACTIVE_BOX_MARGIN * 2;
    const buttonLeft = button.offsetLeft + ACTIVE_BOX_MARGIN;

    ProductMnueActiveBox.style.width = `${buttonWidth}px`;
    ProductMnueActiveBox.style.transform = `translateX(${buttonLeft}px)`;
  }
});
