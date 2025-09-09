import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const [message, setMessage] = useState(location.state?.message || "");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem("chatbot_username", username);
            navigate("/chatbot");
        }
    }, [isAuthenticated, navigate, username]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                navigate(location.pathname, { replace: true });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate, location.pathname]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1920&q=80')",
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

            <div className="relative z-10 flex w-full max-w-6xl items-center justify-between px-12">
                <div className="hidden md:flex flex-col text-white max-w-lg">
                    <h1 className="text-5xl font-extrabold leading-tight mb-4">
                        AI <span className="text-blue-400">Chatbot</span>
                    </h1>
                    <p className="text-lg text-gray-200">
                        Plan your journeys smarter with our travel chatbot.
                        Get instant trip ideas, flight info, and{" "}
                        {!showMore ? (
                            <span
                                onClick={() => setShowMore(true)}
                                className="text-blue-400 cursor-pointer hover:underline"
                            >
                                more
                            </span>
                        ) : (
                            <>
                                <span className="text-gray-300">
                                    personalized recommendations, travel hacks, and local insights
                                    to make every trip unforgettable.
                                </span>{" "}
                                <span
                                    onClick={() => setShowMore(false)}
                                    className="text-blue-400 cursor-pointer hover:underline"
                                >
                                    less
                                </span>
                            </>
                        )}
                    </p>
                </div>

                <div className="w-full max-w-md p-10 bg-white/90 rounded-3xl shadow-2xl backdrop-blur-md">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800">
                        Travel Chatbot ✈️
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Sign in to continue your journey
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div className="relative">
                            <FiUser className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-12 py-3 rounded-xl border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <FiMail className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-12 py-3 rounded-xl border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-12 py-3 rounded-xl border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {message && <p className="text-green-600 text-sm">{message}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 mt-2 rounded-xl font-semibold text-white text-lg shadow-lg transition-all duration-300 ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
