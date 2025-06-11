import { useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import { motion } from 'framer-motion';
import { addNotes, prestige } from '@/features/clicker/clickerSlice';
import { unlockAllSkins, setSkin } from '@/features/settings/settingsSlice';
import styles from '@/styles/components/AdminPanel.module.scss';
import { useState } from 'react';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    // Горячие клавиши для админ-панели
    useHotkeys('ctrl+shift+a', () => {
        dispatch(addNotes(5000));
    });

    const handleAddNotes = () => {
        dispatch(addNotes(5000));
    };

    const handleUnlockAllSkins = () => {
        dispatch(unlockAllSkins());
        dispatch(setSkin('classic'));
    };

    const handleSimulatePrestige = () => {
        dispatch(prestige());
    };

    return (
        <div className={styles.adminPanel} style={{ maxWidth: 340 }}>
            <button
                style={{ width: '100%', marginBottom: 8, background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setOpen((v) => !v)}
            >
                {open ? '▲ Адмін-панель' : '▼ Адмін-панель'}
            </button>
            {open && (
                <div>
                    <h3>Адмін-панель</h3>
                    <div className={styles.adminControls}>
                        <button onClick={handleAddNotes}>
                            +5000 нот
                        </button>
                        <button onClick={handleUnlockAllSkins}>
                            Розблокувати всі скіни
                        </button>
                        <button onClick={handleSimulatePrestige}>
                            Симулювати престиж
                        </button>
                    </div>
                    <div className={styles.hotkeys}>
                        <p>Гарячі клавіші:</p>
                        <ul>
                            <li>Ctrl + Shift + A: Додати 5000 нот</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel; 