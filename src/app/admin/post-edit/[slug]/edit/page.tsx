import EditPostPage from "./editPostForm";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};


export default async function EditPage({ params }: Props) {
    const {slug}= await params;
    return <EditPostPage slug={slug} />
}