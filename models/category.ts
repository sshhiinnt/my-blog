import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICategory extends Document {
    name: string,
    slug: string,
    createdAt?: Date;
    updateAt?: Date;
}

const CategorySchema: Schema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
}, { timestamps: true });

const Category = models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
