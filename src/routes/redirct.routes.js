
import { Router } from "express";
import { redirectLink } from "../controllers/redirect.controllers.js";
const redirectRouter = Router();

redirectRouter.get("/:nanoLink", redirectLink);

export default redirectRouter;