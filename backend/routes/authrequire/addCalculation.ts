import { Router } from 'express';
import * as bodyParser from 'body-parser';
import validator from "../../middlewares/validator";
import { check, body, checkSchema } from "express-validator";
import { Request, Response, NextFunction } from 'express';

const router = Router();

import addCalculation from '../../controllers/authrequire/addCalculation';


router.post('/',
    bodyParser.json(),
    [
        check("name").isString(),
        check("useMethod").isIn(["perDay", "perMeter"]),
        check("totalMaterialsSumPrice").isFloat(),
        check("totalWorkPrice").isFloat(),
        check("totalPriceNetto").isFloat(),
        check("totalPriceBrutto").isFloat(),
        
        check("workPerMeter").optional(),
        check("workPerMeter.materials").optional().isArray(),
        check("workPerMeter.materials.*.name").optional().isString(),
        check("workPerMeter.materials.*.quantity").optional().isFloat(),
        check("workPerMeter.materials.*.pricePerItem").optional().isFloat(),
        check("workPerMeter.difficults").optional().isArray(),
        check("workPerMeter.difficults.*.name").optional().isString(),
        check("workPerMeter.difficults.*.converter").optional().isFloat(),
        check("workPerMeter.numbersOfMeters").optional().isFloat(),
        check("workPerMeter.pricePerMeter").optional().isFloat(),
        
        check("workPerDay").optional(),
        check("workPerDay.works").optional().isArray(),
        check("workPerDay.works.*.name").optional().isString(),
        check("workPerDay.works.*.materials").optional().isArray(),
        check("workPerDay.works.*.materials.*.name").optional().isString(),
        check("workPerDay.works.*.materials.*.quantity").optional().isInt(),
        check("workPerDay.works.*.materials.*.pricePerItem").optional().isFloat(),
        check("workPerDay.works.*.activities.").optional().isArray(),
        check("workPerDay.works.*.activities.*.name").optional().isString(),
        check("workPerDay.works.*.activities.*.numberOfWorkingDays").optional().isFloat(),
        check("workPerDay.works.*.materialsSumPrice").optional().isFloat(),
        check("workPerDay.works.*.sumOfWorkingDays").optional().isFloat(),
        check("workPerDay.works.*.personsQuantity").optional().isInt(),
        check("workPerDay.totalSumOfWorkingDays").optional().isFloat(),
        check("workPerDay.moneyOfTheDay").optional().isFloat(),
        
    ],
    validator(),
    async (req: Request, res: Response, next: NextFunction) => {
        const { workPerDay, workPerMeter, useMethod } = req.body
        switch (useMethod) {
            case 'perDay':
                if (workPerDay !== undefined && workPerMeter === undefined) next()
                else return res.status(400).json({
                    msg: "You can use workPerDay OR workPerMeter. Both is not possible."
                });
                break;
            case 'perMeter':
                if (workPerMeter !== undefined && workPerDay === undefined) next()
                else return res.status(400).json({
                    msg: "You can use workPerDay OR workPerMeter. Both is not possible."
                });
                break;
            default:
                return res.status(400).json({
                    msg: `useMethod must be "perDay" or "perMeter". You send ${useMethod}`,
                })
                break;
        }
    },
    addCalculation);


export default router;
