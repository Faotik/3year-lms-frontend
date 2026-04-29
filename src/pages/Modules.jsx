import React, { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/Modules.css";
import { useNavigate } from "react-router-dom";
import getModules from "../services/getModules";
import checkAuth from "../services/checkAuth";

export default function Modules() {
    const navigate = useNavigate();

    const [modules, setModules] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/login");
        }

        const func = async () => {
            const response = await getModules();

            if (response.ok) {
                const data = await response.json();
                setModules(data);
            }
            else {
                setError("Unable to connect to the server. Please try again later.");
            }
        };
        func();
    }, []);

    return (
        <>
            <NavBar title="Modules" />
            <div className="modules-page-container">
                <div className="modules-list">
                    {modules.map((module) => (
                        <div className="modules-card" key={module._id} onClick={() => navigate(`/modules/${module._id}`)}>
                            <h3>{module.title}</h3>
                            <p>{module.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}