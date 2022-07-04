var ubicacionPrincipal = window.pageYOffset;

var botonNav = document.getElementById("botonNav");
var navegador = document.getElementById("nav");

window.onscroll = function() {
    var desplazamiento = window.pageYOffset;
    if (ubicacionPrincipal >= desplazamiento) {
        document.getElementById("navegador").style.top = "60px";
    } else {
        document.getElementById("navegador").style.top = "-2000px";
    }

    ubicacionPrincipal = desplazamiento;
}




botonNav.addEventListener("click", () => {
    navegador.classList.toggle("active"), false;
});

botonNav.addEventListener("mouseenter", () => {
    navegador.classList.toggle("active"), false;

})

botonNav.addEventListener("mouseleave", () => {
    navegador.classList.toggle("active"), false;
})

navegador.addEventListener("mouseenter", () => {
    navegador.classList.toggle("active"), false;

})

navegador.addEventListener("mouseleave", () => {
    navegador.classList.toggle("active"), false;
})