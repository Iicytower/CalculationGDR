import { Router } from 'express';
// import * as bodyParser from 'body-parser';
// import validator from "../../middlewares/validator";
// import { check } from "express-validator";

const router = Router();

import addCalculation from '../../controllers/authrequire/dowAllUserCalculations';


router.get('/', addCalculation);


export default router;
