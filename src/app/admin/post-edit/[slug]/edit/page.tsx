import EditPostPage from "../../editPostForm";

export default function EditPage({ params }: { params: { slug: string } }) {
    return <EditPostPage slug={params.slug} />
}