const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'movies_db',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Rutas CRUD 

// Crear una nueva película (POST)
app.post('/movies', (req, res) => {
  const { title, description, release_date, rating } = req.body;
  const query = 'INSERT INTO movies (title, description, release_date, rating) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, release_date, rating], (err, result) => {
    if (err) {
      console.error('Error inserting movie:', err);
      res.status(500).send('Error inserting movie');
      return;
    }
    res.status(201).send('Movie added successfully');
  });
});

// Obtener todas las películas (GET)
app.get('/movies', (req, res) => {
  const query = 'SELECT * FROM movies';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      res.status(500).send('Error fetching movies');
      return;
    }
    res.json(results);
  });
});

// Actualizar una película (PUT)
app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, release_date, rating } = req.body;
  const query = 'UPDATE movies SET title = ?, description = ?, release_date = ?, rating = ? WHERE id = ?';
  db.query(query, [title, description, release_date, rating, id], (err, result) => {
    if (err) {
      console.error('Error updating movie:', err);
      res.status(500).send('Error updating movie');
      return;
    }
    res.send('Movie updated successfully');
  });
});

// Borrar una película (DELETE)
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM movies WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting movie:', err);
      res.status(500).send('Error deleting movie');
      return;
    }
    res.send('Movie deleted successfully');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
