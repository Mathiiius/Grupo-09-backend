const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear (POST)
router.post('/', (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).send('Error inserting user');
      return;
    }
    res.status(201).send('User added successfully');
  });
});

// Obtener (GET)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

// Actualizar (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [username, email, password, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user');
      return;
    }
    res.send('User updated successfully');
  });
});

// Borrar (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
      return;
    }
    res.send('User deleted successfully');
  });
});

module.exports = router;
