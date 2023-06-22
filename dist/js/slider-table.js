const sliderTable = document.querySelector('.slider__table');
const sliderDotsTable = document.querySelectorAll('.tariff__toggles .slider__toggle');

let sliderCountTable = 1;
let tableTranslateX = -16.7;

function rollSlider() {
    sliderTable.style.transform = "translateX(" + -(16.7 + sliderCountTable * 33.3) +"%)";
};

function thisTranslate(index) {
    sliderDotsTable.forEach(item => {
        item.classList.remove('slider__toggle--current')
    });
    sliderDotsTable[index].classList.add('slider__toggle--current');
    rollSlider();
};

sliderDotsTable.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderCountTable = index;
        thisTranslate(sliderCountTable);
    });
});