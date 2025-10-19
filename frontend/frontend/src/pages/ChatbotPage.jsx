import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { resetChat } from "../features/chat/chatSlice";
import ChatWindow from "../components/ChatWindow";
import { FiMenu, FiX } from "react-icons/fi";

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

    const username = localStorage.getItem("chatbot_username");

    const startNewChat = () => {
        const newChat = { id: Date.now(), title: `Chat ${chats.length + 1}`, messages: [] };
        setChats([newChat, ...chats]);
        setActiveChat(newChat);
        setSidebarOpen(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex h-screen w-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-gray-200 shadow-lg flex flex-col transition-transform duration-300 
                            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 ">
                    <h2 className="text-lg font-bold text-blue-700">Chats</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="flex flex-col h-full p-4">
                    <button
                        onClick={startNewChat}
                        className="w-full mb-4 bg-gradient-to-r hover:cursor-pointer from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-lg font-medium shadow-md transition"
                    >
                        + New Chat
                    </button>

                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                        {chats.length === 0 && (
                            <p className="text-gray-400 text-sm italic">No chats yet</p>
                        )}
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat)}
                                className={`p-2 mb-2 rounded-lg cursor-pointer text-sm transition 
                                                ${activeChat?.id === chat.id
                                        ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold"
                                        : "hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {chat.title}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <div
                className={`flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-0 w-full"
                    }`}
            >
                <header className="flex items-center justify-between px-6 py-3 border-b border-gray-300 bg-white/80 backdrop-blur-lg shadow-sm relative">
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="absolute left-4 p-2 hover:cursor-pointer bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                        >
                            <FiMenu size={20} />
                        </button>
                    )}
                    <h2 className={`text-lg font-bold text-indigo-600 tracking-wide ${!sidebarOpen ? "ml-12" : ""}`}>
                        {activeChat ? activeChat.title : "Travel Chatbot"}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-200 to-pink-200 text-gray-800 font-bold rounded-full shadow-md">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1.5 rounded-md text-sm shadow-md transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center flex-1 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                            <h3 className="text-gray-600 text-sm">
                                Connecting to your{" "}
                                <span className="text-indigo-600 font-medium">Travel Chatbot…</span>
                            </h3>
                        </div>
                    ) : (
                        <ChatWindow chat={activeChat} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default ChatbotPage;
