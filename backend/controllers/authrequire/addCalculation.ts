import { Request, Response } from "express";

import Calculation from '../../database/models/Calculations'

export default async (req: Request, res: Response) => {

    const {name, useMethod, workPerDay, workPerMeter} = req.body;
    
    if(req.user === undefined) return res.status(401).json({
        msg: "Unauthorized",
    })
    //@ts-ignore TODO
    const currentUser = req.user._id
    const data: any = {
        name,
        owner: currentUser,
        useMethod,
    };

    if(useMethod === "perDay"){
        data.workPerDay = workPerDay;
    }
    if(useMethod === "perMeter"){
        data.workPerMeter = workPerMeter;
    }

    console.log(data);
    Calculation.create(data)

    return res.status(200).json({
        msg: 'Hello addCalculation'
    });
}