const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSsanitize = require('express-mongo-sanitize');
const rateLimiter = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Load static files
app.use('/public', express.static(__dirname + '/public'));

app.use('/api', rateLimiter({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
  }));

  /**
 * @desc Helmet
 */
app.use(helmet());

/**
 * @desc Mongo sanitization against NOSQL query injection 
 */
app.use(mongoSsanitize())

/**
 * @desc Data Sanitization against XSS attacks
 */
app.use(xss());

/**
 * @desc Prevent Parameter polutioln
 */

/**
 * @desc Compresses response data 
 */
 app.use(compression());

 console.log(process.env.NODE_ENV);

 //Dev logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Base route Routes

  app.use('*', (req, res, next) => {
    next(new ErrorHandler(`Can't resolve ${req.originalUrl}`, false, 'e500'))
  });

  module.exports = app;