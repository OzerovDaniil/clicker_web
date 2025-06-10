import { motion } from 'framer-motion';
import styles from '../../styles/components/Loading.module.scss';

const Loading = ({ size = 'medium', color = 'primary' }) => {
    return (
        <div className={`${styles.loading} ${styles[size]} ${styles[color]}`}>
            <motion.div
                className={styles.spinner}
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            >
                <div className={styles.inner} />
            </motion.div>
        </div>
    );
};

export default Loading; 