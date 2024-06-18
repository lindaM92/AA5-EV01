const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Configurar conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario_mysql',
    password: 'tu_contraseña_mysql',
    database: 'xiomy'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a MySQL establecida');
});

// Endpoint para autenticación
app.get('/login', (req, res) => {
    const usuario = req.query.usuario;
    const clave = req.query.clave;

    const sql = `SELECT * FROM usuarios WHERE usuario = ? AND clave = ?`;
    db.query(sql, [usuario, clave], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            res.send('Autenticación satisfactoria');
        } else {
            res.status(401).send('Error en la autenticación');
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

