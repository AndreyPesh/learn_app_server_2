import { Router } from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { getCart } from '../controllers/cart.controller';

const router = Router();

router.use(deserializeUser, requireUser);

router.get('/get', getCart);

export default router;
