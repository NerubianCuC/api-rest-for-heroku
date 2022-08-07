import {validationResult, body, param} from 'express-validator'
import axios from "axios"
export const validacionFinal =(req,res,next)=>{
    const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
next()
}
export const paramLinkValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
        validacionFinal,
];

export const bodyLinkValidator = [
    body("longlink", "formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            
            try {
                
                if (!value.startsWith("https://")) {
                    value = "https://" + value;
                }
                await axios.get(value);
                return value;
            } catch (error) {
                // console.log(error);
                throw new Error("not found longlink 404");
            }
        }),
        validacionFinal,
];

export const bodyRegisterValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecta").custom(
        (value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas");
            }
            return value;
        }
    ),
    validacionFinal,
];

export const bodyLoginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    validacionFinal,
];