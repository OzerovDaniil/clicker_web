// Формулы для расчета стоимости улучшений
export const calculateUpgradeCost = (baseCost, level) => {
    return Math.floor(baseCost * Math.pow(1.5, level));
};

// Формулы для расчета пассивного дохода
export const calculatePassiveIncome = (upgrades) => {
    const drumsIncome = upgrades.drums.level * 1; // 1 нота в секунду за уровень
    const synthesizerIncome = upgrades.synthesizer.level * 5; // 5 нот в секунду за уровень
    return drumsIncome + synthesizerIncome;
};

// Формулы для расчета стоимости престижа
export const calculatePrestigeCost = (grammys) => {
    return 10000 * Math.pow(1.2, grammys);
};

// Формулы для расчета бонусов
export const calculateBonusMultiplier = (activeBonuses) => {
    let multiplier = 1;
    if (activeBonuses.amplifier) multiplier *= 2;
    if (activeBonuses.tour) multiplier *= 5;
    return multiplier;
};

// Формулы для расчета стоимости скинов
export const calculateSkinCost = (skinId, grammys) => {
    const baseCosts = {
        rock: 5,
        pop: 10,
        jazz: 15,
        classical: 20
    };
    return baseCosts[skinId] * (grammys + 1);
};

// Формулы для расчета времени действия бонусов
export const calculateBonusDuration = (bonusType) => {
    const durations = {
        amplifier: 30000, // 30 секунд
        tour: 10 // 10 кликов
    };
    return durations[bonusType];
}; 