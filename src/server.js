import express  from "express"
import 'dotenv/config' 
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import linkRoutes from './routes/link.routes.js'
import redirectRoutes from './routes/redirct.routes.js'
import cookieParser from "cookie-parser";

const app = express()

const whiteList = [process.env.ORIGIN1]

app.use(cors({
  origin: (origin, callback) => {
    if ( whiteList.includes(origin)) {
      return callback(null, origin)
    }
    return callback("cors mistake")
  }
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/link", linkRoutes);
app.use("/", redirectRoutes);

export default app
