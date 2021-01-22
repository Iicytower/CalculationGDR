import { Router } from 'express';

const router = Router();

import dowAllUserQuotations from '../../controllers/authrequire/dowAllUserQuotations';

router.get('/', dowAllUserQuotations);

export default router;
