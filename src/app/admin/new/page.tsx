import { getServerSession } from "next-auth";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NewPostForm from "./newPostPage";

export default async function NewPostPage() {
    const session = await getServerSession(GET);
    if (!session) redirect("login");

    return (
        <div>
            <NewPostForm />
        </div>
    );
}

