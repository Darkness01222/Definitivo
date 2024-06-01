const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'DBUser',
  password: 'Darkness01222591837',
  database: 'proyecto' // Cambia esto por el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;