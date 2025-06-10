// Форматирование чисел
export const formatNumber = (number) => {
    if (number >= 1000000) {
        return `${(number / 1000000).toFixed(1)}M`;
    }
    if (number >= 1000) {
        return `${(number / 1000).toFixed(1)}K`;
    }
    return number.toString();
};

// Форматирование времени
export const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Проверка доступности престижа
export const canPrestige = (notes, grammys) => {
    const threshold = 10000 * Math.pow(1.2, grammys);
    return notes >= threshold;
};

// Проверка доступности улучшения
export const canAffordUpgrade = (notes, upgradeCost) => {
    return notes >= upgradeCost;
};

// Проверка доступности скина
export const canAffordSkin = (grammys, skinCost) => {
    return grammys >= skinCost;
};

// Генерация случайного числа в диапазоне
export const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Проверка поддержки IndexedDB
export const isIndexedDBSupported = () => {
    return 'indexedDB' in window;
};

// Проверка поддержки Web Audio API
export const isWebAudioSupported = () => {
    return 'AudioContext' in window || 'webkitAudioContext' in window;
};

// Проверка поддержки localStorage
export const isLocalStorageSupported = () => {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
}; 