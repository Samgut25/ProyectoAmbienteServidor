<?php include "productos.php"; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotizador - TecnoCR</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <header>
        <h1>TecnoCR</h1>
        <p>Somos una tienda de tecnología con teclados, mouse, monitores y audífonos
           al mejor precio. Cotice su compra en segundos.</p>
    </header>

    <main>
        <section class="tarjeta">
            <h2>Formulario de cotización</h2>

            <form action="cotizar.php" method="post" class="grid">
                <div class="campo completo">
                    <label for="nombre">Nombre del cliente</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ej: María López">
                </div>

                <div class="campo completo">
                    <label for="producto">Producto</label>
                    <select id="producto" name="producto">
                        <?php
                        // Se recorre el array para crear las opciones
                        for ($i = 0; $i < count($productos); $i++) {
                            echo "<option value='" . $productos[$i] . "'>" . $productos[$i] . "</option>";
                        }
                        ?>
                    </select>
                </div>

                <div class="campo">
                    <label for="precio">Precio unitario (₡)</label>
                    <input type="number" id="precio" name="precio" step="any" placeholder="15000">
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad</label>
                    <input type="number" id="cantidad" name="cantidad" placeholder="4">
                </div>

                <div class="campo completo">
                    <button type="submit">Cotizar</button>
                </div>
            </form>
        </section>
    </main>

    <footer>Práctica evaluada · Programación Web</footer>
</body>
</html>
