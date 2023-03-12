import { unlink } from 'fs/promises';
import { PATH_STATIC_FILE } from '../../types/constants';

export const deleteImagesFromStore = async (imageList: string[]) => {
  try {
    await Promise.all(imageList.map((image) => unlink(PATH_STATIC_FILE + image)));
  } catch {
    console.error(`cant delete images ${imageList}`);
  }
};
