import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
