import { useMemo, useState, type ReactNode } from "react";
import type { TPost } from "../types/post";
import type { TUser } from "../types/user";
import { PostContext } from './PostContext';

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
    const [selectedImage, setSelectedImage] = useState<string[]>([]);

    const resetPostState = () => {
        setContent("");
        setSelectedCategory(1);
        setSelectedImage([]);
    };

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
            resetPostState,
        }),
        [author, posts, content, selectedCategory, selectedImage]
    );

    return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
