import mongoose from "mongoose";
try {
   await mongoose.connect(process.env.URI)
   console.log("Conexion Satisfactoria")
} catch (error) {
    console.log("Error de Conexion ")
}
