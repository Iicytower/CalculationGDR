import { Router } from 'express';
import * as bodyParser from 'body-parser';
import validator from "../../middlewares/validator";
import { check } from "express-validator";

const router = Router();

import delQuotation from '../../controllers/authrequire/delQuotation';

router.delete('/:name', 
bodyParser.json(),
[
],
validator(),
delQuotation);


export default router;
