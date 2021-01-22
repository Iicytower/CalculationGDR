import { Router } from 'express';

const router = Router();

import addCalculation from './addCalculation';
import dowAllUserCalculations from './dowAllUserCalculations';
import editCalculation from './editCalculation';
import delCalculation from './delCalculation';

router.get('/test', (req, res) => res.end('authrequire test endpoint \n'));

router.use('/addCalculation', addCalculation)
   .use('/editCalculation', editCalculation)
   .use('/delCalculation', delCalculation)
   .use('/dowAllUserCalculations', dowAllUserCalculations)

export default router;