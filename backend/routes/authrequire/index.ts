import { Router } from 'express';

const router = Router();

import addCalculation from './addCalculation';

router.get('/test', (req, res) => res.end('authrequire endpoint \n'));

router.use('/addCalculation', addCalculation)

export default router;