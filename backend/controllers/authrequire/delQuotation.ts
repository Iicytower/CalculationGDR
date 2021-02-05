import { Request, Response } from "express";
import Quotation from '../../database/models/Quotations';

export default async (req: Request, res: Response) => {

   if (req.user === undefined) return res.status(401).json({
      msg: "Unauthorized",
   });
   interface User {
      _id?: String,
   }

   const currentUser: User = req.user
   const { name } = req.params;

   try {
      const doc = await Quotation.findOne({
         name,
         owner: currentUser._id,
      })
      if (!doc) return res.status(404).json({
         msg: "Quotation not found",
      });

      const dbRes = await doc.deleteOne();

      return res.status(200).json({
         msg: "Quotation deleted",
      });

   } catch (err) {
      console.error(err);
      return res.status(500).json({
         msg: "there is a problem with delete Quotation"
      });
   }
}