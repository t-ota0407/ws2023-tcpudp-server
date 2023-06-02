import { check } from "express-validator";

export const start = [
  check("username").exists(),
];

export const end = [
  check("uuid").exists(),
];
