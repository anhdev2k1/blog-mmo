import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
      type: String,
      require: true,
    },
    services: {
      type: Schema.Types.ObjectId,
      ref: 'Services'
    },
    posts: {
      type: Schema.Types.ObjectId,
      ref: 'Posts'
    }
  },
  { timestamps: true }
);
const UserModel = mongoose.model('User',UserSchema)
export const User = UserModel
