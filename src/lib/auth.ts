
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/mongodb";
import User from "models/user";
import { compare } from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session, User as NextAuthUser } from "next-auth";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },


            async authorize(credentials) {
                try {
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
                } catch (error) {
                    console.error("authorize error:", error);
                    return null;
                }

            }
        })
    ],


    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT, user?: NextAuthUser | { role?: string } }) {
            if (user && "role" in user) {
                token.role = user.role ?? "user";
            }
            return token;
        },

        async session({ session, token }: { session: Session, token: JWT }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },

    },
    pages: {
        signIn: "/admin/login",
    },

}

