import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import * as connectionController from "../controllers/connectionController";
import * as connectionValidator from "../validations/connectionValidator";

export const connectionRouter = Router();

connectionRouter.post(
  "/communication-start",
  //connectionValidator.start,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    connectionController.start(req, res);
  }
)

connectionRouter.post(
  "/communication-end",
  connectionValidator.end,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({});
    }

    connectionController.end(req, res);
  }
)