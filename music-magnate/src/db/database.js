import Dexie from 'dexie';

export const db = new Dexie('MusicMagnateDB');

db.version(1).stores({
    gameState: '++id, notes, grammys, upgrades, skins',
    settings: '++id, soundEnabled, musicEnabled, language',
});

// Инициализация начального состояния
export const initializeGameState = async () => {
    const existingState = await db.gameState.toArray();
    if (existingState.length === 0) {
        await db.gameState.add({
            notes: 5000,
            grammys: 0,
            upgrades: {
                microphone: { level: 0, cost: 100 },
                drums: { level: 0, cost: 500 },
                synthesizer: { level: 0, cost: 1000 },
                amplifier: { level: 0, cost: 2000 },
                tour: { level: 0, cost: 5000 }
            },
            skins: []
        });
    }
};

// Функции для работы с состоянием
export const saveGameState = async (state) => {
    // Сохраняем только чистый JS-объект, а не прокси
    const plainState = JSON.parse(JSON.stringify(state));
    await db.gameState.clear();
    await db.gameState.add(plainState);
};

export const loadGameState = async () => {
    const state = await db.gameState.toArray();
    return state[0] || null;
}; 