import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from 'config';
import { Config } from '../types/enums';
import bodyParser from 'body-parser';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: config.get<string>(Config.origin),
      credentials: true,
    })
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(express.static('public'))

  app.use(express.json({ limit: '10kb' }));

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.use(cookieParser());

  return app;
};
