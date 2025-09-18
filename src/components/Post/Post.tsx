import { useEffect, useState } from 'react';
import type { TPost } from '../../types/post';
import { getPosts } from '../../apis/post';
import PostCard from '../PostCard/PostCard';
import styles from "./styles.module.css";

export default function Post() {
    const [posts, setPosts] = useState<TPost[]>([]);

    useEffect(() => {
        getPosts().then(setPosts).catch(console.error);
    }, []);

    return (
        <div className={styles.post}>
            {posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
    );
}