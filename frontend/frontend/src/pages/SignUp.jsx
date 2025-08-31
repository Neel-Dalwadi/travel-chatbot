// src/pages/SignUp.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authAPI";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(formData)).unwrap();
            navigate("/login"); 
        } catch (error) {
            alert("Signup failed: " + error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">
                <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
