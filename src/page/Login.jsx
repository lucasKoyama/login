import React from 'react';
import {TextField, Button, Box, createTheme, ThemeProvider} from '@mui/material';
import validator from 'validator';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './Login.css';

const theme = createTheme();

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: false,
    capsLockOn: false,
  };

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value});
    this.validationInput();
  };

  validationInput = () => {
    const { email } = this.state;
    this.setState({error: !(validator.isEmail(email) || email.length === 0)});
  }

  // Detect Caps Lock
  detectCapsPress = (event) => {
    const { capsLockOn } = this.state;
    const capsLockState = event.getModifierState('CapsLock');
    this.setState({capsLockOn: capsLockState && !capsLockOn});
  };

  detectCapsClick = (event) => {
    const { capsLockOn } = this.state;
    const capsLockState = event.getModifierState('CapsLock')
    this.setState({capsLockOn: (capsLockOn || capsLockState) && capsLockState});
  };

  render() {
    const { email, password, loading, error, capsLockOn } = this.state;
    return (
      <section className="login-section">
        <div className="user-login">
          <p className="title">Faça seu login</p>
          <Box sx={ { position: "relative" } }>
            <ThemeProvider theme={theme}>
              <PersonRoundedIcon />
              <TextField
                error={ error }
                helperText={ error && 'Email inválido' }
                label="Email"
                type="text"
                name="email"
                id="user-email"
                value={ email }
                onChange={ this.handleChange }
                style={ {width: '100%', marginBottom: '15px'} }
                focused={email !== ''}
                sx={{
                  '& .MuiInputLabel-root': {
                    transform: email !== '' ? 'translate(14px, -9px) scale(0.75)' : 'translate(40px, 16px)',
                    transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                  },
                }}
              />
            </ThemeProvider>
          </Box>
          <Box sx={ { position: "relative" } }>
            { password !== '' ? <LockOpenIcon/> : <LockRoundedIcon />}
            <TextField
              helperText={ capsLockOn && 'Caps lock ON!'}
              label="Senha"
              type="password"
              name="password"
              id="user-password"
              value={ password }
              onChange={ this.handleChange }
              onKeyUp={ this.detectCapsPress }
              onClick={ this.detectCapsClick }
              style={ {width: '100%', marginBottom: '15px'} }
              focused={password !== ''}
              sx={{
                '& .MuiInputLabel-root': {
                  transform: password !== '' ? 'translate(14px, -9px) scale(0.75)' : 'translate(40px, 16px)',
                  transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                },
              }}
            />
          </Box>
          <Button
            disabled={ !(validator.isEmail(email)) }
            className="login-btn"
            loading={loading}
          >
            Entrar
          </Button>
        </div>
      </section>
    );
  }
}

export default Login;
