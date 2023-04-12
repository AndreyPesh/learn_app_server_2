import { Router } from 'express';
import {
  addBrand,
  addSmartphone,
  deleteSmartphones,
  getListBrand,
  updateSmartphone,
} from '../../controllers/smartphone.controller';
import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser';
import { FILED_NAME_INPUT_IMAGES } from '../../types/constants';
import { upload } from '../../utils/multer/storage';

const router = Router();

router.use(deserializeUser, requireUser);

router.post('/create', upload.array(FILED_NAME_INPUT_IMAGES), addSmartphone);
router.patch('/update/:id', upload.array(FILED_NAME_INPUT_IMAGES), updateSmartphone);
router.post('/brand-create', addBrand);
router.get('/brand-getall', getListBrand);
router.delete('/delete', deleteSmartphones);

export default router;