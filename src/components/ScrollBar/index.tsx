import React from 'react';
import SimpleBarReact from 'simplebar-react';
// material
import { type SxProps } from '@mui/material';
import { alpha, experimentalStyled as styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  }
}));

// ----------------------------------------------------------------------

interface ScrollbarProps {
  children: React.ReactNode;
  sx?: SxProps;
}

const Scrollbar = ({ children, sx, ...other }: ScrollbarProps) => (
  <RootStyle>
    <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  </RootStyle>
);

export default Scrollbar;
