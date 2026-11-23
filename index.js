const express = require('express');
const mysql = require('mysql');
const app = express();

// Carga tus carpetas de estilos, imágenes y scripts
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));

// Conexión a MySQL de XAMPP
let conexion = mysql.createConnection({
    host: "localhost",
    database: "spa_caaoh",
    user: "root",
    password: ""
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta principal que muestra tu página web
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta que guarda los datos, muestra la alerta y regresa al inicio
app.post("/validar", function(req, res) {
    const datos = req.body;
    console.log(datos);

    let dni = datos.dni;
    let nombres = datos.nombres;
    let correo = datos.correo;
    let celular = datos.celular;

    let registrar = "INSERT INTO contactos (dni, nombres, correo, celular) VALUES ('" + dni + "','" + nombres + "','" + correo + "','" + celular + "')";

    conexion.query(registrar, function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Datos almacenados correctamente");
            res.send(`
                <script>
                    alert("¡Guardado correctamente!");
                    window.location.href = "/";
                </script>
            `);
        }
    });
});

// Encender el servidor
app.listen(3000, () => {
    console.log("Servidor creado correctamente en http://localhost:3000");
});