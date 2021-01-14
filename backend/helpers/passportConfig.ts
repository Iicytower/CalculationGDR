import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../database/models/User';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function verifyCallback(payload: any, done: any) {
    return User.findOne({ _id: payload.id })
        .then(user => done(null, user))
        .catch(err => done(err));
}

export default () => {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: String(process.env.JWT_SECRET),
    };

    // @ts-ignore TODO
    passport.use(User.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));
}