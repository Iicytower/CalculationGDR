import { Request, Response } from "express";
import User from '../database/models/User';
import bcrypt from "bcrypt";

export default {
    register: async (req: Request, res: Response) => {  
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

            const salt: string = bcrypt.genSaltSync(10);

            const newUser = new User({
                email,
                password: bcrypt.hashSync(password, salt),
            });

            newUser.save((err) => {
                if (err) throw err;

            });
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
        return res.end('login');
    }
}
