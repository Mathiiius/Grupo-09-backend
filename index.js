const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const moviesRoutes = require('./routes/moviesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const genresRoutes = require('./routes/genresRoutes');
const movieGenresRoutes = require('./routes/movieGenresRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas CRUD 
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/genres', genresRoutes);
app.use('/movie_genres', movieGenresRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
