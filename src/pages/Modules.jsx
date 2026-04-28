import React, { useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/Module.css";

export default function Modules() {

    const assignments = [
        { id: 1, title: "Math Homework", desc: "Complete exercises 1-10.", score: 100 },
        { id: 2, title: "History Essay", desc: "Write 500 words on the French Revolution.", score: 96 },
        { id: 3, title: "Science Lab", desc: "Submit your findings from the plant experiment." }
    ];

    const [activeTab, setActiveTab] = useState("assignments");
    const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
    const [submissionText, setSubmissionText] = useState("");

    const handleOpenSubmission = () => {
        setIsSubmissionOpen(true)
    };

    const handleCloseSubmission = () => {
        setIsSubmissionOpen(false);
        setSubmissionText("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", submissionText);
        // Add your API call logic here
        handleCloseSubmission();
    };

    return (
        <>
            <NavBar title="Modules" />
            <div className="page-container">
                <div className="module-container">
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
                        {activeTab === "assignments" && assignments.map((assignment) => (
                            <div className="card">
                                <div className="card-desc">
                                    <h3>{assignment.title}</h3>
                                    <p>{assignment.desc}</p>
                                </div>
                                {assignment.score && (
                                    <div className="card-score">Score: 100</div>
                                )}
                                {!assignment.score && (
                                    <button
                                        type="button"
                                        className="button-submition"
                                        onClick={() => handleOpenSubmission(assignment.id)}
                                    >
                                        Add submission
                                    </button>
                                )}
                            </div>
                        ))}

                        {activeTab === "tests" && (
                            <>
                                <div className="card">
                                    <div className="card-desc">
                                        <h3>Test Title</h3>
                                        <p>Test description...</p>
                                    </div>
                                    <div className="card-score">Score: 85</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {isSubmissionOpen && (
                    <div className="modal-overlay" onClick={handleCloseSubmission}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Submit Assignment</h2>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                    placeholder="Type your submission here..."
                                    required
                                />
                                <div className="modal-buttons">
                                    <button type="button" onClick={handleCloseSubmission} className="button">
                                        Cancel
                                    </button>
                                    <button type="submit" className="button-submition">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
}