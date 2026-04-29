import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/Module.css";
import { useNavigate, useParams } from "react-router-dom";
import getSubmission from "../services/getSubmission";

export default function Submitions() {
    const { id } = useParams();
    const [submitions, setSubmitions] = useState([]);

    useEffect(() => {
        fetchSubmitions();
    }, []);

    const fetchSubmitions = async () => {
        const response = await getSubmission(id);

        if (response.ok) {
            const data = await response.json();
            setSubmitions(data);
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
                        {submitions.length > 0 ? (
                            submitions.map((submition) => (
                                <div className="card" key={submition._id}>
                                    <div className="card-desc">
                                        <h3>{submition.studentId.name}</h3>
                                        <p><strong>Submitted on:</strong> {formatDate(submition.createdAt)}</p>
                                        <hr />
                                        <p className="submission-content">{submition.content}</p>
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