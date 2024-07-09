const express = require('express')
const moviesRouter = express.Router()

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

const isLogin = require('../Middlewares/isLogin')
const isAdmin = require('../Middlewares/isAdmin')

moviesRouter.post('/', isLogin, isAdmin,  uploadMoviesCtrl )

moviesRouter.put('/:id', isLogin, isAdmin, updateMovieCtrl )

moviesRouter.delete('/:id', isLogin, isAdmin, deleteMovieCtrl )

moviesRouter.get('/:Id', isLogin, getMovieCtrl )

moviesRouter.post('/search', isLogin , searchNameCtrl )

moviesRouter.post('/genre', isLogin , searchGenresCtrl )

moviesRouter.post('/releaseDate', isLogin , searchReleaseDateCtrl )

moviesRouter.put('/likes/:id', isLogin, likeMovieCtrl )

moviesRouter.put('/review/:id', isLogin , reviewMovieCtrl )

module.exports = moviesRouter