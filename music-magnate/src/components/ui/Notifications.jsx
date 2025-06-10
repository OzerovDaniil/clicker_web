import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/components/Notifications.module.scss';

const Notifications = () => {
    const notifications = useSelector((state) => state.clicker.notifications);

    return (
        <div className={styles.notifications}>
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        className={`${styles.notification} ${styles[notification.type]}`}
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        <div className={styles.icon}>
                            {notification.type === 'success' && '✓'}
                            {notification.type === 'error' && '✕'}
                            {notification.type === 'info' && 'ℹ'}
                            {notification.type === 'warning' && '⚠'}
                        </div>
                        <div className={styles.content}>
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Notifications; 