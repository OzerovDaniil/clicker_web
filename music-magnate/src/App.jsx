import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { initializeGameState } from './db/database';
import ClickArea from './components/gameplay/ClickArea';
import Upgrades from './components/gameplay/Upgrades';
import Cases from './components/gameplay/Cases';
import Prestige from './components/gameplay/Prestige';
import Skins from './components/gameplay/Skins';
import AdminPanel from './components/admin/AdminPanel';
import SettingsModal from './components/ui/SettingsModal';
import './styles/main.scss';
import { useSelector } from 'react-redux';

function App() {
    useEffect(() => {
        initializeGameState();
    }, []);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const selectedSkin = useSelector(state => state.settings.selectedSkin);

    const handleSave = () => {
        alert('Прогрес збережено!');
    };

    return (
        <Provider store={store}>
            <div className={`app theme-${selectedSkin}`}>
                <header className="header">
                    <h1>Музичний Магнат</h1>
                    <button onClick={() => setSettingsOpen(true)} style={{ marginLeft: 16, fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }} title="Налаштування">⚙️</button>
                </header>

                <main className="main">
                    <ClickArea />
                    <Upgrades />
                    <Cases />
                    <Prestige />
                    <Skins />
                    {process.env.NODE_ENV === 'development' && <AdminPanel />}
                </main>
                <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} onSave={handleSave} />
            </div>
        </Provider>
    );
}

export default App; 