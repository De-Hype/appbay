import mongoose from "mongoose";
import { Document, ObjectId, Schema } from "mongoose";

export default interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
}
