const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear una nueva relación película-género (POST)
router.post('/', (req, res) => {
  const { movie_id, genre_id } = req.body;
  const query = 'INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)';
  db.query(query, [movie_id, genre_id], (err, result) => {
    if (err) {
      console.error('Error inserting movie-genre relation:', err);
      res.status(500).send('Error inserting movie-genre relation');
      return;
    }
    res.status(201).send('Movie-genre relation added successfully');
  });
});

// Obtener todas las relaciones película-género (GET)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM movie_genres';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching movie-genre relations:', err);
      res.status(500).send('Error fetching movie-genre relations');
      return;
    }
    res.json(results);
  });
});

// Actualizar una relación película-género (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { movie_id, genre_id } = req.body;
  const query = 'UPDATE movie_genres SET movie_id = ?, genre_id = ? WHERE id = ?';
  db.query(query, [movie_id, genre_id, id], (err, result) => {
    if (err) {
      console.error('Error updating movie-genre relation:', err);
      res.status(500).send('Error updating movie-genre relation');
      return;
    }
    res.send('Movie-genre relation updated successfully');
  });
});

// Borrar una relación película-género (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM movie_genres WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting movie-genre relation:', err);
      res.status(500).send('Error deleting movie-genre relation');
      return;
    }
    res.send('Movie-genre relation deleted successfully');
  });
});

module.exports = router;
