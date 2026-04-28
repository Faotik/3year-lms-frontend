import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [modules, setModules] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const meRes = await fetch("/api/auth/me", { credentials: "include" });
                if (!meRes.ok) {
                    navigate("/login");
                    return;
                }
                const sessionUser = await meRes.json();
                const [userRes, modulesRes, upcomingRes] = await Promise.all([
                    fetch(`/api/users/${sessionUser.id}`, { credentials: "include" }),
                    fetch("/api/modules", { credentials: "include" }),
                    fetch("/api/calendar/upcoming", { credentials: "include" }),
                ]);

                if (userRes.ok) setUser(await userRes.json());
                if (modulesRes.ok) setModules(await modulesRes.json());
                if (upcomingRes.ok) setUpcoming(await upcomingRes.json());
            } catch (err) {
                console.error(err);
                setError("Failed to load page. Please refresh.");
            }
        }

        loadData();
    }, [navigate]);

    function formatDeadline(dateStr) {
        const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
        if (diff <= 0) return "Overdue";
        if (diff === 1) return "Tomorrow";
        if (diff <= 7) return `In ${diff} days`;
        return new Date(dateStr).toLocaleDateString("en-IE", { month: "short", day: "numeric" });
    }

    return (
        <>
            <NavBar title={"Your Dashboard"}
                    description={"Track your task progress"}/>
            <div className="page-container">

                {error && <p className="error-message">{error}</p>}

                <div className="home-container">

                    <div className="welcome-banner">
                        <h2>Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋</h2>
                        <p>
                            {upcoming.length > 0
                                ? `You have ${upcoming.length} upcoming deadline${upcoming.length !== 1 ? "s" : ""}.`
                                : "No upcoming deadlines. Nice work!"}
                        </p>
                    </div>

                    <div className="home-grid">

                        <div className="home-section">
                            <h3>Your Modules</h3>
                            <div className="module-list">
                                {modules.length === 0 && (
                                    <p className="empty-note">No modules enrolled yet.</p>
                                )}
                                {modules.map((mod) => (
                                    <div
                                        key={mod._id}
                                        className="module-card"
                                        onClick={() => navigate(`/modules/${mod._id}`)}
                                    >
                                        <div className="module-card-info">
                                            <h4>{mod.title}</h4>
                                            <p>{mod.description || "No description."}</p>
                                        </div>
                                        <span className="module-arrow">→</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="home-section">
                            <h3>Upcoming Deadlines</h3>
                            <div className="deadline-list">
                                {upcoming.length === 0 && (
                                    <p className="empty-note">No upcoming deadlines 🎉</p>
                                )}
                                {upcoming.map((event) => (
                                    <div key={event.id} className="deadline-card">
                                        <div className="deadline-info">
                                            <h4>{event.title}</h4>
                                            {event.description && <p>{event.description}</p>}
                                        </div>
                                        <span className="deadline-date">{formatDeadline(event.deadline)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
