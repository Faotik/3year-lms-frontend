import '../styles/App.css';
import Login from '../pages/Login';
import AdminPanel from "../pages/AdminPanel";
import Module from "../pages/Module";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Modules from '../pages/Modules';
import { createContext, useState } from 'react';
import Submitions from '../pages/Submitions';
import Test from '../pages/Test';
import Landing from '../pages/Landing';

//document.documentElement.setAttribute("data-theme", "dark");

function App() {
    const [user, setUser] = useState(null);

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/modules" element={<Modules />} />
                <Route path="/modules/:id" element={<Module />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/modules/assignments/:id/submitions" element={<Submitions />} />
                <Route path="/modules/tests/:id" element={<Test />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Landing />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    );
}

export default App;
