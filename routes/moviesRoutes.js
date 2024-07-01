const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Crear (POST)
router.post('/', (req, res) => {
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

// Obtener (GET)
router.get('/', (req, res) => {
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

// Actualizar (PUT)
router.put('/:id', (req, res) => {
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

// Borrar (DELETE)
router.delete('/:id', (req, res) => {
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

module.exports = router;
