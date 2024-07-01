const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear (POST)
router.post('/', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO genres (name) VALUES (?)';
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error('Error inserting genre:', err);
      res.status(500).send('Error inserting genre');
      return;
    }
    res.status(201).send('Genre added successfully');
  });
});

// Obtener (GET)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM genres';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching genres:', err);
      res.status(500).send('Error fetching genres');
      return;
    }
    res.json(results);
  });
});

// Actualizar (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = 'UPDATE genres SET name = ? WHERE id = ?';
  db.query(query, [name, id], (err, result) => {
    if (err) {
      console.error('Error updating genre:', err);
      res.status(500).send('Error updating genre');
      return;
    }
    res.send('Genre updated successfully');
  });
});

// Borrar (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM genres WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting genre:', err);
      res.status(500).send('Error deleting genre');
      return;
    }
    res.send('Genre deleted successfully');
  });
});

module.exports = router;
