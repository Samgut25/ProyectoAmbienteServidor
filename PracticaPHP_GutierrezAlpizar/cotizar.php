<?php
include "productos.php";

$nombre   = isset($_POST["nombre"])   ? trim($_POST["nombre"]) : "";
$producto = isset($_POST["producto"]) ? $_POST["producto"]     : "";
$precio   = isset($_POST["precio"])   ? $_POST["precio"]       : "";
$cantidad = isset($_POST["cantidad"]) ? $_POST["cantidad"]     : "";


$errores = array();

if ($nombre == "") {
    $errores[] = "El nombre del cliente no puede estar vacío.";
}
if (!in_array($producto, $productos)) {
    $errores[] = "Debe seleccionar un producto válido.";
}
if (!is_numeric($precio) || $precio <= 0) {
    $errores[] = "El precio unitario debe ser un número mayor que cero.";
}
if (!is_numeric($cantidad) || $cantidad <= 0) {
    $errores[] = "La cantidad debe ser un número mayor que cero.";
}


if (count($errores) == 0) {
    $subtotal = $precio * $cantidad;

    // Descuento de 10% si el subtotal es igual o superior a 50 000
    if ($subtotal >= 50000) {
        $descuento = $subtotal * 0.10;
    } else {
        $descuento = 0;
    }

    $total = $subtotal - $descuento;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado de la cotización - TecnoCR</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <header>
        <h1>TecnoCR</h1>
        <p>Resultado de su cotización</p>
    </header>

    <main>
        <section class="tarjeta">
            <?php
            if (count($errores) > 0) {
                // Mostrar mensajes de error
                echo "<h2 class='error-titulo'>Datos incorrectos</h2>";
                echo "<ul class='errores'>";
                for ($i = 0; $i < count($errores); $i++) {
                    echo "<li>" . $errores[$i] . "</li>";
                }
                echo "</ul>";
            } else {
                // Mostrar el resumen de la cotización
                echo "<h2>Resumen de la cotización</h2>";
                echo "<div class='grid resumen'>";
                echo "<div class='dato'><span>Cliente</span><strong>" . htmlspecialchars($nombre) . "</strong></div>";
                echo "<div class='dato'><span>Producto</span><strong>" . htmlspecialchars($producto) . "</strong></div>";
                echo "<div class='dato'><span>Cantidad</span><strong>" . $cantidad . "</strong></div>";
                echo "<div class='dato'><span>Precio unitario</span><strong>₡" . number_format($precio, 0, ",", " ") . "</strong></div>";
                echo "<div class='dato'><span>Subtotal</span><strong>₡" . number_format($subtotal, 0, ",", " ") . "</strong></div>";
                echo "<div class='dato'><span>Descuento" . ($descuento > 0 ? " (10 %)" : "") . "</span><strong>₡" . number_format($descuento, 0, ",", " ") . "</strong></div>";
                echo "<div class='dato total completo'><span>Total a pagar</span><strong>₡" . number_format($total, 0, ",", " ") . "</strong></div>";
                echo "</div>";
            }
            ?>
            <a class="volver" href="index.php">&larr; Nueva cotización</a>
        </section>
    </main>

    <footer>Práctica evaluada · Programación Web</footer>
</body>
</html>
