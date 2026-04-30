import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Test.css";
import getTest from "../services/getTest";
import submitTest from "../services/submitTest";
import checkAuth from "../services/checkAuth";

export default function Test() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if (!checkAuth()) {
            navigate("/login");
        }

        const func = async () => {
            const res = await getTest(id);
            if (res.ok) setTest(await res.json());
        };
        func();
    }, []);

    const handleOptionChange = (index, option) => {
        setAnswers({ ...answers, [index]: option });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const answersArray = [];
        for (const key in answers) {
            answersArray.push({
                questionNumber: parseInt(key),
                answer: answers[key]
            });
        }

        const response = await submitTest(id, { answers: answersArray });
        navigate(-1);
    };

    if (!test) return <p>Loading test...</p>;

    return (
        <div className="page-container">
            <div className="test-container">
                <h1>{test.title}</h1>
                <p>{test.description}</p>
                <form onSubmit={handleSubmit}>
                    {test.questions.map((question, index) => (
                        <div key={question._id} className="test-question-card">
                            <p><strong>{index + 1}. {question.question}</strong></p>
                            <div className="options">
                                {question.options.map(option => (
                                    <label key={option} className="option-label">
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option}
                                            required
                                            onChange={() => handleOptionChange(index, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="button-submition">Submit Test</button>
                </form>
            </div >
        </div >
    );
}