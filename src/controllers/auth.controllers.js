import {User} from '../models/user.model.js'
import 'dotenv/config' 
import jwt from 'jsonwebtoken'

export const login = async (req, res)=>{
  const { email, password } = req.body
  console.log(email, password);
  try {
    const checkUser =  await User.findOne({email})
    if (!checkUser)  return res.status(403).json({error : "the user does not exist"} )

    // comparePassword se crea en el userSchema añadiendolo a userSchema.methods
    const checkPassword = await checkUser.comparePassword(password)
    if (!checkPassword)  return res.status(403).json({error : "incorrect credentials"} )

    // Create jwt
    const token = jwt.sign({ uid: checkUser.id }, process.env.JWT_SECRET);

    return res.json({token})

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" })
  }
}

export const register = async (req, res)=>{
  const {userName, email, password, rol } = req.body
  console.log(email, password);
  try {
    // esta comprobacion es repetitiva ya que cacheo el error 11000 que manda moongose en el catch
    const checkUser =  await User.findOne({email})
    if(checkUser) throw ({code: 11000 })

    const user = new User({ userName, email, password, rol })  
    await user.save()

    return res.status(201).json({ ok: "register" })

  } catch (error) {
    console.log(error);
    //mongoose responde con el codigo 11000 como error de email ya existe por que en el modelo el email es unico
    if (error.code === 11000) {
      return res.status(400).json({ error: "the user exist" })
    }
    res.status(500).json({ error: "server error" })
  }
}