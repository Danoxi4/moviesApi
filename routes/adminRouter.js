const express = require('express');
const adminRouter = express.Router();

const {
    registerAdminCtrl,
    adminLoginCtrl
} = require('../Controllers/adminController')

adminRouter.post('/register', registerAdminCtrl)
adminRouter.post('/login', adminLoginCtrl)


module.exports = adminRouter