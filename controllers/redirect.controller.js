import { Link } from "../model/link.js"

export const redireccionLink = async(req, res)=>{
    try {
        const {nanoLink}= req.params
    
        try {
            const linkSolo= await Link.findOne({nanoLink})
            if(!linkSolo) return res.status(404).json({error: "Ne existe el link" })
            return res.redirect(linkSolo.longlink)
        } catch (error) {
            if(error.kind==="ObjectId"){
                return res.status(403).json({error: "Formato Id Incorrecto" })
            }
            res.status(500).json({error: "Error de servidor" })
        }
    } catch (error) {
        console.log(error)
    }
}