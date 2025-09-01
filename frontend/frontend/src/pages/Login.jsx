import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { FiMail, FiLock } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || "");

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/chatbot");
        }
    }, [isAuthenticated, navigate]);

    
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                navigate(location.pathname, { replace: true }); // remove state
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate, location.pathname]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900">

            <div
                className="absolute inset-0 bg-cover bg-center filter brightness-75"
                style={{ backgroundImage: "url('/images/travel_bg.jpg')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"></div>


            <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/80 rounded-xl shadow-2xl backdrop-blur-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 drop-shadow-md">
                    Welcome to Travel Chatbot
                </h2>
                <p className="text-center text-gray-600">
                    Sign in to continue your travel ai chatbot
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <FiMail className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-600 text-sm">{message}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 font-semibold text-white rounded-lg transition-all duration-300 transform ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
