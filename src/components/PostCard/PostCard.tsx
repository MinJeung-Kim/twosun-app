import type { TPost } from '../../types/post';
import Avatar from '../common/Avatar/Avatar';
import styles from "./styles.module.css";

type Props = {
    post: TPost;
}

export default function PostCard({ post }: Props) {
    const { categoryName, content, author, images, likes, retweets, comments } = post;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Avatar src={author.profileImage} />
                <span className={styles.nickname}>{author.nickname}</span>
            </div>

            <div className={styles.body}>
                <img className={styles.postImage} src={images[0]} alt="Post Image" />

                <div className={styles.contentWrapper}>
                    <span className={styles.nickname}>{author.nickname}</span>
                    <span className={styles.content}>{content} </span>
                    <span className={styles.timestamp}>더 보기</span>
                </div>

                <span className={styles.category}>{categoryName}</span>
            </div>

            <div className={styles.footer}>
                <button className={styles.likeButton}>Like ({likes})</button>
                <button className={styles.commentButton}>Comment ({comments})</button>
                <button className={styles.shareButton}>Retweet ({retweets})</button>
            </div>

        </div>
    );
}