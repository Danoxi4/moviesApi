const express = require('express')
const moviesRouter = express.router()

const { 
        uploadMoviesCtrl,
        updateMovieCtrl,
        deleteMovieCtrl,
        getMovieCtrl,
        searchNameCtrl,
        searchGenresCtrl,
        searchReleaseDateCtrl,
        likeMovieCtrl,
        commentMovieCtrl,
    } = require('../Controllers/moviesController')

moviesRouter.post('/movies', )

moviesRouter.put('/movies/:id', )

moviesRouter.get('/movies/:id', )

moviesRouter.delete('/movies/:id', )

moviesRouter.post('/search', )

moviesRouter.get('/genre/:genre', )

moviesRouter.get('/releaseDate/:date', )

moviesRouter.put('/likes/:id', )

moviesRouter.put('/comments/:id', )

 