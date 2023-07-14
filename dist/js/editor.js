const editorBtns = document.querySelectorAll(".editor__turn")
const mediaQuery = window.matchMedia('(min-width: 660px)')
const mediaQueryBtnActive = window.matchMedia('(max-width: 660px)')

function handleTabletChange (e, btns) {
    console.log(btns, "handleTabletChange")
    if (e.matches) {
        for (const btn of btns) {
            btn.disabled = true;
        };
    };
};

function thisBtn (evt) {
    console.log(editorBtns, "thisBtn")
    editorBtns.forEach(item => {
        item.classList.remove('editor__turn--active')
    });
    evt.target.classList.add('editor__turn--active')
}

function handleMobileChange (e, btns) {
    console.log(btns, "handleMobileChange")
    if (e.matches) {
        for (const btn of btns) {
            btn.addEventListener('click', (evt) => {
                thisBtn(evt);
            });
        };
    };
};

mediaQueryBtnActive.addListener(handleMobileChange)
handleMobileChange(mediaQueryBtnActive, editorBtns)

mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery, editorBtns);