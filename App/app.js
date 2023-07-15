const express = require("express");

//import middlewares

//import routers
const moviesRouter = require('../routes/moviesRouter')
const usersRouter = require('../routes/usersRouter')


const app = express();

app.use(express.json()); 

//Routes
app.use('/api/movies', moviesRouter)
app.use('/api/users', usersRouter)



//Error middlewares
app.use(notFoundError)
app.use(globalErrHandler)



module.exports = app;