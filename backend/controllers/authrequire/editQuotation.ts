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
   const data = req.body;

   if(String(currentUser._id) !== String(data.owner)){
      return res.status(401).json({
         msg: "It is not your Quotation. Access denied."
      })
   }

   try {
      interface Document {
         name: string,
         useMethod: "perDay" | "perMeter",
         workPerDay?: any,
         workPerMeter?: any
      }

      const doc: Document | any = await Quotation.findOne({
         _id: data._id,
         owner: currentUser._id,
      })
   
      if(doc){
         doc.name = data.name;
         doc.useMethod = data.useMethod;
         doc.workPerDay = data.workPerDay;
         doc.workPerMeter = data.workPerMeter;
      }else{
         return res.status(404).json({
            msg: "Quotation not found",
         });
      }
      const dbRes = await doc.save();
   
      return res.status(200).json({
         msg: "Quotation edited",
      });
      
   } catch (err) {
      console.error(err);
      return res.status(500).json({
         msg: "there is a problem with edit Quotation"
      });
   }

}