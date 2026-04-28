import React, { useState } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/Module.css";

export default function Module() {

    const [activeTab, setActiveTab] = useState("assignments");

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
                        {activeTab === "assignments" && (
                            <>
                                <div className="card">
                                    <div className="card-desc">
                                        <h3>Title</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, quis ipsam suscipit quam quaerat magni alias beatae, harum molestias tempora ut maiores officiis labore sunt quo reiciendis blanditiis reprehenderit repudiandae!</p>
                                    </div>
                                    <div className="card-score">Score: 100</div>
                                </div>
                                <div className="card">
                                    <div className="card-desc">
                                        <h3>Title</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, quis ipsam suscipit quam quaerat magni alias beatae, harum molestias tempora ut maiores officiis labore sunt quo reiciendis blanditiis reprehenderit repudiandae!</p>
                                    </div>
                                    <div className="card-score">Score: 100</div>
                                </div>
                                <div className="card">
                                    <div className="card-desc">
                                        <h3>Title</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, quis ipsam suscipit quam quaerat magni alias beatae, harum molestias tempora ut maiores officiis labore sunt quo reiciendis blanditiis reprehenderit repudiandae!</p>
                                    </div>
                                    {/* <div className="card-score">Score: 100</div> */}
                                    <button type="button" className="button-submition">Add submition</button>
                                </div>
                            </>
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
            </div>
        </>
    );
}