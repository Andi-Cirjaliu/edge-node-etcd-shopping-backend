const express = require('express');

const app = express();

//read config
require('dotenv').config();
console.log('Environment: ', process.env.NODE_ENV);

app.use(express.json());
app.use(require('./shoppingRouter'));

app.use( ( req, res, next ) => {
    console.log('Unhandled request. url', req.url);
    res.status(404).json({message: 'Page could not be found'});
});

//Generic error handler
app.use(function (err, req, res, next) {
    console.error('An unhandled error occured: ', err.stack);
    res.status(500).json({"msg": "An internal error occured"});
});
  
const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log('App listens on port ', PORT);
} )
