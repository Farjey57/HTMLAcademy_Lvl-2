const sliderSlide = document.querySelectorAll('.reviews__list .slider__item');
const slider = document.querySelector('.reviews__list');
const sliderDots = document.querySelectorAll('.reviews__toggles .slider__toggle');
const sliderBtnNext = document.querySelector('.slider__btn--right');
const sliderBtnPrev = document.querySelector('.slider__btn--left');

let sliderCount = 0;
let sliderWidth;

sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);

function nextSlide () {
    sliderCount++;
    if (sliderCount >= sliderSlide.length) sliderCount = 0;

    //rollSlider();
    thisSlide(sliderCount);
};

function prevSlide () {
    sliderCount--;
    if (sliderCount < 0) sliderCount = sliderSlide.length - 1;

    //rollSlider();
    thisSlide(sliderCount);
};

function thisSlide(index) {
    sliderDots.forEach(item => {
        item.classList.remove('slider__toggle--current')
    });
    sliderSlide.forEach(item => {
        item.classList.remove('slider__item--active')
    });
    sliderDots[index].classList.add('slider__toggle--current');
    sliderSlide[index].classList.add('slider__item--active');
};

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderCount = index;
        thisSlide(sliderCount);
    });
});