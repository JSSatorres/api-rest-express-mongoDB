import express  from "express";

import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controllers.js";
import { authToken } from "../middlewares/authToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";

const authRoutes = express.Router()

authRoutes.post('/Login',bodyLoginValidator, login)
authRoutes.post('/register',bodyRegisterValidator, register)
authRoutes.get('/protected', authToken, infoUser)
authRoutes.get('/refresh',requireRefreshToken, refreshToken)
authRoutes.get('/logout', logout)

export default authRoutes