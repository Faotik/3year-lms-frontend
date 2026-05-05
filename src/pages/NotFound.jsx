import React, { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div className="notfound-page-container">
                <p className="notfound-title">404</p>
                <p className="notfound-description">Page not found.</p>
                <Link className="notfound-link" to="/">Return</Link>
            </div>
        </>
    );
}
