import mongoose, { Schema, Document, models, model } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
};

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;