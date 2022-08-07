import mongoose from "mongoose";
import bcryptjs from "bcryptjs"


const usuariosSchema=  new mongoose.Schema({
    email:{
        type:String,
        require: true,
        unique: true,
        lowercase: true,
        index:{unique:true}
    },
    password:{
        type:String,
        require: true
    }
})
usuariosSchema.pre('save', async function(next){
    const user =this
    
    if(!user.isModified('password')) return next ()
    try {
        const salt= await bcryptjs.genSalt(10)
        user.password= await bcryptjs.hash(user.password,salt)
         
         next()
        
    } catch (error) {
        console.log(error)
        throw new Error ("Error al codificar la contraseña")
        
    }
})
usuariosSchema.methods.comparePasswords = async function(candidatePass){
    return await bcryptjs.compare(candidatePass, this.password)
}
export const UsuarioM = mongoose.model('Usuario',usuariosSchema)
