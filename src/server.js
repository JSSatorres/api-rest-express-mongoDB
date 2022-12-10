import express  from "express"
import 'dotenv/config' 
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import linkRoutes from './routes/link.routes.js'
import redirectRoutes from './routes/redirct.routes.js'
import cookieParser from "cookie-parser";

const app = express()

const whiteList = [process.env.ORIGIN1,process.env.ORIGIN2]

console.log(process.env.ORIGIN1);

app.use(cors({
  origin: (origin, callback) => {
    if ( !origin || whiteList.includes(origin)) {
      console.log(process.env.ORIGIN1);
      return callback(null, origin)
    }
    return callback("cors mistake")
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/link", linkRoutes);
app.use("/", redirectRoutes);

export default app
