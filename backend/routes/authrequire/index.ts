import { Router } from 'express';
const router = Router();

router.get('/test', (req, res) => res.end('authrequire endpoint \n'));

export default router;