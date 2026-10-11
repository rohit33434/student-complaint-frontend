import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <div className="container">
                    <Link className="navbar-brand text-light fw-bold" to="/">
                        Smart Campus
                    </Link>

                    <div>
                        <Link to="/login" className="btn btn-outline-light me-2">
                            Login
                        </Link>

                        <Link to="/register" className="btn btn-outline-light text-light">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-light py-5">
                <div className="container text-center">

                    <h1 className="display-4 fw-bold text-primary">
                        Smart Campus Helpdesk
                    </h1>

                    <p className="lead mt-3">
                        A centralized complaint management system that enables
                        students to report issues, administrators to assign
                        staff, and staff members to resolve complaints
                        efficiently.
                    </p>

                    <div className="mt-4">
                        <Link
                            to="/login"
                            className="btn btn-primary btn-lg me-3"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-outline-primary btn-lg"
                        >
                            Register
                        </Link>
                    </div>

                </div>
            </section>

            {/* Features */}
            <section className="container py-5">

                <h2 className="text-center mb-5 text-primary">
                    Features
                </h2>

                <div className="row g-4">

                    <div className="col-md-3">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <h3>📝</h3>
                                <h5>Raise Complaints</h5>
                                <p>
                                    Students can submit complaints quickly and
                                    easily.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <h3>👨‍💼</h3>
                                <h5>Assign Staff</h5>
                                <p>
                                    Administrators assign complaints to the
                                    appropriate staff members.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <h3>📊</h3>
                                <h5>Dashboard</h5>
                                <p>
                                    View complaint statistics and monitor
                                    progress in real time.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <h3>📧</h3>
                                <h5>Email Notifications</h5>
                                <p>
                                    Staff receive email notifications whenever
                                    a complaint is assigned.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            {/* How it Works */}
            <section className="bg-light py-5">

                <div className="container">

                    <h2 className="text-center text-primary mb-5">
                        How It Works
                    </h2>

                    <div className="row text-center">

                        <div className="col-md-3">
                            <h4>👨‍🎓 Student</h4>
                            <p>Create a complaint.</p>
                        </div>

                        <div className="col-md-3">
                            <h4>🛡️ Admin</h4>
                            <p>Reviews and assigns the complaint.</p>
                        </div>

                        <div className="col-md-3">
                            <h4>👨‍🔧 Staff</h4>
                            <p>Works on resolving the issue.</p>
                        </div>

                        <div className="col-md-3">
                            <h4>✅ Resolution</h4>
                            <p>Student tracks the complaint until it is resolved.</p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Footer */}
            <footer className="bg-dark text-light text-center py-4">

                <h5>Smart Campus Helpdesk</h5>

                <p className="mb-1">
                    Complaint Management System
                </p>

                <small>
                    Built with React • Spring Boot • MySQL • JWT Authentication
                </small>

            </footer>
        </>
    );
};