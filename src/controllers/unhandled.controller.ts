import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const unhandledRouteHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
};
