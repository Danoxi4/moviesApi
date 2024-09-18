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
        getMovies,
        uploadImageCtrl,
        getLatestMovies,
        rateMovie
    } = require('../Controllers/movieController')

const isLogin = require('../Middlewares/isLogin')
const isAdmin = require('../Middlewares/isAdmin')


const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
  

moviesRouter.post('/uploadImage', upload.single('image'), uploadImageCtrl);

moviesRouter.get('/latest', getLatestMovies)

moviesRouter.post('/upload', /*isLogin, isAdmin,*/  uploadMoviesCtrl )

moviesRouter.put('/:id', isLogin, isAdmin, updateMovieCtrl )

moviesRouter.delete('/:id', /*isLogin, isAdmin,*/ deleteMovieCtrl )

moviesRouter.get('/:Id', /*isLogin,*/ getMovieCtrl )

moviesRouter.post('/search', isLogin , searchNameCtrl )

moviesRouter.post('/genre', isLogin , searchGenresCtrl )

moviesRouter.post('/releaseDate', isLogin , searchReleaseDateCtrl )

moviesRouter.put('/likes/:id', isLogin, likeMovieCtrl )

moviesRouter.put('/review/:id', isLogin , reviewMovieCtrl )

moviesRouter.get('/', getMovies)

moviesRouter.post('/:movieId/rate', isLogin, rateMovie);

module.exports = moviesRouter