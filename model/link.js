import mongoose from "mongoose";
const {Schema, model} = mongoose
const linkSchema = new Schema({
    longlink:{
        type: String,
        require: true,
        trim: true
    },
    nanoLink:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    uid:{
        type:Schema.Types.ObjectId,
        ref: "Usuario",
        require: true

    }
})
export const Link = model("Link", linkSchema)