import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Container, ThemeProvider,createTheme } from '@mui/material'

import Header from './components/Header';
import HomeScreen from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthContext, AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import PostForm from './pages/PostForm';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const {kullanici} = useContext(AuthContext)
  return (
    <ThemeProvider theme={darkTheme}>
    <AuthProvider>
      <Router>
      <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={ kullanici ?<HomeScreen />:<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
