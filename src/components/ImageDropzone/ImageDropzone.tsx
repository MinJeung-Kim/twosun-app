import { useCallback, useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import PreviewModal from '../PreviewModal/PreviewModal';
import { usePost } from '../../context/PostContext';
import Button from '../common/Button/Button';
import styles from "./styles.module.css";


export type TImageItem = {
    file: File;
    url: string;
    name: string;
    size: number;
    type: string;
}

const fileToDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.onerror = reject;
        fr.readAsDataURL(file);
    });


export default function ImageDropzone() {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const zoneRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<TImageItem[]>([]);
    const { items, setItems, previewIndex, setPreviewIndex, setSelectedImage } = usePost();

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (items.length === 0) {
                setSelectedImage([]);
                return;
            }
            try {
                const dataUrls = await Promise.all(items.map(i => fileToDataURL(i.file)));
                if (!cancelled) setSelectedImage(dataUrls);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => { cancelled = true; };
    }, [items, setSelectedImage]);

    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    const handleFiles = useCallback((fileList?: FileList | null): void => {
        setError("");
        const files = Array.from(fileList ?? []);
        const imageFiles = files.filter((f) => f.type.startsWith("image/"));

        if (imageFiles.length === 0) {
            setError("이미지 파일만 업로드할 수 있어요.");
            return;
        }

        const availableSlots = 4 - items.length;
        const filesToAdd = imageFiles.slice(0, availableSlots);

        if (imageFiles.length > availableSlots) {
            const excludedCount = imageFiles.length - availableSlots;
            setError(`최대 4장의 이미지만 업로드할 수 있습니다. ${excludedCount}개의 이미지가 제외되었습니다.`);
        }

        const next: TImageItem[] = filesToAdd.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type,
        }));

        setItems((prev) => [...prev, ...next]);
    }, [items.length]);

    useEffect(() => {
        return () => {
            itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url));
        };
    }, []);

    const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    }, [isDragging]);

    const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const current = zoneRef.current;
        const related = (e.relatedTarget as Node | null) ?? null;
        if (current && (!related || !current.contains(related))) {
            setIsDragging(false);
        }
    }, []);

    const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const dt = e.dataTransfer;
        if (dt?.files?.length) {
            handleFiles(dt.files);
        }
    }, [handleFiles]);

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        e.target.value = "";
    }, [handleFiles]);

    const openFilePicker = useCallback((): void => {
        inputRef.current?.click();
    }, []);

    const removeItem = (idx: number) => {
        setItems((prev) => {
            const copy = [...prev];
            const [removed] = copy.splice(idx, 1);
            if (removed) URL.revokeObjectURL(removed.url);
            return copy;
        });
        setPreviewIndex((p) => (p === idx ? null : p !== null && p > idx ? p - 1 : p));
    };

    const reSetPreview = () => {
        setItems((prev) => {
            prev.forEach((i) => URL.revokeObjectURL(i.url));
            return [] as TImageItem[];
        });
        setSelectedImage([]);
        setPreviewIndex(null);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (previewIndex === null) return;
            if (e.key === "Escape") setPreviewIndex(null);
            if (e.key === "ArrowRight") setPreviewIndex((i) => (i === null ? i : Math.min(i + 1, items.length - 1)));
            if (e.key === "ArrowLeft") setPreviewIndex((i) => (i === null ? i : Math.max(i - 1, 0)));
        };
        window.addEventListener("keydown", onKey as unknown as EventListener);
        return () => window.removeEventListener("keydown", onKey as unknown as EventListener);
    }, [previewIndex, items.length]);

    const hasItems = items.length > 0;

    return (
        <div className={styles.container}>
            <p className={styles.helper}>영역에 이미지를 드래그하거나, 클릭해서 선택하세요. 썸네일을 클릭하면 큰 미리보기가 열립니다.</p>

            <div
                ref={zoneRef}
                className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={openFilePicker}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => ((e as unknown as React.KeyboardEvent<HTMLDivElement>).key === "Enter" || (e as unknown as React.KeyboardEvent<HTMLDivElement>).key === " ") && openFilePicker()}
                aria-label="이미지 업로드 영역"
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className={styles.hiddenInput}
                    onChange={onChangeInput}
                />
                <div className={styles.dropzoneText}>
                    <div className={styles.dropzoneTitle}>여기에 이미지를 드롭하거나 클릭해서 선택</div>
                    <div className={styles.dropzoneCaption}>PNG, JPG, GIF 등 이미지 파일을 지원합니다.</div>
                </div>
            </div>

            {error && (
                <div className={styles.error}>{error}</div>
            )}

            {hasItems && (
                <div className={styles.gallery}>
                    <div className={styles.toolbar}>
                        <div className={styles.count}>총 {items.length}개</div>
                        <Button onClick={reSetPreview}>
                            모두 비우기
                        </Button>
                    </div>

                    <ul className={styles.grid}>
                        {items.map((it, idx) => (
                            <li key={it.url} className={styles.item}>
                                <button
                                    className={styles.itemButton}
                                    onClick={() => setPreviewIndex(idx)}
                                    title={it.name}
                                >
                                    <img
                                        src={it.url}
                                        alt={it.name}
                                        className={styles.itemImg}
                                        loading="lazy"
                                    />
                                </button>
                                <div className={styles.itemFooter}>
                                    <span className={styles.itemName} title={it.name}>{it.name}</span>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); removeItem(idx); }}
                                    >
                                        삭제
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {previewIndex !== null && items[previewIndex] && (
                <PreviewModal items={items}
                    previewIndex={previewIndex}
                    setPreviewIndex={setPreviewIndex} />
            )}
        </div>
    );
}
