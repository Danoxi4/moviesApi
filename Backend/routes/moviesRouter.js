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
        getMovies
    } = require('../Controllers/movieController')

const isLogin = require('../Middlewares/isLogin')
const isAdmin = require('../Middlewares/isAdmin')
const upload = require('../Middlewares/multer'); // Adjust the path to your multer configuration


moviesRouter.post('/upload', isLogin, isAdmin, upload.single('poster'), uploadMoviesCtrl )

moviesRouter.put('/:id', isLogin, isAdmin, updateMovieCtrl )

moviesRouter.delete('/:id', isLogin, isAdmin, deleteMovieCtrl )

moviesRouter.get('/:Id', isLogin, getMovieCtrl )

moviesRouter.post('/search', isLogin , searchNameCtrl )

moviesRouter.post('/genre', isLogin , searchGenresCtrl )

moviesRouter.post('/releaseDate', isLogin , searchReleaseDateCtrl )

moviesRouter.put('/likes/:id', isLogin, likeMovieCtrl )

moviesRouter.put('/review/:id', isLogin , reviewMovieCtrl )

moviesRouter.get('/', getMovies)

module.exports = moviesRouter