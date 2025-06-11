import { motion } from 'framer-motion';
import styles from '@/styles/components/Button.module.scss';

const Button = ({
    children,
    onClick,
    disabled = false,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    className = ''
}) => {
    return (
        <motion.button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

export default Button; 