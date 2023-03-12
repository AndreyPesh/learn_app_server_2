import { NextFunction, Request, Response } from 'express';
import { TypeRole } from '../entities/user.entity';

export const checkAdminRight = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = res.locals.user;
    return res.send({ admin: role === TypeRole.ADMIN });
  } catch (error) {
    next(error);
  }
};
