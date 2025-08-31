import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ChatbotPage from "./pages/ChatbotPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Router>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route
              path="/chatbot"
              element={ 
                <ProtectedRoute>
                  <ChatbotPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
