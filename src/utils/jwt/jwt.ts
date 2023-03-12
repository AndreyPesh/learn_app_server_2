import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import { NamePrivateKeyToken, NamePublicKeyToken } from '../../types/types';
import { getTokenKeyFromConfig } from './helpers';
import redisClient from '../connectRedis';
import { User } from '../../entities/user.entity';


export const signJwt = (
  payload: Object,
  keyName: NamePrivateKeyToken,
  options: SignOptions
) => {

  const privateKey = getTokenKeyFromConfig(keyName);

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const signTokens = async (user: User) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};

export const verifyJwt = <T>(
  token: string,
  keyName: NamePublicKeyToken
): T | null => {
  try {

    const publicKey = getTokenKeyFromConfig(keyName);

    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};