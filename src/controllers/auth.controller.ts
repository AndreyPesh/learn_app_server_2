import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import { createUser, findUserByEmail, findUserById } from '../services/user.service';
import { POSTGRES_CODE, STATUS, STATUS_RESPONSE } from '../types/constants';
import { QueryFailedError } from '../types/interfaces';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { addCookieToResponse } from '../utils/cookie/addCookieToResponse';
import { clearCookie } from '../utils/cookie/clearCookie';
import { accessTokenCookieOptions } from '../utils/cookie/cookieOptions';
import { getDataUser } from '../utils/helpers/user';
import { signJwt, signTokens, verifyJwt } from '../utils/jwt/jwt';

export const registerUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataUser = getDataUser(req.body);
    const user = await createUser(dataUser);

    const { access_token, refresh_token } = await signTokens(user);

    const isCookieAdded = await addCookieToResponse(res, access_token, refresh_token);

    if (isCookieAdded) {
      return res.status(STATUS.CREATED).json({
        status: STATUS_RESPONSE.SUCCESS,
        access_token,
      });
    }
  } catch (error: unknown) {
    if ((error as QueryFailedError).code === POSTGRES_CODE.EXIST) {
      return res.status(STATUS.CONFLICT).json({
        status: STATUS_RESPONSE.FAIL,
        message: 'User with that email already exist',
      });
    }
    next(error);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail({ email });

    if (!user) {
      return next(new AppError(STATUS.BAD_REQUEST, `User doesn't exist`));
    }

    const isPasswordMatch = await User.comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      return next(new AppError(STATUS.BAD_REQUEST, 'Invalid password'));
    }

    const { access_token, refresh_token } = await signTokens(user);

    const isCookieAdded = await addCookieToResponse(res, access_token, refresh_token);

    if (isCookieAdded) {
      return res.status(STATUS.OK).json({
        status: STATUS_RESPONSE.SUCCESS,
        access_token,
      });
    }
    return next(new AppError(STATUS.INTERNAL_SERVER, 'Error adding cookie'));
  } catch (error: unknown) {
    next(error);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const message = 'Could not refresh access token';

    if (!refresh_token) {
      return next(new AppError(STATUS.FORBIDDEN, message));
    }

    const decoded = verifyJwt<{ sub: string }>(refresh_token, 'refreshTokenPublicKey');

    if (!decoded) {
      return next(new AppError(STATUS.FORBIDDEN, message));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(STATUS.FORBIDDEN, message));
    }

    const user = await findUserById(JSON.parse(session).id);

    if (!user) {
      return next(new AppError(STATUS.FORBIDDEN, message));
    }

    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    // 4. Add Cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // 5. Send response
    res.status(STATUS.OK).json({
      status: STATUS_RESPONSE.SUCCESS,
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    await redisClient.del(user.id);
    clearCookie(res);

    res.status(STATUS.OK).json({
      status: STATUS_RESPONSE.SUCCESS,
    });
  } catch (err: any) {
    next(err);
  }
};
