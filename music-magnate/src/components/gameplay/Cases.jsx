import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { addNotes, openCase } from '../../features/clicker/clickerSlice';
import styles from '../../styles/components/Cases.module.scss';

const cases = [
    {
        id: 'common',
        name: 'Звичайний кейс',
        description: 'Містить від 100 до 1500 нот',
        cost: 1000,
        icon: '📦',
        rewards: [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200, 1500],
        loseChance: 0.4 // 40% шанс получить меньше стоимости
    },
    {
        id: 'rare',
        name: 'Рідкісний кейс',
        description: 'Містить від 3000 до 7000 нот',
        cost: 5000,
        icon: '🎁',
        rewards: [3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000],
        loseChance: 0.3
    },
    {
        id: 'epic',
        name: 'Епічний кейс',
        description: 'Містить від 18000 до 25000 нот',
        cost: 20000,
        icon: '💎',
        rewards: [18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000],
        loseChance: 0.2
    }
];

const Cases = () => {
    const dispatch = useDispatch();
    const { notes } = useSelector(state => state.clicker);
    const [isOpening, setIsOpening] = useState(false);
    const [result, setResult] = useState(null); // {reward, caseItem, win}

    const handleOpenCase = async (caseId) => {
        const caseItem = cases.find(c => c.id === caseId);
        if (notes < caseItem.cost || isOpening) return;
        setIsOpening(true);
        await new Promise(res => setTimeout(res, 1000));
        let reward;
        let win = true;
        if (Math.random() < caseItem.loseChance) {
            const loseRewards = caseItem.rewards.filter(r => r < caseItem.cost);
            reward = loseRewards[Math.floor(Math.random() * loseRewards.length)];
            win = false;
        } else {
            // Баланс: максимальный выигрыш — 10%, остальные — равномерно на 90%
            const rewards = caseItem.rewards;
            const maxReward = Math.max(...rewards);
            const otherRewards = rewards.filter(r => r !== maxReward);
            const rand = Math.random();
            if (rand < 0.1) {
                reward = maxReward;
            } else {
                reward = otherRewards[Math.floor(Math.random() * otherRewards.length)];
            }
            win = reward >= caseItem.cost;
        }
        dispatch(addNotes(reward - caseItem.cost));
        dispatch(openCase());
        setResult({ reward, caseItem, win });
        setIsOpening(false);
    };

    const closeResult = () => setResult(null);

    return (
        <div className={styles.cases}>
            <h2>Кейси</h2>
            <div className={styles.casesGrid}>
                {cases.map((caseItem) => (
                    <motion.div
                        key={caseItem.id}
                        className={styles.caseCard}
                        whileHover={{ scale: 1.05 }}
                        animate={isOpening ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 1 }}
                    >
                        <div className={styles.caseIcon}>{caseItem.icon}</div>
                        <h3>{caseItem.name}</h3>
                        <p>{caseItem.description}</p>
                        <div className={styles.caseCost}>
                            Вартість: {caseItem.cost} нот
                        </div>
                        <button
                            onClick={() => handleOpenCase(caseItem.id)}
                            disabled={notes < caseItem.cost || isOpening}
                        >
                            Відкрити
                        </button>
                    </motion.div>
                ))}
            </div>
            {result && (
                <div className={styles.resultModal}>
                    <div className={styles.resultContent}>
                        <h3>{result.win ? 'Вітаємо!' : 'На жаль...'}</h3>
                        <div style={{ fontSize: 48 }}>{result.caseItem.icon}</div>
                        <p>
                            {result.win
                                ? `Ви виграли ${result.reward} нот!`
                                : `Ви отримали лише ${result.reward} нот і втратили ${result.caseItem.cost - result.reward} нот.`}
                        </p>
                        <button onClick={closeResult}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cases; 