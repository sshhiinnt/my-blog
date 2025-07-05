import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./forAuthMongodb";
import GitHubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
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
        signIn: "/admin/login",
    },
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.role = (user as any).role || "user";
            }
            return session;
        },
    },
};
