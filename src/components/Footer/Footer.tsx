import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeIcon from '../common/icons/LikeIcon';
import PlusSquareIcon from '../common/icons/PlusSquareIcon';
import SearchIcon from '../common/icons/SearchIcon';
import UserIcon from '../common/icons/UserIcon';
import HomeIcon from '../common/icons/HomeIcon';
import styles from "./styles.module.css";

const ACTIVE_CLASS = [
    { disabled: false, label: 'Home', path: "/", icon: <HomeIcon /> },
    { disabled: true, label: 'Search', path: "/search", icon: <SearchIcon /> },
    { disabled: false, label: 'Create', path: "/create", icon: <PlusSquareIcon /> },
    { disabled: true, label: 'Likes', path: "/likes", icon: <LikeIcon /> },
    { disabled: true, label: 'Profile', path: "/profile", icon: <UserIcon /> },
];


export default function Footer() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('Home');

    const handleNavigation = (path: string, label: string) => {
        navigate(path);
        setIsActive(label);
    }

    return (
        <footer className={styles.footer}>
            {ACTIVE_CLASS.map(({ path, icon, label, disabled }) => (
                <button
                    key={path}
                    onClick={() => handleNavigation(path, label)}
                    disabled={disabled}
                    className={isActive === label ? styles.active : ''}
                >
                    {icon}
                </button>
            ))}
        </footer>
    );
}