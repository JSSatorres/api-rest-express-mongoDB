import express  from "express";
import { body} from 'express-validator';
import { infoUser, login, register, refreshToken } from "../controllers/auth.controllers.js";
import { authToken } from "../middlewares/authToken.js";
import { validationExpressResult } from "../middlewares/validationExpressResult.js";

const authRoutes = express.Router()

authRoutes.get('/Login',
  [
    body('email', "incorrect email format")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "at least 6 characters")
      .trim()
      .isLength({min:6}),
    validationExpressResult,
  ],
  login
)

authRoutes.post(
  '/register',
  [
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
  ],
  register
)
authRoutes.get('/protected', authToken, infoUser)
authRoutes.get('/refresh', refreshToken)

export default authRoutes