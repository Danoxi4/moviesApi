const express = require('express')

const userRouter = express.Router()

const {
    getWatchlistCtrl,
    addToWatchlistCtrl,
    removeFromWatchlistCtrl,
    userRegistrationCtrl,
    userLoginCtrl,
    getUserFavoritesCtrl,
    addToFavoritesCtrl,
    removeFromFavoritesCtrl,
    userRecommendationsCtrl,
    forgotPassword,
    resetPassword,
    getMoviesByFavoriteGenre,
    addComment
    } = require('../Controllers/userController')

const  isLogin  = require('../Middlewares/isLogin')


userRouter.post('/forgotPassword', forgotPassword)

userRouter.post('/reset-password/:token', resetPassword ) 

userRouter.post('/register', userRegistrationCtrl )

userRouter.post('/login', userLoginCtrl )

userRouter.get('/favorites', isLogin , getUserFavoritesCtrl )

userRouter.get('/landingPage', isLogin, getMoviesByFavoriteGenre)

userRouter.get('/recommendations', isLogin , userRecommendationsCtrl )

userRouter.post('/favorites/:movieId', isLogin , addToFavoritesCtrl )

userRouter.delete('/favorites/:movieId', isLogin , removeFromFavoritesCtrl )

userRouter.get('/watchlist', isLogin, getWatchlistCtrl)

userRouter.post('/watchlist/:movieId', isLogin, addToWatchlistCtrl )

userRouter.delete('/watchlist/:movieId', isLogin , removeFromWatchlistCtrl )

userRouter.post('/addComment', addComment )

module.exports = userRouter
