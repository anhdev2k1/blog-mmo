import mongoose, { Schema, models } from "mongoose";

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require:true
    },
    slug:{
        type: String,
    },
    image:{
        type: String
    },
    service:{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    deleteAt:{
        type: Date
    }
},{timestamps: true})
export const Post = mongoose.models.Post || mongoose.model('Post',PostSchema)