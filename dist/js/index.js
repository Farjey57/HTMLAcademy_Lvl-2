"use strict"
const pageHeader = document.querySelector('.page-header');
const navToggle = document.querySelector('.main-nav__burger');
const pageMain = document.querySelector('.page-main');
const locPathName = document.location.pathname;
const mainNavItems = document.querySelectorAll('.main-nav__link')


function navItemActive (arr) {
    for (const item of arr) {
        if (item.pathname === locPathName) {
            item.classList.add("main-nav__item--active")
        }
    } 
}

navItemActive(mainNavItems)

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