const express = require('express');
const adminRouter = express.Router();

const {
    registerAdminCtrl,
    adminLoginCtrl,
    getUsers,
    getUsersByFavoriteGenre,
    getMostLikedMovies,
    getMoviesByGenre,
    getComments
} = require('../Controllers/adminController')

const isAdmin = require('../Middlewares/isAdmin')
const isLogin = require('../Middlewares/isLogin')

adminRouter.post('/register', registerAdminCtrl)
adminRouter.post('/login', adminLoginCtrl)
adminRouter.get('/users', /*isLogin, isAdmin,*/ getUsers)
adminRouter.get('/usersBbyGenre',/*isLogin, isAdmin,*/ getUsersByFavoriteGenre)
adminRouter.get('/mostLikedMovies', /*isLogin, isAdmin,*/getMostLikedMovies);
adminRouter.get('/moviesByGenre',/*isLogin, isAdmin,*/ getMoviesByGenre);
adminRouter.get('/comments', /*isLogin, isAdmin,*/ getComments)

module.exports = adminRouter