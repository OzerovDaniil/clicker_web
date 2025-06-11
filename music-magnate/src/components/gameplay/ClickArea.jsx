import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addNotes, updateLastClickTime, startPenalty, stopPenalty, penaltyTick } from '@/features/clicker/clickerSlice';
import useSound from 'use-sound';
import styles from '@/styles/components/ClickArea.module.scss';
import { useEffect } from 'react';

const ClickArea = () => {
    const dispatch = useDispatch();
    const { notes, upgrades, activeBonuses, isPenaltyActive } = useSelector(state => state.clicker);
    const soundOn = useSelector(state => state.settings.soundOn);
    const volume = useSelector(state => state.settings.volume);
    const microphoneLevel = upgrades.microphone.level;
    const drumsLevel = upgrades.drums.level;
    const synthLevel = upgrades.synthesizer.level;
    const ampLevel = upgrades.amplifier.level;
    const tourLevel = upgrades.tour.level;

    const [playBeat] = useSound('/sounds/beat.mp3', { volume, soundEnabled: soundOn });
    const [playBonus] = useSound('/sounds/bonus.mp3', { volume, soundEnabled: soundOn });

    const calculateClickValue = () => {
        let value = 1 + upgrades.microphone.level;
        if (activeBonuses.amplifier) value *= 2;
        if (activeBonuses.tour) value *= 5;
        return value;
    };

    const handleClick = () => {
        const clickValue = calculateClickValue();
        dispatch(addNotes(clickValue));
        dispatch(updateLastClickTime());
        dispatch(stopPenalty());
        if (soundOn) playBeat();
        if (soundOn && (activeBonuses.amplifier || activeBonuses.tour)) {
            playBonus();
        }
    };

    // Динамический таймер до штрафа
    const baseTimeout = 15;
    const penaltyTimeoutSec = baseTimeout
        + drumsLevel * 3
        + synthLevel * 5
        + microphoneLevel * 2
        + ampLevel * 7
        + tourLevel * 9;

    useEffect(() => {
        let penaltyTimeout;
        let penaltyInterval;
        const resetPenalty = () => {
            clearTimeout(penaltyTimeout);
            clearInterval(penaltyInterval);
        };
        // Сброс при каждом клике
        document.addEventListener('click', resetPenalty);
        // Штраф начинается через penaltyTimeoutSec секунд бездействия
        penaltyTimeout = setTimeout(() => {
            dispatch(startPenalty());
        }, penaltyTimeoutSec * 1000);
        if (isPenaltyActive) {
            const penaltyValue = Math.max(1, Math.floor(microphoneLevel / 2));
            const penaltyIntervalSec = Math.max(1, 3 - Math.floor(microphoneLevel / 2));
            penaltyInterval = setInterval(() => {
                for (let i = 0; i < penaltyValue; i++) {
                    dispatch(penaltyTick());
                }
            }, penaltyIntervalSec * 1000);
        }
        return () => {
            clearTimeout(penaltyTimeout);
            clearInterval(penaltyInterval);
            document.removeEventListener('click', resetPenalty);
        };
    }, [isPenaltyActive, microphoneLevel, drumsLevel, synthLevel, ampLevel, tourLevel, penaltyTimeoutSec, dispatch]);

    useEffect(() => {
        window.lastClickTime = Date.now();
        dispatch(stopPenalty());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            let autoNotes = 0;
            if (upgrades.drums.level > 0) {
                autoNotes += upgrades.drums.level * 1; // 1 нота в сек за уровень
            }
            if (upgrades.synthesizer.level > 0) {
                autoNotes += upgrades.synthesizer.level * 5; // 5 нот в сек за уровень
            }
            if (autoNotes > 0) {
                dispatch(addNotes(autoNotes));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [upgrades.drums.level, upgrades.synthesizer.level, dispatch]);

    return (
        <motion.div
            className={styles.clickArea}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.button
                onClick={handleClick}
                className={styles.clickButton}
                animate={{
                    boxShadow: [
                        '0 0 0 rgba(52, 152, 219, 0.4)',
                        '0 0 20px rgba(52, 152, 219, 0.6)',
                        '0 0 0 rgba(52, 152, 219, 0.4)'
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <span className={styles.clickText}>Створити хіт</span>
                <div className={styles.clickValue}>+{calculateClickValue()} нот</div>
            </motion.button>
            {isPenaltyActive && (
                <div className={styles.bonus} style={{ color: '#e74c3c', marginTop: 16 }}>
                    Ви втрачаєте популярність! Клікайте, щоб зупинити штраф (-{Math.max(1, Math.floor(microphoneLevel / 2))} нот/{Math.max(1, 3 - Math.floor(microphoneLevel / 2))} сек)
                </div>
            )}
            <div className={styles.stats}>
                <p>Загалом нот: {notes}</p>
                {activeBonuses.amplifier && <p className={styles.bonus}>x2 Доходу!</p>}
                {activeBonuses.tour && <p className={styles.bonus}>x5 Доходу!</p>}
            </div>
        </motion.div>
    );
};

export default ClickArea; 