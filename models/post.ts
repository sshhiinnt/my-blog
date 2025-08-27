import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPost extends Document {
    title: string,
    content: string,
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    description?: string;
    area?: string;
    climbDate?: Date;
    images?: Array<{
        url: string;
        width: number;
        height: number;
    }>,
    thumbnailUrl: string;
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
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        area: {
            type: String,
        },
        climbDate: {
            type: Date,
        },
        images: [{
            url: { type: String, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        }],
        thumbnailUrl: {
            type: String,
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
        updatedAt: {
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