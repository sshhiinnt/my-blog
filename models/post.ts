import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPost extends Document {
    title: string,
    content: string,
    createdAt: Date;
    category: {
        group: string;
        name: string;
        slug: string;
    }
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
        category: {
            group: { type: String, required: true },
            name: { type: String, required: true },
            slug: { type: String, required: true, }
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "posts",
    }
);

const Post = models.Post || model<IPost>("Post", PostSchema);

export default Post;