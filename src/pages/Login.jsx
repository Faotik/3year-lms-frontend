import React, { useState } from "react";
import "../styles/Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
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