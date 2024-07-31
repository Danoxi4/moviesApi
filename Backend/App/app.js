const express = require("express");
const cors = require("cors");

//import middlewares

//import routers
const moviesRouter = require('../routes/moviesRouter')
const usersRouter = require('../routes/userRouter')
const adminRouter = require('../routes/adminRouter')

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));
app.use(express.json()); 



//custom logging middlewares
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });



//Routes
app.use('/api/admin', adminRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/users', usersRouter)



//Error middlewares
// app.use(notFoundError)
// app.use(globalErrHandler)



module.exports = app;