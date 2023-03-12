import { Response } from 'express';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from './cookieOptions';

export const addCookieToResponse = async (
  res: Response,
  access_token: string,
  refresh_token: string
) => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      res.cookie('access_token', access_token, accessTokenCookieOptions);
      res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });
      resolve(true);
    } catch {
      reject(false);
    }
  });
};
