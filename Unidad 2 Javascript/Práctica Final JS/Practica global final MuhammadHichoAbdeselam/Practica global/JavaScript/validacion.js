var botonEnviar = document.getElementById("botonEnviar");
botonEnviar.addEventListener("click", validarForm, false)

var elForm = document.getElementById("formulario");

var areatext = elForm.mensaje;
areatext.addEventListener("keypress", validarTexto, false);




function validarForm() {

    //Validacion campo nombre
    var nombre = elForm.nombre.value;

    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        errNombre.innerHTML = "<br>" + "El nombre no puede estar vacío.";
        return false;
    } else if (nombre.length <= 3) {
        errNombre.innerHTML = "<br>" + "El nombre no puede ser menor de 3 letras";
    } else {
        errNombre.innerHTML = "";
    }

    //Validacion campo email
    var email = elForm.email.value;

    if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
        errEmail.innerHTML = "<br>" + "Escribe un email válido.";
        return false;
    } else {

        errEmail.innerHTML = "";

    }

    //Validacion menu desplegable
    var indiceSeleccionado = elForm.opciones.selectedIndex;

    if (indiceSeleccionado == null || indiceSeleccionado == 0 || indiceSeleccionado == -1) {
        errOpciones.innerHTML = "<br>" + "Elige el videojuego que prefieras.";
        return false;
    } else {
        errOpciones.innerHTML = "";
    }


    //Validacion radioButtons
    var publi = elForm.siNo;
    var seleccionado = false;

    for (let i = 0; i < publi.length; i++) {
        if (publi[i].checked) {
            seleccionado = true;
            break;
        }

    }

    if (!seleccionado) {
        errPubli.innerHTML = "<br>" + "Por favor elige una opción";
        return false;
    } else {
        errPubli.innerHTML = "";
    }

    //Validacion checkbox

    var elemento = elForm.aceptar;

    if (!elemento.checked) {
        errAcepta.innerHTML = "<br>" + "Acepta las condiciones de uso.";
        return false;
    } else {
        errAcepta.innerHTML = "";
    }

    crearPersona(event);



    //Valores de los campos 
    console.log(elForm.nombre.value);
    console.log(elForm.email.value);
    console.log(elForm.opciones.options[indiceSeleccionado].value);
    console.log(elForm.siNo.value);
    console.log(elForm.Mensaje.value);
    console.log(elForm.aceptar.checked);

}
//Limitar campo textArea

function validarTexto(elEvento) {
    var evento = window.event || elEvento;
    var areatext = elForm.mensaje
    var valor_limite = 150;
    if (areatext.value.length >= valor_limite) {
        evento.preventDefault();
    } else {
        return true;
    }
}