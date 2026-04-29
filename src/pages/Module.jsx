import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/Module.css";
import { useNavigate, useParams } from "react-router-dom";
import getAssignments from "../services/getAssignments";
import getSubmission from "../services/getSubmission";
import { UserContext } from "../app/App";
import submitAssignment from "../services/submitAssignment";
import updateAssignment from "../services/updateAssignment";
import addAssignment from "../services/addAssignment";
import deleteAssignment from "../services/deleteAssignment";

export default function Module() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        updateAssignments(user);
    }, []);

    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState("");
    const [selectedAssignment, setSelectedAssignment] = useState("");
    const [activeTab, setActiveTab] = useState("assignments");

    const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
    const [submissionText, setSubmissionText] = useState("");

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState({ title: "", description: "", deadline: "" });

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createData, setCreateData] = useState({ title: "", description: "", deadline: "" });

    const updateAssignments = async () => {
        const response = await getAssignments(id);

        if (response.ok) {
            const data = await response.json();
            if (user && user.role === 'student') {
                for (let i = 0; i < data.length; i++) {
                    const responseSubmission = await getSubmission(data[i]._id);
                    if (responseSubmission.ok) {
                        const dataSubmission = await responseSubmission.json();
                        data[i] = { ...data[i], submission: dataSubmission };
                    }
                }

            }

            data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

            setAssignments(data);
        }
        else {
            setError("Unable to connect to the server. Please try again later.");
        }
    };

    const handleOpenSubmission = (id) => {
        setSelectedAssignment(id);
        setSubmissionText("");
        setIsSubmissionOpen(true)
    };

    const handleCloseSubmission = () => {
        setIsSubmissionOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        await submitAssignment(selectedAssignment, submissionText);
        await updateAssignments();

        handleCloseSubmission();
    };

    const handleOpenEdit = (assignment) => {
        setSelectedAssignment(assignment._id);

        const dateWithoutTime = assignment.deadline ? assignment.deadline.split('T')[0] : "";

        setEditData({
            title: assignment.title,
            description: assignment.description,
            deadline: dateWithoutTime
        });
        setIsEditOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await updateAssignment(selectedAssignment, editData);
        await updateAssignments();
        handleCloseEdit();
    };

    const handleOpenCreate = () => {
        setCreateData({ title: "", description: "", deadline: "" });
        setIsCreateOpen(true);
    };

    const handleCloseCreate = () => {
        setIsCreateOpen(false);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        await addAssignment({ ...createData, moduleId: id });
        await updateAssignments();
        handleCloseCreate();
    };

    const handleDeleteAssignment = async (id) => {
        await deleteAssignment(id);
        await updateAssignments();
    };

    return (
        <>
            <NavBar title="Module" />
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
                            <div className="card" key={assignment._id}>
                                <div className="card-desc">
                                    <h3>{assignment.title}</h3>
                                    <p>{assignment.description}</p>
                                    <p className="deadline-text">
                                        <strong>Due:</strong> {new Date(assignment.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                                {assignment.submission && user.role == "student" && (
                                    <div className="card-score">Already submitted</div>
                                )}
                                {!assignment.submission && user.role == "student" && (
                                    <button
                                        type="button"
                                        className="button-submition"
                                        onClick={() => handleOpenSubmission(assignment._id)}
                                    >
                                        Add submission
                                    </button>
                                )}
                                {user.role == "teacher" && (
                                    <button
                                        type="button"
                                        className="button-submition"
                                        onClick={() => handleOpenEdit(assignment)}
                                    >
                                        Edit
                                    </button>
                                )}
                                {user.role == "teacher" && (
                                    <button
                                        type="button"
                                        className="button-submition"
                                        onClick={() => handleDeleteAssignment(assignment._id)}
                                    >
                                        Delete
                                    </button>
                                )}
                                {user.role == "teacher" && (
                                    <button
                                        type="button"
                                        className="button-submition"
                                        onClick={() => navigate(`/modules/assignments/${assignment._id}/submitions`)}
                                    >
                                        View
                                    </button>
                                )}
                            </div>
                        ))}

                        {activeTab === "assignments" && assignments.length === 0 && (
                            <p>No assignments found for this module.</p>
                        )}

                        {activeTab === "assignments" && user.role === "teacher" && (
                            <button className="button-submition" onClick={handleOpenCreate}>
                                + Add New Assignment
                            </button>
                        )}

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

                {isEditOpen && (
                    <div className="modal-overlay" onClick={handleCloseEdit}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Edit Assignment</h2>
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <div className="input-group">
                                    <label>Assignment Title</label>
                                    <input
                                        type="text"
                                        value={editData.title}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea
                                        value={editData.description}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Deadline</label>
                                    <input
                                        type="date"
                                        value={editData.deadline}
                                        onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="modal-buttons">
                                    <button type="button" onClick={handleCloseEdit} className="button">
                                        Cancel
                                    </button>
                                    <button type="submit" className="button-submition">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isCreateOpen && (
                    <div className="modal-overlay" onClick={handleCloseCreate}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Create New Assignment</h2>
                            <form onSubmit={handleCreateSubmit} className="edit-form">
                                <div className="input-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={createData.title}
                                        onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea
                                        value={createData.description}
                                        onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Deadline</label>
                                    <input
                                        type="date"
                                        value={createData.deadline}
                                        onChange={(e) => setCreateData({ ...createData, deadline: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-buttons">
                                    <button type="button" onClick={handleCloseCreate} className="button">Cancel</button>
                                    <button type="submit" className="button-submition">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
}