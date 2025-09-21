import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { TPost } from "../types/post";
import type { TUser } from "../types/user";
import type { TImageItem } from '../components/ImageDropzone/ImageDropzone';

export type State = {
    author: TUser;
    setAuthor: Dispatch<SetStateAction<TUser>>;
    posts: TPost[];
    setPosts: Dispatch<SetStateAction<TPost[]>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    selectedCategory: number;
    setSelectedCategory: Dispatch<SetStateAction<number>>;
    selectedImage: string[];
    setSelectedImage: Dispatch<SetStateAction<string[]>>;
    items: TImageItem[];
    setItems: Dispatch<SetStateAction<TImageItem[]>>;
    previewIndex: number | null;
    setPreviewIndex: Dispatch<SetStateAction<number | null>>;
    resetPostState: () => void;
};

export const PostContext = createContext<State | undefined>(undefined);

export function usePost(): State {
    const ctx = useContext(PostContext);
    if (!ctx) throw new Error("usePost는 반드시 <PostProvider> 안에서 사용해야 합니다.");
    return ctx;
}
