const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear (POST)
router.post('/', (req, res) => {
  const { user_id, movie_id, rating, review_text } = req.body;
  const query = 'INSERT INTO reviews (user_id, movie_id, rating, review_text) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, movie_id, rating, review_text], (err, result) => {
    if (err) {
      console.error('Error inserting review:', err);
      res.status(500).send('Error inserting review');
      return;
    }
    res.status(201).send('Review added successfully');
  });
});

// Obtener (GET)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM reviews';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).send('Error fetching reviews');
      return;
    }
    res.json(results);
  });
});

// Actualizar (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, movie_id, rating, review_text } = req.body;
  const query = 'UPDATE reviews SET user_id = ?, movie_id = ?, rating = ?, review_text = ? WHERE id = ?';
  db.query(query, [user_id, movie_id, rating, review_text, id], (err, result) => {
    if (err) {
      console.error('Error updating review:', err);
      res.status(500).send('Error updating review');
      return;
    }
    res.send('Review updated successfully');
  });
});

// Borrar (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM reviews WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting review:', err);
      res.status(500).send('Error deleting review');
      return;
    }
    res.send('Review deleted successfully');
  });
});

module.exports = router;
