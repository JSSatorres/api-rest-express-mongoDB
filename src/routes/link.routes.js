import { Router } from "express";
import { authToken } from "../middlewares/authToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
import { 
  createLinks,
  getLinks,
  getOneLink,
  renoveOneLink,
  updateOneLink
} from "../controllers/link.controllers.js";


const linkRoutes = Router()


linkRoutes.get("/", authToken, getLinks)
linkRoutes.get("/:nanoLink", getOneLink)
linkRoutes.post("/", authToken, bodyLinkValidator, createLinks)
linkRoutes.delete("/:id", authToken,paramLinkValidator, renoveOneLink)
linkRoutes.patch("/:id", authToken,paramLinkValidator, bodyLinkValidator,updateOneLink)


export default linkRoutes;
