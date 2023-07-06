const sliderTable = document.querySelector('.slider__table');
const sliderDotsTable = document.querySelectorAll('.tariff__toggles .slider__toggle');

let posThreshold = sliderTable.offsetWidth * 0.1
let sliderCountTable = 1;
let tableTranslateX = -16.7;
let x1 = null;
let y1 = null;

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    console.log(firstTouch)
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
    console.log(x1, y1)
}

function handleTouchMove(event) {
    if (!x1 || !y1) {
        return false;
    }
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;
    console.log(x2, y2)

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && xDiff > posThreshold) {
            ++sliderCountTable;
            rollSlider();
        }
        if (xDiff < 0 && xDiff > posThreshold) {
            --sliderCountTable;
            rollSlider();
        };
    }

    x = null;
    y = null;
}

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