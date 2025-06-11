import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Stats.module.scss';

const Stats = () => {
    const {
        totalClicks,
        totalEarnings,
        totalSpent,
        prestigeLevel,
        totalPrestigeEarnings,
        totalUpgrades,
        totalCasesOpened,
        totalSkinsUnlocked,
        playTime
    } = useSelector((state) => state.clicker.stats);

    const formatNumber = (num) => {
        if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
        return num.toFixed(0);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const stats = [
        { label: 'Загальна кількість кліків', value: formatNumber(totalClicks) },
        { label: 'Загальний заробіток', value: `${formatNumber(totalEarnings)} ₴` },
        { label: 'Загальні витрати', value: `${formatNumber(totalSpent)} ₴` },
        { label: 'Рівень престижу', value: prestigeLevel },
        { label: 'Зароблено за престиж', value: `${formatNumber(totalPrestigeEarnings)} ₴` },
        { label: 'Куплено покращень', value: totalUpgrades },
        { label: 'Відкрито кейсів', value: totalCasesOpened },
        { label: 'Розблоковано скінів', value: totalSkinsUnlocked },
        { label: 'Час гри', value: formatTime(playTime) }
    ];

    return (
        <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Статистика</h2>
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className={styles.statCard}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <span className={styles.label}>{stat.label}</span>
                        <span className={styles.value}>{stat.value}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Stats; 