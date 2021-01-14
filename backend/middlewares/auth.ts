import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('jwt', {session: false})(req, res, next);
}