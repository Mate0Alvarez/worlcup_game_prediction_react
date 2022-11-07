import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import GamesContainer from "./components/Games/GamesContainer";
import SignInSide from "./components/Login/SignIn";
import NavBar from "./components/NavBar/NavBar";
import PositionsComponent from "./components/Positions/PositionsComponent";
import UnloggedRoute from "./components/ProtectedRoutes/UnloggedRoute";
import SignUpSide from "./components/Register/SignUp";
import RulesComponent from "./components/RulesComponent/RulesComponent";
import QatarTheme from "./components/themes/QatarTheme";
import ProdeContext from "./context/ProdeContext";

function App() {
  return (
    <ProdeContext>
      <Router>
        <ThemeProvider theme={QatarTheme}>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<GamesContainer />} />
            <Route path="/fixture" element={<GamesContainer />} />
            <Route path="/positions" element={<PositionsComponent />} />
            <Route path="/rules" element={<RulesComponent />} />
            <Route
              path="/signin"
              element={
                <UnloggedRoute component={SignInSide} />
              }
            />
            <Route
              path="/signup"
              element={
                <UnloggedRoute component={SignUpSide} />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </Router>
    </ProdeContext>
  );
}

export default App;
