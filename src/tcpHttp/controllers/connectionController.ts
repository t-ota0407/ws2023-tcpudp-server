import { Request, Response } from "express";

export const start = async (req: Request, res: Response) => {
  console.log("start");
  res.status(200).json({});
};

export const end = async (req: Request, res: Response) => {
  console.log("end");
  res.status(200).json({});
};
