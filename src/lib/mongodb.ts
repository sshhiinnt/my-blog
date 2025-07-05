import mongoose from "mongoose";
// import { Mongoose } from "mongoose";


// ターミナルからts-nodeで直接スクリプトを動かすときはここで明示的に型定義する。
// declare global {
//   var mongoose: {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
//   } | undefined;
// }


const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
    throw Error("MONGO_URI is not found");
}
if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}