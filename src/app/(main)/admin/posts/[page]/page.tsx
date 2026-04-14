import AdminPostPage from "./AdominPostPage";

type Props = {
    params: Promise<{
        page?: string;
    }>
}

export default async function Page({ params }: Props) {
    const { page } = await params;
    return (
        <AdminPostPage page={page} />
    )
}