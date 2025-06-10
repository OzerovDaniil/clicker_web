import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    soundOn: true,
    volume: 0.7,
    selectedSkin: 'classic',
    unlockedSkins: ['classic'],
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleSound(state) {
            state.soundOn = !state.soundOn;
        },
        setVolume(state, action) {
            state.volume = action.payload;
        },
        setSkin(state, action) {
            state.selectedSkin = action.payload;
        },
        unlockSkin(state, action) {
            if (!state.unlockedSkins.includes(action.payload)) {
                state.unlockedSkins.push(action.payload);
            }
        },
        unlockAllSkins(state) {
            state.unlockedSkins = ['classic', 'pop', 'rock', 'electronic'];
        },
    },
});

export const { toggleSound, setVolume, setSkin, unlockSkin, unlockAllSkins } = settingsSlice.actions;
export default settingsSlice.reducer; 