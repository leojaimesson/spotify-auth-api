import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import AuthorizationController from '../controllers/AuthorizationController';

const application = express();

application
  .use(express.static(path.resolve(__dirname, '..', '..', 'public')))
  .use(cors())
  .use(cookieParser());

AuthorizationController(application);

module.exports = application;
