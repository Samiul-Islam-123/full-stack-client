import LandingPage from "./Pages/Public/LandingPage/LandingPage.jsx"
import { Routes, Route } from "react-router-dom"
import { createTheme } from "@mui/material/styles";
import {CssBaseline,Container, ThemeProvider} from "@mui/material"
import NavBar from "./Components/NavBar/NavBar.jsx";
import RouteController from "./Controllers/RouteController.jsx";

//custom theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff3e0"
    },
    secondary: {
      main: "#FFD700"
    }
  }
})

function App() {
  return (
    <>
      


      <ThemeProvider theme={theme}>
        <CssBaseline />

        <NavBar />
        
        <RouteController />
      </ThemeProvider>
      
   
    </>
  );
}

export default App;
