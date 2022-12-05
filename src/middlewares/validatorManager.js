import { body} from 'express-validator';
import { validationExpressResult } from "../middlewares/validationExpressResult.js";

export const bodyLoginValidator = [
  body('email', "incorrect email format")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "at least 6 characters")
    .trim()
    .isLength({min:6}),
  validationExpressResult,
]

export const bodyRegisterValidator =   [
  body('email', "incorrect email format")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "at least 6 characters")
    .trim()
    .isLength({min:6})
    .custom((value, {req})=>{
      if ( value !== req.body.repassword) {
        throw new Error("the pasword are not the same")
      }
      return true
    }),
  validationExpressResult,
]