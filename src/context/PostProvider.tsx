import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { TPost } from "../types/post";
import type { TUser } from "../types/user";
import { PostContext } from './PostContext';
import type { TImageItem } from '../components/ImageDropzone/ImageDropzone';

export function PostProvider({ children }: { children: ReactNode }) {
    const [author, setAuthor] = useState<TUser>({
        id: "",
        name: "",
        nickname: "",
        profileImage: "",
        verified: false,
    });
    const [posts, setPosts] = useState<TPost[]>([]);
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [items, setItems] = useState<TImageItem[]>([]);
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string[]>([]);

    const resetPostState = useCallback(() => {
        setContent("");
        setSelectedCategory(1);
        setSelectedImage([]);
        setItems([]);
        setPreviewIndex(null);
    }, [setContent, setSelectedCategory, setSelectedImage, setItems, setPreviewIndex]);

    const value = useMemo(
        () => ({
            author,
            setAuthor,
            posts,
            setPosts,
            content,
            setContent,
            selectedCategory,
            setSelectedCategory,
            selectedImage,
            setSelectedImage,
            items,
            setItems,
            previewIndex,
            setPreviewIndex,
            resetPostState,
        }),
        [author, posts, content, selectedCategory, selectedImage, items,
            setItems,
            previewIndex,
            setPreviewIndex,
            resetPostState,]
    );

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
