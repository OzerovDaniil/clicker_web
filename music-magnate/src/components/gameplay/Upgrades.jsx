import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { purchaseUpgrade, activateBonus, deactivateBonus, BASE_UPGRADE_LIMITS } from '@/features/clicker/clickerSlice';
import styles from '@/styles/components/Upgrades.module.scss';

const upgrades = [
    {
        id: 'microphone',
        name: 'Мікрофон',
        description: 'Додає +1 ноту за клік',
        icon: '🎤'
    },
    {
        id: 'drums',
        name: 'Барабани',
        description: 'Автоматично генерує 1 ноту в секунду',
        icon: '🥁'
    },
    {
        id: 'synthesizer',
        name: 'Синтезатор',
        description: 'Пасивний дохід 5 нот в секунду',
        icon: '🎹'
    },
    {
        id: 'amplifier',
        name: 'Підсилювач',
        description: 'x2 дохід на 30 секунд',
        icon: '🔊'
    },
    {
        id: 'tour',
        name: 'Тур',
        description: 'x5 дохід на 10 кліків',
        icon: '🎸'
    }
];

const Upgrades = () => {
    const dispatch = useDispatch();
    const { notes, upgrades: gameUpgrades, activeBonuses } = useSelector(state => state.clicker);
    const grammys = useSelector(state => state.clicker.grammys);

    const handlePurchase = (upgradeId) => {
        dispatch(purchaseUpgrade({ upgradeType: upgradeId }));
    };

    const handleActivateBonus = (bonusId) => {
        dispatch(activateBonus({ bonusType: bonusId }));
    };

    useEffect(() => {
        let timer;
        if (activeBonuses.amplifier) {
            timer = setTimeout(() => {
                dispatch(deactivateBonus({ bonusType: 'amplifier' }));
            }, 30000);
        }
        return () => clearTimeout(timer);
    }, [activeBonuses.amplifier, dispatch]);

    return (
        <div className={styles.upgrades}>
            <h2>Покращення</h2>
            <div className={styles.upgradesGrid}>
                {upgrades.map((upgrade) => {
                    const maxLevel = BASE_UPGRADE_LIMITS[upgrade.id] * Math.max(1, Math.pow(2, grammys));
                    const currentLevel = gameUpgrades[upgrade.id].level;
                    const isMax = currentLevel >= maxLevel;
                    return (
                        <motion.div
                            key={upgrade.id}
                            className={styles.upgradeCard}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={styles.upgradeIcon}>{upgrade.icon}</div>
                            <h3>{upgrade.name}</h3>
                            <p>{upgrade.description}</p>
                            <div>Рівень: {currentLevel} / {maxLevel}</div>
                            {isMax && (
                                <div style={{ color: '#e74c3c', fontWeight: 500, margin: '0.5rem 0' }}>
                                    Досягнуто максимуму! Отримайте ще одну Греммі, щоб підвищити ліміт.
                                </div>
                            )}
                            <div className={styles.upgradeStats}>
                                <span>Вартість: {gameUpgrades[upgrade.id].cost} нот</span>
                                <button
                                    onClick={() => handlePurchase(upgrade.id)}
                                    disabled={notes < gameUpgrades[upgrade.id].cost || isMax}
                                >
                                    Купити
                                </button>
                            </div>
                            {upgrade.id === 'microphone' && (
                                <div style={{ fontSize: '0.85rem', color: '#888' }}>
                                    Кожна Греммі подвоює максимальний рівень!
                                </div>
                            )}
                            {(upgrade.id === 'amplifier' || upgrade.id === 'tour') && (
                                <button
                                    onClick={() => handleActivateBonus(upgrade.id)}
                                    className={styles.activateButton}
                                >
                                    Активувати
                                </button>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Upgrades; 