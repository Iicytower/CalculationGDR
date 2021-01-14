import { Router } from 'express';
const router = Router();
import * as bodyParser from 'body-parser';
import validator from "../middlewares/validator";
import { check } from "express-validator";
import passport from "passport";
import jwtAuth from '../middlewares/auth';

import userCon from "../controllers/user"

const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)])(?=.*[A-Z])(?!.*\s).{8,}$/g;

router.post("/register",
    bodyParser.json(),
    [
        check("email")
            .isEmail()
            .trim(),
        check("password")
            .isString()
        // .matches(regexpPassword),
    ],
    validator(),
    userCon.register);

router.post("/login",
    bodyParser.json(),
    [
        check("email").isEmail(),
        check("password").isString(),
    ],
    validator(),
    passport.authenticate('local', { session: false, }),
    userCon.login);

export default router;