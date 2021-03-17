import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../database/models/User';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

async function verifyCallback(payload: any, done: any) {
    try {
        const user = await User.findOne({ _id: payload.id });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

const cookieExtractor = function(req: any) {
    let token = null;
    if (req && req.signedCookies)
    {
        token = req.signedCookies['jwToken'];
    }
    return token;
};

export default () => {
    const config = {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: String(process.env.JWT_SECRET),
    };

    passport.use(User.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));
}