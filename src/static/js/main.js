// initialiser le mailto au moment du clic
document.body.querySelector("a[href=contact]").onclick = function(e) {
    var link = atob("bWFpbHRv")+":"+atob("Y29udGFjdEBsZW5yYS5pbw==");
    e.target.href = link;
    e.target.onclick = function(){};
    window.open(link);
    e.preventDefault();
    return false;
};

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