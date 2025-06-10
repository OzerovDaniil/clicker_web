import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { prestige } from '../../features/clicker/clickerSlice';
import styles from '../../styles/components/Prestige.module.scss';

const Prestige = () => {
    const dispatch = useDispatch();
    const { notes, grammys, prestigeCost } = useSelector(state => state.clicker);

    const handlePrestige = () => {
        if (notes >= prestigeCost) {
            dispatch(prestige());
        }
    };

    return (
        <motion.div
            className={styles.prestige}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Престиж</h2>
            <div className={styles.prestigeInfo}>
                <div className={styles.grammyCount}>
                    <span className={styles.grammyIcon}>🏆</span>
                    <span>Греммі: {grammys}</span>
                </div>
                <p className={styles.prestigeDescription}>
                    Досягніть {prestigeCost} нот для престижу та отримання Греммі
                </p>
                <button
                    onClick={handlePrestige}
                    disabled={notes < prestigeCost}
                    className={styles.prestigeButton}
                >
                    Престиж (вартість: {prestigeCost} нот)
                </button>
            </div>
        </motion.div>
    );
};

export default Prestige; 