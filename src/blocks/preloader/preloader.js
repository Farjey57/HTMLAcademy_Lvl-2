window.onload = function () {
    window.setTimeout(function () {
        document.body.classList.add('loaded_hiding');}, 500);
    window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
    }, 1000);
}