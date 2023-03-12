import { CookieOptions } from 'express';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '../../types/constants';



const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

export const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRES),
  maxAge: ACCESS_TOKEN_EXPIRES,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES),
  maxAge: REFRESH_TOKEN_EXPIRES,
};
