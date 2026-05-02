import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import books from "../assets/books.jpg";
import campus from "../assets/campus.jpg";
import lecture from "../assets/lecture.jpg";
import module from "../assets/module.jpg";
import assignment from "../assets/assignment.jpg";
import dashboard from "../assets/dashboard.jpg";

const SLIDES = [
    { src: campus, alt: "Campus building" },
    { src: lecture, alt: "Students in lecture" },
    { src: books, alt: "Library" },
];

const STATS = [
    { value: "1,200+", label: "Registered students" },
    { value: "48", label: "Active modules this term" },
    { value: "30+", label: "Lecturers and staff" },
    { value: "98%", label: "Assignment submission rate" },
];

const FEATURES = [
    {
        title: "Module overview",
        description: "See all your enrolled modules, assignments, and deadlines in one dashboard.",
        image: module,
    },
    {
        title: "Assignment tracking",
        description: "Never miss a deadline. Assignments are sorted by due date across all your modules.",
        image: assignment,
    },
    {
        title: "Admin dashboard",
        description: "Lecturers and admins can register users, manage modules, and track progress.",
        image: dashboard,
    },
];

export default function Landing() {
    const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        if (SLIDES.length < 2) return;
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="lp-wrapper">

            {/* NAV  */}
            <nav className="lp-nav">
                <div className="lp-logo">Learn<span>Lite</span></div>
                <ul className="lp-nav-links">
                    <li><a href="#features">Modules</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="lp-nav-right">
                    <button className="btn-ghost" onClick={() => navigate("/login")}>Log in</button>
                </div>
            </nav>

            {/*  HERO  */}
            <section className="lp-hero">
                {SLIDES.map((slide, i) => (
                    <img
                        key={i}
                        src={slide.src}
                        alt={slide.alt}
                        className={`lp-slide ${i === slideIndex ? "lp-slide-active" : ""}`}
                    />
                ))}

                <div className="lp-hero-overlay" />

                <div className="lp-hero-content">
                    <h1>Your learning, organised.</h1>
                    <p>Access your modules, track assignments, and stay on top of deadlines — all in one place.</p>
                    <div className="lp-hero-btns">
                        <button className="hero-btn-primary" onClick={() => navigate("/login")}>
                            Get started
                        </button>
                        <button className="hero-btn-secondary" onClick={() => {
                            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                        }}>
                            Learn more
                        </button>
                    </div>
                </div>

                <div className="lp-slide-dots">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`lp-dot ${i === slideIndex ? "lp-dot-active" : ""}`}
                            onClick={() => setSlideIndex(i)}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/*  STATS  */}
            <section className="lp-stats">
                {STATS.map((s) => (
                    <div key={s.label} className="lp-stat-item">
                        <div className="lp-stat-num">{s.value}</div>
                        <div className="lp-stat-label">{s.label}</div>
                    </div>
                ))}
            </section>

            {/*  ABOUT  */}
            <section className="lp-about" id="about">
                <h2>Built for students, by students</h2>
                <p>
                    LearnLite is a lightweight learning management system designed to keep everything simple.
                    No clutter, no confusion — just your modules and what needs doing.
                </p>
            </section>

            {/*  FEATURE CARDS  */}
            <section className="lp-features" id="features">
                <h2>Everything you need</h2>
                <div className="lp-cards">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="lp-card">
                            <img src={f.image} alt={f.title} className="lp-card-img" />
                            <div className="lp-card-body">
                                <h3>{f.title}</h3>
                                <p>{f.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/*  CTA BANNER  */}
            <section className="lp-cta">
                <h2>Ready to get started?</h2>
                <p>Log in with your student or staff account to access your modules.</p>
                <button className="hero-btn-primary" onClick={() => navigate("/login")}>
                    Log in now
                </button>
            </section>

            {/*  FOOTER  */}
            <footer className="lp-footer" id="contact">
                <div className="lp-footer-grid">
                    <div className="footer-brand">
                        <h3>Nametemplate</h3>
                        <p>A lightweight LMS for students and staff. Built as a final-year group project.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <a href="#about">About</a>
                        <a href="#features">Modules</a>
                        <span onClick={() => navigate("/login")}>Log in</span>
                    </div>
                    <div className="footer-col">
                        <h4>Contact us</h4>
                        <p>info@nametemplate.ie</p>
                        <p>+353 1 234 5678</p>
                        <p>Dublin, Ireland</p>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <a href="#">Privacy policy</a>
                        <a href="#">Terms of use</a>
                        <a href="#">Accessibility</a>
                    </div>
                </div>
                <div className="lp-footer-bottom">
                    <p>© 2026 Nametemplate. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
