import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IMessage extends Document {
    name: String,
    email: String,
    message: String;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema<IMessage>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "contact",
    }
);

const Message = models.Post || model<IMessage>("Post", MessageSchema);

export default Message;