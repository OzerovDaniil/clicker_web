import { motion } from 'framer-motion';
import styles from '../../styles/components/Grid.module.scss';

const Grid = ({
    items,
    renderItem,
    className,
    columns = 3,
    gap = '1rem',
    animated = true,
}) => {
    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <motion.div
            className={`${styles.grid} ${className || ''}`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap,
            }}
            variants={animated ? gridVariants : {}}
            initial="hidden"
            animate="visible"
        >
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className={styles.item}
                    variants={animated ? itemVariants : {}}
                >
                    {renderItem ? renderItem(item, index) : item}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Grid; 