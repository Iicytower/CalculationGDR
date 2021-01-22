import { Router } from 'express';
import * as bodyParser from 'body-parser';
import validator from "../../middlewares/validator";
import { check } from "express-validator";

const router = Router();

import delCalculation from '../../controllers/authrequire/delCalculation';

router.delete('/', 
bodyParser.json(),
[
   check("_id").isString(),
   check("owner").isString(),
],
validator(),
delCalculation);


export default router;
