import { useSelector, useDispatch } from 'react-redux';
import { toggleSound, setVolume } from '@/features/settings/settingsSlice';
import { store } from '@/app/store';
import styles from '@/styles/components/SettingsModal.module.scss';

const SettingsModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const soundOn = useSelector(state => state.settings.soundOn);
    const volume = useSelector(state => state.settings.volume);

    const handleSave = () => {
        // Получаем актуальное состояние и превращаем его в чистый объект
        const state = store.getState();
        const clickerState = JSON.parse(JSON.stringify(state.clicker));
        const settingsState = JSON.parse(JSON.stringify(state.settings));
        localStorage.setItem('musicMagnateSave', JSON.stringify({ clicker: clickerState, settings: settingsState }));
        alert('Прогрес збережено!');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Налаштування</h2>
                <div className={styles.settingRow}>
                    <label>
                        <input
                            type="checkbox"
                            checked={soundOn}
                            onChange={() => dispatch(toggleSound())}
                        />
                        Звук: {soundOn ? 'Увімкнено' : 'Вимкнено'}
                    </label>
                </div>
                {soundOn && (
                    <div className={styles.settingRow}>
                        <label>
                            Гучність:
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={e => dispatch(setVolume(Number(e.target.value)))}
                            />
                            {(volume * 100).toFixed(0)}%
                        </label>
                    </div>
                )}
                <div className={styles.buttons}>
                    <button onClick={handleSave}>Зберегти прогрес</button>
                    <button onClick={onClose}>Закрити</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal; 