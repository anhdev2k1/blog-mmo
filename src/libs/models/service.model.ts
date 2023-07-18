import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type: String,
        require: true
    },
    slug:{
        type: String,
    },
    image:{
        type: String
    },
    deleteAt:{
        type: Date,
    }
},{timestamps: true})
export const Service = mongoose.models.Service || mongoose.model('Service',ServiceSchema)