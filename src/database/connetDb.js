import mongoose from 'mongoose';
import 'dotenv/config'

  try {
    await  mongoose.connect(process.env.URI_MONGO);
    console.log( 'conection DB ok');
  } catch (error) {
    console.log(error);
        throw new Error ("Error a la hora de iniciar la base de datos" +  error)
  }
