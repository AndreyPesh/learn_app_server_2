import multer from 'multer';
import { INVALID_EXT_FILENAME, PATH_STATIC_FILE } from '../../types/constants';

const CHARACTER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const LENGTH_ID = 5;
const LIST_VALID_EXT = ['jpg', 'jpeg', 'svg', 'png'];

const generateId = (lengthId: number) => {
  let result = '';
  for (let i = 0; i <= lengthId; i++) {
    result += CHARACTER_SET.charAt(Math.floor(Math.random() * CHARACTER_SET.length));
  }
  return result;
};

export const isValidExtention = (ext: string) => {
  return LIST_VALID_EXT.includes(ext);
};

export const generateNameImage = (nameImage: string) => {
  const ext = nameImage.split('.').pop();
  if (ext === undefined || !isValidExtention(ext)) {
    return INVALID_EXT_FILENAME; 
  }
  const time = Date.now().toString();
  const id = generateId(LENGTH_ID);
  const name = id + '_' + time + '.' + ext;
  return name;
};

export const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, PATH_STATIC_FILE);
  },
  filename: function (req, file, callback) {
    const nameImage = generateNameImage(file.originalname);
    callback(null, nameImage);
  },
});

export const upload = multer({ storage });
