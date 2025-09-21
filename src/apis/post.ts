import { mockPosts } from '../data/posts';
import type { TPost } from '../types/post';

type Params = {
    page?: number;
    limit?: number;
}

type Response = {
    posts: TPost[];
    hasNextPage: boolean;
    totalCount: number;
}

const dbName = 'PostsDB';
const version = 1;
const storeName = 'posts';

const openDB = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, { keyPath: 'id' });
                store.createIndex('createdAt', 'createdAt', { unique: false });
            }
        };
    });
}

const getPostsFromIndexedDB = async (): Promise<TPost[]> => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const posts = request.result as TPost[];
                resolve(posts);
            };
        });
    } catch (error) {
        console.error('IndexedDB에서 포스트 가져오기 실패:', error);
        return [];
    }
};


export const getPosts = async ({ page = 1, limit = 10 }: Params): Promise<Response> => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));


        const indexedDBPosts = await getPostsFromIndexedDB();
        const allPosts = [...indexedDBPosts, ...mockPosts];

        const sortedPosts = allPosts.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const posts = sortedPosts.slice(startIndex, endIndex) as TPost[];

        return {
            posts,
            hasNextPage: endIndex < sortedPosts.length,
            totalCount: sortedPosts.length
        };
    } catch (err) {
        console.error("getPosts error:", err);
        return {
            posts: [],
            hasNextPage: false,
            totalCount: 0
        };
    }
}

export const createPost = async (data: TPost): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(data);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}
