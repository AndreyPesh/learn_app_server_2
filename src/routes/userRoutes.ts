import express from 'express';
import { registerUserHandler } from '../controllers/auth.controller';
import { getMeHandler, removePhotoUser, updateUser } from '../controllers/user.controller';
import { deserializeRole } from '../middleware/deserializeRole';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { updateUserSchema } from '../schemas/user.schema';
import { FIELD_NAME_INPUT_IMAGE } from '../types/constants';
import { upload } from '../utils/multer/storage';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);
router.put('/update', upload.single(FIELD_NAME_INPUT_IMAGE), deserializeRole, validate(updateUserSchema), updateUser);
router.put('/remove_photo', removePhotoUser);
router.post('/add', registerUserHandler);

export default router;
