import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next(); return;
    }
    if(!req.signedCookies.jwToken) return res.status(401).json({
        msg: "There is no token",
    });


    return passport.authenticate('jwt', {session: false})(req, res, next);
}