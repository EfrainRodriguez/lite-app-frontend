import { useEffect } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useCustomDispatch, useCustomSelector } from '@/redux/store';
import { useLoginMutation } from '@/redux/services/auth.service';
import { setAccessToken } from '@/redux/slices/auth.slice';
import LoginForm from './components/LoginForm';
import {
  StyledBox,
  StyledCard,
  StyledTitle
} from './components/styledComponents';
import { LoginFormDto } from './components/LoginForm/dtos/loginFormDto';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const { accessToken } = useCustomSelector((state) => state.auth);

  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: LoginFormDto) => {
    login(values)
      .unwrap()
      .then((response) => {
        dispatch(setAccessToken(response.accessToken));
      })
      .catch(() => {
        // ...
      });
  };

  useEffect(() => {
    if (accessToken !== null) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate]);

  return (
    <Container maxWidth="xs">
      <StyledBox>
        <StyledCard>
          <StyledTitle variant="h1">Login</StyledTitle>
          <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
        </StyledCard>
      </StyledBox>
    </Container>
  );
};

export default Login;
