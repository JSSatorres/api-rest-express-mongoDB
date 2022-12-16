import mongoose from "mongoose";
import bcryptjs from 'bcryptjs' 

const userSchema = new mongoose.Schema ({  
  userName:{
    type:String,
    require:[true, 'el nombre del usuario es requerido']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  rol:{
    type:String,
    require:false,
    emun:["ADMIN_ROLE","USER_ROLE"],
    default:"USER_ROLE"
  },
  state:{
    type:Boolean,
    default:true
  },
})

userSchema.pre("save", async function(next){

  // tiene que ser una funcion normal para que el this sea el del user,
  //si hago funcion flecha el this cambia por el scopped de la funcion flecha
  // podria igualar user a this para ahorrarme el this
  //const user = this 

  // if (!this.user.isModified("password")) return next()

  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hashSync(this.password, salt)
    next
  } catch (error) {
    console.log(error);
    throw new Error ("hash password error")
  }
})

userSchema.methods.comparePassword = async function(candidatePassword){
  return await bcryptjs.compare(candidatePassword, this.password)
  // return true o false
}

export const User = mongoose.model('User', userSchema) 