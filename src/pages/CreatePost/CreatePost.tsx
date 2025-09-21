import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import type { TCategory } from '../../types/category';
import { usePost } from '../../context/PostContext';
import { getCategories } from '../../apis/category';
import { createPost } from '../../apis/post';
import type { TPost } from '../../types/post';
import SelectBox from '../../components/common/SelectBox/SelectBox';
import ImageDropzone from '../../components/ImageDropzone/ImageDropzone';
import Button from '../../components/common/Button/Button';
import styles from "./styles.module.css";


export default function CreatePost() {
    const [categories, setCategories] = useState<TCategory[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const { author, content, setContent, selectedImage, selectedCategory, resetPostState } = usePost();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        const categoryName =
            categories.find((cat) => cat.id === selectedCategory)?.name ?? "기타";

        const postData = {
            id: Date.now(),
            author,
            likes: 0,
            isLiked: false,
            content: content.trim(),
            category: selectedCategory,
            images: selectedImage,
            createdAt: new Date().toISOString(),
            categoryName,
            retweets: 0,
            comments: 0,
            isRetweeted: false,
            hasMoreComments: false,
            commentList: [] as TPost["commentList"],
        }
        createPost(postData).then(() => {
            alert("포스트가 성공적으로 생성되었습니다.");
            resetPostState();
        }).catch(err => {
            console.error("createPost error:", err);
            alert("포스트 생성에 실패했습니다. 다시 시도해주세요.");
        });
    };

    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        autoResizeTextarea();
    };

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    return (
        <div className={styles.createPost}>
            <ImageDropzone />
            <div className={styles.controls}>
                <div className={styles.charCount}>{content.length}/280</div>
                <SelectBox options={categories} />
            </div>
            <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={content}
                onChange={handleTextareaChange}
                placeholder="캡션 추가..."
                rows={1}
                maxLength={280}
            />
            <Button onClick={handleSubmit}>공유</Button>
        </div>
    );
}