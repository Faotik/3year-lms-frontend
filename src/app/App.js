import '../styles/App.css';
import Login from '../pages/Login';
import AdminPanel from "../pages/AdminPanel";
import Module from "../pages/Module";
import { Route, Routes } from 'react-router-dom';

//document.documentElement.setAttribute("data-theme", "dark");

function App() {
    return (
        <>
            <Routes>
                {/*<Route path="/" element={<Navigate to="/dashboard" replace />} />*/}
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/login" element={<Login />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                {/* <Route path="/modules" element={<Modules />} /> */}
                {/*<Route path="/dashboard" element={<Dashboard/>} />*/}
                <Route path="/modules" element={<Module />} />
                <Route path="/modules/:id" element={<Module />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    );
}

export default App;
