import React from 'react';
import {
  Alert,
  Container,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Switch,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AddCircle, ArrowCircleLeft } from '@mui/icons-material';

export default function NavBar(props) {
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const location = useLocation()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  function handleClick() {
    if (location.pathname === '/') {
      navigate('/createHabit')
    } else {
      navigate('/')
    }
  }

  return (
    <Container sx={{ mb: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar >
            {currentUser ? (
              <>
                <Typography variant='h4' component='div' sx={{ mr: 2 }}>
                  Habit Tracker
                </Typography>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={handleClick}
                >
                  {location.pathname === '/' ? (
                    <AddCircle />
                  ) : (
                    <ArrowCircleLeft />
                  )}
                </IconButton>
                <Typography sx={{ flexGrow: 1 }} />
                <Typography>{currentUser.email}</Typography>
                <Typography sx={{ ml: 1 }}>Switch to {props.isDarkMode ? 'light' : 'dark'} theme:</Typography>
                <Switch onChange={props.toggleTheme} color='default'/>
                <Button onClick={handleLogout} color='inherit'>Logout</Button>
              </>
            ) : (
              <>
                <Typography
                  variant='h4'
                  component='div'
                  sx={{ mr: 2, flexGrow: 1 }}
                >
                  Habit Tracker
                </Typography>
                <Button color='inherit' onClick={() => navigate('/login')}>Log In</Button>
                <Button color='inherit' onClick={() => navigate('/signUp')}>Sing Up</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {error && (
        <Alert severity='error' sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}
