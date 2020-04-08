import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import AuthorizationController from '../controllers/AuthorizationController';

const application = express();

application.use(cors()).use(cookieParser());

AuthorizationController(application);

module.exports = application;
