import { currentUser } from '../data/user';
import type { TUser } from '../types/user';

export const getUser = async (): Promise<TUser> => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return currentUser;

    } catch (err) {
        console.error("getUser error:", err);
        return { id: '', name: '', nickname: '', profileImage: '', verified: false };
    }
}