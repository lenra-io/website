(() => {
    const cookies = document.querySelector("body>#cookies");
    const cookiesClass = "open";
    const toggleBtn = cookies.querySelector(":scope>button");
    const closeBtn = cookies.querySelector(":scope>section>button.lenra-icon-x");
    const goodBtn = cookies.querySelector(":scope>section>nav>button.primary");
    cookies.onclick = function (event) {
        switch (event.target) {
            case cookies:
            case closeBtn:
            case goodBtn:
                cookies.classList.remove(cookiesClass);
                break;
            case toggleBtn:
                cookies.classList.toggle(cookiesClass);
                break;
        }
    }
})();
