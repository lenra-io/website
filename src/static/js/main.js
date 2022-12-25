// ajouter/générer le style sans les variables si elles ne sont pas gérées
var computedStyle = getComputedStyle(document.body, null);
if (computedStyle.backgroundColor=="transparent") {
    console.log("Not managed variables");
    var script = document.createElement("script");
    script.src = "js/modernizer.js";
    document.body.appendChild(script);
}