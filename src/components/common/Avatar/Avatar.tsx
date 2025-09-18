import styles from "./styles.module.css";

type Props = {
    src: string;
}

export default function Avatar({ src }: Props) {
    return <img className={styles.avatar} src={src} alt="User Avatar" />;
}