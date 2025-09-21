import {
    createContext,
    useContext,
    useState,
} from "react";
import type { TPost } from '../types/post';
import type { TUser } from '../types/user';

type State = {
    author: TUser,
    setAuthor: React.Dispatch<React.SetStateAction<TUser>>,
    posts: TPost[],
    setPosts: React.Dispatch<React.SetStateAction<TPost[]>>,
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    selectedCategory: number,
    setSelectedCategory: React.Dispatch<React.SetStateAction<number>>,
    selectedImage: string[],
    setSelectedImage: React.Dispatch<React.SetStateAction<string[]>>
    resetPostState: () => void,
};

const PostContext = createContext<State>({} as State);

export function PostProvider({ children }: { children: React.ReactNode }) {
    const [author, setAuthor] = useState<TUser>({
        id: '',
        name: '',
        nickname: '',
        profileImage: '',
        verified: false,
    });
    const [posts, setPosts] = useState<TPost[]>([]);
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<string[]>([]);

    const resetPostState = () => {
        setContent("");
        setSelectedCategory(1);
        setSelectedImage([]);
    };

    return (
        <PostContext.Provider
            value={{
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
                resetPostState
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

export const usePost = () => useContext(PostContext);

