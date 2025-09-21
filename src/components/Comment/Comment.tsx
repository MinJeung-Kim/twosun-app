import { usePost } from '../../context/PostContext';
import type { TComment } from '../../types/post';
import { timeAgo } from '../../utils/formatter';
import Avatar from '../common/Avatar/Avatar';
import LikeIcon from '../common/icons/LikeIcon';
import styles from "./styles.module.css";

type Props = {
    commentList: TComment[];
}

export default function Comment({ commentList }: Props) {
    const { author } = usePost();

    return (
        <div className={styles.commentsSection}>
            <div className={styles.commentInput}>
                <Avatar src={author.profileImage} />
                <input
                    type="text"
                    placeholder="댓글을 입력하세요..."
                    className={styles.commentInputField}
                />
            </div>

            <div className={styles.commentsList}>
                {commentList.length > 0 && commentList.map((comment, index) => (
                    <div className={styles.commentItem} key={index}>
                        <Avatar src={comment.author.profileImage} />
                        <div className={styles.commentContent}>
                            <div className={styles.commentHeader}>
                                <div>
                                    <span className={styles.commentAuthor}>{comment.author.nickname}</span>
                                    <span className={styles.commentTime}>{timeAgo(comment.createdAt)}</span>
                                </div>
                                <span className={styles.commentText}>{comment.content}</span>
                            </div>
                            <div className={styles.likeSection}>
                                <LikeIcon />{comment.likes}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}