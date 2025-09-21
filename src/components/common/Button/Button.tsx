import type { MouseEvent, ReactNode } from 'react';
import styles from "./styles.module.css";

type Props = {
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

export default function Button({ children, onClick, disabled = false }: Props) {
    return (
        <button
            className={styles.commonBtn}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
}