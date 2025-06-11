import styles from '@/styles/components/Divider.module.scss';

const Divider = ({
    text,
    orientation = 'horizontal',
    className,
    variant = 'default',
}) => {
    return (
        <div
            className={`${styles.divider} ${styles[orientation]} ${styles[variant]} ${className || ''}`}
        >
            {text && <span className={styles.text}>{text}</span>}
        </div>
    );
};

export default Divider; 