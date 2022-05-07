import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';

import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';
import { Button, MenuItem } from '@mui/material';

const Header = () => {
  const { kullanici,logout } = useContext(AuthContext);

  return (
    <AppBar position="sticky" style={{ marginBottom: '2rem' }} color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters style={{ display: 'flex' }}>
          <Link style={{ color: '#fff' }} to="/">
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </Link>

          {kullanici ? (
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
              <MenuItem>
                <span style={{color:'green'}}><strong>{kullanici.kullaniciAd}</strong></span>
                  
              </MenuItem>
                <Button variant='outlined' color='error' onClick={()=> logout()}>
                  Logout
                </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
              <MenuItem>
                <Link style={{ color: '#fff' }} to="/register">
                  Register
                </Link>
              </MenuItem>
              <MenuItem>
                <Link style={{ color: '#fff' }} to="/login">
                  Login
                </Link>
              </MenuItem>
            </div>
          )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
