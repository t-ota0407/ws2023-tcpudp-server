import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import * as connectionController from "../controllers/connectionController";
import passport from "passport";
import * as connectionValidator from "../validations/connectionValidator";

export const connectionRouter = Router();

connectionRouter.post(
  "/start",
  connectionValidator.start,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    connectionController.start(req, res);
  }
);

connectionRouter.post(
  "/end",
  connectionValidator.end,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("validationerror");
      return res.status(400).send();
    }

    passport.authenticate("jwt", {session: false}, (err: Error | null, user: object | false | undefined, info: object | undefined) => {
      if (!user) {
        return res.status(401).send();
      }
    });

    connectionController.end(req, res);
  }
);
