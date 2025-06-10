import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styles from '../../styles/components/Achievements.module.scss';

const Achievements = () => {
    const achievements = useSelector((state) => state.clicker.achievements);

    const formatNumber = (num) => {
        if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
        return num.toFixed(0);
    };

    return (
        <motion.div
            className={styles.achievements}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Досягнення</h2>
            <div className={styles.achievementsGrid}>
                {achievements.map((achievement, index) => (
                    <motion.div
                        key={achievement.id}
                        className={`${styles.achievementCard} ${achievement.unlocked ? styles.unlocked : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className={styles.icon}>
                            {achievement.icon}
                        </div>
                        <div className={styles.content}>
                            <h3>{achievement.name}</h3>
                            <p>{achievement.description}</p>
                            {achievement.progress && (
                                <div className={styles.progress}>
                                    <div
                                        className={styles.progressBar}
                                        style={{ width: `${(achievement.current / achievement.target) * 100}%` }}
                                    />
                                    <span className={styles.progressText}>
                                        {formatNumber(achievement.current)} / {formatNumber(achievement.target)}
                                    </span>
                                </div>
                            )}
                        </div>
                        {achievement.unlocked && (
                            <div className={styles.reward}>
                                +{formatNumber(achievement.reward)} ₴
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Achievements; 