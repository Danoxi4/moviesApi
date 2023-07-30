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

userRouter.get('/favorites/:id', getUserFavoritesCtrl )

userRouter.get('/recommendations/:id', userRecommendationsCtrl )

//userRouter.post('/favorites/:movieId', isLogin , addToFavoritesCtrl )

// userRouter.delete('/favorites/:movieId', isLogin , removeFromFavoritesCtrl )

userRouter.get('/watchlist/:id',/* isLogin,*/ getWatchlistCtrl)

// userRouter.post('/watchlist/:movieId', isLogin, addToWatchlistCtrl )

// userRouter.delete('/watchlist/:movieId', isLogin , removeFromWatchlistCtrl )

module.exports = userRouter
