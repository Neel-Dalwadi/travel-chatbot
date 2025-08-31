import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, sendChatMessage } from '../features/chat/chatSlice';

const ChatWindow = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim()) return;
        dispatch(addUserMessage(input));
        setInput('');
        setLoading(true);
        await dispatch(sendChatMessage(input));
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const renderMarkdownText = (text) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
                return <h3 key={i} className="text-lg font-semibold mt-1 mb-1 text-gray-800">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('#### ')) {
                return <h4 key={i} className="text-md font-semibold mt-1 mb-1 text-blue-700">{line.replace('#### ', '')}</h4>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold mt-2 mb-2 text-blue-700">{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('# ')) {
                return <h1 key={i} className="text-2xl font-bold mt-2 mb-2 text-blue-800">{line.replace('# ', '')}</h1>;
            }
            if (/\*\*(.*?)\*\*/.test(line)) {
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                    <div key={i} className="mb-1">
                        {parts.map((part, idx) => idx % 2 === 1 ? <b key={idx}>{part}</b> : part)}
                    </div>
                );
            }
            if (line.startsWith('- ')) {
                return <div key={i} className="ml-4 mb-1">• {line.replace('- ', '')}</div>;
            }
            return <div key={i} className="mb-1">{line}</div>;
        });
    };

    return (
        <div className="flex flex-col max-w-2xl mx-auto h-[80vh] p-4 ">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Travel Chatbot</h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white rounded-xl shadow-md">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm leading-relaxed
                ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-gray-200 text-gray-800 rounded-bl-sm'}`}
                        >
                            {msg.role === 'user'
                                ? msg.text
                                : renderMarkdownText(msg.text)
                            }
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="max-w-[70%] px-4 py-2 rounded-2xl shadow bg-gray-200 text-gray-600 animate-pulse">
                            AI is typing...
                        </div>
                    </div>
                )}
                <div ref={chatEndRef}></div>
            </div>
            <div className="mt-3 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={loading ? "🚫 AI is typing..." : "Ask me about your trip..."}
                    className={`flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
