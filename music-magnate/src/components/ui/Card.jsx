import { motion } from 'framer-motion';
import styles from '@/styles/components/Card.module.scss';

const Card = ({
    title,
    subtitle,
    icon,
    children,
    onClick,
    className,
    variant = 'default',
    hoverable = false,
}) => {
    const cardVariants = {
        initial: { scale: 1 },
        hover: hoverable ? { scale: 1.02 } : {},
    };

    return (
        <motion.div
            className={`${styles.card} ${styles[variant]} ${hoverable ? styles.hoverable : ''} ${className || ''}`}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            onClick={onClick}
        >
            {(title || subtitle || icon) && (
                <div className={styles.header}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <div className={styles.titleContainer}>
                        {title && <h3 className={styles.title}>{title}</h3>}
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </motion.div>
    );
};

export default Card; 