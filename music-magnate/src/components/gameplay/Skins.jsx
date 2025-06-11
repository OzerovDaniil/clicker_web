import { useDispatch, useSelector } from 'react-redux';
import { setSkin } from '@/features/settings/settingsSlice';
import styles from '@/styles/components/Skins.module.scss';

const skins = [
    { id: 'classic', name: 'Класичний', icon: '🎼', unlock: () => true, unlockText: '' },
    { id: 'pop', name: 'Поп', icon: '🎤', unlock: (stats) => stats.clicks >= 100, unlockText: '100 кліків' },
    { id: 'rock', name: 'Рок', icon: '🎸', unlock: (stats) => stats.grammys >= 3, unlockText: '3 Греммі' },
    { id: 'electronic', name: 'Електроніка', icon: '🎹', unlock: (stats) => stats.casesOpened >= 10, unlockText: '10 кейсів' },
];

const Skins = () => {
    const dispatch = useDispatch();
    const selectedSkin = useSelector(state => state.settings.selectedSkin);
    const unlockedSkins = useSelector(state => state.settings.unlockedSkins);
    // Примерные статистики, заменить на реальные из Redux если есть
    const stats = useSelector(state => ({
        clicks: state.clicker.totalClicks || 0,
        grammys: state.clicker.grammys || 0,
        casesOpened: state.clicker.totalCasesOpened || 0,
    }));

    return (
        <div className={styles.skins}>
            <h2>Скіни</h2>
            <div className={styles.skinsGrid}>
                {skins.map(skin => {
                    const unlocked = skin.unlock(stats);
                    return (
                        <button
                            key={skin.id}
                            className={
                                selectedSkin === skin.id
                                    ? `${styles.skinCard} ${styles.selected}`
                                    : styles.skinCard
                            }
                            onClick={() => unlocked && dispatch(setSkin(skin.id))}
                            disabled={!unlocked}
                        >
                            <span className={styles.skinIcon}>{skin.icon}</span>
                            <span>{skin.name}</span>
                            {selectedSkin === skin.id && <span className={styles.selectedMark}>✓</span>}
                            {!unlocked && (
                                <span className={styles.unlockText}>{skin.unlockText}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Skins; 