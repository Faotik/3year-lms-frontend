import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import "../styles/Module.css";

export default function Module() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("assignments");

    const [module, setModule] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadModule() {
            try {
                const [modRes, assignRes] = await Promise.all([
                    fetch(`/api/modules/${id}`, { credentials: "include" }),
                    fetch(`/api/modules/${id}/assignments`, { credentials: "include" }),
                ]);

                if (!modRes.ok) {
                    setError("Module not found or access denied.");
                    return;
                }

                setModule(await modRes.json());
                if (assignRes.ok) setAssignments(await assignRes.json());
            } catch (err) {
                console.error(err);
                setError("Failed to load module. Please refresh.");
            }
        }

        loadModule();
    }, [id]);

    function formatDeadline(dateStr) {
        return new Date(dateStr).toLocaleDateString("en-IE", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <>
            <NavBar />
            <div className="page-container">
                <div className="module-container">

                    {error && <p className="error-message">{error}</p>}

                    {module && (
                        <div className="module-header">
                            <h2>{module.title}</h2>
                            {module.description && <p>{module.description}</p>}
                        </div>
                    )}

                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === "assignments" ? "active" : ""}`}
                            onClick={() => setActiveTab("assignments")}
                        >
                            Assignments
                        </button>
                        <button
                            className={`tab ${activeTab === "tests" ? "active" : ""}`}
                            onClick={() => setActiveTab("tests")}
                        >
                            Tests
                        </button>
                    </div>

                    <div className="list">

                        {activeTab === "assignments" && (
                            <>
                                {assignments.length === 0 && (
                                    <p className="empty-note">No assignments for this module yet.</p>
                                )}
                                {assignments.map((assignment) => (
                                    <div key={assignment._id} className="card">
                                        <div className="card-desc">
                                            <h3>{assignment.title}</h3>
                                            {assignment.description && <p>{assignment.description}</p>}
                                            <p className="card-deadline">
                                                Due: {formatDeadline(assignment.deadline)}
                                            </p>
                                        </div>
                                        <button type="button" className="button-submition">
                                            Add submission
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}

                        {activeTab === "tests" && (
                            <p className="empty-note">Tests coming soon.</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
