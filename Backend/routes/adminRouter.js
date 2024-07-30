const express = require('express');
const adminRouter = express.Router();

const {
    registerAdminCtrl,
    adminLoginCtrl,
    getUsers
} = require('../Controllers/adminController')

const isAdmin = require('../Middlewares/isAdmin')

adminRouter.post('/register', registerAdminCtrl)
adminRouter.post('/login', adminLoginCtrl)
adminRouter.get('/users', /*isAdmin,*/ getUsers)


module.exports = adminRouter