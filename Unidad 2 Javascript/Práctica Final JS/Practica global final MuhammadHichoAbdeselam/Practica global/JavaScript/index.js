class Persona {
    nombre = "";
    email = "";
    videojuego = "";
    publicidad = "";
    mensaje = "";
    condiciones = "";

    constructor(nombre, email, videojuego, publicidad, mensaje, condiciones) {
        this.nombre = nombre;
        this.email = email;
        this.videojuego = videojuego;
        this.publicidad = publicidad;
        this.mensaje = mensaje;
        this.condiciones = condiciones;
    }
}

var elForm = document.getElementById("formulario");

function crearPersona(event) {
    event.preventDefault();

    var nombre = elForm.nombre.value;
    var email = elForm.email.value;

    var videojuegosSeleccionados = elForm.opciones.selectedOptions;
    var videojuego = Array.from(videojuegosSeleccionados).map(({ value }) => value);

    var publicidad = elForm.siNo.value;

    var mensaje = elForm.mensaje.value;

    var condiciones = elForm.aceptar.checked;

    var persona = new Persona(nombre, email, videojuego, publicidad, mensaje, condiciones);

    var json = JSON.stringify(persona);

    crearBin(json);
}

function crearBin(json) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            document.getElementById("estado").innerText = "Registro añadido!"
            setTimeout(() => {
                document.getElementById("estado").innerText = "";

            }, 3000);
        }
    };

    req.open("POST", "https://api.jsonbin.io/v3/b", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", SECRET_KEY);
    req.setRequestHeader("X-Collection-Id", COLLECTION_ID);
    req.send(json);
}

function leerColeccion() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            respuesta = JSON.parse(req.responseText);

            for (var i = 0; i < respuesta.length; i++) {
                leerBin(respuesta[i].record, false);
            }
        }
    };

    req.open("GET", "https://api.jsonbin.io/v3/c/" + COLLECTION_ID + "/bins/", true);
    req.setRequestHeader("X-Master-Key", SECRET_KEY);
    req.send();
}

function leerBin(binID, edicion) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (!edicion) {
                formatearPersonas(binID, JSON.parse(req.responseText).record);
            } else {
                cargarPersonaEdicion(JSON.parse(req.responseText).record);
            }
        }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/" + binID + "/latest", true);
    req.setRequestHeader("X-Master-Key", SECRET_KEY);
    req.send();
}

function formatearPersonas(binID, persona) {
    //Obtención nodo principal
    var personas = document.getElementById("personas");

    //Creación de nodos
    var div_persona = document.createElement("div");
    var p_nombre = document.createElement("p");
    var p_email = document.createElement("p");
    var p_videojuego = document.createElement("p");
    var ul_videojuego = document.createElement("ul");
    ul_videojuego.className = "verPersona";
    var p_publicidad = document.createElement("p");
    var p_mensaje = document.createElement("p");
    var p_condiciones = document.createElement("p");
    var hr_separador = document.createElement("hr");
    var br_salto = document.createElement("br");


    var btn_editar = document.createElement("button");
    var btn_borrar = document.createElement("input");
    btn_borrar.type = 'button';

    //Relleno de nodos
    hr_separador.innerText;
    br_salto.innerText;
    p_nombre.innerText = "Nombre: " + persona.nombre;
    p_email.innerText = "Email: " + persona.email;
    p_videojuego.innerText = "Videojuego/s preferido:";

    for (var i = 0; i < persona.videojuego.length; i++) {
        var li = document.createElement("li");
        li.innerText = persona.videojuego[i]
        ul_videojuego.appendChild(li);
    }

    p_publicidad.innerText = "¿Desea recibir publicidad?: " + persona.publicidad;

    if (persona.mensaje == "") {
        persona.mensaje = "No hay mensaje";
    } else {

    }
    p_mensaje.innerHTML = "Mensaje: " + persona.mensaje;



    if (persona.condiciones == true) {
        persona.condiciones = "Sí"
    } else {
        persona.condiciones = "No"
    }

    p_condiciones.innerHTML = "¿Acepta condiciones de uso?: " + persona.condiciones;


    btn_editar.innerHTML = "<a href='editarPersona.html'>Editar persona</a>"
    btn_borrar.value = "Borrar a " + persona.nombre;
    btn_borrar.setAttribute('type', 'button')


    //Eventos de editar y borrar
    btn_editar.addEventListener("click", function() { localStorage.setItem("binID", binID); }, false);
    btn_borrar.addEventListener("click", function() { borrarBin(binID); }, false);

    //Adjuntamos nodos al div y al DOM
    div_persona.appendChild(hr_separador);
    div_persona.appendChild(br_salto);

    div_persona.appendChild(p_nombre);
    div_persona.appendChild(p_email);
    div_persona.appendChild(p_videojuego);
    div_persona.appendChild(ul_videojuego);
    div_persona.appendChild(p_publicidad);
    div_persona.appendChild(p_mensaje);
    div_persona.appendChild(p_condiciones);
    div_persona.appendChild(br_salto);

    div_persona.appendChild(btn_editar);
    div_persona.appendChild(btn_borrar);


    personas.appendChild(div_persona);
}

function cargarPersonaEdicion(persona) {
    elForm.nombre.value = persona.nombre;
    elForm.email.value = persona.email;


    Array.from(elForm.opciones).forEach(function(option) {
        option.selected = persona.videojuego.includes(option.value);
    });

    elForm.siNo.value = persona.publicidad;
    elForm.mensaje.value = persona.mensaje;
    elForm.aceptar.checked = persona.condiciones;


}


function editarPersona(event, binID) {


    //Validacion campo nombre
    var nombre = elForm.nombre.value;

    if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        errNombre.innerHTML = "<br>" + "El nombre no puede estar vacío.";
        elForm.nombre.scrollIntoView();
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

    event.preventDefault();

    var nombre = elForm.nombre.value;
    var email = elForm.email.value;

    var videojuegosSeleccionados = elForm.opciones.selectedOptions;
    var videojuego = Array.from(videojuegosSeleccionados).map(({ value }) => value);

    var publicidad = elForm.siNo.value;

    var mensaje = elForm.mensaje.value;

    var condiciones = elForm.aceptar.checked;

    var persona = new Persona(nombre, email, videojuego, publicidad, mensaje, condiciones);

    var json = JSON.stringify(persona);

    editarBin(binID, json);
}

function editarBin(binID, persona) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            document.getElementById("estado").innerText = "Registro actualizado!";
            setTimeout(() => {
                document.getElementById("estado").innerText = ""
            }, 3000);
        }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/" + binID, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", SECRET_KEY);
    req.send(persona);
}

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

function borrarBin(binID) {
    var confirmacion = confirm("¿Desea borrar el registro?");

    if (confirmacion) {
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                limpiarPersonas();
                leerColeccion();
            }
        };

        req.open("DELETE", "https://api.jsonbin.io/v3/b/" + binID, true);
        req.setRequestHeader("X-Master-Key", SECRET_KEY);
        req.send();
    }
}

function limpiarPersonas() {
    var personas = document.getElementById("personas");
    personas.innerHTML = "";
}