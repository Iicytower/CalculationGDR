import { NextFunction, Request, Response } from 'express';
import User from '../database/models/User';
import jwt from 'jsonwebtoken';

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const { nickname, password } = req.body;

        try {

            const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)])(?=.*[A-Z])(?!.*\s).{8,}$/g;
            const isPasswordCorrect = regexpPassword.test(password);

            if (!isPasswordCorrect) {
                return res.status(400).json({
                    msg: "Password must contain small and big letter, digit and minimum one special character. Available characters: ! @ # $ % ^ & * ( )"
                })
            }

            const isExist = await User.findOne({ nickname });

            if (isExist) return res.status(400).json({
                msg: `User with nickname ${nickname} exist. Use diffrent.`
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Something goes wrong with register"
            });
        }

        try {

            const newUser = new User({ nickname, });

            await User.register(newUser, password)

            return res.status(201).json({
                msg: `success register user with nickname ${nickname}.`,
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Somthing goes wrong with register",
            });
        }

    },

    login: async (req: Request, res: Response) => {

        if (req.user === undefined) return res.status(500);

        interface User {
            _id?: String,
        }
        const usr: User = req.user
        try {
            const token = jwt.sign(
                { id: usr._id },
                String(process.env.JWT_SECRET),
                { expiresIn: 1000 * 60 * 60 * 8 } //8hours
            )

            return res.status(200)
            .cookie("jwToken", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 8,
                signed: true,
                secure: process.env.NODE_ENV === "production",
            })
            .json({
                msg: 'succesfully login',
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Something goes wrong with login",
            })

        }
    }
}
