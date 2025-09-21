import { useCallback, useEffect, useState } from 'react';

type Props = {
    fetchMore: () => Promise<void>;
    hasNextPage: boolean;
    isLoading: boolean;
    threshold?: number; // 스크롤 임계값 (픽셀 단위)
}

export default function useInfiniteScroll({
    fetchMore,
    hasNextPage,
    isLoading,
    threshold = 300
}: Props) {

    const [isFetching, setIsFetching] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - threshold) {
            if (hasNextPage && !isLoading && !isFetching) {
                setIsFetching(true);
            }
        }
    }, [hasNextPage, isLoading, isFetching, threshold]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (isFetching && hasNextPage && !isLoading) {
            fetchMore().finally(() => setIsFetching(false));
        }
    }, [isFetching, fetchMore, hasNextPage, isLoading]);

    return { isFetching };
};