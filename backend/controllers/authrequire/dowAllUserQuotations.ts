import { Request, Response } from "express";
import Quotation from '../../database/models/Quotations';

export default async (req: Request, res: Response) => {
  try {

    if (req.user === undefined) return res.status(401).json({
      msg: "Unauthorized",
    });
    interface User {
      _id?: String,
    }

    const currentUser: User = req.user

    const data = await Quotation.find({
      owner: currentUser._id,
    });

    if (data === null) return res.status(404).json({
      msg: "There is no such quotation",
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