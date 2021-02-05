import { Request, Response } from "express";

import Quotation from '../../database/models/Quotations'
import { QuotationInterface } from "../../helpers/interfaces";

export default async (req: Request, res: Response) => {

    const { name, useMethod, workPerDay, workPerMeter, totalMaterialsSumPrice, totalWorkPrice, totalPriceNetto, totalPriceBrutto } = req.body;

    if (req.user === undefined) return res.status(401).json({
        msg: "Unauthorized",
    })

    interface User {
        _id?: String,
    }
    const currentUser: User = req.user
    const data: QuotationInterface = {
        name,
        owner: currentUser._id,
        useMethod,
        totalMaterialsSumPrice,
        totalWorkPrice,
        totalPriceNetto,
        totalPriceBrutto,
    };

    if (useMethod === "perDay") data.workPerDay = workPerDay;
    if (useMethod === "perMeter") data.workPerMeter = workPerMeter;

    try {

        const isExist = await Quotation.findOne({
            name,
            owner: currentUser._id,
        })

        if (!!isExist) {
            return res.status(200).json({
                msg: `You already have a Quotation with name ${name}`
            })
        }

        const calc = new Quotation(data);
        const dbRes = await calc.save();

        return res.status(201).json({
            msg: 'Quotation is added'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "Something goes wrong with addQuotation"
        });
    }
}