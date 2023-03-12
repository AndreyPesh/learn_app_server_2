import { Router } from 'express';
import { checkAdminRight } from '../../controllers/admin.controller';
import { deserializeUser } from '../../middleware/deserializeUser';

const router = Router();

router.use(deserializeUser)

router.get('/check', checkAdminRight);


export default router;
