import { check } from "express-validator";

export const start = [
  check("id").exists(),
];

export const end = [
  check("id").exists(),
];
