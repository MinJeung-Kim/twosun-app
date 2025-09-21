
import { mockCategories } from '../data/categories';
import type { TCategory } from '../types/category';

export const getCategories = async (): Promise<TCategory[]> => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return mockCategories;

    } catch (err) {
        console.error("getCategories error:", err);
        return [];
    }
}