import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/Module.css";
import { useNavigate, useParams } from "react-router-dom";
import getSubmission from "../services/getSubmission";
import checkAuth from "../services/checkAuth";

export default function Submissions() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [submissions, setsubmissions] = useState([]);

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/login");
        }

        fetchsubmissions();
    }, []);

    const fetchsubmissions = async () => {
        const response = await getSubmission(id);

        if (response.ok) {
            const data = await response.json();
            setsubmissions(data);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <NavBar title="Submissions" />
            <div className="page-container">
                <div className="module-container">
                    <div className="list">
                        {submissions.length > 0 ? (
                            submissions.map((submission) => (
                                <div className="card" key={submission._id}>
                                    <div className="card-desc">
                                        <h3>{submission.studentId.name}</h3>
                                        <p><strong>Submitted on:</strong> {formatDate(submission.createdAt)}</p>
                                        <hr />
                                        <p className="submission-content">{submission.content}</p>
                                    </div>
                                    <div className="card-score">
                                        Status: Submitted
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No submissions found for this assignment.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}