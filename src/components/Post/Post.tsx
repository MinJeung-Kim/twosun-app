import { useCallback, useEffect, useState } from 'react';
import useInfiniteScroll from '../../hook/useInfiniteScroll';
import { usePost } from '../../context/PostContext';
import { getPosts } from '../../apis/post';
import PostCard from '../PostCard/PostCard';
import { getUser } from '../../apis/user';
import styles from "./styles.module.css";

export default function Post() {
    const { posts, setPosts, setAuthor } = usePost();
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const loadPosts = useCallback(async (pageNum: number, isInitial = false) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await getPosts({ page: pageNum, limit: 10 });

            if (isInitial) {
                setPosts(response.posts);
            } else {
                setPosts(prev => [...prev, ...response.posts]);
            }

            setHasNextPage(response.hasNextPage);
        } catch (err) {
            setError('포스트를 불러오는데 실패했습니다.');
            console.error('getPosts error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    const fetchMorePosts = useCallback(async () => {
        const nextPage = page + 1;
        await loadPosts(nextPage);
        setPage(nextPage);
    }, [page, loadPosts]);

    const { isFetching } = useInfiniteScroll({
        fetchMore: fetchMorePosts,
        hasNextPage,
        isLoading,
        threshold: 100
    });

    const handleRetry = () => {
        loadPosts(1, true);
        setPage(1);
    };

    useEffect(() => {
        loadPosts(1, true);
        getUser().then(user => setAuthor(user)).catch(err => console.error(err));
    }, []);


    if (error && posts.length === 0) {
        retry({ error, onRetry: handleRetry });
    }

    return (
        <div className={styles.post}>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}

            {isLoading && (
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>포스트를 불러오는 중...</p>
                </div>
            )}

            {isFetching && !hasNextPage && posts.length > 0 && (
                <div className={styles.endMessage}>
                    모든 포스트를 확인했습니다.
                </div>
            )}

            {error && posts.length > 0 && (
                retry({ error, onRetry: fetchMorePosts })
            )}
        </div>
    );
}

function retry({ error, onRetry }: { error: string; onRetry: () => void }) {
    return (
        <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
            <button className={styles.retryButton} onClick={onRetry}>
                다시 시도
            </button>
        </div>
    );
}