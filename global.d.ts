import { Mongoose } from "mongoose";

interface Cached {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}


declare global {
    var mongoose: Cached | undefined;
}

export { };