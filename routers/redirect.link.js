import { Router } from "express";
import { redireccionLink } from "../controllers/redirect.controller.js";
const router = Router()
router.get('/:nanoLink',redireccionLink)
export default router