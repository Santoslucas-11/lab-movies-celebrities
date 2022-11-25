const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/movies/create',async (req, res, next) => {
    const getCelebrities = await Celebrity.find()
 res.render('movies/new-movie', {getCelebrities})
 });
 
 
 router.post('/movies/create', async (req, res, next) => {
     try {
 
 const {title, genre, plot, cast} = req.body;
 const createdMovie = await Movie.create({
     title, 
     genre,
     plot,
     cast
     });
 res.redirect('/');
 }catch(error) {
     next(error); 
     }
 });

 router.get("/movies", async (req, res, next) => {
    try{
    const movies = await Movie.find()
    res.render("movies/movies", {movies})
} catch (error) {
    console.log(error)
    next (error)
}
});

router.get('/movies/:movieId', async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movie = await Movie.findById(movieId).populate('cast');
        res.render('movies/movie-details', movie);
    }catch(error) {
        next(error);
    }
});

router.post('/movies/:movieId/delete', async (req, res, next) => {
    try {
        const { movieId } = req.params;
        await Movie.findByIdAndDelete(movieId);
        res.redirect('/movies');

    }catch(error) {
        next(error);
    }
});

router.get('/movies/:movieId/edit', async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const movie = await Book.findById(movieId);
        res.render('movies/edit-movie', movie);

    } catch(error) {
        next(error);
    }
});

router.post('/movies/:movieId/edit', async (req, res , next) => {
    try {
        const { movieId } = req.params;
        const { title, genre, plot, cast} = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, {
            title,
            genre,
            plot,
            cast
            });
            res.redirect(`/movies/${updatedMovie._id}`);

    } catch(error) {
        next(error);
    }
});

module.exports = router;







