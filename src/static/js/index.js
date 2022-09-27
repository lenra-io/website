setTimeout(closeLanguage, 1500);

const languageList = document.querySelector("h1 > ul");
let lastLanguagePosition = 0;
const animationDuration = 900;

/**
 * select randomly a language position and open it
 */
function changeLanguage() {
    let position;
    do {
        position = Math.floor(Math.random() * languageList.children.length);
    } while (position == lastLanguagePosition);
    lastLanguagePosition = position;
    languageList.style.setProperty('--language-position', position);
    languageList.classList.remove("close");
    setTimeout(closeLanguage, animationDuration);
}

/**
 * close the selected language of the list
 */
function closeLanguage() {
    languageList.classList.add("close");
    setTimeout(changeLanguage, animationDuration);
}