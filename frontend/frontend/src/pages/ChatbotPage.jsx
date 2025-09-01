// src/pages/ChatbotPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";

const ChatbotPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            const result = await dispatch(logout()).unwrap();
            navigate("/login", { state: { message: result.message } });
        } catch (err) {
            navigate("/login", { state: { message: "Logout failed" } });
        }
    };



    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
            <nav className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 font-bold rounded-full shadow-md">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <h2 className="text-lg font-medium">
                        Welcome, <span className="font-semibold">{user?.name}</span>
                    </h2>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
                >
                    Logout
                </button>
            </nav>

            <main className="flex-grow flex justify-center items-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 pointer-events-none"></div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center text-center bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-md animate-fadeIn">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-6"></div>
                        <h3 className="text-lg font-semibold text-gray-700 animate-pulse">
                            Connecting to your Travel Chatbot…
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl h-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200 animate-fadeIn">
                        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                            <ChatWindow />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ChatbotPage;
