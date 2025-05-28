import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPost extends Document {
    title: String,
    content: String,
    createdAt: Date;
}

const PostSchema: Schema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection:"posts",
    }
);

    const Post = models.Post || model<IPost>("Post",PostSchema);

    export default Post;