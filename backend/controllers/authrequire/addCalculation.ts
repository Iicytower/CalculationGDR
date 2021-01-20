import { Request, Response } from "express";

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

        console.log(data);
        Calculation.create(data)

        return res.status(200).json({
            msg: 'Hello addCalculation'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "Something goes wrong with addCalculation"
        });
    }
}