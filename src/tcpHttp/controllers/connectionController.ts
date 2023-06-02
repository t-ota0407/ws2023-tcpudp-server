import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Token } from "../../authentification/token";
import { SimpleDatabase } from "../../database/simpleDatabase";
import { User } from "../../database/entities/user";

export const start = async (req: Request, res: Response) => {
  console.log("start");

  const uuid = uuidv4();
  const payload = { uuid, };
  console.log(payload);
  const token = Token.generate(payload);

  SimpleDatabase.getInstance().AddActiveUser(new User(uuid, req.body.username));

  return res.status(200).json({
    uuid,
    token,
  });
};

export const end = async (req: Request, res: Response) => {
  const token = Token.extractTokenFromHeader(req);
  if (token === undefined) {
    return res.status(401).send();
  }

  const uuid = Token.extractUuidFromToken(token);
  if (uuid === undefined || uuid !== req.body.uuid) {
    return res.status(401).send();
  }
  
  console.log("end");
  SimpleDatabase.getInstance().DeleteActiveUser(uuid);
  return res.status(200).send();
};
