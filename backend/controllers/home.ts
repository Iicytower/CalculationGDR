import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
   
    return res.status(204).json({
        msg: 'Hello costs from home!'
    });
}