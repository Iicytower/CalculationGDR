import { Router } from 'express';
import * as bodyParser from 'body-parser';
import validator from "../../middlewares/validator";
import { check, body, checkSchema } from "express-validator";

const router = Router();

import addCalculation from '../../controllers/authrequire/addCalculation';


router.post('/',
    bodyParser.json(),
    [
        check("name").isString(),
        check("useMethod").isIn(["perDay", "perMeter"]),
    ],
    validator(),
    checkSchema({
        name: {
            isString: true,
        },
        useMethod: {
            isIn: {
                options: ["perDay", "perMeter"]
            },
        },
        
    }),
    addCalculation);


export default router;
