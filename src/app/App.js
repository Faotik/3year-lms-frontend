import '../styles/App.css';
import Login from '../pages/Login';
import AdminPanel from "../pages/AdminPanel";
import Module from "../pages/Module";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Modules from '../pages/Modules';
import { createContext, useState } from 'react';

//document.documentElement.setAttribute("data-theme", "dark");

export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(null);

    return (
        <UserContext value={{ user, setUser }}>
            <Routes>
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/modules" element={<Modules />} />
                <Route path="/modules/:id" element={<Module />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </UserContext>
    );
}

export default App;
