import '../styles/App.css';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
//import Login from '../pages/Login';
//import AdminDashboard from "../pages/AdminDashboard";
import Module from "../pages/Module";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
    },
    background: {
      default: "#0b0b0b",
      paper: "#151515",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#b8b8b8",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Segoe UI', sans-serif",
  },
});

//document.documentElement.setAttribute("data-theme", "dark");

function App() {
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <AdminPage />
    // </ThemeProvider>

    //<Login />

    <Module />
  );
}

export default App;
