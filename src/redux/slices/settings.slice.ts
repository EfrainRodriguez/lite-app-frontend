import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

export interface SettingsState {
  themeMode: ThemeMode;
}

const initialState: SettingsState = {
  themeMode: 'light'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    }
  }
});

export const { setThemeMode } = settingsSlice.actions;

export default settingsSlice.reducer;
