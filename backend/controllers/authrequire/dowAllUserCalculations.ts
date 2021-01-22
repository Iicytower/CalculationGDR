import { Request, Response } from "express";
import Calculation from '../../database/models/Calculations';

export default async (req: Request, res: Response) => {
  try {

    if (req.user === undefined) return res.status(401).json({
      msg: "Unauthorized",
    });
    interface User {
      _id?: String,
    }

    const currentUser: User = req.user

    const data = await Calculation.find({
      owner: currentUser._id,
    });

    return res.status(200).json({
      msg: `All quotations by ${currentUser._id}`,
      data,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "something goes wrong",
    });
  }
}