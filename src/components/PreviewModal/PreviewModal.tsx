
import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';
import type { TImageItem } from '../ImageDropzone/ImageDropzone';
import styles from "./styles.module.css";

type Props = {
    items: TImageItem[];
    previewIndex: number;
    setPreviewIndex: (index: number | null) => void;
}

export default function PreviewModal({ items, previewIndex, setPreviewIndex }: Props) {

    return (
        <Modal onClick={() => setPreviewIndex(null)}>
            <img
                src={items[previewIndex].url}
                alt={items[previewIndex].name}
                className={styles.modalImg}
            />
            <div className={styles.modalBar}>
                <span className={styles.modalName} title={items[previewIndex].name}>{items[previewIndex].name}</span>
                <div className={styles.modalActions}>
                    <Button
                        onClick={() => setPreviewIndex(Math.max(0, previewIndex - 1))}
                        disabled={previewIndex === 0}
                    >
                        이전
                    </Button>
                    <Button
                        onClick={() => setPreviewIndex(Math.min(items.length - 1, previewIndex + 1))}
                        disabled={previewIndex === items.length - 1}
                    >
                        다음
                    </Button>
                    <Button
                        onClick={() => setPreviewIndex(null)}
                    >
                        닫기
                    </Button>
                </div>
            </div>
        </Modal>
    );
}