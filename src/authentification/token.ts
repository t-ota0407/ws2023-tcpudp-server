import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { Request } from "express";
import * as dotenv from "dotenv";

dotenv.config()

export class Token {
  public static generate(payload: object): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1days",
    });
    return token;
  }

  public static extractTokenFromHeader(req: Request): string | undefined {
    if ('authorization' in req.headers) {
      const authHeader = req.headers.authorization;
      const token = String(authHeader).split(" ")[1];
      return token;
    }

    return undefined;
  }

  public static extractUuidFromToken(token: string): string | undefined {
    const payload: object = jwtDecode(token);
    if (!hasUuid(payload)) {
      return undefined;
    }
    return payload.uuid;
  }
}

const hasUuid = (d: any): d is { uuid: string } => {
  if (!d) return false;
  if (d.uuid) {
    return true;
  }
  return false;
};
