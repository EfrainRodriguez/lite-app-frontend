import { useCallback } from 'react';

import { setThemeMode } from '@/redux/slices/settings.slice';
import { useCustomDispatch, useCustomSelector } from '@/redux/store';

const useSettings = () => {
  const { themeMode } = useCustomSelector((state) => state.settings);
  const dispatch = useCustomDispatch();

  const handleToggleTheme = useCallback(
    () => dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light')),
    [dispatch, themeMode]
  );

  return {
    themeMode,
    toggleMode: handleToggleTheme
  };
};

export default useSettings;
