// ajouter/générer le style sans les variables si elles ne sont pas gérées
var computedStyle = getComputedStyle(document.body, null);
if (computedStyle.backgroundColor=="transparent") {
    console.log("Not managed variables");
    var script = document.createElement("script");
    script.src = "js/modernizer.js";
    document.body.appendChild(script);
}

var previousHeight = 0;
setInterval(function() {
    var h = document.body.offsetHeight;
    if (h!=previousHeight) {
        document.body.style.setProperty('--body-height', h + "px");
        previousHeight = h;
    }
}, 50);

document.querySelectorAll("iframe[data-src").forEach(function(iframe) {
    if (!iframe.src) {
        iframe.src = iframe.dataset.src;
    }
});