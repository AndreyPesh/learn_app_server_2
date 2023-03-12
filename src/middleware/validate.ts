import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { STATUS } from '../types/constants';

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params, query, body } = req;
      schema.parse({
        params,
        query,
        body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(STATUS.BAD_REQUEST).json({
          status: 'fail',
          message: error.errors[0].message,
        });
      }
      next(error);
    }
  };
