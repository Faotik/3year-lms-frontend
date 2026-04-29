import '../styles/App.css';
import Login from '../pages/Login';
import AdminPanel from "../pages/AdminPanel";
import Module from "../pages/Module";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Modules from '../pages/Modules';
import { createContext, useState } from 'react';
import Submitions from '../pages/Submitions';

//document.documentElement.setAttribute("data-theme", "dark");

function App() {
    const [user, setUser] = useState(null);

    return (
        <>
            <Routes>
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/modules" element={<Modules />} />
                <Route path="/modules/:id" element={<Module />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/modules/assignments/:id/submitions" element={<Submitions />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
