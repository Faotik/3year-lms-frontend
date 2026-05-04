import React, { useContext, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import login from "../services/login";
import { UserContext } from "../app/App";
import getUser from "../services/getUser";

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
            const loginResponse = await login(email, password);

            if (loginResponse.ok) {
                const userResponse = await getUser();

                if (userResponse.ok) {
                    const data = await userResponse.json();

                    localStorage.setItem("user", JSON.stringify(data));
                    navigate("/dashboard");
                }
                else {
                    setErrorPassword("Unable to connect to the server. Please try again later.");
                }
            } else {
                setErrorPassword("Incorrect login credentials.");
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
                            required
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
                            required
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