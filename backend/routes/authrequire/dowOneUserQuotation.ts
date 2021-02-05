import { Router } from 'express';
import * as bodyParser from 'body-parser';
import validator from "../../middlewares/validator";
import { check } from "express-validator";

const router = Router();

import dowOneUserQuotation from '../../controllers/authrequire/dowOneUserQuotation';

router.get('/:name', 
bodyParser.json(),
[
   // check("name").isString(),
],
validator(),
dowOneUserQuotation);

export default router;
