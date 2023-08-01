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
    userRecommendationsCtrl
    } = require('../Controllers/userController')

const  isLogin  = require('../Middlewares/isLogin')



userRouter.post('/register', userRegistrationCtrl )

userRouter.post('/login', userLoginCtrl )

userRouter.get('/favorites', isLogin , getUserFavoritesCtrl )

userRouter.get('/recommendations', isLogin , userRecommendationsCtrl )

userRouter.post('/favorites/:movieId', isLogin , addToFavoritesCtrl )

userRouter.delete('/favorites/:movieId', isLogin , removeFromFavoritesCtrl )

userRouter.get('/watchlist', isLogin, getWatchlistCtrl)

userRouter.post('/watchlist/:movieId', isLogin, addToWatchlistCtrl )

userRouter.delete('/watchlist/:movieId', isLogin , removeFromWatchlistCtrl )

module.exports = userRouter
