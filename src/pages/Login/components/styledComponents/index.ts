import { Card, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  height: '100vh'
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(5, 4),
  borderRadius: theme.shape.borderRadius * 2
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontSize: theme.typography.h5.fontSize
}));
