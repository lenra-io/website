(() => {
    const start = Date.now();
    let form = document.querySelector("form");
    form.onsubmit = (e) => {
        const now = Date.now();
        if (now - start > 3000) {
            // TODO: send form
        }
        e.preventDefault();
        return false;
    };
})();