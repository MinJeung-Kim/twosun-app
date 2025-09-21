import { useState, type SyntheticEvent } from 'react';
import ArrowBack from '../common/icons/ArrowBack';
import fallbackImg from '@/assets/fallback.jpg';
import styles from "./styles.module.css";

type Props = {
    images: string[];
}

export default function Carousel({ images }: Props) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const getFallbackSrc = () =>
        typeof fallbackImg === 'string' ? fallbackImg : (fallbackImg as { src: string }).src;

    const onErrorImg = (e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = getFallbackSrc();
    };

    if (images.length === 0) return (
        <div className={styles.carousel}>
            <img
                className={styles.carouselImage}
                src={getFallbackSrc()}
                alt="No image available"
            />
        </div>
    );

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return <div className={styles.carousel}>
        <img
            className={styles.carouselImage}
            src={images[currentIndex]}
            alt={`Post Image ${currentIndex + 1}`}
            onError={onErrorImg}
        />

        {images.length > 1 && (
            <>
                <button
                    onClick={prevImage}
                    className={styles.leftButton}
                >
                    <ArrowBack />
                </button>
                <button
                    onClick={nextImage}
                    className={styles.rightButton}
                >
                    <ArrowBack />
                </button>

                <div className={styles.carouselIndicator}>
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={styles.carouselIndicatorButton}
                        />
                    ))}
                </div>

                <div className={styles.carouselCounter}>
                    {currentIndex + 1}/{images.length}
                </div>
            </>
        )}
    </div>;
}