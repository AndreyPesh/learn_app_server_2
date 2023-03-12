import { SmartphoneData } from './interfaces';

export type NamePrivateKeyToken = 'accessTokenPrivateKey' | 'refreshTokenPrivateKey';
export type NamePublicKeyToken = 'accessTokenPublicKey' | 'refreshTokenPublicKey';

export type SmartphoneDescriptionData = Omit<SmartphoneData, 'images'>;
