'use client';
import { useEffect, useState } from "react";

const NewArt = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
    const fetchNewPosts = async () => {
        const res = await fetch("app/api/posts");
        const data = await res.json();

        setPosts(data);
    }
    fetchNewPosts();
}, []);

return (
    <div>
        <h2>新着記事</h2>
        <ul>
            {posts.map((post: any) => (
                <li key={post._id} className="">
                    <a href="{`/posts/${post._id}`}">
                        <h2>
                            {post.title}
                        </h2>
                        <p>
                            {new Date(post.createdAt).toLocaleString()}
                        </p>
                    </a>
                </li>
            ))}
        </ul>
    </div>
)

}

export default NewArt;