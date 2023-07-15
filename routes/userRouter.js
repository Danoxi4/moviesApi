const express = require('express')
const userRouter = express.router()

const {
    userRegistrationCtrl,
    userLoginCtrl,
    userFavoritesCtrl,
    userWatchListCtrl,
    userRecommendationsCtrl 
    } = require('../Controllers/userController')


userRouter.post('/register', userRegistrationCtrl )

userRouter.post('/login', userLoginCtrl )

userRouter.get('/favorites/:id', userFavoritesCtrl )

userRouter.get('/watchlist/:id', userWatchListCtrl )

userRouter.get('/recommendations/:id', userRecommendationsCtrl )
