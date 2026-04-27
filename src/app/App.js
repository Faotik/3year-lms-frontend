import '../styles/App.css';
import Login from '../pages/Login';
import AdminDashboard from "../pages/AdminDashboard";
import Module from "../pages/Module";
import { Route, Routes } from 'react-router-dom';

//document.documentElement.setAttribute("data-theme", "dark");

function App() {
    return (
        <>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                {/* <Route path="/modules" element={<Modules />} /> */}
                <Route path="/modules/:id" element={<Module />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    );
}

export default App;
