import { json } from "express"
import { nanoid } from "nanoid"
import {Link} from "../model/link.js"


export const obtenerLinks =async (req, res)=>{
    try {
        const links = await Link.find({uid:req.uid})
        return  res.json({links})
    } catch (error) {
        res.status(500).json({error: "Error de servidor" })
    }
}
export const getLink = async(req, res) =>{
    const {nanoLink}= req.params
    
    try {
        const linkSolo= await Link.findOne({nanoLink})
        if(!linkSolo) return res.status(404).json({error: "Ne existe el link" })
        return res.json({longlink:linkSolo.longlink})
    } catch (error) {
        if(error.kind==="ObjectId"){
            return res.status(403).json({error: "Formato Id Incorrecto" })
        }
        res.status(500).json({error: "Error de servidor" })
    }
}
// para un crud tradicional
export const getLinkCrud = async(req, res) =>{
    const {id}= req.params
    
    try {
        const linkSolo= await Link.findById(id)
        if(!linkSolo) return res.status(404).json({error: "Ne existe el link" })
        if(!linkSolo.uid.equals(req.uid)) return res.status(401).json({error: "No le pertenece ese Link 😎  " })
    return res.json({linkSolo})
    } catch (error) {
        if(error.kind==="ObjectId"){
            return res.status(403).json({error: "Formato Id Incorrecto" })
        }
        res.status(500).json({error: "Error de servidor" })
    }
}
export const createLinks = async (req, res)=>{
    
    let {longlink} = req.body
    if(!longlink.startsWith("https://")) longlink = "https://" + longlink
    try {
        const link = new Link({longlink: longlink,nanoLink: nanoid(6), uid: req.uid })
        
      const newlink=  await link.save()
      return  res.json({newlink})
    } catch (error) {
        res.status(500).json({error: "Error de servidor" })
    }
}
export const removeLink = async(req, res) =>{
    const {id}= req.params
    
    try {
        const linkSolo= await Link.findById(id)
        if(!linkSolo) return res.status(404).json({error: "No existe el link" })
        if(!linkSolo.uid.equals(req.uid)) return res.status(401).json({error: "No le pertenece ese Link 😎  " })
        await linkSolo.remove()
        return res.json({linkSolo})
    } catch (error) {
        if(error.kind==="ObjectId"){
            return res.status(403).json({error: "Formato Id Incorrecto" })
        }
        res.status(500).json({error: "Error de servidor" })
    }
}

export const updateLink = async(req, res) =>{
    
    const {id}= req.params
    let {longlink} =req.body
    if (!longlink.startsWith("https://")) {
        longlink = "https://" + longlink;
                }
  
    try {
        let linkSolo= await Link.findById(id)
        if(!linkSolo) return res.status(404).json({error: "No existe el link" })
        if(!linkSolo.uid.equals(req.uid)) return res.status(401).json({error: "No le pertenece ese Link 😎  " })
        linkSolo.longlink=longlink
        await linkSolo.save()
        return res.json({linkSolo})
    } catch (error) {
        if(error.kind==="ObjectId"){
            return res.status(403).json({error: "Formato Id Incorrecto" })
        }
        res.status(500).json({error: "Error de servidor" })
    }
}