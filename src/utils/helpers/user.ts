import { CreateUserInput } from '../../schemas/user.schema';
import { unlink } from 'fs/promises';
import { DEFAULT_NAME_PHOTO, PATH_STATIC_FILE } from '../../types/constants';

export const getDataUser = (dataUser: CreateUserInput) => {
  const { name, password, email } = dataUser;
  return { name, email: email.toLowerCase(), password };
};

export const removePhotoFromPublic = async (namePhoto: string) => {
  try {
    if (namePhoto && namePhoto !== DEFAULT_NAME_PHOTO) {
      await unlink(PATH_STATIC_FILE + namePhoto);
    }
  } catch {
    console.log('Cant remove photos');
  }
};
