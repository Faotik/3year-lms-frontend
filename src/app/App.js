import '../styles/App.css';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Login from '../pages/Login';
import AdminDashboard from "../pages/AdminDashboard";
import Module from "../pages/Module";
import { Route, Routes } from 'react-router-dom';

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
        <>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/about" element={<Module />} /> */}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/module/:id" element={<Module />} />
                <Route path="/admin-dashboard" element=
                    {
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <AdminDashboard />
                        </ThemeProvider>
                    } />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    );
}

export default App;
