import { NextFunction, Request, Response } from 'express';
import { TypeRole } from '../entities/user.entity';
import {
  INVALID_EXT_FILENAME,
  PASSWORD_ROLE,
  STATUS,
} from '../types/constants';
import AppError from '../utils/appError';
import { removePhotoFromPublic } from '../utils/helpers/user';

export const deserializeRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, name, email, passwordRole } = req.body;
    const user = res.locals.user;
    req.body = { name, email, role };

    if (req.file) {
      const { filename } = req.file;
      if (filename === INVALID_EXT_FILENAME) {
        return next(new AppError(STATUS.BAD_REQUEST, 'Incorrect image extention'));
      }
      await removePhotoFromPublic(user.photo);
      req.body.photo = filename;
    }

    if (role === TypeRole.ADMIN) {
      const isPasswordMatch = PASSWORD_ROLE === Number(passwordRole);
      if (!isPasswordMatch) {
        next(new AppError(STATUS.FORBIDDEN, 'You cant change your role'));
      }
    }
    next();
  } catch (err: unknown) {
    next(err);
  }
};
