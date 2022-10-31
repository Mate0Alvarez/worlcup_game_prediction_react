import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import GamesContainer from "./components/Games/GamesContainer";
import SignInSide from "./components/Login/SignIn";
import NavBar from "./components/NavBar/NavBar";
import SignUpSide from "./components/Register/SignUp";
import QatarTheme from "./components/themes/QatarTheme";
import ProdeContext from "./context/ProdeContext";

function App() {
  return (
    <ProdeContext>
      <Router>
        <ThemeProvider theme={QatarTheme}>
          <NavBar></NavBar>
          <Routes>
            <Route
              path="/fixture"
              element={
                <GamesContainer />
              }
            />
            <Route
              path="/signin"
              element={
                <SignInSide />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUpSide />
              }
            />
            <Route
              path="*"
              element={
                <GamesContainer />
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </ProdeContext>
  );
}

export default App;
