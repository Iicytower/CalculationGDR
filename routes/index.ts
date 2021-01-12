import { Router } from 'express';
const router = Router();

import homeCon from '../controllers/home';
import userRouter from './user';
import authrequireRouter from './authrequire/index';
import jwtAuth from '../middlewares/auth';

router.get('/', homeCon);

router.use('/user', userRouter);

router.use('/authrequire', jwtAuth, authrequireRouter);


export default router;