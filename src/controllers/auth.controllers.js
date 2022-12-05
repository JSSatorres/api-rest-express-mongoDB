import 'dotenv/config' 
import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'
import { generateRefreshToken, generateToken } from '../utils/tokenAdmin.js';

export const login = async (req, res)=>{
  try {
    const { email, password } = req.body
    const checkUser =  await User.findOne({email})
    if (!checkUser)  return res.status(403).json({error : "the user does not exist"} )

    // comparePassword se crea en el userSchema añadiendolo a userSchema.methods
    const checkPassword = await checkUser.comparePassword(password)
    if (!checkPassword)  return res.status(403).json({error : "incorrect credentials"} )

    // Create jwt
    const {token, expiresIn} = generateToken(checkUser.id)
    generateRefreshToken(checkUser.id, res)
    return res.json({ token, expiresIn })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" })
  }
}

export const register = async (req, res)=>{
  const {userName, email, password, rol } = req.body
  try {
    // esta comprobacion es repetitiva ya que cacheo el error 11000 que manda moongose en el catch
    const checkUser =  await User.findOne({email})
    if(checkUser) throw ({code: 11000 })

    const user = new User({ userName, email, password, rol })  
    await user.save()

    //Generate JWT
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });

  } catch (error) {
    console.log(error);
    //mongoose responde con el codigo 11000 como error de email ya existe por que en el modelo el email es unico
    if (error.code === 11000) {
      return res.status(400).json({ error: "the user exist" })
    }
    res.status(500).json({ error: "server error" })
  }
}

export const infoUser = async (req, res)=>{
  const {uid } = req
  try {
    const user = await User.findById(uid).lean()
    return res.status(200).json({ email: user.email, uid: user._id})    

  } catch (error) {
    console.log(error);
    return res.status(500).json({error:"server error"})
  }
}

export const refreshToken = (req, res) => {
  try {
    const {token, expiresIn} = generateToken(uid)
    return res.json({ token, expiresIn })

  } catch (error) {
    console.log(error);
    return res.status(401).send({error: tokenVerificationError[error.message]})
  }
}

export const logout = () => {
  res.clearCookie('refreshToken')
  res.json({ok: true})
}