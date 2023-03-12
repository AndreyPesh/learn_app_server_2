import config from 'config';

import { NamePrivateKeyToken, NamePublicKeyToken } from '../../types/types';

export const getTokenKeyFromConfig = (nameKeyToken: NamePrivateKeyToken | NamePublicKeyToken) => {
  const tokenKey = Buffer.from(config.get<string>(nameKeyToken), 
    'base64'
  ).toString('ascii');
  return tokenKey;
}