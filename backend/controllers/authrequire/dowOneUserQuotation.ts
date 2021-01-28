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
      const { name } = req.body;
      const data = await Quotation.findOne({
         owner: currentUser._id,
         name,
      });

      if(data === null) return res.status(404).json({
         msg: "There is no such quotation",
      });

      return res.status(200).json({
         data,
      });

   } catch (err) {
      console.error(err);
      return res.status(500).json({
         msg: "something goes wrong",
      });
   }
}