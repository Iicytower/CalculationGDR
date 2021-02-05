import { Request, Response } from "express";
import Quotation from '../../database/models/Quotations';

export default async (req: Request, res: Response) => {

   if (req.user === undefined) return res.status(401).json({
      msg: "Unauthorized",
   });

   const data = req.body;

   try {
      interface Document {
         name: string,
         useMethod: "perDay" | "perMeter",
         workPerDay?: any,
         workPerMeter?: any
      }


      const doc: any = await Quotation.findOne({
         name: data.name
      });
      if(doc){
         doc.name = data.name;
         doc.useMethod = data.useMethod;
         doc.workPerDay = data.workPerDay;
         doc.workPerMeter = data.workPerMeter;
         doc.totalMaterialsSumPrice = data.totalMaterialsSumPrice;
         doc.totalWorkPrice = data.totalWorkPrice;
         doc.totalPriceNetto = data.totalPriceNetto;
         doc.totalPriceBrutto = data.totalPriceBrutto;
      }else{
         return res.status(404).json({
            msg: "Quotation not found",
         });
      }

      //TODO handle error
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