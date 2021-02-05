import { Router } from 'express';

const router = Router();

import addQuotation from './addQuotation';
import dowAllUserQuotations from './dowAllUserQuotations';
import editQuotation from './editQuotation';
import delQuotation from './delQuotation';
import dowOneUserQuotation from './dowOneUserQuotation';

router.get('/test', (req, res) => res.end('authrequire test endpoint \n'));

router.use('/addQuotation', addQuotation)
   .use('/editQuotation', editQuotation)
   .use('/delQuotation', delQuotation)
   .use('/dowAllUserQuotations', dowAllUserQuotations)
   .use('/dowOneUserQuotation', dowOneUserQuotation)

export default router;