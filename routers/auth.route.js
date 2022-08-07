import {Router} from "express"
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js"
import {bodyLoginValidator, bodyRegisterValidator, validacionFinal} from "../middlewares/validarUserPass.js"
import { requiereToken } from "../middlewares/requiereToken.js"
const router = Router()

router.post('/register',bodyRegisterValidator,register)
router.post('/login',bodyLoginValidator,login)
router.get('/protected',requiereToken,infoUser)
router.get('/refresh', refreshToken)
router.get('/logout', logout)

export default router