import passport from "passport";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import * as dotenv from "dotenv";
import { SimpleDatabase } from "../database/simpleDatabase";

dotenv.config();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(options, (jwt_payload: any, done: any) => {
    console.log(options);
    if (jwt_payload.uuid) {
        done(null, false);
    }

    const user = SimpleDatabase.getInstance().FindUser(jwt_payload.uuid)
    if (!user) {
        done(null, false);
    }

    done(user, jwt_payload);
  })
);

export default passport;
