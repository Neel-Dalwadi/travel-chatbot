import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated , email } = useSelector((state) => state.auth);
    
    
    if (!isAuthenticated && !email) {
        return <Navigate to="/login" replace/>;
    }
    return children;
};

export default ProtectedRoute;
