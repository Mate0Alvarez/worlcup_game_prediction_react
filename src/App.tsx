import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import QatarTheme from './components/themes/QatarTheme';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <ThemeProvider theme={QatarTheme}>
      <NavBar></NavBar>
    </ThemeProvider>
  );
}

export default App;
