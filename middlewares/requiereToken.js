import jwt from "jsonwebtoken"

export const requiereToken =(req, res, next)=>{
try {
    let token= req.headers.authorization
    if(!token) throw new Error ("No Bearer")
    token = token.split(" ")[1]
    const {uid} = jwt.verify(token,process.env.JWT_SECRET)
    req.uid = uid
    next()
} catch (error) {
    const tokenVerificationErrors={
        "invalid signature":"La firma del JWT no es valida",
        "jwt expired":"JWT Expirado",
        "invalid token": "Token no valido",
        "No Bearer": "Utiliza el formato Bearer"
    }
    return res.status(401).send({error: tokenVerificationErrors[error.message]})
}
}