import { NextFunction, Request, Response } from 'express';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import {
  createUser,
  updateUserById,
  updateUserPhotoById,
} from '../services/user.service';
import { DEFAULT_NAME_PHOTO, STATUS } from '../types/constants';
import { removePhotoFromPublic } from '../utils/helpers/user';

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    res.status(STATUS.OK).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    await updateUserById(user.id, req.body);
    res.status(STATUS.OK).send();
  } catch (err) {
    next(err);
  }
};

export const removePhotoUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    await removePhotoFromPublic(user.photo);
    await updateUserPhotoById(user.id, DEFAULT_NAME_PHOTO);
    res.status(STATUS.OK).send();
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body as CreateUserInput);
    if (user) {
      res.status(STATUS.CREATED).json(user);
    }
  } catch (error) {
    next(error);
  }
};
