// Константы для улучшений
export const UPGRADES = {
    MICROPHONE: {
        id: 'microphone',
        name: 'Мікрофон',
        description: 'Додає +1 ноту за клік',
        baseCost: 100,
        icon: '🎤'
    },
    DRUMS: {
        id: 'drums',
        name: 'Барабани',
        description: 'Автоматично генерує 1 ноту в секунду',
        baseCost: 500,
        icon: '🥁'
    },
    SYNTHESIZER: {
        id: 'synthesizer',
        name: 'Синтезатор',
        description: 'Пасивний дохід 5 нот в секунду',
        baseCost: 1000,
        icon: '🎹'
    },
    AMPLIFIER: {
        id: 'amplifier',
        name: 'Підсилювач',
        description: 'x2 дохід на 30 секунд',
        baseCost: 2000,
        icon: '🔊'
    },
    TOUR: {
        id: 'tour',
        name: 'Тур',
        description: 'x5 дохід на 10 кліків',
        baseCost: 5000,
        icon: '🎸'
    }
};

// Константы для скинов
export const SKINS = {
    ROCK: {
        id: 'rock',
        name: 'Рок',
        description: 'Рок-стиль інтерфейсу',
        icon: '🤘'
    },
    POP: {
        id: 'pop',
        name: 'Поп',
        description: 'Поп-стиль інтерфейсу',
        icon: '🎵'
    },
    JAZZ: {
        id: 'jazz',
        name: 'Джаз',
        description: 'Джаз-стиль інтерфейсу',
        icon: '🎷'
    },
    CLASSICAL: {
        id: 'classical',
        name: 'Класика',
        description: 'Класичний стиль інтерфейсу',
        icon: '🎻'
    }
};

// Константы для звуков
export const SOUNDS = {
    BEAT: '/sounds/beat.mp3',
    BONUS: '/sounds/bonus.mp3',
    ANTIBONUS: '/sounds/antibonus.mp3'
};

// Константы для автосохранения
export const AUTOSAVE_INTERVAL = 30000; // 30 секунд

// Константы для престижа
export const PRESTIGE_THRESHOLD = 10000; // Минимальное количество нот для престижа

// Константы для бонусов
export const BONUS_DURATIONS = {
    AMPLIFIER: 30000, // 30 секунд
    TOUR: 10 // 10 кликов
}; 