const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para mostrar todos los items
app.get('/', (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) throw err;
    res.render('index', { items: results });
  });
});

// Ruta para mostrar el formulario de creación
app.get('/create', (req, res) => {
  res.render('create');
});

// Ruta para manejar la creación de un nuevo item
app.post('/create', (req, res) => {
  const { nombre, descripcion, cantidad } = req.body;
  connection.query('INSERT INTO items (nombre, descripcion, cantidad) VALUES (?, ?, ?)', [nombre, descripcion, cantidad], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Ruta para mostrar el formulario de edición
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('edit', { item: results[0] });
  });
});

// Ruta para manejar la actualización de un item
app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, cantidad } = req.body;
  connection.query('UPDATE items SET nombre = ?, descripcion = ?, cantidad = ? WHERE id = ?', [nombre, descripcion, cantidad, id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Ruta para manejar la eliminación de un item
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});