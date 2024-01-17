'use strict';

const winston = require('winston');


const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({dirname: 'logs', filename: 'combined.log' }),
    ],
  });

module.exports = logger;