import jwt from 'jsonwebtoken'
import 'dotenv/config' 

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

    const tokenVerificationError = {
      "jwt malformed":"Formato no válido",
      "invalid token":"token no valido",
      "jwt expired":"tiempo expirado",
      "invalid signature":" la firma no es valida",          
    }

    return res.status(401).send({error: tokenVerificationError[error.message]})
  }
}