import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import QatarTheme from './components/themes/QatarTheme';
import NavBar from './components/NavBar/NavBar';
import GamesContainer from './components/Games/GamesContainer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInSide from './components/Login/singIn';

function App() {
  return (
    <Router>
      <ThemeProvider theme={QatarTheme}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/games" element={<GamesContainer /> }/>
          <Route path="*" element={<SignInSide />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
