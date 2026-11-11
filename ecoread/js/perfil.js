/* =====================================================
   EcoRead - Perfil de usuario (Front End)
   Requiere cargar js/auth.js antes que este archivo.
   Autor: Franklin Gutiérrez Alpízar
   ===================================================== */

// Datos de ejemplo. Cuando exista el backend, PHP los entrega desde la tabla de usuarios.
var usuario = {
    nombre: "Franklin Gutiérrez Alpízar",
    correo: "fgutierrez60998@ufide.ac.cr",
    telefono: "",
    universidad: "fidelitas",
    carrera: "Ingeniería en Sistemas de Computación",
    miembroDesde: "2026-10-06",
    publicaciones: 4,
    intercambios: 2,
    solicitudes: 1,
    iniciales: function () {
        var partes = this.nombre.split(" ");
        var segunda = "";
        if (partes.length > 1) {
            segunda = partes[1].charAt(0);
        }
        return (partes[0].charAt(0) + segunda).toUpperCase();
    }
};

var camposPerfil = ["nombre", "telefono", "universidad", "carrera"];
var camposClave = ["clave-actual", "clave-nueva", "clave-confirmar"];


/* ---------- Mostrar los datos ---------- */

function cargarPerfil() {
    var universidad = document.getElementById("universidad");
    universidad.value = usuario.universidad;
    var textoUniversidad = universidad.options[universidad.selectedIndex].text;

    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("carrera").value = usuario.carrera;

    document.getElementById("avatar").textContent = usuario.iniciales();
    textoFicha("ficha-nombre", usuario.nombre, "");
    textoFicha("ficha-correo", usuario.correo, "");
    textoFicha("ficha-universidad", textoUniversidad, "");
    textoFicha("ficha-carrera", usuario.carrera, "");

    document.getElementById("sello-fecha").textContent =
        formatearFecha(new Date(usuario.miembroDesde + "T00:00:00"));

    document.getElementById("total-publicaciones").textContent = usuario.publicaciones;
    document.getElementById("total-intercambios").textContent = usuario.intercambios;
    document.getElementById("total-solicitudes").textContent = usuario.solicitudes;
}


/* ---------- Editar datos personales ---------- */

// Activa o desactiva el modo edición del formulario
function activarEdicion(activa) {
    document.getElementById("campos-perfil").disabled = !activa;
    document.getElementById("btn-editar").hidden = activa;
    document.getElementById("btn-guardar").hidden = !activa;
    document.getElementById("btn-cancelar").hidden = !activa;

    if (activa) {
        limpiarMensaje("mensaje-perfil");
        document.getElementById("nombre").focus();
    }
}

function cancelarEdicion() {
    limpiarErrores(camposPerfil);
    cargarPerfil();
    activarEdicion(false);
}

function guardarPerfil() {
    limpiarErrores(camposPerfil);
    limpiarMensaje("mensaje-perfil");

    var nombre = document.getElementById("nombre").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var universidad = document.getElementById("universidad").value;
    var carrera = document.getElementById("carrera").value.trim();

    var errores = [];

    if (nombre == "") {
        errores.push({ campo: "nombre", mensaje: "Escribe tu nombre completo." });
    } else if (nombre.indexOf(" ") == -1) {
        errores.push({ campo: "nombre", mensaje: "Agrega al menos un apellido." });
    }

    if (telefono != "" && !telefonoValido(telefono)) {
        errores.push({ campo: "telefono", mensaje: "Usa 8 dígitos. Ejemplo: 8888-8888" });
    }

    if (universidad == "") {
        errores.push({ campo: "universidad", mensaje: "Selecciona tu universidad." });
    }

    if (carrera == "") {
        errores.push({ campo: "carrera", mensaje: "Escribe tu carrera." });
    }

    if (errores.length > 0) {
        aplicarErrores(errores);
        mostrarMensaje("mensaje-perfil", "Revisa los campos marcados en rojo.", "fallo");
        return false;
    }

    // Con el backend listo, el formulario se envía a php/perfil.php
    if (BACKEND_LISTO) {
        return true;
    }

    // Simulación mientras no exista el backend
    usuario.nombre = nombre;
    usuario.telefono = telefono;
    usuario.universidad = universidad;
    usuario.carrera = carrera;
    cargarPerfil();
    activarEdicion(false);
    mostrarMensaje("mensaje-perfil", "Tus datos se actualizaron.", "ok");
    return false;
}


/* ---------- Cambiar contraseña ---------- */

function cambiarClave() {
    limpiarErrores(camposClave);
    limpiarMensaje("mensaje-clave");

    var actual = document.getElementById("clave-actual").value;
    var nueva = document.getElementById("clave-nueva").value;
    var confirmar = document.getElementById("clave-confirmar").value;

    var errores = [];

    if (actual == "") {
        errores.push({ campo: "clave-actual", mensaje: "Escribe tu contraseña actual." });
    }

    if (nueva == "") {
        errores.push({ campo: "clave-nueva", mensaje: "Escribe la nueva contraseña." });
    } else if (!claveSegura(nueva)) {
        errores.push({ campo: "clave-nueva", mensaje: "Usa mínimo 8 caracteres con letras y números." });
    } else if (nueva == actual) {
        errores.push({ campo: "clave-nueva", mensaje: "La nueva contraseña debe ser distinta a la actual." });
    }

    if (confirmar == "") {
        errores.push({ campo: "clave-confirmar", mensaje: "Repite la nueva contraseña." });
    } else if (confirmar != nueva) {
        errores.push({ campo: "clave-confirmar", mensaje: "Las contraseñas no coinciden." });
    }

    if (errores.length > 0) {
        aplicarErrores(errores);
        mostrarMensaje("mensaje-clave", "Revisa los campos marcados en rojo.", "fallo");
        return false;
    }

    // Con el backend listo, el formulario se envía a php/clave.php
    if (BACKEND_LISTO) {
        return true;
    }

    // Simulación mientras no exista el backend
    document.getElementById("formClave").reset();
    mostrarMensaje("mensaje-clave", "Tu contraseña se actualizó.", "ok");
    return false;
}


/* ---------- Sesión ---------- */

function cerrarSesion() {
    if (BACKEND_LISTO) {
        window.location.href = "php/logout.php";
    } else {
        window.location.href = "login.html";
    }
}
