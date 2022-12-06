import { Router } from "express";
import { authToken } from "../middlewares/authToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
import { 
  createLinks,
  getLinks,
  getOneLink,
  renoveOneLink
} from "../controllers/link.controllers.js";


const linkRoutes = Router()


linkRoutes.get("/", authToken, getLinks)
linkRoutes.get("/:id", authToken,paramLinkValidator, getOneLink)
linkRoutes.post("/", authToken, bodyLinkValidator, createLinks)
linkRoutes.delete("/:id", authToken,paramLinkValidator, renoveOneLink)





export default linkRoutes;



// import {
//     createLink,
//     getLink,
//     getLinks,
//     removeLink,
//     updateLink,
// } from "../controllers/link.controller.js";
// import { requireToken } from "../middlewares/requireToken.js";
// import {
//     bodyLinkValidator,
//     paramLinkValidator,
// } from "../middlewares/validatorManager.js";
// const router = Router();

// // GET              /api/v1/links           all links
// // GET              /api/v1/links/:id       single link
// // POST             /api/v1/links           create link
// // PATCH/PUT        /api/v1/links/:id       update link
// // DELETE           /api/v1/links/:id       remove link

// router.get("/", requireToken, getLinks);
// router.get("/:nanoLink", getLink);
// router.post("/", requireToken, bodyLinkValidator, createLink);
// router.delete("/:id", requireToken, paramLinkValidator, removeLink);
// router.patch(
//     "/:id",
//     requireToken,
//     paramLinkValidator,
//     bodyLinkValidator,
//     updateLink
// );

