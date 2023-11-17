import React from 'react';
import {
  Box,
  Card,
  Button,
  Typography,
  IconButton,
  type Theme,
  CardContent,
  useMediaQuery
} from '@mui/material';
import { Add } from '@mui/icons-material';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  hasButton?: boolean;
  buttonLabel?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Header = ({
  title = '',
  subtitle = '',
  buttonLabel = 'Crear',
  hasButton = false,
  children = null,
  onClick = () => {}
}: HeaderProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const handleClick = () => {
    onClick();
  };

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {(title !== '' || subtitle !== '') && (
            <Box pr={3}>
              <Typography variant="h5">{title}</Typography>
              <Typography variant={isMobile ? 'caption' : 'body2'}>
                {subtitle}
              </Typography>
            </Box>
          )}
          {isMobile && hasButton && (
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.main
                }
              }}
              onClick={handleClick}
            >
              <Add />
            </IconButton>
          )}
          {!isMobile && hasButton && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleClick}
            >
              {buttonLabel}
            </Button>
          )}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

export default Header;
