import NextAuth, { DefaultSession } from "next-auth";
import "next-auth";
import "next-auth/react";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
        };
    }

    interface User {
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }

}

