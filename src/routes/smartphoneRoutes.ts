import { Router } from 'express';
import { getSmartphoneById, getSmartphones } from '../controllers/smartphone.controller';

const router = Router();

router.get('/get', getSmartphones);
router.get('/get/:id', getSmartphoneById)

export default router;
