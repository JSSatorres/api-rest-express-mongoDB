import { body} from 'express-validator';
import { validationExpressResult } from "../middlewares/validationExpressResult.js";
import axios from 'axios'

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
export const bodyLinkValidator = [
  body("longLink", "wrong fomat")
  .trim()
  .notEmpty()
  .custom(async value =>{
    if (!value.startsWith('http://')) {
      value = `http://${value}`
    }
    console.log(value);
    try {
      await axios.get(value)
      return value
    } catch (error) {
      console.log(error);
      throw new Error("not found")
    }
  }),
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

export const paramLinkValidator = [
  param("id", "Formato no válido (expressValidator)")
      .trim()
      .notEmpty()
      .escape(),
  validationResultExpress,
];