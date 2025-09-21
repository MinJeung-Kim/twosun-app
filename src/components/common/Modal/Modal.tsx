import styles from "./styles.module.css";

type Props = {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Modal({ onClick, children }: Props) {

    return (
        <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            onClick={onClick}
        >
            <div
                className={styles.modalPanel}
                onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}