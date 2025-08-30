import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import type { Session } from "next-auth";

export async function serverAuth(): Promise<Session | null> {
    return await getServerSession(authOptions);
}
