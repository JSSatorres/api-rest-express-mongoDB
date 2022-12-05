import jwt from 'jsonwebtoken'
import 'dotenv/config' 
import { tokenVerificationErrors } from '../utils/tokenAdmin.js'

export const authToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization
    if (!token) throw new Error ("does not exist Baerer Token") 

    token = token.split(" ")[1]
    const {uid} = jwt.verify(token, process.env.JWT_SECRET)  

    req.uid = uid

    next()
  } catch (error) {
    console.log(error);

    return res.status(401).send({error: tokenVerificationErrors[error.message]})
  }
}