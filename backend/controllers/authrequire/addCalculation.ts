import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { Request, Response } from "express";
import { Collection } from "mongoose";

import Calculation from '../../database/models/Calculations'
import { CalculationInterface } from "../../helpers/interfaces";

export default async (req: Request, res: Response) => {

    const { name, useMethod, workPerDay, workPerMeter } = req.body;

    if (req.user === undefined) return res.status(401).json({
        msg: "Unauthorized",
    })

    interface User {
        _id?: String,
    }
    const currentUser: User = req.user
    const data: CalculationInterface = {
        name,
        owner: currentUser._id,
        useMethod,
    };

    if (useMethod === "perDay") data.workPerDay = workPerDay;
    if (useMethod === "perMeter") data.workPerMeter = workPerMeter;

    try {

        const isExist = await Calculation.findOne({
            name,
            owner: currentUser._id,
        })

        if (!!isExist) {
            return res.status(200).json({
                mgs: `You already have a calculation with name ${name}`
            })
        }

        
        const calc = new Calculation(data);
        const dbRes = await calc.save();

        //TODO handle database error
        // const dbRes = await calc.save(err => {
        //     if (err) {
        //         console.error('Error: \n', err);
        //         return res.status(500).json(err);
        //     }
        // });
        //
        //alternative
        // const dbRes = await Calculation.create(data);

        return res.status(201).json({
            msg: 'Calculation is added'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "Something goes wrong with addCalculation"
        });
    }
}