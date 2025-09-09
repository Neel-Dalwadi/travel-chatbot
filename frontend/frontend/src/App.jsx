import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import store from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ChatbotPage from "./pages/ChatbotPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import SignUp from "./pages/SignUp";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Router>
          <Routes>

            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}

            <Route
              path="/chatbot"
              element={isAuthenticated ? <ProtectedRoute> <ChatbotPage /></ProtectedRoute> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
