import { useState, useRef, useEffect } from 'react';
import type { TCategory } from '../../../types/category';
import { usePost } from '../../../context/PostContext';
import styles from "./styles.module.css";

type Props = {
    options: TCategory[];
    onChange?: (category: TCategory | null) => void;
    disabled?: boolean;
}

export default function SelectBox({
    options,
    onChange,
    disabled = false
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedCategory, setSelectedCategory } = usePost();
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (category: TCategory) => {
        setSelectedCategory(category.id);
        setIsOpen(false);
        onChange?.(category);
    };

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(!isOpen);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div
            className={styles.selectBox}
            ref={selectRef}
            data-open={isOpen}
            data-disabled={disabled}
        >
            <button
                className={`${styles.button} ${isOpen ? styles.buttonOpen : ''}`}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-expanded={isOpen}
            >
                <span className={styles.label}>
                    {options.find(option => option.id === selectedCategory)?.name}
                </span>
            </button>

            <div
                className={`${styles.options} ${isOpen ? styles.open : ''}`}
            >
                {options.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleSelect(category)}
                        className={styles.option}
                        data-selected={selectedCategory === category.id}
                        aria-selected={selectedCategory === category.id}
                    >
                        <span>{category.name}</span>
                        {selectedCategory === category.id && (
                            <span className={styles.checkmark}>✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}