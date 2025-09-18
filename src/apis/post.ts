import type { TPost } from '../types/post';
import { formatData } from '../utils/api-format';

export const getPosts = async (): Promise<TPost[]> => {
    try {
        const res = await fetch('https://file.notion.so/f/f/48571aef-a7ee-81f4-a537-0003c0c9fb8a/cf08e815-707d-423e-900d-9cc66696c029/mockPosts.ts?table=block&id=26a71aef-a7ee-8083-b5ed-c0817d6c03ec&spaceId=48571aef-a7ee-81f4-a537-0003c0c9fb8a&expirationTimestamp=1758218400000&signature=R0ixRaPF7B_cMCRb2s6wtnkuUasKqSbYsBWHZotYgIQ&downloadName=mockPosts.ts');

        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        const data = await formatData(res);
        return data;

    } catch (err) {
        console.error("getPosts error:", err);
        return [];
    }
}