import { NextFunction, Request, Response } from 'express';
import User from '../database/models/User';
import jwt from 'jsonwebtoken';

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        try {

            const isExist = await User.findOne({ email });

            if (isExist) return res.status(200).json({
                status: "failure",
                msg: `User with email ${email} exist. Use diffrent adress.`
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: `failure`,
                msg: "Something goes wrong with register"
            });
        }

        try {

            const newUser = new User({ email, });
            // @ts-ignore TODO
            await User.register(newUser, password)


            return res.status(201).json({
                status: `succes`,
                msg: `success register user with email ${email}.`,
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: `failure`,
                msg: "Somthing goes wrong with register",
            });
        }

    },

    login: async (req: Request, res: Response) => {

        const token = jwt.sign(
            // @ts-ignore TODO
            { id: req.user._id }, 
            String(process.env.JWT_SECRET), 
            {expiresIn: 1000*60*8} //8hours
            )

        return res.status(200).json({
            status: 'success',
            token,
        });
    }
}
