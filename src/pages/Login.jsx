import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorEmail("");
        setErrorPassword("");

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            console.log(response);

            if (response.ok) {
                navigate("/modules");
            } else {
                setErrorPassword("Incorrect login credentials.");
                console.log("1");
            }
        } catch (e) {
            setErrorPassword("Unable to connect to the server. Please try again later.");
        }
    };

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </label>
                    {errorEmail && <p className="error-message">{errorEmail}</p>}

                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </label>
                    {errorPassword && <p className="error-message">{errorPassword}</p>}

                    <button type="submit">Sign In</button>

                    <p className="no-account-note">
                        If you don't know or remember your password contact IT specialist of your organization.
                    </p>
                </form>
            </div>
        </>
    );
}