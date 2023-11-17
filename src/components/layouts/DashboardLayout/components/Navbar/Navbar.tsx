import { useState } from 'react';
import { Box, AppBar, Hidden, Toolbar, IconButton } from '@mui/material';
import {
  Menu,
  Brightness4,
  BrightnessHigh,
  PowerSettingsNew
} from '@mui/icons-material';
import { alpha, experimentalStyled as styled } from '@mui/material/styles';

import { logout } from '@/redux/slices/auth.slice';
import { setThemeMode } from '@/redux/slices/settings.slice';
import { useCustomDispatch, useCustomSelector } from '@/redux/store';
import { LAYOUT } from '@/utils/constants';
import Modal from '@/components/Modal';

import { useCallback } from 'react';

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

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.5),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${LAYOUT.DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: LAYOUT.APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: LAYOUT.APPBAR_DESKTOP,
    padding: theme.spacing(0, 3)
  }
}));

// ----------------------------------------------------------------------

interface DashboardNavbarProps {
  onOpenSidebar: () => void;
}

const DashboardNavbar = ({ onOpenSidebar }: DashboardNavbarProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { themeMode, toggleMode } = useSettings();

  const dispatch = useCustomDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleExit = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <RootStyle>
      <Modal
        open={openModal}
        title="Deseas salir del sistema?"
        okButtonText="Salir"
        onOk={handleLogout}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
      />
      <ToolbarStyle>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Box px={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleMode}>
            {themeMode === 'light' ? <Brightness4 /> : <BrightnessHigh />}
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={handleExit}>
            <PowerSettingsNew />
          </IconButton>
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
