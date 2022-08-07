import {Router} from "express"
import { createLinks, getLink, obtenerLinks, removeLink, updateLink } from "../controllers/links.controller.js"
import { requiereToken } from "../middlewares/requiereToken.js"
import { bodyLinkValidator,paramLinkValidator } from "../middlewares/validarUserPass.js"
const router = Router()

router.get('/',requiereToken ,obtenerLinks)
router.get("/:nanoLink",getLink)
router.delete("/:id",paramLinkValidator, requiereToken, removeLink)
router.post('/',requiereToken,bodyLinkValidator, createLinks)
router.patch('/:id',paramLinkValidator,bodyLinkValidator, requiereToken,updateLink)
export default router