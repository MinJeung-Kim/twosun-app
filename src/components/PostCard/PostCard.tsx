import { useState, type ReactNode } from 'react';
import type { TPost } from '../../types/post';
import { timeAgo } from '../../utils/formatter';
import Avatar from '../common/Avatar/Avatar';
import LikeIcon from '../common/icons/LikeIcon';
import TalkIcon from '../common/icons/TalkIcon';
import RepeatIcon from '../common/icons/RepeatIcon';
import LikeFillIcon from '../common/icons/LikeFillIcon';
import Repeat1Icon from '../common/icons/Repeat1Icon';
import Carousel from '../Carousel/Carousel';
import Comment from '../Comment/Comment';
import styles from "./styles.module.css";

type Props = {
    post: TPost;
}

export default function PostCard({ post }: Props) {
    const { categoryName, content, author, images, likes, retweets, comments, createdAt, isLiked, commentList } = post;
    const [isMore, setIsMore] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [isLikedState, setIsLiked] = useState(isLiked);
    const [reTweetCount, setReTweetCount] = useState(retweets);
    const [isReTweetedState, setIsReTweetedState] = useState(post.isRetweeted);

    const handleMoreClick = () => {
        setIsMore(!isMore);
    };

    const handleLikeClick = () => {
        if (isLikedState) {
            setLikeCount(likeCount - 1);
            setIsLiked(false);
        } else {
            setLikeCount(likeCount + 1);
            setIsLiked(true);
        }
    };

    const handleReTweetToggle = () => {
        if (isReTweetedState) {
            setReTweetCount(reTweetCount - 1);
            setIsReTweetedState(false);
        } else {
            setReTweetCount(reTweetCount + 1);
            setIsReTweetedState(true);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Avatar src={author.profileImage} />
                <span className={styles.nickname}>{author.nickname}</span>
            </div>

            <div className={styles.body}>
                <Carousel images={images} />

                <div className={`${styles.contentArea} ${isMore ? styles.expanded : ''}`}>
                    <span className={styles.nickname}>{author.nickname}</span>
                    <span className={`${styles.content} ${isMore ? styles.expanded : ''}`}>
                        {highlightHashtags(content)}
                    </span>

                    <span className={styles.moreButton} onClick={handleMoreClick}>
                        {isMore ? '간단히 보기' : '더 보기'}
                    </span>
                </div>

                <span className={styles.category}>{categoryName}</span>
                <span className={styles.timeAgo}>{timeAgo(createdAt)}</span>
            </div>

            <div className={styles.footer}>
                <button
                    className={`${styles.likeButton} ${isLikedState ? styles.liked : ''}`}
                    onClick={handleLikeClick}>
                    {isLikedState ? <LikeFillIcon /> : <LikeIcon />}
                    {likeCount}
                </button>
                <button className={styles.commentButton}><TalkIcon /> {comments}</button>
                <button
                    className={`${styles.shareButton} ${isReTweetedState ? styles.retweeted : ''}`}
                    onClick={handleReTweetToggle}>
                    {isReTweetedState ? <Repeat1Icon /> : <RepeatIcon />} {reTweetCount}
                </button>
            </div>

            <Comment commentList={commentList} />

        </div>
    );
}

function highlightHashtags(text: string) {
    const regex = /#\S+/g;
    const parts = text.split(regex);
    const matches = text.match(regex);

    if (!matches) return text;

    const result: ReactNode[] = [];
    parts.forEach((part, i) => {
        result.push(part);
        if (matches[i]) {
            result.push(
                <span key={i} style={{ color: "blue" }}>
                    {matches[i]}
                </span>
            );
        }
    });

    return result;
}