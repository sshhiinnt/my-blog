import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connect } from "./mongodb";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = async () => {
    const mongoose = await connect();

    const client = (mongoose.connection.getClient
        ? mongoose.connection.getClient()
        : mongoose.connection.db) as any;
    return {

        adapter: MongoDBAdapter(client),
        providers: [
            GitHubProvider({
                clientId: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            })
        ],

        session: {
            strategy: "database",
        },
        pages: {
            signIn: "/sdmin/login",
        },
    };
};