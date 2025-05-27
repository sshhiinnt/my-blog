import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/mongodb";
import User from "../../../../../models/user"
import { computeFromManifest } from "next/dist/build/utils";
import { compare } from "bcryptjs";





const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "Password" },
            },


            async authorize(credentials) {
                await connect();
                const user = await User.findOne({ username: credentials?.username });
                if (!user) return null;

                const isValid = await compare(credentials?.password || "", user.password);
                if (!isValid) return null;

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };