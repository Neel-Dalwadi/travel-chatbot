import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import { resetChat } from "../features/chat/chatSlice";

const ChatbotPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    const handleLogout = async () => {
        try {
            const result = await dispatch(logout()).unwrap();
            dispatch(resetChat());
            navigate("/login", { state: { message: result?.message || "Logout successful" } });
        } catch (err) {
            dispatch(resetChat());
            navigate("/login", { state: { message: err || "Logout failed" } });
        }
    };
    const username = user?.name
        ? user.name.split("@")[0].charAt(0).toUpperCase() +
        user.name.split("@")[0].slice(1)
        : "User";
    const startNewChat = () => {
        const newChat = { id: Date.now(), messages: [] };
        setChats([newChat, ...chats]);
        setActiveChat(newChat);
        setSidebarOpen(false);
    };


    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
            <div>
                <aside
                    className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full p-4">
                        <h2 className="flex text-2xl mb-4 text-blue-600">Chats</h2>
                        <button
                            onClick={startNewChat}
                            className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium"
                        >
                            + New Chat
                        </button>
                        <div className="flex-grow overflow-y-auto">
                            {chats.length === 0 && <p className="text-gray-400 text-sm">No chats yet</p>}
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setActiveChat(chat)}
                                    className={`p-2 mb-2 rounded cursor-pointer ${activeChat?.id === chat.id
                                        ? "bg-blue-100 font-semibold"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    Chat {chat.id}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`fixed top-4 z-30 w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white rounded-full shadow-lg transition-all duration-300
                            ${sidebarOpen ? "left-[260px]" : "left-4"
                    }`}
            >
                ☰
            </button>
            {/* Main Chat Content */}
            <div className="flex items-center justify-between  text-black px-6 py-4">
                <div className="flex items-center justify-end gap-5 ml-auto">
                    <div className="w-10 h-10 flex items-center justify-center bg-white text-black font-bold rounded-full shadow-md">
                        {user?.name ? user.name.split("@")[0][0].toUpperCase() : "U"}
                    </div>
                    <h2 className="text-lg font-medium">
                        Welcome, <span className="font-semibold">{username}</span>
                    </h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 hover:cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
                    >
                        Logout
                    </button>
                </div>

            </div>

            <main className="flex-grow flex justify-center items-center p-6 relative overflow-hidden">
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center text-center bg-white backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-md animate-fadeIn">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-6"></div>
                        <h3 className="text-lg font-semibold text-gray-700 animate-pulse">
                            Connecting to your Travel Chatbot…
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">Please wait a moment</p>
                    </div>
                ) : (
                    <div className="w-full max-w-4xl h-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200 animate-fadeIn">
                        <ChatWindow chat={activeChat} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default ChatbotPage;
