import config from 'config';

const TRANSFORM_MILLISECOND = 60 * 1000;

export const ACCESS_TOKEN_EXPIRES =
  config.get<number>('accessTokenExpiresIn') * TRANSFORM_MILLISECOND;
export const REFRESH_TOKEN_EXPIRES =
  config.get<number>('refreshTokenExpiresIn') * TRANSFORM_MILLISECOND;

export const DEFAULT_NAME_PHOTO = 'default.svg';

export const STATUS = {
  INTERNAL_SERVER: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  OK: 200,
  CREATED: 201,
  DELETED: 204
};

export const POSTGRES_CODE = {
  EXIST: '23505',
};

export const STATUS_RESPONSE = {
  SUCCESS: 'success',
  FAIL: 'fail',
  ERROR: 'error',
};

export const PASSWORD_ROLE = 123;

export const PATH_STATIC_FILE = 'public/';
export const INVALID_EXT_FILENAME = 'InvalidExt';
export const FIELD_NAME_INPUT_IMAGE = 'image';
export const FILED_NAME_INPUT_IMAGES = 'images';
