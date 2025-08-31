import React from 'react';
import ChatWindow from '../components/ChatWindow';
import ProtectedRoute from '../components/ProtectedRoute';

const Home = () => {
    return (
        <ProtectedRoute>
            <ChatWindow />
        </ProtectedRoute>
    );
};

export default Home;
