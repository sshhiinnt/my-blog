import EditPostPage from "../../editPostForm";

interface PageProps {
    params: { slug: string };
}

export default function EditPage({ params }: PageProps) {
    return <EditPostPage slug={params.slug} />
}