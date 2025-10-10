const menus = document.querySelectorAll('.nav-container a');
menus.forEach((it) => {
    it.addEventListener('mouseover', () => {
        document.querySelector('.sub-navigation').classList.add('sub-navigation-show');
    });

    it.addEventListener('mouseout', () => {
        document.querySelector('.sub-navigation').classList.remove('sub-navigation-show');
    });
});