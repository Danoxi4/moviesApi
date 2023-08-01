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
        reviewMovieCtrl,
    } = require('../Controllers/movieController')

const isAdmin = require('../Middlewares/isAdmin')

moviesRouter.post('/movies', isLogin, isAdmin,  uploadMoviesCtrl )

moviesRouter.put('/movies/:id', isLogin, isAdmin, updateMovieCtrl )

moviesRouter.delete('/movies/:id', isLogin, isAdmin, deleteMovieCtrl )

moviesRouter.get('/movies/:id', getMovieCtrl )

moviesRouter.post('/search', searchNameCtrl )

moviesRouter.get('/genre/:genre', searchGenresCtrl )

moviesRouter.get('/releaseDate/:date', searchReleaseDateCtrl )

moviesRouter.put('/likes/:id', likeMovieCtrl )

moviesRouter.put('/review/:id', reviewMovieCtrl )

module.exports = moviesRouter