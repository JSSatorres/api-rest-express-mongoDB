import express  from "express"
import authRoutes from './routes/auth.routes.js'
import linkRoutes from './routes/link.routes.js'
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/link", linkRoutes);

export default app
