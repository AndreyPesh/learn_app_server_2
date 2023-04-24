import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../types/constants';
import { User } from '../entities/user.entity';
import { getCartByUserId } from '../services/cart.service';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = res.locals.user;

    const cart = await getCartByUserId(user.cart.id);

    res.status(STATUS.OK).send(cart);
  } catch (err) {
    next(err);
  }
};
