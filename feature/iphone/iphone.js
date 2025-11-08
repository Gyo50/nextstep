const navLinks = document.querySelectorAll(".nav-menu a");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");
const mainContent = document.querySelector("main");
const footerContent = document.querySelector("footer");

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const menuType = link.textContent.toLowerCase();

    dropdownMenus.forEach((menu) => {
      if (menu.dataset.menu === menuType) {
        menu.classList.add("active");
        mainContent.classList.add("blur");
        footerContent.classList.add("blur");
      } else {
        menu.classList.remove("active");
      }
    });
  });
});

document.querySelector("header").addEventListener("mouseleave", () => {
  dropdownMenus.forEach((menu) => {
    menu.classList.remove("active");
  });
  mainContent.classList.remove("blur");
  footerContent.classList.remove("blur");
});
