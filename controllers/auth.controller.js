import{UsuarioM} from "../model/Usuarios.js" 
import jwt from "jsonwebtoken"
import  { generateRefreshToken, generateToken } from "../utils/tokenManager.js"

export const register =async (req,res)=>{
    const {email, password} = req.body
    try {
        let user =await UsuarioM.findOne({email})
        if(user)throw {code: 11000}
         user = new UsuarioM({email, password})
        await user.save()
        const {token,expireIn } = generateToken(user._id)
        generateRefreshToken(user.id, res)
        return res.json({token,expireIn})

    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({error:"Ya existe este usuario"})
        }
    }
     
 // res.json({ok:true})
}
export const login =async (req,res)=>{
 try {
    const {email, password} = req.body    
    let user =await UsuarioM.findOne({email})
    if(!user) return res.status(403).json({error:"No existe este usuario"})
    const respuestaPassword = await user.comparePasswords(password)
    if(!respuestaPassword) return res.status(403).json({error:"Esta mal la contraseña"})

    const {token,expireIn } = generateToken(user._id) // las sgtes 3 lineas son para generar un token de seguridad y refrescarlo
    generateRefreshToken(user.id, res)
    return res.json({token,expireIn })
 } catch (error) {
    return res.status(403).json({error:"Error de Servidor"})
    
 }
}

export const infoUser = async (req,res) =>{
  try {
    const user = await UsuarioM.findById(req.uid)
    return res.json({email:user.email, id:user._id})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
 //   res.json({user:"pepe@nauta.cu"})
}

export const refreshToken = (req, res)=>{
  
  try {
    const refreshtokenCookie = req.cookies.refreshToken
  
    if(!refreshtokenCookie)  throw new Error ("No existe el token")
    const {uid} = jwt.verify(refreshtokenCookie,process.env.JWT_REFRESH)
    
    const {token, expireIn} = generateToken(uid)
    return res.json({ token, expireIn })
  } catch (error) {
    const tokenVerificationErrors={
      "invalid signature":"La firma del JWT no es valida",
      "jwt expired":"JWT Expirado",
      "invalid token": "Token no valido",
      "No existe el token": "Utiliza el formato Bearer"
  }
  return res.status(401).send({error: tokenVerificationErrors[error.message]})
  }
}

export const logout =(req, res)=>{
  res.clearCookie("refreshToken")
  res.json({ok:true})
}