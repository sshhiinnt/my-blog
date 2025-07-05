import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/mongodb";
import User from "../../../../../models/user"
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
                console.log(credentials)
                await connect();
                console.log("MongoDB connected");

                const user = await User.findOne({ username: credentials?.username });
                console.log("User find:", user);
                if (!user) {
                    console.log("user not found");
                    return null;
                }

                const isValid = await compare(credentials?.password || "", user.password);
                console.log("Password valid", isValid);

                if (!isValid) {
                    console.log("Invalid password");
                    return null;
                };

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log("jwt user role:", (user as any).role);
                token.role = (user as any).role;
            }
            return token;
        },

        async session({ session, token }) {
            console.log("session token role:", token.role);
            if (session.user && token.role) {
                session.user.role = token.role;
            }
            console.log("session user role after set:", session.user.role);
            return session;
        },

    },

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin/login",
    },
});

export { handler as GET, handler as POST };