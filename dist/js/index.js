const pageHeader = document.querySelector('.page-header');
const navToggle = document.querySelector('.main-nav__burger');
const pageMain = document.querySelector('.page-main');

navToggle.addEventListener('click', function() {
    if ( pageHeader.classList.contains('page-header--opened')) {
        pageHeader.classList.remove('page-header--opened');
    } else {
        pageHeader.classList.add('page-header--opened');
    }   
});

pageMain.addEventListener('click', function(evt) {
    pageHeader.classList.remove('page-header--opened');
});