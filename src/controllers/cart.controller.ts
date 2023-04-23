import { NextFunction, Request, Response } from "express";
import { STATUS } from "../types/constants";
// import { getCartByUserId } from "../services/cart.service";


export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: {id: string} = res.locals.user;

    console.log(user);
    
    // const cart = await getCartByUserId(user.id)

    // res.status(STATUS.OK).send(cart);
  } catch (err) {
    next(err);
  }
};