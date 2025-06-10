import { createSlice } from '@reduxjs/toolkit';
import { saveGameState } from '../../db/database';

const initialState = {
    notes: 100,
    grammys: 0,
    prestigeCost: 10000,
    upgrades: {
        microphone: { level: 0, cost: 100 },
        drums: { level: 0, cost: 500 },
        synthesizer: { level: 0, cost: 1000 },
        amplifier: { level: 0, cost: 2000 },
        tour: { level: 0, cost: 5000 }
    },
    activeBonuses: {
        amplifier: false,
        tour: false
    },
    tourClicks: 0,
    lastSave: Date.now(),
    totalClicks: 0,
    totalCasesOpened: 0,
    lastClickTime: Date.now(),
    isPenaltyActive: false
};

// Базовые лимиты для апгрейдов
const BASE_UPGRADE_LIMITS = {
    microphone: 10,
    drums: 7,
    synthesizer: 5,
    amplifier: 2,
    tour: 1
};

export const clickerSlice = createSlice({
    name: 'clicker',
    initialState,
    reducers: {
        addNotes: (state, action) => {
            state.notes += action.payload;
            state.totalClicks += 1;
            if (state.activeBonuses.tour) {
                state.tourClicks += 1;
                if (state.tourClicks >= 10) {
                    state.activeBonuses.tour = false;
                    state.tourClicks = 0;
                }
            }
            saveGameState(state);
        },
        purchaseUpgrade: (state, action) => {
            const { upgradeType } = action.payload;
            const upgrade = state.upgrades[upgradeType];
            // Ограничение по уровню
            const grammys = state.grammys;
            const maxLevel = BASE_UPGRADE_LIMITS[upgradeType] * Math.max(1, Math.pow(2, grammys));
            if (upgrade.level >= maxLevel) return;
            if (state.notes >= upgrade.cost) {
                state.notes -= upgrade.cost;
                upgrade.level += 1;
                upgrade.cost = Math.floor(upgrade.cost * 1.5);
                saveGameState(state);
            }
        },
        activateBonus: (state, action) => {
            const { bonusType } = action.payload;
            state.activeBonuses[bonusType] = true;
            if (bonusType === 'tour') {
                state.tourClicks = 0;
            }
            saveGameState(state);
        },
        deactivateBonus: (state, action) => {
            const { bonusType } = action.payload;
            state.activeBonuses[bonusType] = false;
            if (bonusType === 'tour') {
                state.tourClicks = 0;
            }
            saveGameState(state);
        },
        prestige: (state) => {
            if (state.notes < state.prestigeCost) return;
            state.grammys += 1;
            state.notes = 5000;
            state.prestigeCost += 5000;
            Object.keys(state.upgrades).forEach(key => {
                state.upgrades[key] = { level: 0, cost: state.upgrades[key].cost };
            });
            saveGameState(state);
        },
        openCase: (state) => {
            state.totalCasesOpened += 1;
            saveGameState(state);
        },
        updateLastClickTime: (state) => {
            state.lastClickTime = Date.now();
            state.isPenaltyActive = false;
        },
        startPenalty: (state) => {
            state.isPenaltyActive = true;
        },
        stopPenalty: (state) => {
            state.isPenaltyActive = false;
        },
        penaltyTick: (state) => {
            if (state.notes > 0) {
                state.notes = Math.max(0, state.notes - 3);
            }
        }
    }
});

export const {
    addNotes,
    purchaseUpgrade,
    activateBonus,
    deactivateBonus,
    prestige,
    openCase,
    updateLastClickTime,
    startPenalty,
    stopPenalty,
    penaltyTick
} = clickerSlice.actions;

export { BASE_UPGRADE_LIMITS };

export default clickerSlice.reducer; 