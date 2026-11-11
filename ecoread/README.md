# EcoRead - Registro, inicio de sesión y perfil (Front End)

Parte de **Franklin Gutiérrez Alpízar** del proyecto EcoRead (SC-502 Ambiente Web Cliente/Servidor).

## Estructura

```
registro.html      Crear cuenta (con ficha de lector en vivo)
login.html         Iniciar sesión
perfil.html        Perfil: ver/editar datos y cambiar contraseña
css/auth.css       Estilos de las tres páginas
js/auth.js         Validaciones compartidas, registro y login
js/perfil.js       Lógica del perfil
img/logo.svg       Logo de EcoRead
```

## Cómo probarlo

Abrir `registro.html` o `login.html` en el navegador, o colocar la carpeta en `htdocs` de XAMPP.
No necesita servidor para esta fase.

## Estado actual: solo Front End

Las validaciones son del lado del cliente y el resultado se **simula**:

- `registro.html` valida y muestra "Cuenta creada" (no guarda nada).
- `login.html` valida y redirige a `perfil.html` (acepta cualquier correo/contraseña con formato válido).
- `perfil.html` usa datos de ejemplo del objeto `usuario` en `js/perfil.js`.

## Conectar con el backend (PHP + MySQL)

En `js/auth.js` hay una variable:

```js
var BACKEND_LISTO = false;
```

Al cambiarla a `true`, después de validar, los formularios se envían por POST a estos archivos
(que se deben crear en la carpeta `php/`):

| Formulario | action | Campos (`name`) |
|---|---|---|
| Registro | `php/registro.php` | nombre, correo, telefono, universidad, carrera, clave, confirmar, terminos |
| Login | `php/login.php` | correo, clave |
| Perfil | `php/perfil.php` | nombre, correo (solo lectura), telefono, universidad, carrera |
| Cambiar contraseña | `php/clave.php` | clave_actual, clave_nueva, clave_confirmar |
| Cerrar sesión | `php/logout.php` | (redirección) |

Pendientes al conectar el backend:

- Repetir las validaciones en PHP (las de JavaScript no son suficientes).
- Guardar la contraseña con `password_hash()` y verificarla con `password_verify()`.
- Cambiar el enlace del logo a `index.html` cuando exista la página de inicio.
- Reemplazar los datos de ejemplo de `perfil.js` por los del usuario con sesión iniciada.
